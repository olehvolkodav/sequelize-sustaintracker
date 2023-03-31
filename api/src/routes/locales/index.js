const LocaleController = require("../../controllers/locales");
const { defaultGetHandler, importHandler } = require("../../handlers/default");
const { exportHandler } = require("../../handlers/locales");

const setup = (router) => {
  router.post("/locales/import", importHandler(LocaleController));
  router.use("/locales/export/:lng?", exportHandler(LocaleController));
  router.use("/locales/:lng?/:ns?", defaultGetHandler(LocaleController));
};

module.exports = setup;
