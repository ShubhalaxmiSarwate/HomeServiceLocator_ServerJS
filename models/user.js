var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	workRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bookingrequest',
		required: false
	}
	}, {
		timestamps: true
	});

var addressSchema = new Schema({
    streetAddress:  {
        type: String,
        required: true
    },
	city:  {
        type: String,
        required: true
    },
	postalCode:  {
        type: String,
        required: true
    },
	country:  {
        type: String,
        required: true
    }
	}, {
		timestamps: true
	});

var User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
	OauthId: {
        type: String,
        required: false
    },
    OauthToken: {
        type: String,
        required: true
    },
	firstname: {
      type: String,
		required: true,
        default: ''
    },
    lastname: {
      type: String,
		required: true,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
	address: {
		type: addressSchema,
		required: true
	},
	email: {
        type: String,
        required: true,
	default: ''
    },
	phoneNumber : {
        type: Number,
        required: true
    },
	seviceProvider : {
        type: Boolean,
        required: true,
		default: false
    },
	status : {
        type: String,
        required: true,
		default: 'A'
    },
	companyName : {
        type: String,
        required: false
    },
	companyAddress : {
		type: addressSchema,
		required: false
	},
	companyPhoneNumber: {
        type: Number,
        required: false
    },
	companyDesc : {
        type: String,
        required: false,
		default: ''
    },
	hourlyRate: {
   		type: Currency,
        required: false,
		default: '0.0'
    },	
	availibilityStatus : {
        type: String,
        required: false,
		default: 'U'
    },
	serviceProvided : {
        type: String,
        required: false,
		default: ''
    },
	custRating: {
        type: Number,
        required: false,
		default: '0'
    },	
}, {
		timestamps: true
	});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);