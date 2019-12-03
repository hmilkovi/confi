const admin = require('./hcData');
const Booking = require('./bookings')


const initOptions = {
    extend(obj, dc) {
        obj.booking = new Booking(obj, pgp);
    }
};

const pgp = require('pg-promise')(initOptions);

var db = pgp(process.env.DB_CONNECTION);

var data = {};

data['admin'] = admin;
data['db'] = db;

db.booking.init();

module.exports = data;