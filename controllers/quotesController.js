var Quote = require('../models/quote');

// INDEX
// GET /quotes
function getAll (req, res) {
  Quote.find({}, function (error, quotes) {
    console.log('found these quotes: ', quotes);
    if (error) {
      res.json({ message: 'Could not find any quote' });
    }
    console.log('about to render these quotes: ', quotes);
    res.render('layout', { quotes: quotes.reverse() });  // reverse() => newest quotes first
  });
}

// NEW
// GET /quotes/new
function newQuote (req, res) {
  res.render('partials/quote-form', { quote: null });
}

// SHOW
// GET /quotes/:id
function getQuote (req, res) {
  Quote.findById(req.params.id, function (error, quote) {
    if (error) { res.json({ message: 'Could not find quote b/c: ' + error }); }
    res.render('partials/quote-show', { quote: quote });
  });
}

// EDIT
// GET /quotes/:id/edit
function editQuote (req, res) {
  Quote.findById(req.params.id, function (error, quote) {
    if (error) { res.json({ messsage: "Couldn't find quote: " + error }); }
    res.render('partials/quote-form', { quote: quote });
  });
}

// CREATE
// POST /quotes
function createQuote (req, res) {
  var quote = new Quote(req.body);
  quote.save(function (error) {
    if (error) { res.json({ messsage: 'Could not ceate quote b/c:' + error }); }
    Quote.find({}, function (error, quotes) {
      if (error) { res.json({ messsage: 'Error finding quotes: ' + error }); }
      res.redirect('/quotes');
    });
  });
}

// UPDATE
// PUT /quotes/:id
function updateQuote (req, res) {
  Quote.findById(req.params.id, function (error, quote) {
    if (error) { res.json({ message: 'Could not find quote b/c:' + error }); }
    if (req.body.body) { quote.body = req.body.body; }
    if (req.body.author) { quote.author = req.body.author; }
    quote.save(function (error) {
      if (error) { res.json({ messsage: 'Could not update quote b/c:' + error }); }
      Quote.find({}, function (error, quotes) {
        if (error) { res.json({ messsage: 'Error finding quotes: ' + error }); }
        res.redirect('/quotes/' + req.params.id);
      });
    });
  });
}

// DELETE /quotes/:id
function removeQuote (req, res) {
  Quote.findByIdAndRemove(req.params.id, function (error, quote) {
    if (error) {
      res.json({ message: 'Could not delete quote b/c:' + error });
    } else {
      console.log('this quote deleted: ', quote);
      res.json({ message: 'Quote successfully deleted' });
    }
  });
}

module.exports = {
  getAll: getAll,
  newQuote: newQuote,
  createQuote: createQuote,
  getQuote: getQuote,
  editQuote: editQuote,
  updateQuote: updateQuote,
  removeQuote: removeQuote
};

