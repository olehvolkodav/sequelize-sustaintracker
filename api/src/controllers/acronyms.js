const Acronyms = require("../../sequelize/models/acronym");
const DefaultController = require("./default");

class AcronymController extends DefaultController {
  limit = null;
}

module.exports = new AcronymController(Acronyms);
