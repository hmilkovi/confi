const admin = require('./hcData');
const pgp = require('pg-promise')(/* initialization options */);

const db = pgp({
    database: 'confi',
    port: 5432,
    user: 'confi', // any admin user
    password: 'xpzTwqUuSlcg'
});

var data = {};

data['admin'] = admin;
data['db'] = db;

module.exports = data;