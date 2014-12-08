//require Mongo Stuff
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId;


//create Bidding Schema
var BidSchema = new Schema({
	bidder: String,
	article: String,
	bidValue: Number,
	timestamp: {type : Date, default: Date.now}
});

module.exports = {
	Bid: mongoose.model('bidcollection', BidSchema),
	//setBid with given data
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
	//getBid by Bid_id
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
	// getBidList by ArticleId
	getBidList: function (param, callback) {
		this.Bid.find({
			article: param
		}, null, {sort : {timestamp : 'desc'}}, callback);
	}
};