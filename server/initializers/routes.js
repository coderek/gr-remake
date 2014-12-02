var errors = require('../middlewares/errors');

module.exports = function (app) {

    app.use(require('../middlewares/feeds_loader'));


    app.use('/', require('../routes/auth'), require('../routes/home'));
    app.use('/feeds', require('../routes/feeds'));


    app.use(errors.notFound);

    if (app.get('env') === 'development') {
        app.use(errors.dev);
    } else {
        app.use(errors.production);
    }

}
