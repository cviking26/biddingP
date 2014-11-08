//server side sockets
var express = require('express');
var router = express.Router();
var dbBid = require('../db/db-Bid'),
	dbArticle = require('../db/db-Article'),
	dbUser = require('../db/db-User');
io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('bid', function (data) {
		console.log(data.article);

		dbBid.setBid({
			bidder: '545d18a63a5551439362405b',
			article: '545df5144218acac98efe99b',
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
					console.log('das neue Article Doc');
					console.log(docs);
				});
				dbUser.updateUserByObjId({
					id: data.bidder,
					bidId: data._id
				}, function(err, docs){
					if(err){
						console.log(err);
						return
					}
					console.log('Das neue User Doc');
					console.log(docs);
				})
			});

		});
	});
});