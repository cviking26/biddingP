//server side sockets
var express = require('express');
var router = express.Router();
var dbBid = require('../db/db-Bid');
io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('bid', function (data) {
		console.log(data.article);
		//console.log(window.bidderId);
		dbBid.setBid({
			bidder : '545cb9405dee5a00002e73b9',
			article : '545ca0bf1a3abc0000eddd08',
			bidValue : 50
		}, function(err, docs){
			console.log(docs);
		});
	});
});