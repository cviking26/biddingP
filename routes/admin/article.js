var express = require('express');
var router = express.Router();
var dbArticle = require('../../db/db-Article');

/* Articleedit PAge */
router.get('/admin/articleedit', loggedIn, function(req, res){
	res.render('admin/articleedit');
});

/* ADD NEW PRODUCT */
//Post from /admin/articleadd form - /admin/articleedit.ejs
router.post('/admin/articleadd', loggedIn, function(req, res){
	var data = {
		articleName : req.body.articleName,
		duration : 	req.body.duration,
		startPrice : req.body.startPrice,
		bidInterval : req.body.bidInterval,
		imagePath : req.body.imagePath,
		active : true,
		finished : false
	};

	dbArticle.insertArticle(data);

	res.redirect('/');
});

// Route abfangen, die mit get parametern bestimmt ist (ADS)

module.exports = router;
