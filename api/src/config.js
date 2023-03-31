const _ = require("lodash");

module.exports = {
  host: _.get(process.env, "API_HOST", "127.0.0.1"),
  port: _.get(process.env, "API_PORT", 8080),
};
