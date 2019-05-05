/*
 * @CreatedDate: 2018/08/23
 * @Author: Samick.Hsu(boneache@gmail.com)
 */
//
const router = require('express').Router({
	mergeParams: true
});

function exportPage(path, properties) {
	properties = properties || {title: ''};
	router.get(path, (req, res) => {
		res.render('index', properties);
	});
}

exportPage('/');

router.get('/version', function(req, res, next) {
  res.json({
    version: '1.0.0'
  });
});


module.exports = router;
