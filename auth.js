var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var dbUser = require('./db/db-User.js');

passport.use(new LocalStrategy({
		usernameField: 'biddingid'
	},
	function(username, password, done){
		//database connect!!!
		dbUser.getUser({
			bidderId : username,
			password : password
		}, function(err, docs){
			console.log(docs);
			if(err){
				return done(null, false);
			}else{
				return done(null, {username : docs.bidderId})
			}
		});
	}
));

passport.serializeUser(function(user, done){
	console.log('serialize');
	done(null, user.username);
});

passport.deserializeUser(function(username, done){
	done(null, {username: username});
});

global.loggedIn = function loggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

module.exports = passport;