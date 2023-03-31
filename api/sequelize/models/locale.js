const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("../index");

const { textField, jsonField } = require("../../utils/db");

const fields = {
  languageId: {
    ...textField(null),
    primaryKey: true,
    references: {
      model: "languages",
      key: "identifier",
    },
    defaultValue: undefined,
    allowNull: false,
  },
  namespace: {
    ...textField(null),
    primaryKey: true,
    defaultValue: undefined,
    allowNull: false,
  },
  keys: { ...jsonField() },
};

const options = {
  modelName: "locales",
  tableName: "locales",
  timestamps: false,
};

class Locale extends Model {
  static associate(models) {
    const { languages } = models;

    Locale.belongsTo(languages, {
      foreignKey: "languageId",
      as: "languages",
    });
  }
}

Locale.init(fields, { ...options, sequelize });

module.exports = Locale;
module.exports.fields = fields;
