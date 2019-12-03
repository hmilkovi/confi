var assert = require("assert");
let chai = require("chai");
let should = chai.should();


process.env.NODE_ENV = "development";
process.env.PORT = 3000;
process.env.APP_SECRET = "s1vgUFTix1JyXXbHHNf76HAX";
process.env.DB_CONNECTION = "postgres://confi:confi@127.0.0.1:5432/confi";

let db = require("../../models").db;

describe("Booking models", function(){

    beforeEach('truncating db', () => {
        return db.none('TRUNCATE booking RESTART IDENTITY')
    });

    step('clear database', function() {
        db.booking.empty()
        .then(function () {
            db.booking.list()
            .then(function (results) {
                results.length.should.equal(0);
            });
        });
    });

    step('crud operations', function() {
        var booking =  {
            "email":"hmilkovi@gmail.com",
            "firstname":"Hrvoje",
            "lastname":"Milkovic",
            "phone":"12345678",
            "conference_name": "defcon"
        };
        db.booking.add(booking)
        .then(function (result) {
            result.email.should.equal(booking.email);
            db.booking.list()
            .then(function (results) {
                results.length.should.equal(1);
                results[0].email.should.equal(booking.email);
                db.booking.remove(result.id)
                .then(function (isDeleted) {
                    isDeleted.should.equal(1);
                });
            });
        });
    });
});