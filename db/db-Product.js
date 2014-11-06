//require Mongo Stuff
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//create Article Schema
var Product = new Schema({
	username : String,
	email : String,
	bids : { type: String, ref: 'Bid' }
});

module.exports = {
	init : function(){
		//collection = db.get(setCollection);
	},
	getUser : function(param, callback){
		//this.init();
		Product = mongoose.model('usercollection', User);
		param = param || {};
		//User.find(param, callback);
		Product.find(param, callback);
	}

};