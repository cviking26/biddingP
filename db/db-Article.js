//require Mongo Stuff
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

//create Article Schema
var ArticleSchema = new Schema({
	articleId : Number,
	articleName : String,
	duration : String,
	end : Date,
	startPrice : Number,
	currentPrice : Number,
	bidInterval : Number,
	imagePath : String,
	active : Boolean,
	finished : Boolean,
	bids : []
});

ArticleSchema.plugin(autoIncrement.plugin, {
	model: 'Article',
	field: 'articleId',
	startAt: 10000,
	incrementBy: 1
});


module.exports = {
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
		this.getArticleById(param.id, function(err, data){
			if(err){
				console.log(err);
				return;
			}
			this.Article.findByIdAndUpdate(data._id, {
				$push :{
					bids : param.bidId
				},
				$set: { currentPrice: param.increaseVal }
			}, callback)

		}.bind(this));
	},
	checkLiving : function(param, callback){
		var tableDate = new Date(2014,11,15,18,02,00);
		var now = new Date();

		if(now <= tableDate){
			console.log('ist noch activ');
		}else{
			console.log('abgelaufen');
		}

		this.Article.find({}, function(){

		})
	}

};