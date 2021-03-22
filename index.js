// import the express package
const express = require('express');
const app = express();
const port = 3000;

// import the NeDB package
const Datastore = require('nedb');

// manually loading the database
const database = new Datastore({
  filename: 'database.db'
});
database.loadDatabase();

// have the app listen to request(s)
app.listen(port, () => {
  console.log('listening at http://localhost:' + port)
});

// use express middleware to serve static page
// and display anything that is in the public folder
app.use(express.static('public'));

// use express middleware to parse json from request(s)
app.use(express.json());

// POST handler method
app.post('/api', (request, response) => {
  console.log('I got a request!');
  const data = request.body
  console.log(data);

  // insert the data to database
  database.insert(data);

  // echo back the request to the client to tell
  // the message was received
  response.send({
    status: data.inputValue,
    latitude: data.lat,
    longitude: data.lon,
    timestamp: data.timestamp
  });
});