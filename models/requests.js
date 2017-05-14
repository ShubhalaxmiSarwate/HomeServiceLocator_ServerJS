// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var requestSchema = new Schema({
	custUserId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',		
		required: true
	},
	spUserId: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',		
		required: true
	},
	reqType: {
		type: String,
		required: true,
		default: 'B'
	},
	reqTime: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		required: true,
		default: 'P'
	},
	description: {
		type: String,
		required: true,
		default: ''
	},
	referenceRequestId: {
		type: String,
		required: false,
		default: ''
	}
},{
	timestamps: true
});

var bookingrequests = mongoose.model("Bookingrequest", requestSchema);

module.exports = bookingrequests;