var Entries = require('./entries');

var Feed = Backbone.Model.extend({
    idAttribute: '_id',

    parse: function (resp, options) {
        this.setupEntriesCollection(resp[this.idAttribute]);

        if (_.isArray(resp.articles)) {
            this.setEntries(resp.articles);
        }

        delete resp.articles;
        return resp;
    },

    setupEntriesCollection: function (fid) {
        this.entries = new Entries([], {url: '/feeds/' + fid + '/entries'});
        this.entries.on('change:isread add', function () {
            this.trigger('read-entry');
        }, this);
    },

    setEntries: function (articles) {
        this.entries.set(articles);
    },

    initialize: function () {
        this.on('destroy', function () {
            if (this.entries) {
                this.entries.trigger('feed-destroyed');
            }
            this.entries = null;
        });
    },

    getUnreadCount: function () {
        if (this.entries) {
            return this.entries.getUnreadCount();
        } else {
            return 0;
        }
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
