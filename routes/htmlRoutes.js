var db = require("../models");
// var bcrypt = require("bcrypt");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("login", {
        msg: "Account Login",
        style: "login.css"
        // users: dbExamples
      });
    });
  });

  //Load Register Page
  app.get("/register", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("register", {
        msg: "Welcome!",
        style: "register.css",
        examples: dbExamples
      });
    });
  });

  //Service Request
  app.get("/request", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("request", {
        msg: "Make A Selection",
        style: "login.css"
      });
    });
  });

  //Blog page
  app.get("/blog", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("blog", {
        msg: "Make A Selection",
        style: "login.css"
      });
    });
  });

  //Company Side
  app.get("/company", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("companySide", {
        msg: "Make A Selection",
        style: "companySide.css"
      });
    });
  });

  //Company Register
  app.get("/companyregister", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("companyRegister", {
        msg: "Make A Selection",
        style: "companyRegister.css"
      });
    });
  });

  // app.get("/user/register", function(req, res) {
  //   db.company.findAll({}).then(function(dbExamples) {
  //     res.render("register", {
  //       msg: "Welcome!",
  //       style: "register.css",
  //       examples: dbExamples
  //     });
  //   });
  // });

  //LOADS DATA PAGE ONCE ACCESSED
  app.get("/companyprofile/:id", function(req, res) {
    db.User.findAll({
      where: { id: req.params.id }
    }).then(function(dbUser) {
      console.log(dbUser);
      res.render("companyProfile", {
        companyName: dbCompany[0].companyName,
        companyService: dbCompany[0].companyService,
        companyFirstName: dbCompany[0].companyFirstName,
        companyLastName: dbCompany[0].companyLastName,

        style: "companyProfile.css"
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
