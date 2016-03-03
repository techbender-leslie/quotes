var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/quotes_app");
process.on('exit', function() { mongoose.disconnect(); });

module.exports.Quote = require("./quote");