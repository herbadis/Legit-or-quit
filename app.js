
/**
 * LEGIT or QUIT
 * Let's you know whether your shit is legit or not.
 */

  var app = require('express')(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      legit = require('./legit'),
      HTTP_PORT = 8000,
      DATABASE_CONNECTION_URI = process.env.DATABASE_CONNECTION_URI;


  /**
   * Connect to the database
   */

  var database = mongoose.connect(DATABASE_CONNECTION_URI, function(err) {
    if(err) console.log('Could not connect to the Legit database');
    else console.log('Connected to the Legit database!')
  });


  /**
   * Define a simple object that represents a user submission
   */

  QuerySchema = new mongoose.Schema({
    query: String,
    isLegit: Boolean
  });
  var Query = database.model('Query', QuerySchema);


  /**
   * Define the default application middleware
   */

   app.use(bodyParser);

  /**
   * Route incoming request to the available resources
   */

  app.get('/', function(req, res) {
    /** Here is where we will respond with the html file*/
    res.send('LEGIT OR QUIT');
  });


  app.post('/submit', function(req, res) {
    var queryString = req.body.queryString;
    Query.find({query: queryString}, function(err, query) {
      if(err) res.send(500, 'ERR: ' + err);
      if (query) {
        res.send(200, query.isLegit);
      } else {
          var newQuery = new Query({string: searchQuery, isLegit: legit.evaluate(searchQuery)});
          newQuery.save(function() {
            res.send(200, isLegit)
          });
      }
    });
  });

  app.listen(HTTP_PORT, function() {
    console.log('LEGIT OR QUIT is listening on port 8000');
  });
