const CompanyController = require("../../controllers/companies");
const { defaultGetHandler, defaultCreateHandler } = require("../../handlers/default");

const setup = (router) => {
  router.use("/companies/create", defaultCreateHandler(CompanyController));
  router.use("/companies/:id?", defaultGetHandler(CompanyController));
};

module.exports = setup;
