
var socket = io.connect('http://localhost:1337');
socket.on('news', function (data) {
	console.log(data);
});

$(document).ready(function(){
	$('#bid').click(function(){
		socket.emit('bid', {
			'reqData': window.location.pathname
		});
	});
});
