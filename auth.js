var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
		usernameField: 'biddingid'
	},
	function(username, password, done){
		//database connect!!!
		if( username === 'admin' && password === 'dennis'){
			return done(null, {username: 'admin'});
		}
		return done(null, false);
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