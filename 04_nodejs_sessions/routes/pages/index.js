var express = require('express');
var router = express.Router();

var title = 'CDP Express application';

/* GET main page */
router.get('/', function(req, res, next) {
  if(req.user) {
    res.render('index', { title: title });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  if(req.user) {
    res.redirect('/');
  } else {
    res.render('login', { title: title + ' Login Page'});
  }
});

module.exports = router;
