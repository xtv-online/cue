var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('socket-writer', { title: 'Socket' });
});

router.get('/read', function(req, res, next) {
  res.render('socket-reader', { title: 'READ' });
});
module.exports = router;
