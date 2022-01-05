require('./database/db')

let a = require('./database/db').log_system;
//require('./discord/index');
//require('./modules/index');
(async () => {
    console.log(JSON.stringify(await a.findAll({
        where: {
            id: 1,
        },
    })));
})();