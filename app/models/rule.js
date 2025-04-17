'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rule.belongsToMany(models.Field, {
        through: models.FieldRule,
        foreignKey: 'ruleId',
        otherKey: 'fieldId',
        as: 'fields'
      });
    }
  }
  Rule.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "RULE.FIELDS.NOTEMPTY" },
      }
    },
    uid: DataTypes.UUID,
    description: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM('regex', 'minLength', 'maxLength', 'required', 'email', 'date', 'number', 'integer', 'boolean', 'iban', 'bic', 'equalsTo', 'differentTo', 'contains', 'notContains', 'inList', 'notInList', 'KYCChecker', 'TransactionConformity', 'DuplicateDetection', 'custom'),
      allowNull: false
    },
    parameters: DataTypes.TEXT,
    message: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    options: { // Ajout du champ "options"
      type: DataTypes.JSON,
      allowNull: true,
    }
  }, {
    hooks: {
      beforeCreate: (rule, options) => {
        rule.uid = crypto.randomUUID();
      },
    },
    sequelize,
    modelName: 'Rule',
  });
  return Rule;
};