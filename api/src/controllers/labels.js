const _ = require("lodash");
const Labels = require("../../sequelize/models/currency");
const DefaultController = require("./default");

class LabelController extends DefaultController {}

module.exports = new LabelController(Labels);
