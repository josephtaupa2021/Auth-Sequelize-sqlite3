const { Sequelize, Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Account extends Model { }
Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'Account' });

class Session extends Model { }
Session.init({
    user: DataTypes.STRING,
    sessionID: DataTypes.UUID,
    timeOfLogin: DataTypes.DATE
}, { sequelize, modelName: 'Session' });

(async () => { await sequelize.sync() })()

let models = { Account: Account, Session: Session }

module.exports = models;