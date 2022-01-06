require('./database/db');
require('./discord/index');
require('./modules/index');

// a.findOne({ where: { id: 1 }}).then(b => {
//     console.log(JSON.stringify(b));
//     console.log(JSON.stringify(b.timestamp));
//     console.log(new Date(b.timestamp).toISOString());
//     b.timestamp = new Date().toISOString();
//     b.save().then();
// });

// a.findOrCreate({
//     where : { id: 10 },
//     defaults: {  }
// }).then(b => {
//     console.log(JSON.stringify(res, is));
// })
