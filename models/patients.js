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
