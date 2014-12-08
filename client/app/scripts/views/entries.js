var entryTemplate = require('../templates/entry');
var entriesTemplate = require('../templates/entries');

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
        var that = this;
        if (!this._isContentRendered) {
            this.ui.content.html(this.model.get('description'));
        }
        this.ui.content.toggle();
        this.model.save({isread: true}, {patch: true}).then(function () {
            that.$el.addClass('is-read');
        });
    }
});

var EntriesView = Marionette.CompositeView.extend({
    childView: EntryView,
    template: entriesTemplate,
    childViewContainer: '.articles',

    collectionEvents: {
        'feed-destroyed': 'destroy'
    },

    ui : {
        'loadMore': '.load-more'
    },

    events: {
        'click @ui.loadMore': 'loadMore'
    },

    loadMore: function () {
        this.ui.loadMore.text('Loading more...');
    }
});



module.exports = EntriesView;