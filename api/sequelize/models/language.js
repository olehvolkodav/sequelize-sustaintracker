const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("../index");

const { pkField, textField, jsonField } = require("../../utils/db");

const fields = {
  identifier: {
    ...textField(null),
    primaryKey: true,
    unique: true,
    defaultValue: undefined,
    allowNull: false,
  },
  description: {
    ...textField(null),
    defaultValue: undefined,
    unique: true,
    allowNull: false,
  },
};

const options = {
  modelName: "languages",
  tableName: "languages",
  timestamps: false,
};

class Language extends Model {
  static associate(models) {}
}

Language.init(fields, { ...options, sequelize });

module.exports = Language;
module.exports.fields = fields;
