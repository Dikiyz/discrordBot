const debug = require('../modules/debug');
const cfg = require('../modules/config');
const {Message, GuildMember, Guild} = require("discord.js");
const logs = require('../modules/logs');
const {list_mute, list_warn, list_ban} = require("../database/db");

const methods = exports;

methods.dateToString = (date) => {
    try {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    } catch (err) {
        debug.error(err);
    }
}

methods.giveRoleToUser = (user, roleId, administrator = "система", reason = "неизвестно") => {
    try {

    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {int} id
 * @param {Guild} guild
 * @returns {Promise<GuildMember>}
 */
methods.getMemberById = async (id, guild) => {
    try {
        (await guild.members.fetch()).forEach((member) => {
            if (parseInt(member.user.id) === parseInt(id)) return member;
        });
        return null;
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} member
 * @param {string} reason
 * @param {int} time
 * @returns {Promise<void>}
 */
methods.ban = async (member, time = 0, reason = 'Неизвестно') => {
    try {
        await logs.addSystem('Ban',
            {
                time: time,
                reason: reason,
                target: member.user.id,
            }
        );

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
            await member.kick(`Вы были забанены системой по причине: "${reason}". Дата разбана: ${unbanDate.toISOString()}`);
        });
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} member
 * @param {string} reason
 * @returns {Promise<void>}
 */
methods.warn = async (member, reason = 'Неизвестно') => {
    try {
        await logs.addSystem('Warn',
            {
                reason: reason,
                target: member.user.id,
            }
        );
        await list_warn.create({
            userID: member.user.id,
            reason: reason,
        });
        await list_warn.findAll({where: {userID: member.user.id}}).then(async result => {
            if (result.length >= cfg.discord.maxUserWarns) {
                await list_warn.destroy({where: {userID: member.user.id}});
                await methods.ban(member, cfg.discord.timeBanForMaxWarns, `Набрал${result.length} предупреждений.`);
            }
        });
        await member.user.send(`Система выдала вам предупреждение по причине: ${reason}`);
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} member
 * @param {int} time
 * @param {string} reason
 * @returns {Promise<void>}
 */
methods.mute = async (member, time = 0, reason = 'Неизвестно') => {
    try {
        await logs.addSystem('Mute',
            {
                reason: reason,
                target: member.user.id,
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
            await member.user.send(`Вы были замучены системой на ${time} минут по причине: ${reason}`);
        });
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {GuildMember} member
 * @param {string} reason
 * @returns {Promise<void>}
 */
methods.kick = async (member, reason = 'Неизвестно') => {
    try {
        await logs.addSystem('Kick',
            {
                reason: reason,
                target: member.user.id,
            }
        );
        await member.user.send(`Вы были выгнаны системой по причине: ${reason}`);
        await member.kick(reason);
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
methods.checkForMute = async (message) => {
    try {
        await list_mute.findAll({where: {userID: message.member.user.id}}).then(async res => {
            if (!res) return false;
            for (let idx in res) {
                if (new Date(res[idx].timeEnd) > Date.now()) {
                    await message.reply('Ты в муте, чел...').then(async msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 3000);
                    }).then(async () => {
                        //await methods.warn(member, "Сообщение в муте.");
                        await message.delete();
                    });
                    return true;
                } else res[idx].destroy();
            }
            return false;
        }).then(async isMute => {
            if (isMute) return
            await methods.checkForBadMessage(message);
        });
    } catch (err) {
        debug.error(err);
    }
}

/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
methods.checkForBadMessage = async (message) => {
    try {
        message.content = message.content.toLowerCase().replace(/[ё]/gi, 'е').replace(/[0]/gi, 'о');
        let arrayOfWords = message.content.split(' ');
        for (let word in cfg.discord.badWords) {
            if (arrayOfWords.includes(cfg.discord.badWords[word][0].toString())) {
                switch (cfg.discord.badWords[word][1]) {
                    case 0: // Пред в ЛС.
                        message.author.send(`Вы написали запрещенное слово, больше так не делайте ;)`).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 60 * 1000);
                        });
                        break;
                    case 1: // Варн.
                        await methods.warn(message.member, 'Запрещенное слово.');
                        break;
                    case 2: // Кик.
                        await methods.kick(message.member, 'Запрещенное слово.');
                        break;
                    case 3: // Мут.
                        await methods.mute(message.member, cfg.discord.badWords[word][2], 'Запрещенное слово.');
                        break;
                    case 4: // Бан.
                        await methods.ban(message.member, cfg.discord.badWords[word][2], 'Запрещенное слово.');
                        break;
                }
                await message.reply('Опааа... Запрещеночка, удаляю...').then(msg => {
                    message.delete();
                    msg.edit('Опааа... Запрещеночка, удалил =)');
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
                return;
            }
        }
    } catch (err) {
        debug.error(err);
    }
}