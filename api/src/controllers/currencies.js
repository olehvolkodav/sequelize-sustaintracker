const _ = require("lodash");
const Currencies = require("../../sequelize/models/currency");
const DefaultController = require("./default");

class CurrencyController extends DefaultController {
  filters = {
    identifier: ["EUR", "USD"],
  };
}

module.exports = new CurrencyController(Currencies);
