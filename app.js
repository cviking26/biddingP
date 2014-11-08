// require modules
var express	= require('express'),
	session = require('express-session'),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment');

var port = process.env.PORT || 1337;

var app = express(),
	server = require('http').Server(app);
global.io = require('socket.io')(server);


var connection = mongoose.connect('mongodb://localhost:/bidding');
mongoose['connection']
	.on('error', console.error.bind(console, 'connection error:'))
	.once('open', function callback () {
		console.log("mongo: connected to database bidding");
	});

autoIncrement.initialize(connection);
var passport = require('./auth');

// configure application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(__dirname + '/public'));

//import Authentification
app.use(session({ secret: 'sinnedutra' }));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser());

require('./io/io.js');


// define routes
app.use(require('./routes/login'));
app.use(require('./routes/index'));
app.use(require('./routes/admin/article'));

// start server
server.listen(port, function(){
	console.log('Mikey is ready on port ' + port);
});


