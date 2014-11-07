//require Mongo Stuff
var mongoose = require('mongoose'),
	Bid = require('./db-Bid'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');


// Create User Schema
var User = new Schema({
	bidderId : Number,
	firstname : String,
	lastname : String,
	email : String,
	password : String,
	active : Boolean,
	bids : [{ type: Schema.Types.ObjectId, ref: 'Bid' }]
});

User.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'bidderId',
	startAt: 100,
	incrementBy: 1
});

User = mongoose.model('usercollection', User);

module.exports = {
	getUser : function(param, callback){
		param = param || {};
		//User.find(param, callback);
		User.find(param, callback);
	},
	insertUser : function(data){
		var user = new User(data);
		user.save( function(error, data){
			if(error){
				//console.log(error);
			}
			else{
				//console.log(data);
			}
		});
	}
};