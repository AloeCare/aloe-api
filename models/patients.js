var connection = require('../connection');

function Patients() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM patients', function(err, results) {
        con.release();
        res.send(results);
      });
    });
  };

  this.create = function(patient, res) {
    connection.acquire(function(err, con) {
      con.query('INSERT INTO patients SET ?', patient, function(err, results) {
        con.release();
        if (err) {
          res.send({message: 'Patient creation failed', err: err});
        } else {
          patient.id = results.insertId;
          res.send({message: 'Patient created successfully', patient: patient});
        }
      });
    });
  };

  this.getPatient = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM patients WHERE id = ?', [id], function(err, results) {
        con.release();
        if (results.length)
          res.send(results[0]);
      });
    });
  };
}

module.exports = new Patients();
