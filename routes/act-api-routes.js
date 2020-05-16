/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/activities", function (req, res) {
   
    db.Activity.findAll({}).then(function (activities) {
      res.json(activities);
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

    db.Activity.update(req.body, {
      where: {
        id: req.params.id

      }
    }).then(function () {
      return db.Activity.findOne({
        where: {
          id: req.params.id
        }
      });
    }).then(function(response) {
      res.json(response);
    }).catch(function(err) {
      res.json(err);
    });
  
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