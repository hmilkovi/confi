const njwt = require('njwt'),
    models = require('../models');
  
let decodeToken = function(token) {
    return njwt.verify(token, process.env.APP_SECRET).body;
}

let auth = async(req, res, next) => {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    }
  
    try {
        const decodedToken = decodeToken(token.trim());
        const user = decodedToken;

        if (models.admin.email == user.email) {
            req.user = user;
        }
    } catch (e) {
        return next();
    }
  
    next();
}

let isAuth = async(req, res, next) => {
    if (req.user) {
        return next();
    }
  
    res.status(401);
    res.json({ error: 'You are not admin!' });
}

module.exports = {
    'auth': auth,
    'isAuth': isAuth
};