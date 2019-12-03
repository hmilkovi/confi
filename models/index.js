const admin = require('./hcData');
const pgp = require('pg-promise')();

var db = pgp(process.env.DB_CONNECTION);

var data = {};

data['admin'] = admin;
data['db'] = db;

module.exports = data;