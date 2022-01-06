let cfg = require('./config').dbg;
let dateOffset = require('./config').dateOffset;
const debug = exports;

debug.error = (message, isErrErr = false) => {
    try {
        if (!isErrErr) {
            // Запись в БД.
            if (cfg.debugLevel <= 0) return;
            let date = new Date();
            //message = `Caller[${arguments.callee.caller.name ? arguments.callee.caller.name : "NAME IS UNKNOWN"}(${JSON.stringify(arguments.callee.caller.arguments)}) ${message}`;
            date.setHours(date.getHours() + dateOffset);
            console.error(`[SERVER-ERROR] (${dateToString(date)}) debug: ${message}`);
        } else console.error(`${message}`);
    } catch (err) {
        debug.error(err, true);
    }
}

debug.debug = (message, dbgLvl = 2) => {
    try {
        if (cfg.debugLevel < dbgLvl) return;
        let date = new Date();
        date.setHours(date.getHours() + dateOffset);
        //message = `Caller[${arguments.callee.caller.name ? arguments.callee.caller.name : "NAME IS UNKNOWN"}(${JSON.stringify(arguments.callee.caller.arguments)}) ${message}`;
        console.log(`[SERVER-DEBUG] (${dateToString(date)}) debug: ${message}`);
    } catch (err) {
        debug.error(err);
    }
}

function dateToString(date) {
    try {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    } catch (err) {
        debug.error(err);
    }
}