const _ = require("lodash");
const yup = require("yup");
const Datasets = require("../../sequelize/models/dataset");
const DefaultController = require("./default");

class DatasetController extends DefaultController {
  schema = {
    data: yup.object().shape({
      metadata: yup.object().shape({
        name: yup.string().required(),
      }),
    }),
  };
}

module.exports = new DatasetController(Datasets);
