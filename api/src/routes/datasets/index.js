const DatasetController = require("../../controllers/datasets");
const { defaultGetHandler, defaultCreateHandler } = require("../../handlers/default");

const setup = (router) => {
  router.use("/datasets/create", defaultCreateHandler(DatasetController));
  router.use("/datasets/:id?", defaultGetHandler(DatasetController));
};

module.exports = setup;
