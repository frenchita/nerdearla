require('dotenv').config(); // this is important!

module.exports = {
  "development": {
      "username": process.env.APP_DATABASE_USER,
      "password": process.env.APP_DATABASE_PASS,
      "database": process.env.APP_DATABASE_NAME,
      "host": process.env.APP_DATABASE_HOST,
      "dialect": "mysql"
  },
  "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
  },
  "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
  }
};