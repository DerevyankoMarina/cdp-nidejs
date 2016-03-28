var express = require('express');
var router = express.Router();
var User = require('../../models/user').User;

/* GET users */
router.get('/api/users', function(req, res, next) {


    var searchCriterias = {},
        sortQuery = {};

    var sortBy = req.query.sortBy,
        sortDir = req.query.sortDir,
        perPage = req.query.perPage,
        offset = req.query.offset,
        searchValue = req.query.searchValue,
        searchBy = req.query.searchBy;

    sortQuery[sortBy] = sortDir;

    if(searchBy && searchValue) {
        searchCriterias[searchBy] = searchValue;
    }

    User.find(searchCriterias)
      .sort(sortQuery)
      .skip(perPage * (offset - 1))
      .limit(parseInt(perPage))
      .exec(function(err, users) {
        if (err) {
            res.status(500).json(err);
        } else {
            User.count({}, function (err, count) {
                res.json({
                    'collection': users,
                    'total': count
                });
            });
        }
    });
});

/* GET particular user by ID */
router.get('/api/users/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user){

        if(err){
            res.status(500).json(err);
        } else{
            res.json(user);
        }
    })
});

/* create user */
router.post('/api/users', function(req, res, next) {
    User.create(req.body, function (err, user) {
        if(err){
            res.status(500).json(err);
        } else{
            res.json(user);
        }
    })
});

/* update user entry */
router.put('/api/users/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user){
        if (err) return res.status(500).json(err);

        user.set(req.body);

        user.save(req.body, function(err, user){
            if (err) return res.status(500).json(err);

            res.json(user);
        })
    })
});

/* delete user entry */
router.delete('/api/users/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, model){
        if(err){
            res.status(500).json(err);
        } else{
            res.sendStatus(200);
        }
    })
});

/* handle all unsupported methods */
router.all('/', function(req, res, next) {
    res.send('Request method is not supported');
});

module.exports = router;
