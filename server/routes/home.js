var router = require('express').Router();
var _ = require('lodash');

router.get('/', function(req, res) {
    var loggedInMessage = req.flash('success');
    if (!_.isEmpty(loggedInMessage)) {
        var user = req.user;
        user.lastAccess = new Date();
        user.save();
    }
    res.render('index');
});

module.exports = router;
