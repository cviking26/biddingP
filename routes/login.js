var express = require('express');
var router = express.Router();
var db = require('../db/db');
var passport = require('../auth.js');

router.get('/', function(req, res){
	res.redirect('/getuser');
});

router.post('/adduser', loggedIn, function(req, res){
	var collection = req.db.get('usercollection');

	collection.insert({
		username : req.body.nameVal,
		email : req.body.emailVal
	});

	res.redirect('/getuser');
});

router.get('/getuser', loggedIn, function(req, res){
	var filterParam;
	console.log(req.user);
	db.getUser(filterParam, function(e, docs){
		res.render('index', {
			userlist : docs,
			moep : req.user
		})
	});
});

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

router.get('/login', function(req, res){
	res.render('login');
});

module.exports = router;
