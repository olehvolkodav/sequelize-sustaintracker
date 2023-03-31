const _ = require("lodash");
const { DataTypes, Sequelize } = require("sequelize");
const BINARYUUID = require("../utils/binary-uuid");

const setupAssociations = (models) => {
  _.forEach(models, (model) => {
    model.associate(models);
  });
};

const enumField = (values, defaultValue) => ({
  type: DataTypes.ENUM(values),
  ...(defaultValue && { defaultValue }),
});

const enumArrayField = (values) => ({
  type: DataTypes.ARRAY(DataTypes.ENUM(values)),
});

const uuidPkField = () => ({
  type: BINARYUUID,
  primaryKey: true,
  unique: true,
  defaultValue: Sequelize.literal("(UUID_TO_BIN(UUID(), 1))"),
});

const uuidFkField = () => ({
  type: BINARYUUID,
  allowNull: false,
});

const readableUUIDField = (uuidFieldName) => ({
  type: `CHAR(36) GENERATED ALWAYS AS (BIN_TO_UUID(${uuidFieldName},1)) VIRTUAL`,
  set() {
    throw new Error(`readable${uuidFieldName} is read-only`);
  },
});

const pkField = () => ({
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
});

const fkField = () => ({
  type: DataTypes.INTEGER,
  allowNull: false,
});

const intField = () => ({
  type: DataTypes.INTEGER,
  allowNull: false,
});

const customIdType = () => ({
  type: DataTypes.STRING,
  primaryKey: true,
});

const dateField = () => ({
  allowNull: false,
  type: DataTypes.DATE,
});

const coordinateField = () => ({
  type: DataTypes.GEOMETRY("POINT"),
  allowNull: true,
});

const timestampField = () => ({
  type: DataTypes.DATE,
});

const timeOnlyField = () => ({
  type: DataTypes.STRING,
  validate: {
    is: /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/, // ex: 23:59:59
  },
});

const floatField = (defaultValue) => ({
  type: DataTypes.FLOAT,
  ...(defaultValue !== undefined && { defaultValue }),
});

const textField = (defaultValue = "", size = 255) => ({
  type: DataTypes.STRING(size),
  defaultValue: defaultValue,
});

const booleanField = () => ({
  type: DataTypes.BOOLEAN,
});

const macAddressField = () => ({
  type: DataTypes.MACADDR,
});

const jsonField = () => ({
  type: DataTypes.JSON,
  allowNull: true,
});

module.exports = {
  timestampField,
  floatField,
  textField,
  dateField,
  pkField,
  customIdType,
  enumField,
  intField,
  enumArrayField,
  setupAssociations,
  booleanField,
  timeOnlyField,
  macAddressField,
  fkField,
  jsonField,
  coordinateField,
  readableUUIDField,
  uuidPkField,
  uuidFkField,
};
