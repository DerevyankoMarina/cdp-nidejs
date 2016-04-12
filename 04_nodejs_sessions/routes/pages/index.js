var express = require('express');
var router = express.Router();

var passAuth = false;
var title = 'CDP Express application Login page'
/* GET home page. */
router.get('/', function(req, res, next) {
  if (passAuth) {
    res.render('index', { title: title });
  } else {
    res.render('login', { title: title });
  }
});

module.exports = router;
