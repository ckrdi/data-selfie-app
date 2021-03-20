const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('listening at http://localhost:' + port)
});
// serving static page
app.use(express.static('public'));

// json parser
app.use(express.json());

const allData = [];

// POST handler
app.post('/api', (request, response) => {
  const data = request.body
  allData.push(data);
  console.log(allData);
  fs.writeFileSync('data.json', JSON.stringify(allData));
  response.send(allData);
});