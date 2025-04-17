'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const type_enum = ['text', 'number', 'select', 'ratio', 'boolean', 'textarea', 'date', 'email','group']

    await queryInterface.changeColumn('Fields', 'uid', {
      type: Sequelize.UUID,
      allowNull: false,
      //defaultValue: Sequelize.UUIDV4,
      //defaultValue: Sequelize.literal('uuid_generate_v4()'),
    });

    


    await queryInterface.changeColumn('Fields', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: { args: [1, Infinity], msg: "FIELD.FIELDS.NAME.MIN-2-LENGH" },
        not: { args: [/\s+/ig], msg: "FIELD.FIELDS.NAME.NOT-BLANK-CHARACTER" }
        /*
        is: /^[a-z]+$/i,          // matches this RegExp
        is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
        not: /^[a-z]+$/i,         // does not match this RegExp
        not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
        isEmail: true,            // checks for email format (foo@bar.com)
        isUrl: true,              // checks for url format (https://foo.com)
        isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
        isIPv4: true,             // checks for IPv4 (129.89.23.1)
        isIPv6: true,             // checks for IPv6 format
        isAlpha: true,            // will only allow letters
        isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
        isNumeric: true,          // will only allow numbers
        isInt: true,              // checks for valid integers
        isFloat: true,            // checks for valid floating point numbers
        isDecimal: true,          // checks for any numbers
        isLowercase: true,        // checks for lowercase
        isUppercase: true,        // checks for uppercase
        notNull: true,            // won't allow null
        isNull: true,             // only allows null
        notEmpty: true,           // don't allow empty strings
        equals: 'specific value', // only allow a specific value
        contains: 'foo',          // force specific substrings
        notIn: [['foo', 'bar']],  // check the value is not one of these
        isIn: [['foo', 'bar']],   // check the value is one of these
        notContains: 'bar',       // don't allow specific substrings
        len: [2,10],              // only allow values with length between 2 and 10
        isUUID: 4,                // only allow uuids
        isDate: true,             // only allow date strings
        isAfter: "2011-11-05",    // only allow date strings after a specific date
        isBefore: "2011-11-05",   // only allow date strings before a specific date
        max: 23,                  // only allow values <= 23
        min: 23,                  // only allow values >= 23
        isCreditCard: true,       // check for valid credit card numbers
  
        // Examples of custom validators:
        isEven(value) {
          if (parseInt(value) % 2 !== 0) {
            throw new Error('Only even values are allowed!');
          }
        }
        isGreaterThanOtherField(value) {
          if (parseInt(value) <= parseInt(this.otherField)) {
            throw new Error('Bar must be greater than otherField.');
          }
        }
        */
      }
    });

    await queryInterface.changeColumn('Fields', 'type', {
      type: Sequelize.ENUM(type_enum),
      allowNull: false,
      defaultValue: 'text',
      validate: {
        isIn: {
          args: [type_enum],
          msg: "FIELD.FIELDS.TYPE.ISNOTVALID"
        },
        /*
        is: /^[a-z]+$/i,          // matches this RegExp
        is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
        not: /^[a-z]+$/i,         // does not match this RegExp
        not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
        isEmail: true,            // checks for email format (foo@bar.com)
        isUrl: true,              // checks for url format (https://foo.com)
        isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
        isIPv4: true,             // checks for IPv4 (129.89.23.1)
        isIPv6: true,             // checks for IPv6 format
        isAlpha: true,            // will only allow letters
        isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
        isNumeric: true,          // will only allow numbers
        isInt: true,              // checks for valid integers
        isFloat: true,            // checks for valid floating point numbers
        isDecimal: true,          // checks for any numbers
        isLowercase: true,        // checks for lowercase
        isUppercase: true,        // checks for uppercase
        notNull: true,            // won't allow null
        isNull: true,             // only allows null
        notEmpty: true,           // don't allow empty strings
        equals: 'specific value', // only allow a specific value
        contains: 'foo',          // force specific substrings
        notIn: [['foo', 'bar']],  // check the value is not one of these
        isIn: [['foo', 'bar']],   // check the value is one of these
        notContains: 'bar',       // don't allow specific substrings
        len: [2,10],              // only allow values with length between 2 and 10
        isUUID: 4,                // only allow uuids
        isDate: true,             // only allow date strings
        isAfter: "2011-11-05",    // only allow date strings after a specific date
        isBefore: "2011-11-05",   // only allow date strings before a specific date
        max: 23,                  // only allow values <= 23
        min: 23,                  // only allow values >= 23
        isCreditCard: true,       // check for valid credit card numbers
  
        // Examples of custom validators:
        isEven(value) {
          if (parseInt(value) % 2 !== 0) {
            throw new Error('Only even values are allowed!');
          }
        }
        isGreaterThanOtherField(value) {
          if (parseInt(value) <= parseInt(this.otherField)) {
            throw new Error('Bar must be greater than otherField.');
          }
        }
        */
      }
    });


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
