//server side sockets
var express = require('express');
var router = express.Router();
var dbBid = require('../db/db-Bid');
io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('bid', function (data) {
		console.log(data.article);

		dbBid.setBid({
			bidder : '545d18a63a5551439362405b',
			article : '545df5144218acac98efe99b',
			bidValue : 50
		}, function(data){
				console.log('INSERT ERFOLGREICH')
				console.log(data._id)
				console.log('----------')

				dbBid.getBid(data._id, function(data){
					console.log('Get Bid Erfolgreich');
					console.log(data);
				});
		});
	});
});