'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mask.belongsToMany(models.Field, {
        through: models.MaskField,
        foreignKey: 'maskId',
        otherKey: 'fieldId',
        as: 'fields'
      });
    }
  }
  Mask.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Mask',
  });
  return Mask;
};