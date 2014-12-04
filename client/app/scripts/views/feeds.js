var feedItemTemplate = require('../templates/feed-item');

var FeedItem = Marionette.ItemView.extend({
    tagName : 'li',
    template: feedItemTemplate,

    ui: {

    },

    events: {
        'click': 'loadFeed'
    },

    loadFeed: function () {
        this.model.loadEntries().then(this.showEntries.bind(this));
    },

    showEntries: function () {
        this.trigger('show-entries', this.model.entries);
    }
});

var FeedList = Marionette.CollectionView.extend({
    childView: FeedItem,
    className: 'list-unstyled',
    tagName  : 'ul',

    childEvents: {
        'show-entries': 'showEntries'
    },

    showEntries: function (child, entries) {
        child.$el.addClass('active');
        child.$el.siblings('.active').removeClass('active');

        app.execute('show-entries', child.model, entries);
    }
});

module.exports = FeedList;


