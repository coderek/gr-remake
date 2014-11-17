var router = new Backbone.Router();
var Entries = Backbone.Collection.extend({
    initialize: function (options) {
    }
});
/**
 * id: entries
 * @type Object
 */
var articles_cache = {};


router.route('feeds/:id', function (id) {

    if (!articles_cache[id]) {
        articles_cache[id] = new Entries([]);
        articles_cache[id].url = '/feeds/' + id;
    }
    console.log(articles_cache[id]);
    articles_cache[id].fetch();
});

Backbone.history.start({pushState: true});

