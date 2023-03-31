const { Sequelize } = require("sequelize");
const glob = require("glob");
const path = require("path");
const config = require("./config");
require("../utils/binary-uuid");

const { setupAssociations } = require("../utils/db");

const { database, username, password, dialect, dialectOptions, host } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  dialectOptions,
});

module.exports.sequelize = sequelize;

// loads models to sequelize.models
glob.sync("sequelize/models/*.js").forEach(function (file) {
  require(path.resolve(file));
});

setupAssociations(sequelize.models);

module.exports.models = sequelize.models;
