const DefinitionController = require("../../controllers/definitions");
const { defaultGetHandler, importHandler } = require("../../handlers/default");

const setup = (router) => {
  router.post("/definitions/import", importHandler(DefinitionController));
  router.use("/definitions/:languageId", defaultGetHandler(DefinitionController))
};

module.exports = setup;
