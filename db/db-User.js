// Mongo dependencies
var mongoose = require('mongoose'),
	Bid = require('./db-Bid'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

// Create User Schema
var UserSchema = new Schema({
	bidderId : Number,
	firstname : String,
	lastname : String,
	email : String,
	password : String,
	active : Boolean,
	bids : [{ type: Schema.Types.ObjectId, ref: 'BidSchema' }]
});

// Add auto increment Plugin
UserSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'bidderId',
	startAt: 100,
	incrementBy: 1
});


module.exports = {
	// User Model
	User : mongoose.model('usercollection', UserSchema),

	// get User by Param / no Param = all Users
	getAllUsers : function(param, callback){
		param = parama || {};
		this.User.find(param, callback);
	},
	getUser : function(param, callback){
		//User.find(param, callback);
		this.User.findOne(param, callback);
	},
	// insert new User in unsercollection
	insertUser : function (data, callback){
		var user = new this.User(data);
		user.save(function(error, data){
			if (error){
				console.log(error);
			}else{
				callback(data.bidderId);
			}
		});
	}
};