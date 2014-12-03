var Entries = Backbone.Collection.extend({
    initialize: function (models, options) {
        this.url = options.url;
    }
});

var Feed = Backbone.Model.extend({
    idAttribute: '_id',
    entries    : null,

    loadEntries: function () {
        if (this.entries) {
            return Promise.resolve(this.entries);
        }
        this.entries = new Entries([], {url: '/feeds/' + this.id + '/entries'});
        return Promise.resolve(this.entries.fetch());
    }

});

var Feeds = Backbone.Collection.extend({
    model: Feed
});


var app = new Marionette.Application();

var feedItemTemplate = require('./templates/feed-item');
var entryTemplate = require('./templates/entry');
var feeds = new Feeds(fds);

var region = new Marionette.Region({el: '#feed-list-region'});

var FeedItem = Marionette.ItemView.extend({
    tagName : 'li',
    template: feedItemTemplate,

    ui: {

    },

    events: {
        'click': 'loadFeed'
    },

//    initialize: function () {
//        _.bindAll(this);
//    },

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


var entriesRegion = new Marionette.Region({el: '#entries-region'});

var EntryView = Marionette.ItemView.extend({
    template: entryTemplate,
    className: 'article',

    ui: {
        content: '.content',
        title: '.title'
    },

    events: {
        'click @ui.title': 'toggleContent'
    },

    toggleContent: function () {
        if (!this._isContentRendered) {
            this.ui.content.html(this.model.get('description'));
        }
        this.ui.content.toggle();
    }
});
var EntriesView = Marionette.CollectionView.extend({
    childView: EntryView
});

app.commands.setHandler('show-entries', function (feed, entries) {
    var view = new EntriesView({collection: entries});
    entriesRegion.show(view);
});

region.show(new FeedList({collection: feeds}));