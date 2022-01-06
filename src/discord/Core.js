const Discord = require('discord.js');
const cfg = require('../modules/config');
const debug = require('../modules/debug');

const Core = exports;

try {
    Core.Bot = new Discord.Client({intents: cfg.discord.intents});
    Core.Bot.login(cfg.discord.token).then();
} catch (err) {
    debug.error(err);
}