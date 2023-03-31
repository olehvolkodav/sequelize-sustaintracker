const LabelController = require("../../controllers/labels");
const { defaultGetHandler, defaultCreateHandler } = require("../../handlers/default");

const setup = (router) => {
  router.use("/labels/create", defaultCreateHandler(LabelController));
  router.use("/labels/:id?", defaultGetHandler(LabelController));
};

module.exports = setup;
