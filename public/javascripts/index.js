var router = new Backbone.Router();
var Feed = Backbone.Model;
var selected_feed_id;
var articles_cache = {};

router.route('feeds/:id', function (id) {

    selected_feed_id = id;

    if (!articles_cache[id]) {
        articles_cache[id] = new Feed;
        articles_cache[id].url = '/feeds/' + id;
    }

    articles_cache[id].fetch({
        success: render_new_feed
    });

});

Backbone.history.start({pushState: true});

$('.articles').on('click', '.article .title a', function (ev) {
    var article_id = $(ev.target).data('id');
    var article = _.find(articles_cache[selected_feed_id].get('articles'), {_id: article_id});
    $(ev.target).parent().next('.content').html(article.description).collapse('toggle');
});

function render_new_feed(m) {

    $('.feed-title').text(m.get('title'));
    console.log(m.toJSON());
    var articles_html = _.map(m.get('articles'), function (article) {
        return '<li class="article"><h4 class="title"><a href="#" data-id="' + article._id + '">' + article.title + '</a></h4><div class="content collapse"></div>';
    });

    $('.articles').html(articles_html);
}