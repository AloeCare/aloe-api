var express = require('express');
var bodyParser = require('body-parser');

var Patients = require('../models/patients');
var patientsRouter = express.Router();
patientsRouter.use(bodyParser.json());


patientsRouter.route('/')
.get(function (req, res, next) {
  Patients.get(res);
})

.post(function(req, res) {
  Patients.create(req.body, res);
})

patientsRouter.route('/:patientId')
.get(function (req, res, next) {
  Patients.getPatient(req.params.patientId, res);
})


module.exports = patientsRouter
