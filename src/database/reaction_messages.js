const Sequelize = require('sequelize');
const debug = require('../modules/debug');

module.exports = function (sequelize) {
    try {
        return sequelize.define('reaction_messages', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            message: {
                type: Sequelize.BIGINT,
                defaultValue: -1,
                allowNull: false,
            },
            reaction: {
                type: Sequelize.STRING,
                defaultValue: '',
                allowNull: false,
            },
            role: {
                type: Sequelize.BIGINT,
                defaultValue: -1,
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