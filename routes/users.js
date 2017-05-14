var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, function(err, user){
		if (err) throw err;
        res.json(user);
	});
});
router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
		if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
		if(req.body.admin) {
            user.admin = req.body.admin;
        }
        if(req.body.sreetAddr) {
            user.address.streetAddress = req.body.sreetAddr;
        }
		if(req.body.city) {
            user.address.city = req.body.city;
        }
		if(req.body.postalCode) {
            user.address.postalCode = req.body.postalCode;
        }
		if(req.body.country) {
            user.address.country = req.body.country;
        }
		if(req.body.email) {
            user.email = req.body.email;
        }
		if(req.body.phoneNumber) {
            user.phoneNumber = req.body.phoneNumber;
        }
		if(req.body.seviceProvider) {
            user.seviceProvider = req.body.seviceProvider;
			if(req.body.seviceProvider === true){
				if(req.body.companyname) {
						user.companyName = req.body.companyname;
					}
			   		if(req.body.companyStreetAddr) {
						user.companyAddress.streetAddress = req.body.companyStreetAddr;
					}
					if(req.body.companycity) {
						user.companyAddress.city = req.body.companycity;
					}
					if(req.body.postalCode) {
						user.companyAddress.postalCode = req.body.postalCode;
					}
					if(req.body.country) {
						user.companyAddress.country = req.body.country;
					}
					if(req.body.email) {
						user.email = req.body.email;
					}
					if(req.body.companyPhoneNumber) {
						user.companyPhoneNumber = req.body.companyPhoneNumber;
					}
					if(req.body.hourlyRate){
					   user.hourlyRate = req.body.hourlyRate;
					}
					if(req.body.serviceProvided){
				   		user.serviceProvided = req.body.serviceProvided;
				   }
			   }
        }
        
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
              var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
