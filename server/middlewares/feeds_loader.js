var Feed = require('../libs/models/feed');
var _ = require('lodash');

module.exports = function (req, res, next) {

    if (req.user) {
        Feed.findUserFeeds(req.user)
            .then(setLocals.bind(null, req, res, next));
    } else {
        next();
    }
};

function setLocals(req, res, next, feeds) {

    res.locals = {
        user: req.user,
        feeds: feeds
    };

    next();
}