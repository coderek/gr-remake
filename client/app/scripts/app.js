var FeedList = require('./views/feeds');
var EntriesView = require('./views/entries');
var Feeds = require('./models/feeds');

var feeds = new Feeds(fds);

var app = new Marionette.Application();

app.addRegions({
    feedsRegion: '#feed-list-region',
    entriesRegion: '#entries-region'
});

app.addInitializer(function () {
    this.feedsRegion.show(new FeedList({collection: feeds}));
});

app.commands.setHandler('show-entries', function (feed, entries) {
    var view = new EntriesView({collection: entries});
    app.entriesRegion.show(view);
});

app.commands.setHandler('add-feed', function (feed) {
    var feed = feeds.add(_.omit(feed, 'articles'));
    app.execute('show-entries', feed, feed.articles);
});

window.app = app;

module.exports = app;