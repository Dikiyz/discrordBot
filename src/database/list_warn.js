const Sequelize = require('sequelize');
const debug = require('../modules/debug');

module.exports = function (sequelize) {
    try {
        return sequelize.define('list_warn', {
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
            timestamp: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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