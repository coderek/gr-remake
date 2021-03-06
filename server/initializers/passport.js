var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../libs/models/user');

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    // passport config
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
