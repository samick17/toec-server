const express = require('express');
const router = express.Router();
const DB = require('@DB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', async function(req, res) {
  //test here
  let seq = DB.getSeq();
  let categories = await seq.models.Category.findAll();
  res.json({
  	data: categories
  });
});

router.get('/version', function(req, res, next) {
  res.json({
    version: '1.0.0'
  });
});

module.exports = router;
