const _ = require("lodash");
const faker = require("faker");

const generateFakeCompany = (i, languages) => {
  faker.seed(i);

  return {
    name: faker.company.companyName(),
    decimalFormat: faker.random.arrayElement(["period", "comma"]),
    dateFormat: faker.random.arrayElement([
      "DD/MM/YYYY",
      "MM/DD/YYYY",
      "YYYY/MM/DD",
    ]),
    languageIdentifier: faker.random.arrayElement(languages),
    currencyIdentifier: faker.random.arrayElement(["EUR", "USD"]),
    createdAt: new Date(),
  };
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const languages = await queryInterface.sequelize.query(
      "SELECT identifier from languages"
    );
    const languageIds = [];

    languages[0].forEach((val) => {
      languageIds.push(val.identifier);
    });

    const seedData = _.times(5, (i) => generateFakeCompany(i, languageIds));

    return await queryInterface.bulkInsert("companies", seedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("companies", null, {});
  },
};
