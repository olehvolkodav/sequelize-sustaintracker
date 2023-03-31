const exportHandler = (controller) => async (req, res, next) => {
  try {
    const result = await controller.export(req);

    res.set('Content-Type', 'text/csv');
    res.send(result);
  } catch (e) {
    console.error(e);

    res.status(400).send({
      error: e.message,
      data: e.data || null,
    });
  }
};

module.exports = { exportHandler };
