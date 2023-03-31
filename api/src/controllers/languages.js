const _ = require("lodash");
const Languages = require("../../sequelize/models/language");
const DefaultController = require("./default");

class LanguageController extends DefaultController {}

module.exports = new LanguageController(Languages);
