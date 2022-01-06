const methods = require('./methods');
const commands = require('./commands');
const debug = require('../modules/debug');
const Core = require('./Core');
const db = require('../database/db');
const {Bot} = require("./Core");
const cfg = require('../modules/config').discord;

Core.Bot.on("ready", function (Client) {
    try {
        if (Client.isReady()) debug.debug(`Бот "${Core.Bot.user.username}" запустился!`);
        else debug.error("Неизвестная ошибка!");
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
            if(res.length == 0) return;
            for(let idx in res) {
                if(res[idx].timeEnd > Date.now()) {
                    await member.kick(`Вы были забанены с причиной ${res[idx].reason}.
                        Разбан: ${methods.dateToString(new Date(res[idx].timeEnd))}.`);
                } else await res[idx].destroy();
            }
        });
    } catch (err) {
        debug.error(err);
    }
});