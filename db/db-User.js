//require Mongo Stuff
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Create User Schema
var User = new Schema({
	bidderId : String,
	firstname : String,
	lastname : String,
	firstname : String,
	firstname : String,


	bids : { type: String, ref: 'Bid' }
});

module.exports = {
	init : function(){
		//collection = db.get(setCollection);
	},
	getUser : function(param, callback){
		//this.init();
		User = mongoose.model('usercollection', User);
		param = param || {};
		//User.find(param, callback);
		User.find(param, callback);
	}

};