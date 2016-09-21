var connection = require('../connection');

function Clinics() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM clinics', function(err, results) {
        con.release();
        res.send(results);
      });
    });
  };

  this.getClinic = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM clinics WHERE id = ?', [id], function(err, results) {
        con.release();
        res.send(results[0]);
      });
    });
  };

  this.create = function(clinic, res) {
    connection.acquire(function(err, con) {
      con.query('INSERT INTO clinics SET ?', clinic, function(err, results) {
        con.release();
        if (err) {
          res.send({message: 'Clinic creation failed', err: err});
        } else {
          clinic.id = results.insertId;
          res.send({message: 'Clinic created successfully', clinic: clinic});
        }
      });
    });
  };

  this.update = function(clinic, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE clinics SET ? WHERE id = ?', [clinic, clinic.id], function(err, results) {
        con.release();
        if (err) {
          res.send({message: 'Clinic update failed', err: err});
        } else {
          res.send({message: 'Clinic updated successfully', clinic: clinic});
        }
      });
    });
  };

  this.delete = function(res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM clinics', function(err, results) {
        con.release();
        if (err) {
          res.send({message: 'Clinic deletions failed', err: err});
        } else {
          res.send({message: 'All clinics deleted successfully'});
        }
      });
    });
  };

  this.deleteClinic = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM clinics WHERE id = ?', [id], function(err, results) {
        con.release();
        if (err) {
          res.send({message: 'Clinic deletion failed with id = ' + id, err: err});
        } else {
          res.send({message: 'Clinic deleted successfully with id = ' + id});
        }
      });
    });
  };
}

module.exports = new Clinics();
