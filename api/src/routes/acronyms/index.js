const AcronymController = require("../../controllers/acronyms");
const { defaultGetHandler, importHandler } = require("../../handlers/default");

const setup = (router) => {
  router.post("/acronyms/import", importHandler(AcronymController));
  router.use("/acronyms/:languageId", defaultGetHandler(AcronymController))
};

module.exports = setup;
