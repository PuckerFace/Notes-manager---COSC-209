const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let FormData = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'public', 'contact.html'));
});

app.post('/submit', (req, res) => {
  const dataJson = req.body;

  FormData.push(dataJson);

  var jsonData = fs.readFileSync('data.json', 'utf-8');
  var myJson = JSON.parse(jsonData);

  myJson.push(dataJson);

  var newData = JSON.stringify(myJson, null, 2);

  fs.writeFile('data.json', newData, (err) => {
    if (err) throw err;
    console.log('Data saved to data.json');
  });

  res.redirect('/services');
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname + '/public', 'services.html'));
});

app.get('/data', (req, res) => {
  res.json(FormData);
});

app.get('/json', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(8000, (res, req) => {
  console.log('Server up');
});
