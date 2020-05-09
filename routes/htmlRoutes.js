var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Activity.findAll({}).then(function(dbActivity) {
      res.render("index", {
        msg: "Welcome!",
        actName: dbActivity
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Activity.findOne({ where: { id: req.params.id } }).then(function(
      dbActivity
    ) {
      res.render("Activity", {
        actName: dbActivity
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
