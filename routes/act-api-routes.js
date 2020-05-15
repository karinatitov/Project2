var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/activities", function (req, res) {
    var query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    db.Activity.findAll({
      where: query

    }).then(function (dbActivity) {
      res.json(dbActivity);
    });
  });

  app.get("/api/activities/:category", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author

    db.Activity.findAll({
      where: {
        category: req.params.category
      }
    }).then(function (dbActivities) {

      console.log(dbActivities);
      res.json(dbActivities);


    });
  });



  // Create a new activity
  app.post("/api/activities", function (req, res) {
    db.Activity.create(req.body).then(function (dbActivity) {
      res.json(dbActivity);
    });
  });

  app.post("/api/activities/:id", function (req, res) {

    db.Activity.update({
      where: {
        id: req.params.id
      }
    }).then(function (dbActivity) {
      dbActivity = {
        todo: 1
      }
      console.log(dbActivity)
      res.json(dbActivity)
    })
  });

  // Delete an example by id
  app.delete("/api/activities/:id", function (req, res) {
    db.Activity.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbActivity
    ) {
      res.json(dbActivity);
    });
  });
};