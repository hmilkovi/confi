const nodemailer = require('nodemailer');
const express = require('express'),
    router = express.Router(),
    sgTransport = require('nodemailer-sendgrid-transport'),
    models = require('../models');

const auth = require('../middleware/auth')

let listAll = async(req, res, next) => {
    models.db.booking.list()
    .then(function (data) {
        res.status(200)
            .json(data);
        })
        .catch(function (err) {
            res.status(500).json({ 'error':  err.message });
    });
}

let sendEmail  = function(data){
    let options = {
        auth: {
            api_key: process.env.SENDGRID
        }
    }
    let transporter = nodemailer.createTransport(sgTransport(options));
    let mailOptions = {
        to: data.email,
        from: 'info@confio.io',
        subject: 'Confi register code for ' + data.conference_name,
        text: "Where is your confirmation code: " + data.confirmation_code
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        }
        console.log(res);
    });
}

let create = async(req, res, next) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!req.body.hasOwnProperty('email')){
        return res.status(400).json({ 'error': 'email is required' });
    } else if (!emailRegexp.test(req.body.email)) {
        return res.status(400).json({ 'error': 'email is invalid' });
    }
    if(!req.body.hasOwnProperty('firstname')){
        return res.status(400).json({ 'error': 'firstname is required' });
    }
    if(!req.body.hasOwnProperty('lastname')){
        return res.status(400).json({ 'error': 'lastname is required' });
    }
    if(!req.body.hasOwnProperty('phone')){
        return res.status(400).json({ 'error': 'phone is required' });
    }
    if(!req.body.hasOwnProperty('conference_name')){
        return res.status(400).json({ 'error': 'conference_name is required' });
    }

    models.db.booking.add(req.body)
    .then(function (data) {
        sendEmail(data)
        delete data.confirmation_code;
        res.status(200)
            .json(data);
        })
        .catch(function (err) {
            res.status(500).json({ 'error':  err.message });
    });
}

let remove = async(req, res, next) => {
    var bookingId = parseInt(req.params.id);
    models.db.booking.remove(bookingId)
    .then(function (data) {
        res.status(200)
            .json({ total_deleted: data });
        })
        .catch(function (err) {
            res.status(500).json({ 'error':  err.message });
    });
  }

router.post('/register', create);
router.get('/list',  auth.isAuth, listAll);
router.delete('/remove/:id',  auth.isAuth, remove);

module.exports = router;