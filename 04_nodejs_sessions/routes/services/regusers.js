var express = require('express');
var regrouter = express.Router();
var UsersList = require('../../models/usersList').UsersList;

/* 'GET' - adds user to DB */
regrouter.get('/api/credentials/register', function(req, res, next) {

  var login = req.query.inputLogin,
      pass = req.query.inputPassword,
      role = 'user';

  if(req.query.register) {
    role = 'admin';
  }

  var regUser = new UsersList({ login: login, password: pass, role: role });
  regUser.save(function(err) {
    if(err){
      res.status(500);
      res.json(res.send({err: err}));
    } else {
      res.redirect('/');
    }
  });
});

/*'GET' - sign user in*/
regrouter.get('/api/credentials/login', function(req, res, next) {
  var login = req.query.inputLogin,
      pass = req.query.inputPassword;

  UsersList.findOne({'login': login}, function(err, user) {

    if(!err && !user) {
      res.render('login', {
        title: 'CDP Express application Login page'
      });
    }
    if(user) {
      if (checkPassword(user, pass)) {
        req.session.user = user._id;
        res.redirect('/');
        res.end();
      }
    }
  });
});

/*'GET' - sign user out; destroy session*/
regrouter.get('/api/credentials/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

/*'GET' - show admin page if it is available*/
regrouter.get('/admin', function(req, res, next) {
  UsersList.find({}, function(err, regUsers) {
    res.render('admin', { title: 'ADMIN PAGE!', regUsers: regUsers });
  });
});

module.exports = regrouter;



function checkPassword(user, psw) {
  return user.password === psw;
}