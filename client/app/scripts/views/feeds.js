var feedItemTemplate = require('../templates/feed-item');

var FeedItem = Marionette.ItemView.extend({
    tagName : 'li',
    className: 'feed',
    template: feedItemTemplate,

    ui: {
        'unreadCounter': '.unread-counter'
    },

    modelEvents: {
        'read:entry add:entry': 'updateUnreadCount'
    },

    events: {
        'click': 'loadFeed'
    },

    onShow: function () {
        this.updateUnreadCount();
    },

    updateUnreadCount: function () {
        this.ui.unreadCounter.text(this.model.getUnreadCount());
    },

    setActive: function () {
        this.$el.addClass('active');
        this.$el.siblings().removeClass('active');
    },

    loadFeed: function () {
        this.setActive();
        Backbone.history.navigate('/feeds/' + this.model.id, {trigger: true});
    },

    showEntries: function () {
        this.trigger('show:entries', this.model.entries);
    }
});

var FeedList = Marionette.CollectionView.extend({
    childView: FeedItem,
    className: 'list-unstyled',
    tagName  : 'ul',

    childEvents: {
        'show:entries': 'showEntries'
    },

    showEntries: function (child, entries) {
        child.$el.addClass('active');
        child.$el.siblings('.active').removeClass('active');

        feedCh.command('show:entries', child.model, entries);
    },

    initialize: function () {
        this.listenTo(feedCh, 'feed:shown', function (feed) {
            var itemView = this.children.findByModel(feed);
            itemView.setActive();
        });
    }
});

module.exports = FeedList;


