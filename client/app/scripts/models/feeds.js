var Entries = require('./entries');

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


module.exports = Feeds;