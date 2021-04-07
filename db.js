const { Sequelize, Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Account extends Model { }
Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'account' });

class Session extends Model { }
Session.init({}, { sequelize });

(async () => { await sequelize.sync() })()

let models = { Account: Account }

module.exports = models;