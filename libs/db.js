var mongoose = require('mongoose');
var Q = require('q');

var def = Q.defer();

mongoose.connect('mongodb://localhost/gr');

var db = mongoose.connection;
db.on('error', function (err) {
    def.reject(err);
    console.error('connection error:', err);
});
db.once('open', function () {
    def.resolve();
});

module.exports = def.promise;