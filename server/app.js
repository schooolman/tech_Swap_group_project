var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local');
var session = require('express-session');
var mongoose = require('mongoose');
var User = require('../models/user');
var path = require('path');

var users = require('./routes/users');

var api = require('./routes/api');
var index = require('./routes/index');
var register = require('./routes/register');

var app = express();

//Mongo Setup
var mongoURI = 'mongodb://localhost:27017/tasklist_users';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log('MongoDB connection error', err);
});

MongoDB.once('open', function(){
    console.log('Now connected to MongoDB');
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);
app.use('/', index);
app.use('/users', users);
app.use('/register', register);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie:{maxAge: 60000, secure: false}
}));

passport.use('local', new localStrategy({
        passReqToCallback : true,
        usernameField : 'username'
    },
    function(req, username, password, done){
        User.findOne({username: username}, function(err, user){
            if (err) throw err;
            if (!user)
                return done(null, false, {message: 'Incorrect username and password.'});

            //test matching password
            user.comparePassword(password, function(err, isMatch){
                if (err) throw err;
                if(isMatch)
                    return done(null, user);
                else
                    done(null, false, {message: 'Incorrect username and password'});
            });
        });
    }));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null, user);
    })
});

