var Entry = Backbone.Model.extend({
    idAttribute: '_id'
});

var Entries = Backbone.Collection.extend({
    model: Entry,
    initialize: function (models, options) {
        this.url = options.url;
    },

    comparator: function (e1, e2) {
        return e1.get('pubdate') > e2.get('pubdate')? -1 : 1;
    }
});


module.exports = Entries;