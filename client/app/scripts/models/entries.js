var Entry = Backbone.Model.extend({
    idAttribute: '_id'
});

var Entries = Backbone.Collection.extend({
    model: Entry,
    initialize: function (models, options) {
        this.url = options.url;
    }
});


module.exports = Entries;