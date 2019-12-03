const sql = require('./sql');
const crypto = require("crypto");

class Booking {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    async init() {
        return this.db.none(sql.init);
    }

    async add(data) { 
        data.confirmation_code = crypto.randomBytes(16).toString("hex");
        return this.db.one(
            "INSERT INTO booking VALUES(default, ${firstname}, ${lastname}, ${email}, ${phone}, ${confirmation_code}, ${conference_name}) RETURNING *",
            data
        );
    }

    async remove(id) {
        return this.db.result('DELETE FROM booking WHERE id = $1', +id, r => r.rowCount);
    }

    async list() {
        return this.db.any('SELECT * FROM booking');
    }

    async empty() {
        return this.db.none('DELETE FROM booking');
    }
}

module.exports = Booking;