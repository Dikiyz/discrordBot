const methods = require('./methods');
const commands = require('./commands');
const debug = require('../modules/debug');
const Core = require('./Core');
const db = require('../database/db');
const { Bot } = require("./Core");
const cfg = require('../modules/config').discord;
const { MessageReaction, User, Message, GuildMember, Guild, GuildBasedChannel } = require('discord.js');

Core.Bot.on('ready', function (Client) {
    try {
        if (Client.isReady()) debug.debug(`Бот "${Core.Bot.user.username}" запустился!`);
        else debug.error("Неизвестная ошибка!");
        setTimeout(() => {
            db.reaction_messages.findAll().then(res => {
                if (!res || res.length <= 0) return;
                let reactions = [];
                res.forEach((item) => {
                    reactions.push(item.message);
                });
                Client.guilds.cache.forEach(/** @param {Guild} guild */ (guild, key, map) => {
                    guild.channels.cache.forEach(/** @param {GuildBasedChannel} channel */ (channel, key1, map1) => {
                        //channel.messages;
                    });
                });
                // if(res && res.length > 0) {
                //     reaction.message.guild.members.cache.forEach(member => {
                //         if(member.user.tag == user.tag) methods.takeRoleFromUser(member, parseInt(res[0].role), reason = 'Удалил реакцию');
                //     });
                // }
            });
        }, 5000);
    } catch (err) {
        debug.error(err);
    }
});

Core.Bot.on('messageReactionRemove', /** @param { MessageReaction } reaction @param { User } user */(reaction, user) => {
    try {
        debug.debug(`Реакция убрана`);
        if (user.id == Core.Bot.user.id) return;
        db.reaction_messages.findAll({
            where: { message: reaction.message.id }
        }).then(res => {
            if(res && res.length > 0) {
                reaction.message.guild.members.cache.forEach(member => {
                    if(member.user.tag == user.tag) methods.takeRoleFromUser(member, parseInt(res[0].role), reason = 'Удалил реакцию');
                });
            }
        });
    } catch (err) {
        debug.error(err);
    }
});

Core.Bot.on('messageReactionAdd', /** @param { MessageReaction } reaction @param { User } user */(reaction, user) => {
    try {
        debug.debug(`Реакция добавлена`);
        if (user.id == Core.Bot.user.id) return;
        db.reaction_messages.findAll({
            where: { message: reaction.message.id }
        }).then(res => {
            if(res && res.length > 0) {
                reaction.message.guild.members.cache.forEach(member => {
                    if(member.user.tag == user.tag) methods.giveRoleToUser(member, parseInt(res[0].role), reason = 'Поставил реакцию');
                });
            }
        });
    } catch (err) {
        debug.error(err);
    }
});

Core.Bot.on('messageCreate', /** @param { Message } message **/ async (message) => {
    try {
        if (message.author.id === Bot.user.id) return;
        if (message.content.at(0) === cfg.cmdPrefix) {
            await commands.applyCommand(message);
        } else await methods.checkForMute(message);
    } catch (err) {
        debug.error(err);
    }
});

Core.Bot.on('guildMemberAdd', async (member) => {
    try {
        await db.list_ban.findAll({
            where: {
                userID: member.user.id,
            },
        }).then(async res => {
            debug.debug(JSON.stringify(res));
            if (res.length == 0) return;
            for (let idx in res) {
                if (res[idx].timeEnd > Date.now()) {
                    await member.kick(`Вы были забанены с причиной ${res[idx].reason}.
                        Разбан: ${methods.dateToString(new Date(res[idx].timeEnd))}.`);
                } else await res[idx].destroy();
            }
        });
    } catch (err) {
        debug.error(err);
    }
});