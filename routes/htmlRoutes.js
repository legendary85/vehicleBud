var db = require("../models");
// var bcrypt = require("bcrypt");
module.exports = function (app) {

  // /**********************************************************/
  //User Side HTML Routes
  // /**********************************************************/

  // Load index page
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("landing", {
        msg: "Account Login",
        style: "landing.css"
        // users: dbExamples
      });
    });
  });

  app.get("/login", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("login", {
        msg: "Account Login",
        style: "login.css"
        // users: dbExamples
      });
    });
  });



  //Load Register Page
  app.get("/register", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("register", {
        msg: "Welcome!",
        style: "register.css",
        examples: dbExamples
      });
    });
  });

  //Loads user profile with data dynamically added.
  app.get("/profile/:id", function (req, res) {
    db.User.findAll({
      where: { id: req.params.id }
    }).then(function (dbUser) {
      console.log(dbUser);
      res.render("profile", {
        firstName: dbUser[0].firstName,
        lastName: dbUser[0].lastName,
        vehicleType: dbUser[0].vehicleType,
        vehicleMake: dbUser[0].vehicleMake,
        vehicleModel: dbUser[0].vehicleModel,
        vehicleYear: dbUser[0].vehicleYear,
        style: "profile.css"
      });
    });
  });


  /***********************************************************/
  //Requests and Posted Request Routes
  /***********************************************************/
  //Service Request Page where users can post a request
  app.get("/request", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("request", {
        msg: "Make A Selection",
        style: "request.css"
      });
    });
  });

  //This is where requests are displayed - USER SEES
  app.get("/request/made", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("blog", {
        msg: "Make A Selection",
        style: "blog.css"
      });
    });
  });


  //Jobs are posted - CONTRACTOR SEES
  app.get("/jobs", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("companySide", {
        msg: "Make A Selection",
        style: "companySide.css"
      });
    });
  });

  /***************************************************************/
  //Company Side Routes
  /***************************************************************/

  //Company Login Page
  app.get("/companylogin", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("company", {
        msg: "Make A Selection",
        style: "company.css"
      });
    });
  });

  //Company Register Page
  app.get("/companyregister", function (req, res) {
    db.User.findAll({}).then(function () {
      res.render("companyRegister", {
        msg: "Make A Selection",
        style: "companyRegister.css"
      });
    });
  });

  //LOADS DATA PAGE ONCE ACCESSED
  app.get("/companyprofile/:id", function (req, res) {
    db.Company.findAll({
      where: { id: req.params.id }
    }).then(function (dbCompany) {
      console.log(dbCompany);
      res.render("companyProfile", {
        companyName: dbCompany[0].companyName,
        companyService: dbCompany[0].companyService,
        companyFirstName: dbCompany[0].companyFirstName,
        companyLastName: dbCompany[0].companyLastName,
        style: "companyProfile.css"
      });
    });
  });

  /***********************************************************/
  // Error Routes
  /***********************************************************/
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
  /***********************************************************/
  // expample API's for use later
  /***********************************************************/
  app.get("/user/register", function (req, res) {
    db.company.findAll({}).then(function (dbExamples) {
      res.render("register", {
        msg: "Welcome!",
        style: "register.css",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

};
