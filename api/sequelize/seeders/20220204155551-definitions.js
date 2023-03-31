const _ = require("lodash");
const faker = require("faker");

const sectors = [
  "Consumer Goods",
  "Extractiveness & Minerals Processing",
  "Financials",
  "Food & Beverage",
  "Health Care",
  "Infrastructure",
  "Renewable Resources & Alternative Energy",
];

const generateDefinition = (i) => {
  faker.seed(i);
  const code = sectors[i % sectors.length];

  return {
    code,
    languageId: 'en',
    title: faker.company.catchPhrase(),
    definition: faker.lorem.paragraphs(2),
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedData = _.times(30, (i) => generateDefinition(i));

    return queryInterface.bulkInsert("definitions", seedData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("definitions", null, {});
  }
};
