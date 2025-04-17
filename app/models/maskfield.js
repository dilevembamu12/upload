'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaskField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MaskField.init({
    maskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Masks', // Nom de la table
        key: 'id'
      }
    },
    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Fields', // Nom de la table
        key: 'id'
      }
    },
    order: DataTypes.INTEGER,
    width: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MaskField',
  });
  return MaskField;
};