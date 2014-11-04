var express = require('express');
var router = express.Router();
var db = require('../db/db');

router.get('/', function(req, res){
	res.redirect('getuser');
});

router.post('/adduser', function(req, res){
	var collection = req.db.get('usercollection');

	collection.insert({
		username : req.body.nameVal,
		email : req.body.emailVal
	});

	res.redirect('/getuser');
});

router.get('/getuser', function(req, res){
	var filterParam;
	db.getUser(filterParam, function(e, docs){
		res.render('index', {
			userlist : docs
		})
	});
});

module.exports = router;
