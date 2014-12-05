var Entries = require('./entries');

var Feed = Backbone.Model.extend({
    idAttribute: '_id',
    entries    : null,

    setEntries: function (articles) {
        this.entries = new Entries(articles, {url: '/feeds/' + this.id + '/entries'});
    },

    initialize: function () {
        this.on('destroy', function () {
            if (this.entries) {
                this.entries.trigger('feed-destroyed');
            }
            this.entries = null;
        });
    },

    loadEntries: function () {
        if (this.entries) {
            return Promise.resolve(this.entries);
        }
        this.setEntries([]);
        return Promise.resolve(this.entries.fetch());
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
