var REPL = require("repl");
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/quote_app');
var Quote = require('../models/quote');

var repl = REPL.start("quotes_app > ");
repl.context.Quote = Quote;
repl.context.allQuotes = allQuotes;

repl.on("exit", function () {
  console.log("bye!");
  mongoose.connection.close();
  process.exit();
});

function allQuotes () {
  Quote.find({}, function (err, quotes) {
    if (err) { return console.log(err); }
    return console.log(quotes);
  });
}