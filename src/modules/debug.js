const allConfig = require('./config');
const config = require('./config');
const methods = require('../discord/methods');

const debug = exports;

debug.error = (message, isErrErr = false) => {
    try {
        if (!isErrErr) {
            // Запись в БД.
            if (config.dbg.debugLevel <= 0) return;
            let date = new Date();
            date.setHours(date.getHours() + allConfig.dateOffset);
            console.error(`[SERVER-ERROR] (${methods.dateToString(date)}) debug: ${message}`);
        } else console.error(message);
    } catch (err) { debug.error("Function[debug.error] error: " + err, true); }
}

debug.debug = (message, dbgLvl = 2) => {
    try {
        if (config.dbg.debugLevel < dbgLvl) return;
        let date = new Date();
        date.setHours(date.getHours() + allConfig.dateOffset);
        console.log(`[SERVER-DEBUG] (${methods.dateToString(date)}) debug: ${message}`);
    } catch (err) { debug.error("Function[debug.debug] error: " + err); }
}