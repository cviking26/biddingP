
var socket = io.connect('http://localhost:1337');
socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { 'hello': data.hello });
});

$('#bid').onclick(function(){
	socket.emit('my other event', { 'hello': data.hello });
	console.log('EVENT TRIGGERD BY FRONTEND');
});