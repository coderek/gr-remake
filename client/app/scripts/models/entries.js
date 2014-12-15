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
    },
    /**
     * get the count of unread entries since last read entry
     * @returns {int}
     */
    getUnreadCount: function () {

        var count = 0;
        for (var i = 0; i< this.length; i ++ ) {
            if (this.at(i).get('isread')) break;
            count += 1;
        }
        return count;
    }
});


module.exports = Entries;