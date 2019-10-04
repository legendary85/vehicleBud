//Builds table for Companies
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    companyService: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    companyFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    companyLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    companyPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  return Company;
};
