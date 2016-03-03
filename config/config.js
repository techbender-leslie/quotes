// configuration
var express = require('express'),
    app = express(),
    path = require("path"),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    // views = path.join(process.cwd(), "views/");
    methodOverride = require('method-override');

// database
mongoose.connect('mongodb://localhost/quote_app');
process.on('exit', function() { mongoose.disconnect(); });

// assets
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));  // accept all datatypes
// app.use(bodyParser.json());
app.use(methodOverride('_method'));

// view engine
app.set('views', path.join(__dirname, '../views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.locals.link_to = function (text, link) {
  return "<a href='" + link + "'>" + text + "</a>";
};

module.exports = app;



