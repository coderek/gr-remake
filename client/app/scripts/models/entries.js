var Entries = Backbone.Collection.extend({
    initialize: function (models, options) {
        this.url = options.url;
    }
});


module.exports = Entries;