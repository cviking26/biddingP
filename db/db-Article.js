//require Mongo Stuff
var mongoose = require('mongoose'),
	Bid = require('./db-Bid'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

//create Article Schema
var Article = new Schema({
	articleId : Number,
	articleName : String,
	duration : Number,
	start : Date,
	end : Date,
	startPrice : Number,
	currentPrice : Number,
	bidInterval : Number,
	imagePath : String,
	active : Boolean,
	finished : Boolean,
	bids : [{ type: Schema.Types.ObjectId, ref: 'Bid' }]
});

Article.plugin(autoIncrement.plugin, {
	model: 'Article',
	field: 'articleId',
	startAt: 10000,
	incrementBy: 1
});

Article = mongoose.model('articlecollection', Article);

module.exports = {
	getAllArticles : function(param, callback){
		param = param || {};
		Article.find(param, callback);
	},
	insertArticle : function(data){
		var article = new Article(data);
		article.save( function(error, data){
			if(error){
				//console.log(error);
			}
			else{
				//console.log(data);
			}
		});
	}

};