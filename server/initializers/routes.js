var errors = require('../middlewares/errors');

module.exports = function (app) {

    app.use(require('../middlewares/feeds_loader'));

    app.use('/', require('../routes/auth'), require('../routes/home'));

    app.use(function (req, res, next) {
        if (req.headers['accept'].indexOf('application/json') !== -1) {
            next();
        } else {
            res.render('index');
        }
    });

    app.use('/feeds', require('../routes/feeds'));


    app.use(errors.notFound);

    if (app.get('env') === 'development') {
        app.use(errors.dev);
    } else {
        app.use(errors.production);
    }

}
