const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/version', function(req, res, next) {
  res.json({
    version: '1.0.1'
  });
});

module.exports = router;
