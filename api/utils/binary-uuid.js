const util = require("util");
const { DataTypes, Utils } = require("sequelize");
const { fromBinaryUUID, toBinaryUUID } = require("sequelize-binary-uuid");
const uuid = require("uuid");

function BINARYUUID() {
  this.options = {};
}

util.inherits(BINARYUUID, DataTypes.ABSTRACT);
Object.assign(BINARYUUID, DataTypes.ABSTRACT);

BINARYUUID.prototype.key = BINARYUUID.key = "BINARYUUID";
BINARYUUID.prototype.escape = false;

BINARYUUID.prototype.toSql = function toSql() {
  return "BINARY(16)";
};

BINARYUUID.prototype.validate = function validate(value) {
  return typeof value === "string" && uuid.validate(value);
};

BINARYUUID.prototype._sanitize = function _sanitize(value, options) {
  return BINARYUUID.parse(value);
};

BINARYUUID.prototype._stringify = function _stringify(value) {
  return `X'${value.toString("hex")}'`;
};

BINARYUUID.prototype._bindParam = function _bindParam(value, options) {
  return options.bindParam(toBinaryUUID(value));
};

BINARYUUID.parse = function parse(value) {
  return fromBinaryUUID(value);
};

DataTypes.BINARYUUID = Utils.classToInvokable(BINARYUUID);

module.exports = BINARYUUID;
