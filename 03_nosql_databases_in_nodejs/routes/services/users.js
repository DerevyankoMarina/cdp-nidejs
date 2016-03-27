var express = require('express');
var router = express.Router();

var User = require('../../models/user');

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
    var searchCriterias = {};

    if(req.query.searchBy && req.query.searchValue){
        searchCriterias[req.query.searchBy] = {
            '$regex': req.query.searchValue,
            '$options': 'i'
        };
    }

    var query = User.find(searchCriterias)
        .sort((req.query.sortDir === 'asc' ? '' : '-') + req.query.sortBy);

    query.count(function(err, count){
        query.skip(req.query.perPage * (req.query.offset - 1))
        .limit(req.query.perPage)
        .exec('find', function(err, matchedUsers){
            if(err){
                res.status(500).json(err);
            } else{
                res.json({
                    collection: matchedUsers,
                    total: count
                });
            }
        })
    })
});
*/

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
    console.log(req.body);
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
