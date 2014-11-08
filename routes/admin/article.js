var express = require('express');
var router = express.Router();
var dbArticle = require('../../db/db-Article');

// Article edit
router.get('/admin/articleedit', loggedIn, function(req, res){
	res.render('admin/articleedit');
});


// Add new Article
router.post('/admin/articleadd', loggedIn, function(req, res){
	var data = {
		articleName : req.body.articleName,
		duration : 	req.body.duration,
		startPrice : req.body.startPrice,
		currentPrice : req.body.startPrice,
		bidInterval : req.body.bidInterval,
		imagePath : req.body.imagePath,
		active : true,
		finished : false
	};

	dbArticle.insertArticle(data);

	res.redirect('/');
});

// Get article by Id
router.get('/article/:articleId', loggedIn, function(req, res){
	var articleId = req.params.articleId;
	var article = dbArticle.getArticleById(articleId, function(err, docs){
		res.render('article', {
			articleSet : docs
		});
	});
});

module.exports = router;
