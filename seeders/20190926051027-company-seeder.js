"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Companies", [
      {
        companyName: "Big Joe's Tire Shop",
        mechanic: "Troy Allen",
        service: "Tires",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: "The Lock Doctor",
        mechanic: "Sarah James",
        service: "Pop-A-Lock",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: "Lonstar Lube Oil",
        mechanic: "Christopher Torres",
        service: "Oil Change",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: "Pristine Detailers",
        mechanic: "Kirk Woods",
        service: "Car Wash",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: "AAA",
        mechanic: "Rita Brown",
        service: "Jump Start",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: "Tow Crew",
        mechanic: "Victor Samuels",
        service: "Tow",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  }
};
