//require Mongo Stuff
var mongoose = require('mongoose'),
	Bid = require('./db-Bid'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

//create Article Schema
var ArticleSchema = new Schema({
	articleId : Number,
	articleName : String,
	duration : String,
	start : Date,
	end : Date,
	startPrice : Number,
	currentPrice : Number,
	bidInterval : Number,
	imagePath : String,
	active : Boolean,
	finished : Boolean,
	bids : {}
});

ArticleSchema.plugin(autoIncrement.plugin, {
	model: 'Article',
	field: 'articleId',
	startAt: 10000,
	incrementBy: 1
});


module.exports = {
	ArticleSchema : new Schema({
		articleId : Number,
		articleName : String,
		duration : String,
		start : Date,
		end : Date,
		startPrice : Number,
		currentPrice : Number,
		bidInterval : Number,
		imagePath : String,
		active : Boolean,
		finished : Boolean,
		bids : {}
	}),
	Article : mongoose.model('articlecollection', ArticleSchema),
	getAllArticles : function(param, callback){
		param = param || {};
		this.Article.find(param, callback);
	},
	insertArticle : function(data){
		var article = new this.Article(data);
		article.save( function(error, data){
			if(error){
				console.log(error);
			}
			else{
				//console.log(data);
			}
		});
	},
	getArticleById : function(param, callback){
		this.Article.findOne({
			articleId : param
		}, callback)
	},
	getArticleByObjId : function(param, callback){
		this.Article.findOne({
			_id : param
		}, callback)
	},
	updateArticleById : function(param, callback){
		console.log('typeof param.id');
		console.log(typeof param.id);
		this.getArticleByObjId(param.id, function(err, data){
			if(err){
				console.log(err);
				return
			}
			var newPrice = data.currentPrice + param.increaseVal;
			console.log('+++++newPrice+++++');
			console.log(newPrice);
			this.Article.findByIdAndUpdate(param.id, {
				$set: { bids: param.bidId, currentPrice: newPrice }
			}, callback)

		}.bind(this));
	}

};