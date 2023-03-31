const _ = require("lodash");
const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("../index");

const {
  pkField,
  jsonField,
  dateField,
  uuidFkField,
  readableUUIDField,
} = require("../../utils/db");

const fields = {
  id: pkField(),
  data: jsonField(),
  companyId: { ...uuidFkField(), allowNull: true },
  readableCompanyId: readableUUIDField("companyId"),
  createdAt: { ...dateField(), defaultValue: Sequelize.NOW },
};

const options = {
  modelName: "datasets",
  tableName: "datasets",
  timestamps: false,
};

class Dataset extends Model {
  toJSON() {
    const data = this.get();
    delete data.readableCompanyId;

    return data;
  }

  static associate(models) {}
}

Dataset.init(fields, { ...options, sequelize });

module.exports = Dataset;
module.exports.fields = fields;
