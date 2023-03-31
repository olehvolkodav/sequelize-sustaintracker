const defaultGetHandler = (controller) => async (req, res, next) => {
  try {
    const result = await controller.get(req);

    res.send(result);
  } catch (e) {
    res.status(400).send({
      error: e.message,
      data: e.data || null,
    });
  }
};

const defaultCreateHandler = (controller) => async (req, res, next) => {
  try {
    const result = await controller.create(req, res);

    res.send({ success: true });
  } catch (e) {
    console.error(e);

    res.status(400).send({
      error: e.message,
      data: e.data || null,
    });
  }
};

const importHandler = (controller) => async (req, res, next) => {
  try {
    const result = await controller.import(req, res);

    res.send({ success: true });
  } catch (e) {
    console.error(e);

    res.status(400).send({
      error: e.message,
      data: e.data || null,
    })
  }
}

module.exports = {
  defaultGetHandler,
  defaultCreateHandler,
  importHandler,
};
