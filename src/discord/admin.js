const debug = require('../modules/debug');
const logs = require('../modules/logs');
const methods = require('./methods');
const {GuildMember} = require('discord.js');
const {list_warn, list_mute, list_ban} = require("../database/db");
const cfg = require('../modules/config').discord;

const admin = exports;

/**
 * @param {GuildMember} admin
 * @param {GuildMember} member
 * @param {int} time
 * @param {string} reason
 * @returns {Promise<void>}
 */
admin.mute = async (admin, member, time, reason) => {
    try {
        logs.addAdmin(parseInt(admin.user.id), "mute",
            {
                reason: reason,
                userID: parseInt(member.user.id),
                time: parseInt(time)
            }
        );

        let unbanDate = new Date();
        unbanDate.setMinutes(unbanDate.getMinutes() + time);

        list_mute.findOrCreate(
            {
                where: {userID: member.user.id},
                defaults: {
                    userID: member.user.id,
                    reason: reason,
                    timeEnd: unbanDate.toISOString(),
                },
            }
        ).then(async (res) => {
            if (res[1]) {
                res.timeEnd = unbanDate.toISOString();
                await res[0].save();
            }
            await member.user.send(`Вы были замучены администратором ${admin.user.tag}(${admin.user.id}) на ${time} минут по причине: ${reason}`);
        });
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} admin
 * @param {GuildMember} member
 * @param {int} time
 * @param {string} reason
 * @returns {Promise<void>}
 */
admin.ban = async (admin, member, time, reason) => {
    try {
        logs.addAdmin(admin.user.id, "Ban",
            {
                reason: reason,
                userID: member.user.id,
                time: time,
            });
        let unbanDate = new Date();
        unbanDate.setMinutes(unbanDate.getMinutes() + time);

        list_ban.findOrCreate({
            where: {userID: member.user.id},
            defaults: {
                reason: reason,
                userID: member.user.id,
                timeEnd: unbanDate.toISOString(),
            },
        }).then(async (res) => {
            if (res[1]) {
                res.timeEnd = unbanDate.toISOString();
                await res[0].save();
            }
            await member.kick(`Вы были забанены администратором ${admin.user.tag}(${admin.user.id}) на ${time} минут с причиной ${reason}. Разбан: ${methods.dateToString(unbanDate)}.`);
        });
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} admin
 * @param {GuildMember} member
 * @param {string} reason
 * @returns {Promise<void>}
 */
admin.kick = async (admin, member, reason) => {
    try {
        logs.addAdmin(admin.user.id, "Kick",
            {
                reason: reason,
                userID: member.user.id,
            });
        await member.kick(`Вы были выгнаны администратором ${admin.user.tag}(${admin.user.id}) с причиной: ${reason}.`);
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} admin
 * @param {GuildMember} member
 * @param {string} reason
 * @returns {Promise<void>}
 */
admin.warn = async (admin, member, reason) => {
    try {
        logs.addAdmin(admin.user.id, "warn",
            {
                reason: reason,
                userID: member.user.id
            });
        await list_warn.create({
            adminID: admin.user.id,
            userID: member.user.id,
            reason: reason,
        });
        await list_warn.findAll({where: {userID: member.user.id}}).then(async result => {
            if (result.length >= cfg.maxUserWarns) {
                await list_warn.destroy({where: {userID: member.user.id}});
                await methods.ban(member, cfg.timeBanForMaxWarns, `Набрал${result.length} предупреждений.`);
            }
        });
        await member.user.send(`Администратор ${admin.user.tag}(${admin.user.id}) выдал вам предупреждение по причине: ${reason}`);
    } catch (err) {
        debug.error(err);
    }
}