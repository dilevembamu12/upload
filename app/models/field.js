'use strict';
const {
  Model
} = require('sequelize');

const crypto = require("crypto");
const validator = require('validator');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relation avec Rule via la table de jointure FieldRule
      Field.belongsToMany(models.Rule, {
        through: models.FieldRule,
        foreignKey: 'fieldId',
        otherKey: 'ruleId',
        as: 'rules'
      });
      // Relation avec Mask via la table de jointure MaskField
      Field.belongsToMany(models.Mask, {
        through: models.MaskField,
        foreignKey: 'fieldId',
        otherKey: 'maskId',
        as: 'masks'
      });
    }
  }
  Field.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'APP.UNIQUE',
        fields: [sequelize.fn('lower', sequelize.col('code'))]
    },
    validate: {
      notEmpty: { args: true, msg: "FIELD.FIELDS.NOTEMPTY" },
      isAlpha: { args: true, msg: "FIELD.FIELDS.ISALPHA" },  
    }
    
      /*
      unique: {
        args: true,
        msg: "Email address already in use!"
      }
      */
    },
    

    uid: DataTypes.UUID,
    type: DataTypes.ENUM('text', 'number', 'select', 'ratio', 'boolean', 'textarea', 'date', 'email','group'),
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    options: DataTypes.TEXT,


    
  }, {
    hooks: {
      beforeCreate: (Field, options) => {
        Field.uid = crypto.randomUUID();
        console.log('AAAAAAAAAAAAAAAAAA');
      },
    },
    sequelize,
    modelName: 'Field',
  });
  return Field;
};