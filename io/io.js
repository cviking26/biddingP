//server side sockets
var express = require('express');
var router = express.Router();
var dbBid = require('../db/db-Bid'),
	dbArticle = require('../db/db-Article'),
	dbUser = require('../db/db-User');
io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('bid', function (data) {
		console.log(data.reqData.substring(9));
		console.log(userident.username);
		dbBid.setBid({
			bidder: '545e6d6c550b65047c5c6a0f',
			article: '545e7000fce642e2803cd422',
			bidValue: 50
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
					})
				});
				dbUser.updateUserByObjId({
					id: data.bidder,
					bidId: data._id
				}, function(err, docs){
					if(err){
						console.log(err);
						return
					}
				})
			});

		});
	});
});