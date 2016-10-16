var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

var connection = require('./connection');
var clinicsRouter = require('./routes/clinicsRouter');
var patientsRouter = require('./routes/patientsRouter');

app.use('/clinics', clinicsRouter);
app.use('/patients', patientsRouter);

connection.init();

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
