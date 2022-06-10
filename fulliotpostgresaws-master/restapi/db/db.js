'use strict'
require('dotenv').config({ path: "../../.env" });
const Sequelize = require('sequelize');
console.log(process.env.POSTGRES_USER)
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'postgres',
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    dialectOptions: {
        //timezone: process.env.DB_TIMEZONE
        //socketPath: '/var/run/mysqld/mysqld.sock'
    }
    /*,
        define: { //eliminates createdAt & updatedAt
            timestamps: false,
        }*/
});

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.data = require('../models/data.js')(sequelize, Sequelize);

sequelize.sync()
    .then(() => console.log('Models are up'))
    .catch(error => console.log('This error occured', error));

module.exports = {
    db,
    sequelize
};