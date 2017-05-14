var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
exports.verifyAdmin = function(req, res, next){
	//check if the request contains decoded value
	if(req.decoded && req.decoded._doc.admin){
		//check
		if(req.decoded._doc.admin === true){
			next();
		}
		else {
			// if the user is not admin
        // return an error
        var err = new Error('You are not an admin to perform this task!');
        err.status = 403;
        return next(err);
			
		}
	}
	else {
			// if the user is not admin
        // return an error
        var err = new Error('You are not an Admin to perform this task!');
        err.status = 403;
        return next(err);
			
		}
};
exports.verifySeviceProvider = function(req, res, next){
	//check if the request contains decoded value
	if(req.decoded && req.decoded._doc.seviceProvider){
		//check
		if(req.decoded._doc.seviceProvider === true){
			next();
		}
		else {
			// if the user is not admin
        // return an error
        var err = new Error('You are not a Service Provider to perform this task!');
        err.status = 403;
        return next(err);
			
		}
	}
	else {
			// if the user is not admin
        // return an error
        var err = new Error('You are not a seviceProvider to perform this task!');
        err.status = 403;
        return next(err);
			
		}
};