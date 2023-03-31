const _ = require("lodash");
const Locales = require("../../sequelize/models/locale");
const DefaultController = require("./default");
const { mapToKeyValuePairs } = require("../../utils/locales");

class LocaleController extends DefaultController {
  async get(req) {
    const { lng, ns } = req.params;

    if (lng && ns) {
      const result = await this.model.findOne({
        where : {
          languageId: lng,
          namespace: ns,
        }
      });

      return result?.keys;
    }

    const result = await this.model.findAll({
      attributes: ['languageId'],
      group: ['languageId'],
      include: {
        association: 'languages',
      },
    });

    return result.map((lng) => lng.languages);
  }

  async import(req) {
    const { files } = req;

    if (!files) {
      throw new Error('No translation file provided');
    }

    const file = files[Object.keys(files)[0]];

    if (!file.mitetype === 'text/csv') {
      throw new Error('Translation file is not of csv type');
    }

    const data = file.data.toString();

    const { parse } = require('csv-parse/sync');
    const csvData = parse(data);

    // group the values into objects
    const entries = csvData.slice(1).map((line) => {
      const language = line[0];
      const namespace = line[1].split('.')[0];
      return {
        identifier: language + '.' + namespace,
        language,
        namespace,
        key: line[1].substr(namespace.length + 1),
        value: line[2],
      };
    });

    // group the entries by language/namespace
    const groupedEntries = _.groupBy(entries, 'identifier');

    // format the entries to insert into the database
    const formattedEntries = Object.keys(groupedEntries).map((id) => {
      const keys = {};

      const pairs = groupedEntries[id];
      pairs.forEach((pair) => _.set(keys, pair.key, pair.value));

      return {
        languageId: pairs[0].language,
        namespace: pairs[0].namespace,
        keys,
      };
    });

    await this.model.bulkCreate(formattedEntries, {
      updateOnDuplicate: ['keys'],
    });
  }

  async export(req) {
    const { lng } = req.params;

    if (lng) {
      const translations = await this.model.findAll({
        where: {
          languageId: lng,
        },
        order: [['namespace', 'asc']],
      });

      if (!translations.length) {
        throw new Error(
          'Translations for language \'' + lng + '\' not found'
        );
      }

      const rows = [];
      translations.forEach((entry) => {
        mapToKeyValuePairs(entry.toJSON().keys, entry.namespace, rows);
      });

      const { stringify } = require('csv-stringify/sync');
      const result = stringify(
        rows.map((entry) => [lng, entry.key, entry.value ]),
        {
          header: true,
          columns: ['Language', 'Key', 'Value'],
        }
      );

      return result;
    }
  }
}

module.exports = new LocaleController(Locales);
