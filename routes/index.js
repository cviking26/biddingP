var express = require('express');
var router = express.Router();
var dbArticle = require('../db/db-Article');

// Index
router.get('/', loggedIn, function(req, res){
	dbArticle.getAllArticles({}, function(e, docs){
		console.log(docs)
		res.render('index', {
			articles : docs
		});
	});
});

module.exports = router;
