var express = require('express');
var bodyParser = require('body-parser');

var Clinics = require('../models/clinics');
var clinicsRouter = express.Router();
clinicsRouter.use(bodyParser.json());


clinicsRouter.route('/')
.get(function (req, res, next) {
  Clinics.get(res);
})

.post(function(req, res) {
  Clinics.create(req.body, res);
})

.put(function(req, res) {
  Clinics.update(req.body, res);
})

.delete(function (req, res, next) {
  Clinics.delete(res);
});


clinicsRouter.route('/:clinicId')
.get(function (req, res, next) {
  Clinics.getClinic(req.params.clinicId, res);
})

.delete(function (req, res, next) {
  Clinics.deleteClinic(req.params.clinicId, res);
});


module.exports = clinicsRouter
