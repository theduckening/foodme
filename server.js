var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var helmet = require("helmet");
var mainroute = require("./mainroute.js");



var app = express();

app.set('views', path.join(__dirname, 'public/views'));
app.set("PORT", process.env.PORT || 9098);


app.use(favicon(path.join(__dirname, 'public', 'stackexchange.ico')));
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine(".hbs", exphbs({defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "public/views/layouts"),
  partialsDir: path.join(__dirname, "public/views/partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs");

app.use("/", mainroute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(app.get("PORT"), function(){
  console.log("App Start Time: %s", new Date().toLocaleTimeString());
  console.log("App on PORT: %s", app.get("PORT"));
});


module.exports = app;
