const Sequelize = require('sequelize');
const debug = require('../modules/debug');

module.exports = function (sequelize) {
    try {
        return sequelize.define('log_any', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            action: {
                type: Sequelize.STRING,
                defaultValue: '',
                allowNull: false,
            },
            params: {
                type: Sequelize.JSON,
                defaultValue: '{ }',
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