const _ = require("lodash");
const yup = require("yup");
const Companies = require("../../sequelize/models/company");
const DefaultController = require("./default");

class CompanyController extends DefaultController {
  schema = {
    name: yup.string().required(),
  };
}

module.exports = new CompanyController(Companies);
