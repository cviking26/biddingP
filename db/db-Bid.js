//require Mongo Stuff
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId;

/*var UserSchema = User.UserSchema;
 var ArticleSchema = Article.ArticleSchema;*/

//create Bidding Schema
var BidSchema = new Schema({
	bidder: String,
	article: String,
	bidValue: Number,
	timestamp: Date
});

module.exports = {
	Bid: mongoose.model('bidcollection', BidSchema),
	setBid: function (data, callback) {
		var bid = new this.Bid(data);
		bid.save(function (error, data) {
			if (error) {
				console.log(error);
			}
			else {
				callback(data);
			}
		});
	},
	getBid: function (param, callback) {
		this.Bid
			.findOne({ _id: param }, function (err, data) {
				if (err) {
					console.log(error);
					return;
				}
				callback(data);
			});
	},
	getBidList: function (param, callback) {
		this.Bid.find({
			article: param
		}, callback);
	}
};