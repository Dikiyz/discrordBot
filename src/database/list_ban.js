const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('list_ban', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        adminID: {
            type: Sequelize.BIGINT,
            defaultValue: -1,
            allowNull: false,
        },
        reason: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false,
        },
        userID: {
            type: Sequelize.BIGINT,
            defaultValue: -1,
            allowNull: false,
        },
        timeEnd: {
            type: Sequelize.TIME,
            allowNull: false,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}