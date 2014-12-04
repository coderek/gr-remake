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

app.commands.setHandler('add-feed', function (feed) {
    var feed = feeds.add(_.omit(feed, 'articles'));
    app.execute('show-entries', feed, feed.articles);
});

region.show(new FeedList({collection: feeds}));



var FeedForm = Backbone.View.extend({

    events: {
        'click [data-action=add-feed]': 'submitFeedUrl'
    },

    submitFeedUrl: function () {
        var url = this.$('input').val();
        this.sendNewFeedRequest(url).then(function (feed) {
            toastr.success('Feed is added.');
            app.execute('add-feed', feed);
        }, function (xhr) {
            var msg = xhr.responseJSON.message;
            toastr.error(JSON.stringify(msg));
        }).then(this.resetIcon.bind(this));

        this.disableForm();
    },

    disableForm: function () {
        this.$('i.fa').addClass('fa-spin fa-refresh');
        this.$('.btn').prop('disabled', true);
        this.$('input').prop('disabled', true);
    },

    resetIcon: function () {
        this.$('i.fa').removeClass('fa-spin fa-refresh');
        this.$('.btn').prop('disabled', false);
        this.$('input').prop('disabled', false);
    },

    sendNewFeedRequest: function (url) {
        var request = $.ajax({
            type: 'POST',
            url: '/feeds',
            data: JSON.stringify({url: url}),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });

        return Promise.resolve(request);
    }
});

new FeedForm({el: '#feed-form'});