var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  //Get rotue for retrieving a single user
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "vehicleType",
        "vehicleMake",
        "vehicleModel",
        "vehicleYear"
      ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // CREATE A NEW USER
  app.post("/api/users", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userEmail: req.body.userEmail,
      vehicleType: req.body.vehicleType,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
      userPassword: req.body.userPassword
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
