const LanguageController = require("../../controllers/languages");
const { defaultGetHandler } = require("../../handlers/default");

const setup = (router) => {
  router.use("/languages/:id?", defaultGetHandler(LanguageController));
};

module.exports = setup;
