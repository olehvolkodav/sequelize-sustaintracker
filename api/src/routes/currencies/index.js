const CurrencyController = require("../../controllers/currencies");
const { defaultGetHandler } = require("../../handlers/default");

const setup = (router) => {
  router.use("/currencies/:id?", defaultGetHandler(CurrencyController));
};

module.exports = setup;
