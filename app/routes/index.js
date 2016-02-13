var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('socket-reader', { title: 'CUE' });
});

router.get('/write', function(req, res, next) {
  res.render('socket-writer', { title: 'WRITE' });
});
module.exports = router;
