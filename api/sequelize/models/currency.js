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
  symbol: {
    ...textField(null),
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
  modelName: "currencies",
  tableName: "currencies",
  timestamps: false,
};

class Currency extends Model {
  static associate(models) {}
}

Currency.init(fields, { ...options, sequelize });

module.exports = Currency;
module.exports.fields = fields;
