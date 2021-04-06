const { Sequelize, Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Account extends Model { }
Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    sessions: DataTypes.STRING
},
    {
        sequelize, modelName: 'account'
    }
);

(async () => {
    await sequelize.sync()
})()

let models = {
    Account: Account
}

module.exports = models;