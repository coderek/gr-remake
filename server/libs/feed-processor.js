module.exports = function (feedObj) {
    if (!_.isArray(feedObj.articles)) return feedObj;

    _.each(feedObj.articles, processArticle);
    return feedObj;
};


function processArticle(article) {
    return article;
}