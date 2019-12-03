const express = require('express'),
    router = express.Router(),
    njwt = require('njwt'),
    models = require('../models');

let encodeToken = function(data) {
    return njwt.create(data, process.env.APP_SECRET).compact();
}

let login = async(req, res, next) => {
    const { email, password } = req.body;
    
    if (models.admin.password != password || models.admin.email != email) {
        res.status(401);
        return res.json({ error: 'Invalid email or password' });
    }
    
    const accessToken = encodeToken({ email: models.admin.email });
    return res.json({ accessToken });
}

router.post('/', login);

module.exports = router;