const { Intents } = require('discord.js');

const allConfig = exports;
// System cfg
//#region Discord
allConfig.discord = {
    // badWords[0] = слово;
    // badWords[1] = вид наказания(0 - предупреждение в ЛС, 1 - варн, 2 - кик с 0, 3 - мут, 4 - бан);
    // badWords[2] = время наказиеия в минутах(Для 0, 1 и 2 можно не указывать или поставить любое число, но для 3 и 4 ОБЯЗАТЕЛЬНО проставить время);
    badWords: [
        ["негр", 4, 120],
    ],
    // Символ, с которого должна начинаться комманда.
    cmdPrefix: "/",
    // Ну тут думаю ясно...
    token: "OTI4MDc2MjY0OTI4MDcxNzYw.YdTgYA.fcJC5FhsR54oKZDOWHhQwPS1tRc",
    // Это намерения бота (нужны для его регистрации).
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
};
//#endregion
//#region Mysql
allConfig.db = {
    // Тут тоже думаю сам разберешься.
    host: "localhost",
    user: "root",
    password: "",
    database: "bot",
};
//#endregion

//#region Any (for developing and debuging)
allConfig.dbg = {
    // Уровень углубления отладки.
    debugLevel: 2, // 0 - нихуя, 1 - только ошибки, 2 - вызов функций, 3 - все дебаги.
};

allConfig.dateOffset = 0; // Смещение часогого пояся (+ или - в часовом еквиваленте, если есть проблемы со временем)
//#endregion

// Discord cfg
// Start cfg