const debug = require('../modules/debug');
const logs = require('../modules/logs');
const db = require('../database/db');
const methods = require('./methods');

const admin = exports;

admin.mute = async (admin, user, time, reason) => {
    try {
        // TODO: Доделать.
        db.list_ban.findOrCreate({});
        logs.addAdmin(parseInt(admin.id), "mute", { reason: reason, userID: parseInt(user.id), time: parseInt(time) })
    } catch (err) { debug.error("Function[admin.mute] error: " + err, true); }
}

admin.ban = async (admin, user, time, reason) => {
    try {
        // TODO: Доделать.findOrCreate()
        db.list_ban.findOrCreate({});
        let date = new Date();
        date.setMinutes(date.getMinutes() + parseInt(time));
        user.kick(`Вы были забанены с причиной ${reason}. Разбан: ${methods.dateToString(date)}.`);
        logs.addAdmin(parseInt(admin.id), "ban", { reason: reason, userID: parseInt(user.id), time: parseInt(time) })
    } catch (err) { debug.error("Function[admin.ban] error: " + err, true); }
}

admin.kick = async (admin, user, reason) => {
    try {
        // TODO: Доделать.
        user.kick(`Вы были выгнаны с причиной ${reason}.`);
        logs.addAdmin(parseInt(admin.id), "ban", { reason: reason, userID: parseInt(user.id) })
    } catch (err) { debug.error("Function[admin.kick] error: " + err, true); }
}