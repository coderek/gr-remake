var Router = Marionette.AppRouter.extend({
    appRoutes: {
        'feeds/:id': 'showFeed'
    },
    controller: require('./controller')
});


new Router();