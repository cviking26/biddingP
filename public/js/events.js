
var socket = io.connect('http://192.168.178.207:1337');
socket.on('news', function (data) {
	//console.log(data);
});

socket.on('updatePrice', function(data){
	console.log('articleId: ', data.articleId);
	console.log('new Price: ', data.currentPrice);
	$('#currentPrice'+data.articleId).html(data.currentPrice);
});
socket.on('updateBidList', function(data){
	$('#bidList' + data.articleId + ' tbody').prepend(
		"<tr>" +
			"<td>" + data.bidderId + "</td>" +
			"<td>" + data.bidVal + "</td>" +
			"<td>" + data.timestamp + "</td>" +
		"</tr>"
	);
});

$(document).ready(function(){
	var bidderId = $('#bidderId').html();
	$('#bid').click(function(){
		socket.emit('bid', {
			'reqData': window.location.pathname,
			'bidderId' : bidderId
		});
	});
});
