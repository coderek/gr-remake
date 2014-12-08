var Entries = require('./entries');

var Feed = Backbone.Model.extend({
    idAttribute: '_id',

    setEntries: function (articles) {
        this.entries.set(articles);
    },

    initialize: function () {
        this.entries = new Entries([], {url: '/feeds/' + this.id + '/entries'});

        this.on('destroy', function () {
            if (this.entries) {
                this.entries.trigger('feed-destroyed');
            }
            this.entries = null;
        });
    }
});

var Feeds = Backbone.Collection.extend({
    model: Feed,
    url: '/feeds',
    comparator: function (f1, f2) {
        return moment(f1.get('pubdate')) > moment(f2.get('pubdate')) ? -1 : 1;
    }
});

Feeds.Feed = Feed;

module.exports = Feeds;
