//require Mongo Stuff
var mongoose = require('mongoose'),
	User = require('./db-User'),
	Article = require('./db-Article'),
	Schema = mongoose.Schema;

//create Bidding Schema
var Bid = new Schema({
	bidderId : [{ type: Schema.Types.ObjectId, ref: 'User' }],
	articleId : [{ type: Schema.Types.ObjectId, ref: 'Article' }],
	bidValue : Number,
	timestamp : Date
});

module.exports = {
	setBid : function(param, callback){
		//this.init();
		User = mongoose.model('bidcollection', User);
		param = param || {};
		//User.find(param, callback);
		Bid.find(param, callback);
	}
};