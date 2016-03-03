// Configuration / Dependencies
var app = require('./config/config');

// Routes
var routes = require('./config/routes');
app.use(routes);
app.get('/', function (req, res) {
  res.redirect('/quotes');
});

// Server
app.listen(3000, function () {
  console.log("app is running on port 3000...");
});

