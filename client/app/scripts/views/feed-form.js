var FeedForm = Backbone.View.extend({

    events: {
        'click [data-action=add-feed]': 'submitFeedUrl',
        'keyup input': 'checkEnter'
    },

    checkEnter: function (ev) {
        var code = ev.keyCode || ev.which;
        if (code === 13) {
            this.submitFeedUrl();
        }
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

module.exports = new FeedForm({el: '#feed-form'});