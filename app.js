var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var restful = require('node-restful');
var mongoose = restful.mongoose;


var app = express();


mongoose.connect(require('./common/MongoUrlProvider').connectionString);

initializeExpressApp();

registerRESTRouters();

app.use('/sync', require('./routes/synchronizer'));

addErrorHandlers();

module.exports = app;

function initializeExpressApp() {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    var index = require('./routes/index');
    app.use('/', index);
}

function registerRESTRouters() {
    var details = require('./details/Details');
    var descriptor = require('./descriptors/Descriptor');
    details.register(app, '/details');
    descriptor.register(app, '/descriptors');
}

function addErrorHandlers() {
// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.send('error ' + err);
    });
}
