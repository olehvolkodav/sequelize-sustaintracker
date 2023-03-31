const _ = require("lodash");
const fs = require("fs");
const { sequelize, models } = require("./sequelize");

const sync = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS=0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS=1");
    console.log("Finished sync.");

    await putLanguages();
    await putCurrencies();
    await putLocales();
  } catch (e) {
    console.error("Got error when syncing.", e);
  }
};

const putLanguages = async () => {
  const languageJson = require("./resources/languages");

  const languages = _.map(languageJson, ({ description }, identifier) => ({
    identifier,
    description,
  }));

  await models.languages.bulkCreate(languages);
};

const putCurrencies = async () => {
  const currencyJson = require("./resources/currencies");

  const currencies = currencyJson.map(({ cc, symbol, name }) => ({
    identifier: cc,
    symbol,
    description: name,
  }));

  await models.currencies.bulkCreate(currencies);
};

const putLocales = async () => {
  const namespaceFiles = fs.readdirSync('./resources/locales/en/');

  const namespaces = namespaceFiles.map(file => {
    const [ namespace ] = file.split('.');
    const keys = require(`./resources/locales/en/${file}`);

    return {
      languageId: 'en',
      namespace,
      keys,
    };
  });

  await models.locales.bulkCreate(namespaces);
};

sync();
