var express = require('express');
var router = express.Router();
var dbUser = require('../db/db-User'),
	dbArticle = require('../db/db-Article');
var passport = require('../auth.js');

var bidderIdVal = 0;

/* LOGIN */
//Post from Login form - login.ejs
router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

router.get('/login', function(req, res){
	res.render('login');
});


/* INDEX */
router.get('/', loggedIn, function(req, res){
	dbArticle.getAllArticles({}, function(e, docs){
		console.log(docs)
		res.render('index', {
			articles : docs
		});
	});
});


/* ADD NEW USER */
//Post from addUSer form - login.ejs
router.post('/adduser', function(req, res){
	var data = {
		firstname : req.body.firstname,
		lastname : 	req.body.lastname,
		email : req.body.email,
		password : req.body.password,
		active : true
	};
	dbUser.insertUser(data);

	res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;
