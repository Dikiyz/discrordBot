const cfg = require('../modules/config').discord;
const Discord = require('discord.js');
const debug = require('../modules/debug');
const { Bot } = require("./Core");
const admin = require("./admin");
const { User, GuildMember, Message, GuildEmoji } = require("discord.js");
const { list_warn, reaction_messages } = require("../database/db");
const methods = require('./methods');

const commands = exports;

// commandList[0] = Command; commandList[1] = action(function who work on this command);
const commandList = [
    ["reactionmessage",
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("reactionmessage", message.member)) return;
                let msgArr = message.content.split(' ');
                let msgForRepeat = message.content.substring(msgArr[0].length + 1 + msgArr[1].length + 1 + msgArr[2].length + 1);
                let msg = await message.channel.send(msgForRepeat, message.components);
                msg.react(msgArr[1]);
                reaction_messages.create({
                    message: msg.id,
                    reaction: msgArr[1],
                    role: parseInt(msgArr[2]),
                });
            } catch (err) {
                debug.error(err);
            }
        }],
    ["пред",
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("пред", message.member)) return;
                let msg = message.content.substring(message.content.split(' ')[0].length + 1);
                let userTag = msg.split(' ')[0];
                let reason = msg.substring(userTag.length + 1);
                let user = null;
                await message.channel.guild.members.fetch().forEach(/** @param {GuildMember} member */(member) => {
                    if (member.user.tag == userTag) user = member;
                });
                if (!user) return await message.reply(`Пользователя с тегом ${userTag} найдено не было.`);
                else await admin.warn(message.member, user, reason);
                return;
            } catch (err) {
                debug.error(err);
            }
        }
    ],
    [["преды", "warns"],
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("преды", message.member)) return;
                let warns = 'Ваши: \n```';
                list_warn.findAll({where: {userID: message.author.id}}).then(async result => {
                    if (result.length >= cfg.maxUserWarns) return methods.ban(message.author, cfg.timeBanForMaxWarns, `Набрал ${result.length} предупреждений.`);
                    if (result.length == 0) {
                        result += '\nНет.';
                    } else {
                        warns += `\nВсего: ${result.length} предупреждений.`;
                        for (let idx in result) {
                            let admin = await methods.getMemberById(parseInt(result[idx].adminID), message.guild);
                            warns += `\n${parseInt(idx + 1)}) Выдан: ${admin ? admin.user.tag : 'Неизвестно'}, ${methods.dateToString(new Date(result[idx].timestamp))}`;
                        }
                    }
                    let ownWarns = await list_warn.findAll({where: {adminID: message.author.id}});
                    if (ownWarns.length !== 0) {
                        warns += '\nВыданные: ';
                        warns += `\nВсего: ${result.length} предупреждений.`;
                        for (let idx in ownWarns) {
                            let user = await methods.getMemberById(ownWarns[idx].adminID, message.guild);
                            warns += `\n${parseInt(idx + 1)}) Выдан: ${user ? user.user.tag : 'Неизвестно'}, ${methods.dateToString(new Date(ownWarns[idx].timestamp))}`;
                        }
                    }
                    warns += '\n```';
                    await message.reply(warns);
                });
                return;
            } catch (err) {
                debug.error(err);
            }
        }],
    ["mute",
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("mute", message.member)) return;
                let msg = message.content.substring(message.content.split(' ')[0].length + 1);
                let userTag = msg.split(' ')[0];
                let time = parseInt(msg.split(' ')[1]);
                let reason = msg.substring(userTag.length + 1 + time.toString().length + 1);
                let user = null;
                await message.channel.guild.members.fetch().forEach(/** @param {GuildMember} member */(member) => {
                    if (member.user.tag == userTag) user = member;
                });
                if (!user) return await message.reply(`Пользователя с тегом ${userTag} найдено не было.`);
                else await admin.mute(message.member, user, time, reason);
                return;
            } catch (err) {
                debug.error(err);
            }
        }
    ],
    ["repeat",
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("repeat", message.member)) return;
                message.channel.send(message);
                await message.author.send(message);
                return;
            } catch (err) {
                debug.error(err);
            }
        }
    ],
    ["ban",
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("ban", message.member)) return;
                let msg = message.content.substring(message.content.split(' ')[0].length + 1);
                let userTag = msg.split(' ')[0];
                let time = parseInt(msg.split(' ')[1]);
                let reason = msg.substring(userTag.length + 1 + time.toString().length + 1);
                let user = null;
                await message.channel.guild.members.fetch().forEach(/** @param {GuildMember} member */(member) => {
                    if (member.user.tag == userTag) user = member;
                });
                if (!user) return await message.reply(`Пользователя с тегом ${userTag} найдено не было.`);
                else await admin.ban(message.member, user, time, reason);
                return;
            } catch (err) {
                debug.error(err);
            }
        }
    ],
    ["kick",
        /**
         * @param {Message} message
         **/
        async (message) => {
            try {
                if (!methods.checkCommandAccess("kick", message.member)) return;
                let msg = message.content.substring(message.content.split(' ')[0].length + 1);
                let user = null;
                (await message.channel.guild.members.fetch()).forEach(/** @param {GuildMember} member */(member) => {
                    if (member.user.tag == msg.split(' ')[0]) user = member;
                });
                let reason = msg.substring(msg.split(' ')[0].length + 1)
                if (!user) message.channel.send(`Пользователя с тегом ${msg.split(' ')[0]} найдено не было.`);
                else {
                    await admin.kick(message.member, user, reason);
                }
                return;
            } catch (err) {
                debug.error(err);
            }
        }
    ],
];

// Обработчик события команды.
/**
 * @param {Message} message
 * */
commands.applyCommand = async (message) => {
    try {
        let cmd = message.content.toLowerCase().split(' ')[0]; // ? TODO: Сделать нормальный экстрактор команды.
        for (let systemCmd in commandList) {
            if (typeof commandList[systemCmd][0] === 'object') {
                commandList[systemCmd][0].forEach(cmd2 => {
                    if (cfg.cmdPrefix + cmd2 === cmd) commandList[systemCmd][1](message).then();
                });
            } else {
                if (cmd === cfg.cmdPrefix + commandList[systemCmd][0]) {
                    commandList[systemCmd][1](message).then();
                    return;
                }
            }
        }
    } catch (err) {
        debug.error(err);
    }
}