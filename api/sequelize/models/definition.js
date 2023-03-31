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
  title: {
    ...textField(null),
    primaryKey: true,
    defaultValue: undefined,
    allowNull: false,
  },
  definition: { ...textField("", 4096) },
};

const options = {
  modelName: "definitions",
  tableName: "definitions",
  timestamps: false,
};

class Definition extends Model {
  static associate(models) {
    const { languages } = models;

    Definition.belongsTo(languages, {
      foreignKey: "languageId",
      as: "languages",
    });
  }
}

Definition.init(fields, { ...options, sequelize });

module.exports = Definition;
module.exports.fields = fields;
