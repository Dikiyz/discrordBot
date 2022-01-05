const cfg = require('../modules/config');

const commands = exports;

// commandList[0] = Command; commandList[1] = action(function who work on this command);
const commandList = [
    ["repeat", (user, chanel, message) => {

    }],
];

// Обработчик события команды.
commands.aplyCommand = async (user, chanel, message) => {
    let cmd = message.slice(0, message.indexOf(" ")); // TODO: Сделать нормальный экстрактор команды.
    for (let systemCmd in commandList) {
        let realCmd = cfg.discord.cmdPrefix + systemCmd[0];
        if (cmd == realCmd) {
            systemCmd[1](user, chanel, message);
            return;
        }
    }
}