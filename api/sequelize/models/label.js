const { Model } = require("sequelize");
const { sequelize } = require("../index");

const { pkField, textField } = require("../../utils/db");

const fields = {
  id: pkField(),
  name: textField(),
};

const options = {
  modelName: "labels",
  tableName: "labels",
  timestamps: false,
};

class Label extends Model {
  static associate(models) {}

  getDescription() {
    return this.get("name");
  }
}

Label.init(fields, { ...options, sequelize });

module.exports = Label;
module.exports.fields = fields;
