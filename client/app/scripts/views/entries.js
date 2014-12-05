var entryTemplate = require('../templates/entry');

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
    childView: EntryView,

    collectionEvents: {
        'feed-destroyed': 'destroy'
    }
});



module.exports = EntriesView;