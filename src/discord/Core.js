const Discord = require('discord.js');
const cfg = require('../modules/config');

const Core = exports;

Core.Bot = new Discord.Client({ intents: cfg.discord.intents });
Core.Bot.login(cfg.discord.token);