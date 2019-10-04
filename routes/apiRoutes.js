var db = require("../models");
var bcrypt = require("bcrypt");
var saltRounds = 10;
module.exports = function (app) {
  //Get rotue for retrieving a single user
  app.get("/api/users/:id", function (req, res) {
    db.User.findAll({
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
    })
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(err => console.log(err));
  });


  /***********************************************************************/
  //Register  and Login User with authentication
  /***********************************************************************/
  // CREATE A NEW USER with  BCRYPT
  app.post("/api/users", function (req, res) {
    bcrypt.hash(req.body.userPassword, 10).then(function (hash) {
      // Store hash in your password DB.
      console.log(hash);
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
        vehicleType: req.body.vehicleType,
        vehicleMake: req.body.vehicleMake,
        vehicleModel: req.body.vehicleModel,
        vehicleYear: req.body.vehicleYear,
        userPassword: hash
      }).then(function (data) {
        console.log(data);
        res.json(data);
      });
    });
  });

  // Login Route with BCRYPT
  app.post("/api/login", function (req, res) {
    // console.log(res.body);
    db.User.findOne({
      where: {
        userEmail: req.body.userEmail
      }
    }).then(function (dbUser) {
      if (dbUser === null) {
        return res.json({ status: "error", message: "User does not exist 🤔" })
      }
      console.log("**********************************");
      console.log(dbUser);
      bcrypt
        .compare(req.body.userPassword, dbUser.userPassword)
        .then(function (success) {
          if (success === true) {
            res.json(dbUser);
          } else {
            res.JSON({ status: 'error', check: " Check credentials 😫" })
          }
          // res == true
        })
        .catch(function (err) {
          console.log("🤬🤯");
          res.json({ status: 'Error 😢', desc: err })
        });
    });
  });

  /****************************************************/
  // Regular Resiter and Longin without authentication
  /****************************************************/
  //REGISTER
  // app.post("/api/users", function(req, res) {
  //   db.User.create({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     userEmail: req.body.userEmail,
  //     vehicleType: req.body.vehicleType,
  //     vehicleMake: req.body.vehicleMake,
  //     vehicleModel: req.body.vehicleModel,
  //     vehicleYear: req.body.vehicleYear,
  //     userPassword: req.body.userPassword
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  // // LOGIN user
  // app.post("/api/login", function(req, res) {
  //   console.log(res.body);
  //   db.User.findOne({
  //     where: {
  //       userEmail: req.body.userEmail,
  //       userPassword: req.body.userPassword
  //     }
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });


  /********************************************************************/
  //Future user API Routes
  /********************************************************************/
  // Delete an user by id
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  //Update user info
  app.put("/api/user/:id", function (req, res) {
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(daUser);
    });
  });



  /*********************************************************************/
  //REQUEST POSTS
  /*********************************************************************/
  // GET route for getting all of the posts

  app.get("/api/requests/", function (req, res) {
    db.Request.findAll({}).then(function (dbRequest) {
      res.json(dbRequest);
    });
  });
  // Get route for returning posts of a specific category
  app.get("/api/requests/service/:service", function (req, res) {
    db.Request.findAll({
      where: {
        service: req.params.service
      }
    }).then(function (dbRequest) {
      res.json(dbRequest);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/requests/:id", function (req, res) {
    db.Request.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbRequest) {
      res.json(dbRequest);
    });
  });

  // POST route for saving a new post
  app.post("/api/requests", function (req, res) {
    console.log(req.body);
    db.Request.create({
      body: req.body.body,
      service: req.body.service
    }).then(function (dbRequest) {
      res.json(dbRequest);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/requests/:id", function (req, res) {
    db.Request.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbRequest) {
      res.json(dbRequest);
    });
  });

  // PUT route for updating request
  app.put("/api/requests", function (req, res) {
    console.log(req.body);
    db.Request.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbRequest) {
      res.json(dbRequest);
    });
  });

  /************************************************************/
  // Company Side API ROUTES
  /***********************************************************/

  //Get rotue for retrieving a single user

  app.get("/api/companies/:id", function (req, res) {
    db.Company.findAll({
      where: {
        id: req.params.id
      },
      attributes: [
        "id",
        "companyName",
        "companyService",
        "companyFirstName",
        "companyLastName"
      ]
    })
      .then(function (dbCompany) {
        res.json(dbCompany);
      })
      .catch(err => console.log(err));
  });

  //Company Register
  app.post("/api/companies", function (req, res) {
    db.Company.create({
      companyName: req.body.companyName,
      companyService: req.body.companyService,
      companyFirstName: req.body.companyFirstName,
      companyLastName: req.body.companyLastName,
      companyEmail: req.body.companyEmail,
      companyPassword: req.body.companyPassword
    }).then(function (dbCompany) {
      res.json(dbCompany);
    });
  });

  // Login Company
  app.post("/api/companylogin", function (req, res) {
    console.log(res.body);
    db.Company.findOne({
      where: {
        companyEmail: req.body.companyEmail,
        companyPassword: req.body.companyPassword
      }
    }).then(function (dbCompany) {
      res.json(dbCompany);
    });
  });
};
