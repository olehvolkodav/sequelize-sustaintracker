const Definitions = require("../../sequelize/models/definition");
const DefaultController = require("./default");

class DefinitionController extends DefaultController {
  limit = null;
}

module.exports = new DefinitionController(Definitions);
