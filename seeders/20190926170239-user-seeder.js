"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        userEmail: "johndoedode@gmail.com",
        userPassword: "hh12547!$#",
        vehicleType: "Car",
        vehicleMake: "Nissan",
        vehicleModel: "Altima",
        vehicleYear: "2016",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Alexis",
        lastName: "Jones",
        userEmail: "lexy404@gmail.com",
        userPassword: "$ttfd@3343",
        vehicleType: "Car",
        vehicleMake: "Ford",
        vehicleModel: "Ranger",
        vehicleYear: "2012",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
