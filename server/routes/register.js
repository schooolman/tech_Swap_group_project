var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../../models/user');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/register.html'));
});


router.get('/registerLanding', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/registerLanding.html'));
});

router.post('/', function(req, res, next){
    console.log('Request body', req.body);
    User.create(req.body, function(err, post){
        if(err){
            next(err);
        } else {
            res.redirect('/register/registerLanding');
        }
    })
});

module.exports = router;