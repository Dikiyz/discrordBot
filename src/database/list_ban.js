const Sequelize = require('sequelize');
const debug = require('../modules/debug');

module.exports = function (sequelize) {
    try {
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
            timeStart: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            timeEnd: {
                type: 'TIMESTAMP',
                allowNull: false,
            },
        }, {
            timestamps: false,
            freezeTableName: true,
        });
    } catch (err) {
        debug.error(err);
    }
}