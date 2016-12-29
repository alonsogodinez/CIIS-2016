'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();


var mongoose = require('mongoose');

var  url_db = process.env.mongodb || "localhost:27017";


mongoose.connect(url_db, function(err){
  if (err) return console.log(err);
  console.log("Conexion a base datos exitosa");
});

// Loading config
global.$config = require('konfig')({path: 'src/config'}).config;

//Loading Mailchimp
var mcapi = require('mailchimp-api');
global.mc = new mcapi.Mailchimp($config.mailChimp.apiKey);

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger
var logger = require('morgan');
app.use(logger('dev'));

// Cookies / Session
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Layout setup
var exphbs = require('express-handlebars');

// Handlebars setup
var hbsHelpers = require('./lib/helpers/handlebars');
app.engine($config.views.engine, exphbs({
    extname: $config.views.extension,
    defaultLayout: $config.views.layout,
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: hbsHelpers
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', $config.views.engine);
app.use(express.static(path.join(__dirname, 'public')));


// Setup favicon
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));


// Routes
var routes = require('./routes/index');

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen($config.serverPort);



