var db = require("../models");


module.exports = function (app) {
    app.get("/api/categories", function (req, res) {

        db.Category.findAll({
            include: [db.Activity]
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

    app.get("/api/categories/:id", function (req, res) {
        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Activity]
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });
    app.post("/api/categories", function (req, res) {
        db.Category.create(req.body).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

    app.delete("/api/categories/:id", function (req, res) {
        db.Author.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

}