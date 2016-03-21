const express = require('express');
const bodyParser = require('body-parser');
const db = require("./fake-db");

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render("index", { title: 'The index page!' });
});

app.get('/api/users', function (req, res) {
  db.getCollection(function (err, collection) {
    res.json(collection);
  });
});

app.get('/api/users/:id', (req, res) => {
  db.getById(req.params.id, (err, data) => {
    res.json(data);
  })
});

app.post('/api/users', (req, res) => {
  db.create(req.body, (err, data) => {
    res.json(data);
  })
});

app.put('/api/users/:id', (req, res) => {
  db.update(req.body, (err, data) => {
    res.json(data);
  })
});

app.delete('/api/users/:id', (req, res) => {
  db.remove(req.params.id, () => {
    res.sendStatus(200);
  })
});

app.use(function(req, res) {
  res.sendStatus(404, "Page Not Found");
});

app.use(function (err,req, res){
  res.status(500).sendStatus({error: err})
});

app.listen(3000);
console.log( "Express server listening on port 3000" );