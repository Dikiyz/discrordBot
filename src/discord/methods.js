const debug = require('../modules/debug');
const cfg = require('../modules/config');

const methods = exports;

methods.dateToString = (date) => {
    try {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    } catch (err) { debug.error("Function[methods.dateToString] error: " + err); }
}

methods.giveRoleToUser = (user, roleId, administrator = "система", reason = "неизвестно") => {
    try {

    } catch (err) { debug.error("Function[methods.giveRoleToUser] error: " + err); }
}
methods.checkForBadMessage = async (message) => {
    try {
        message.content = message.content.toLowerCase().replace(/[ё]/gi, 'е').replace(/[0]/gi, 'о').replace(/[0]/gi, 'о');
        let arrayOfWords = message.content.split(' ');
        for (let word in cfg.discord.badWords) {
            if (arrayOfWords.includes(word[0].toString())) {
                switch (word[1]) {
                    case 0: // TODO: Пред в ЛС.
                        break;
                    case 1: // TODO: Варн.
                        break;
                    case 2: // TODO: Кик с предом в ЛС.
                        break;
                    case 3: // TODO: Мут.
                        break;
                    case 4: // TODO: Бан.
                        break;
                    default:
                        debug.debug("Function[methods.checkForBadMessage]: word[1] != (0, ..., 4)!", 3);
                        break;
                }
            }
        }
    } catch (err) { debug.error("Function[methods.checkForBadMessage] error: " + err); }
}