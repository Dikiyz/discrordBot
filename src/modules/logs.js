const log_admin = require('../database/db').log_admin;
const log_user = require('../database/db').log_user;
const log_system = require('../database/db').log_system;
const log_any = require('../database/db').log_any;
const logs = exports;
let debug = require('./debug');

logs.addAdmin = (admin, action, params) => {
    try {
        log_admin.create({
            adminID: admin.id,
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) {
        debug.error(err);
    }
}

logs.addUser = (user, action, params) => {
    try {
        log_user.create({
            userID: user.id,
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) {
        debug.error(err);
    }
}

logs.addSystem = async (action, params) => {
    try {
        log_system.create({
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) {
        debug.error(err);
    }
}

logs.addAny = (action, params) => {
    try {
        log_any.create({
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) {
        debug.error(err);
    }
}