const _ = require("lodash");
const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("../index");

const {
  textField,
  enumField,
  dateField,
  readableUUIDField,
  uuidPkField,
} = require("../../utils/db");

const fields = {
  id: uuidPkField(),
  readableUUID: readableUUIDField("id"),
  name: { ...textField(), allowNull: false, unique: true },
  decimalFormat: enumField(["period", "comma"], "period"),
  dateFormat: textField("DD/MM/YYYY"),
  createdAt: { ...dateField(), defaultValue: Sequelize.NOW },
  updatedAt: { ...dateField(), allowNull: true },
};

const options = {
  modelName: "companies",
  tableName: "companies",
  timestamps: true,
};

class Company extends Model {
  toJSON() {
    const data = this.get();
    delete data.readableUUID;

    return data;
  }

  static associate(models) {
    const { datasets, languages, currencies } = models;

    Company.belongsTo(languages);
    Company.belongsTo(currencies);
    Company.hasMany(datasets);
  }
}

Company.init(fields, { ...options, sequelize });

module.exports = Company;
module.exports.fields = fields;
