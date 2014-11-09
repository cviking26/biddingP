var express = require('express');
var router = express.Router();
var dbArticle = require('../../db/db-Article'),
	dbBid = require('../../db/db-Bid');

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
	var bidderId = req.user.username;
	dbArticle.getArticleById(articleId, function(err, articleDocs){
		if(err){
			console.log(err);
			return;
		}
		console.log('articleDocs')
		console.log(articleDocs)
		dbBid.getBidList(articleId, function(err, bidDocs){
			console.log('bidDocs');
			console.log(bidDocs);
			res.render('article', {
				articleSet : articleDocs,
				bidList : bidDocs,
				bidderId : bidderId
			});
		});
	});
});

module.exports = router;
