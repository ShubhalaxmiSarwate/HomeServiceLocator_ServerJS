var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var users = require('../models/user');

var app = express();

app.use(morgan('dev'));

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')

.get(function(req,res,next){
        users.find({}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.post(function(req, res, next){
        users.create(req.body, function (err, user) {
        if (err) throw err;
        console.log('user created!');
        var id = user._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the user with id: ' + id);
    });
})

.delete(function(req, res, next){
        users.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

userRouter.route('/:id')

.get(function(req,res,next){
       users.findById(req.params.id, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.put(function(req, res, next){
    users.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.delete(function(req, res, next){
        users.findByIdAndRemove(req.params.id, function (err, resp) {        
		if (err) throw err;
        res.json(resp);
    });
});


module.exports = userRouter;
