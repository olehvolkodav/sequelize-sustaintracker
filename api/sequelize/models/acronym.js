const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("../index");

const { textField } = require("../../utils/db");

const fields = {
  code: {
    ...textField(null),
    primaryKey: true,
    defaultValue: undefined,
    allowNull: false,
  },
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
  acronym: {
    ...textField(null),
    primaryKey: true,
    defaultValue: undefined,
    allowNull: false,
  },
  definition: { ...textField() },
};

const options = {
  modelName: "acronyms",
  tableName: "acronyms",
  timestamps: false,
};

class Acronym extends Model {
  static associate(models) {
    const { languages } = models;

    Acronym.belongsTo(languages, {
      foreignKey: "languageId",
      as: "languages",
    });
  }
}

Acronym.init(fields, { ...options, sequelize });

module.exports = Acronym;
module.exports.fields = fields;
