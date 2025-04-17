'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FieldRule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FieldRule.init({
    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Fields', // Nom de la table
        key: 'id'
      }
    },
    ruleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rules', // Nom de la table
        key: 'id'
      }
    },
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FieldRule',
  });
  return FieldRule;
};