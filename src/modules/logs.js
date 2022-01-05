const debug = require('./debug');
const log_admin = require('../database/db').log_admin;
const log_user = require('../database/db').log_user;
const log_system = require('../database/db').log_system;
const log_any = require('../database/db').log_any;

const logs = exports;

logs.addAdmin = (admin, action, params) => {
    try {
        log_admin.create({
            adminID: admin.id,
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) { debug.error("Function[logs.addAdmin] error: " + err, true); }
}

logs.addUser = (user, action, params) => {
    try {
        log_user.create({
            userID: user.id,
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) { debug.error("Function[logs.addUser] error: " + err, true); }
}

logs.addSystem = (action, params) => {
    try {
        log_system.create({
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) { debug.error("Function[logs.addSystem] error: " + err, true); }
}

logs.addAny = (action, params) => {
    try {
        log_any.create({
            action: action,
            params: JSON.stringify(params),
        });
    } catch (err) { debug.error("Function[logs.addAny] error: " + err, true); }
}