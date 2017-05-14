var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var bookingRequests = require('../models/requests');

var app = express();

app.use(morgan('dev'));

var reqRouter = express.Router();
reqRouter.use(bodyParser.json());

reqRouter.route('/')

.get(function(req,res,next){
    bookingRequests.find({}, function (err, Bookingrequest) {
        if (err) throw err;
        res.json(Bookingrequest);
    });
})

.post(function(req, res, next){
    bookingRequests.create(req.body, function (err, Bookingrequest) {
        if (err) throw err;
        console.log('booking request created!');
        var id = Bookingrequest._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Bookingrequest with id: ' + id);
    });
})

.delete(function(req, res, next){
       bookingRequests.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

reqRouter.route('/:reqid')
.get(function(req,res,next){
        bookingRequests.findById(req.params.reqid, function (err, Bookingrequest) {
        if (err) throw err;
        res.json(Bookingrequest);
    });
})
.put(function(req, res, next){
    bookingRequests.findByIdAndUpdate(req.params.reqid, {
        $set: req.body
    }, {
        new: true
    }, function (err, Bookingrequest) {
        if (err) throw err;
        res.json(Bookingrequest);
    });
})

.delete(function(req, res, next){
    bookingRequests.findByIdAndRemove(req.params.reqid, function (err, resp) {        
		if (err) throw err;
        res.json(resp);
    });
});


module.exports = reqRouter;
