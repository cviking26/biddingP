//require Mongo Stuff
var mongoose = require('mongoose'),
	UserExport = require('./db-User.js'),
	ArticleExport = require('./db-Article.js'),
	Schema = mongoose.Schema;
//var ObjectId = require('mongoose').Types.ObjectId;

var User = UserExport.User;
var Article = ArticleExport.Article;

/*var UserSchema = User.UserSchema;
var ArticleSchema = Article.ArticleSchema;*/

//create Bidding Schema
var BidSchema = new Schema({
	bidder : { type: Schema.Types.ObjectId, ref: 'User' },
	article : { type: Schema.Types.ObjectId, ref: 'Article' },
	bidValue : Number,
	timestamp : Date
});

module.exports = {
	Bid : mongoose.model('bidcollection', BidSchema),
	setBid : function(data, callback){
		var bid = new this.Bid(data);
		bid.save( function(error, data){
			if(error){
				console.log(error);
			}
			else{
				callback(data);
			}
		});
	},
	getBid : function(param, callback){
		this.Bid
			.findOne({ _id: param })
			.populate('bidder article')
			.exec(function (err, data) {
				console.log('EXEC');
				console.log('error: ', err);
				console.log('data: ', data);
				if (!err) {
					callback(data);
				}
			});
	}
};