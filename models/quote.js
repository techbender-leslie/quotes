var mongoose = require("mongoose");

var QuoteSchema = new mongoose.Schema({
  body: String,
  author: String
});

var Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;