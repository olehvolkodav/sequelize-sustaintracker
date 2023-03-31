const _ = require("lodash");
const yup = require("yup");
const { parse } = require("csv-parse/sync");

class DefaultController {
  constructor(model) {
    this.model = model;
    this.schema = {}; // use with yup to validate creation
    this.filters = {}; // filters that will be merged on get request;
    this.limit = 50;
  }

  async get(req) {
    const params = {
      ...req.params,
      ...req.query,
    };

    const offset = _.get(params, "offset", 0);
    const filters = _.omitBy(params, _.isNil);

    const result = await this.model.findAll({
      limit: this.limit,
      offset,
      where: _.merge(this.filters, filters),
    });

    return result;
  }

  async create(req) {
    const params = {
      ...req.params,
      ...req.query,
      ...req.body,
    };

    // expecting "values" parameter in case we want to pass extra parameters for some reason
    if (_.isEmpty(params.values)) {
      throw new Error("Missing or empty 'values' parameter");
    }

    const values =
      typeof params.values == "string"
        ? JSON.parse(params.values)
        : params.values;

    if (!_.isEmpty(this.schema)) {
      try {
        await yup.object().shape(this.schema).validate(values);
      } catch (err) {
        const creationErr = new Error("CreationError");

        creationErr.data = err.errors;
        creationErr.name = err.name;

        throw creationErr;
      }
    }

    await this.model.create(values, { raw: true });
  }

  async import(req) {
    const { files } = req;

    if (!files) {
      throw new Error("No csv file provided");
    }

    const file = files[Object.keys(files)[0]];

    if (!file.mimetype === "text/csv") {
      throw new Error("File is not of csv type");
    }

    const data = file.data.toString();
    const csvData = parse(data, {
      columns: true,
    });

    await this.model.bulkCreate(csvData);
  }
}

module.exports = DefaultController;
