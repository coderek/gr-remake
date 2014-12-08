module.exports = {
    'showFeed': function (id) {
        console.log('show feed', id)
        app.execute('show-feed', id);
    }
};