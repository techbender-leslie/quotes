var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/quote_app');
var Quote = require('../models/quote');

var quotes = [
  { body: "Everyone must believe in something. I believe I'll have another drink.", author: "W.C. Fields" },
  { body: "If you're going through hell, keep going", author: "Winston Churchill" },
  { body: "Blecck Acckck ththpppfftt!!!!", author: "Bill The Cat" }
];

Quote.remove({}, function (err, removedQuotes) {
  if (err) { return console.log("ERROR: ", err); }
  console.log('Removed these quotes: ', removedQuotes);
  quotes.forEach(function (quote, index) {
    Quote.create({ body: quote.body, author: quote.author }, function (err, quote) {
      if (err) { return console.log('ERROR: ', err); }
      console.log('Created new quote by: ', quote.author);
      if (index == quotes.length - 1)
        mongoose.connection.close();
    });
  });
});