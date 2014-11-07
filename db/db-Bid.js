//require Mongo Stuff
var mongoose = require('mongoose'),
	User = require('./db-User'),
	Article = require('./db-Article'),
	Schema = mongoose.Schema;

//create Bidding Schema
var Bid = new Schema({
	bidder : { type: Schema.Types.ObjectId, ref: 'User' },
	article : { type: Schema.ObjectId, ref: 'Article' },
	bidValue : Number,
	timestamp : Date
});

Bid = mongoose.model('bidcollection', Bid);
module.exports = {
	setBid : function(data, callback){
		console.log('++++');
		console.log(data);
		console.log('++++');

		var bid = new Bid(data);
		bid.save( function(error, data){
			if(error){
				console.log(error);
			}
			else{
				//console.log(data);
			}
		});
		Bid
			.findOne({ _id: '545ccfb452943c6a359e026f' })
			.populate('bidder article')
			.exec(function (err, data) {
				console.log('error: ', err);
				console.log('data: ', data);
				// prints "The creator is Aaron"
			});

	}
};