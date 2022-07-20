'use strict';
const bcrypt = require("bcrypt");
const password = 'mipass'
const salt = Math.floor(Math.random() * 6) + 1
const hash = bcrypt.hashSync(password, salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: hash,
      salt: salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};