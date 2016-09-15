var clinics = require('./models/clinics');

module.exports = {
  configure: function(app) {
    app.get('/clinics/', function(req, res) {
      clinics.get(res);
    });

    app.get('/clinics/:id', function(req, res) {
      clinics.getClinic(req.params.id, res);
    });

    app.post('/clinics/', function(req, res) {
      clinics.create(req.body, res);
    });

    app.put('/clinics/', function(req, res) {
      clinics.update(req.body, res);
    });

    app.delete('/clinics', function(req, res) {
      clinics.delete(res);
    });

    app.delete('/clinics/:id', function(req, res) {
      clinics.deleteClinic(req.params.id, res);
    });
  }
};
