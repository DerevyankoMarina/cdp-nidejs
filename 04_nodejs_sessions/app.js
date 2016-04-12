'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/pages/index');
const users = require('./routes/services/users');

const app = express();

// view engine setup
app.set('views', path.normalize(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/', users);


app.use(function(req, res, next){
  res.status(404).send({error: 'Not Found!'});
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.render('Error had occurred', {
    message: err.message,
    error: err
  });
});

app.listen(3000);
console.log( "Express server http://localhost:3000/" );
