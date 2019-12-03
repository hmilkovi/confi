var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();


process.env.NODE_ENV = "development";
process.env.PORT = 3000;
process.env.APP_SECRET = "s1vgUFTix1JyXXbHHNf76HAX";
process.env.DB_CONNECTION = "postgres://confi:confi@127.0.0.1:5432/confi";
process.env.SENDGRID = ""

let server = require("../../app");
let db = require("../../models").db;

db.booking.empty();
chai.use(chaiHttp);


describe("Booking Rest API", function(){
    var jwt = undefined;
    var added_booking_id = 0;

    step('Is it alive?', function() {
        chai.request(server)
        .get("/")
        .send({})
        .end((err,res)=>{
            if (err) {
                console.log(err);
                return;
            }
            res.should.have.status(200);
        });
    });

    step('register for conference', function() {
        var booking =  {
            "email":"hmilkovi@gmail.com",
            "firstname":"Hrvoje",
            "lastname":"Milkovic",
            "phone":"12345678",
            "conference_name": "defcon"
        };
        chai.request(server)
        .post("/api/v1/booking/register")
        .send(booking)
        .end((err,res)=>{
            if (err) {
                console.log(err);
                return;
            }
            res.should.have.status(200);
            res.body.email.should.equal(booking.email);
            added_booking_id = res.body.id;
        });
    });

    step('get jwt', function() {
        var authData =  {
            "email":"hmilkovi@gmail.com",
            "password":"RHjWP2DVOM8UsbTi"
        }
        chai.request(server)
        .post("/api/v1/jwt")
        .send(authData)
        .end((err,res)=>{
            if (err) {
                console.log(err);
                return;
            }
            res.should.have.status(200);
            jwt = res.body.accessToken;
            res.body.should.have.property('accessToken');
        });
    });

    step('should denide list bookings', function() {
        chai.request(server)
        .get("/api/v1/booking/list" )
        .send({})
        .end((err,res)=>{
            if (err) {
                console.log(err);
                return;
            }
            res.should.have.status(401);
        });
    });

    step('list bookings', function() {
        chai.request(server)
        .get("/api/v1/booking/list" )
        .set('Access-Token', jwt)
        .send({})
        .end((err,res)=>{
            if (err) {
                console.log(err);
                return;
            }
            res.should.have.status(200);
            res.body.length.should.equal(1);
            res.body[0].id.should.equal(added_booking_id);
        });
    });

    step('remove booking', function() {
        chai.request(server)
        .delete("/api/v1/booking/remove/" + added_booking_id)
        .set('Access-Token', jwt)
        .send({})
        .end((err,res)=>{
            if (err) {
                console.log(err);
                return;
            }
            res.should.have.status(200);
            res.body.total_deleted.should.equal(1);
        });
    });
});