var cheerio = require('cheerio');
exports.wash = function (content) {
    var $ = cheerio.load(content);
    $('script').remove();
    return $.html();
};