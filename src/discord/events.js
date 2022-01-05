const methods = require('./methods');
const commands = require('./commands');
const debug = require('../modules/debug');
const Core = require('./Core');
const db = require('../database/db'); 

Core.Bot.on("ready", function () {
    debug.debug(`Бот "${Core.Bot.user.username}" запустился!`);
});

Core.Bot.on('message', async (message) => {
    if (message.content.at(allConfig.discord.cmdPrefix) == 0) {
        commands.aplyCommand(message.author, message.channelId, message.content);
        return;
    }
    methods.checkForBadMessage(message);
});

Core.Bot.on('guildMemberAdd', async (member) => {
    let people = await db.list_ban.find({
        where: {
            userID: parseInt(member.user.id),
        },
    });
    if(people != {}) member.kick(`Вы были забанены с причиной ${people[0].reason}. Разбан: ${people[0].endDate}.`);
});