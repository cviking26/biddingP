//server side sockets
var express = require('express');
var router = express.Router();
var dbBid = require('../db/db-Bid'),
	dbArticle = require('../db/db-Article'),
	dbUser = require('../db/db-User');
io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('bid', function (data) {
		var articleId = data.reqData.substring(9);
		var bidderId = data.bidderId;
		dbArticle.getArticleById(articleId, function(err, docs){
			if(err){
				console.log('Error io.js-13');
				return;
			}
			dbBid.setBid({
				bidder: bidderId,
				article: articleId,
				bidValue: docs.bidInterval + docs.currentPrice
			}, function (data) {
				dbBid.getBid(data._id, function (data) {
					dbArticle.updateArticleById({
						id: data.article,
						bidId: data._id,
						increaseVal : data.bidValue
					}, function (err, docs) {
						if (err) {
							console.log(err);
							return;
						}
						io.sockets.emit('updatePrice', {
							articleId : docs.articleId,
							currentPrice : docs.currentPrice
						});
						io.sockets.emit('updateBidList', {
							articleId : data.article,
							bidderId : data.bidder,
							bidVal : data.bidValue,
							timestamp : data.timestamp
						})
					});
					dbUser.updateUserById({
						id: data.bidder,
						bidId: data._id
					}, function(err, docs){
						if(err){
							console.log(err);
							return;
						}
					})
				});
			});
		});
	});
});