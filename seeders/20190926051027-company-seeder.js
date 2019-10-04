"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Companies", [
      {
        companyName: "Big Joe's Tire Shop",
        companyFirstName: "Troy",
        companyLastName: "Allen",
        companyService: "Tires",
        companyEmail: "bigjoes@gmail.com",
        companyPassword: "asd",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: "Southwest Car Wash",
        companyFirstName: "Susan",
        companyLastName: "Lanley",
        companyService: "Car Wash",
        companyEmail: "swwash@gmail.com",
        companyPassword: "asd",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  }
};
