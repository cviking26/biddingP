var express = require('express');
var router = express.Router();
var dbUser = require('../db/db-User');
var passport = require('../auth.js');

// Login
router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

router.get('/login', function(req, res){
	res.render('login');
});



// Add new User
router.post('/adduser', function(req, res){
	var data = {
		firstname : req.body.firstname,
		lastname : 	req.body.lastname,
		email : req.body.email,
		password : req.body.password,
		active : true
	};
	dbUser.insertUser(data, function(resData){
		res.render('login', {
			bidderId : resData
		});

	});

});

// Logout
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;
