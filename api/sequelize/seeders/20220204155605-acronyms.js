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

const initials = (s) => s.split(" ").map((w) => w[0]).join("");

const generateAcronym = (i) => {
  faker.seed(i);
  const code = sectors[i % sectors.length];

  const definition = faker.name.title();
  const acronym = initials(definition);

  return {
    code,
    languageId: 'en',
    acronym,
    definition,
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedData = _.times(30, (i) => generateAcronym(i));

    return queryInterface.bulkInsert("acronyms", seedData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("acronyms", null, {});
  }
};
