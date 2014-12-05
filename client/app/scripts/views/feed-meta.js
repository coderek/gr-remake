var metaTemplate = require('../templates/feed-meta');
var Feed = require('../models/feeds').Feed;

var FeedMetaView = Marionette.ItemView.extend({
    initialize: function () {
        this.model = new Feed;
        this.listenTo(this.model, 'change', this.render);

        this.on('update', function (m) {
            this.model.set(m.toJSON());
        });

        this.on('clear', function () {
            this.model.clear();
        });
    },


    ui: {
        'delete': '[data-action=delete]'
    },

    events: {
        'click @ui.delete' : 'deleteFeed'
    },

    deleteFeed: function () {
        var feedId = this.ui.delete.data('id');
        app.execute('delete-feed', feedId);
    },

    template  : metaTemplate
});

module.exports = new FeedMetaView;