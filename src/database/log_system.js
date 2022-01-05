const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('log_system', {
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
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}