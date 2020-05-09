var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Activity.findAll({}).then(function(dbAcivity) {
      res.json(dbAcivity);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Activity.create(req.body).then(function(dbAcivity) {
      res.json(dbAcivity);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Activity.destroy({ where: { id: req.params.id } }).then(function(
      dbAcivity
    ) {
      res.json(dbAcivity);
    });
  });
};
