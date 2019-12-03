const express = require('express'),
    router = express.Router(),
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