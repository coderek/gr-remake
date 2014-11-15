var ff = require('./feed_fetcher');
//var url = 'http://codingnow.com/atom.xml';
var url = 'http://coolshell.cn/';


ff(url).done(function (obj) {
    console.log(obj.articles.map(function (a) {return a.title;}));
}, function (err) {
    if (/not a feed/i.test(err.message)) {
        console.log('failed');
    } else {
        console.log(err.message);
    }
});