var Feed = require('../libs/models/feed');

module.exports = function (req, res, next) {

    if (req.user) {
        Feed.find_user_feeds(req.user)
            .then(function (feeds) {
                console.log(feeds);
                res.locals = {
                    user: req.user,
                    feeds: feeds
                };

                next();
            });
    } else {
        next();
    }
}