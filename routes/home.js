var express = require('express');
var router = express.Router();
var Feed = require('../libs/models/feed');

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
