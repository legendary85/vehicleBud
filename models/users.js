//Build table for Users
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6, 15]
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    vehicleMake: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    vehicleModel: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6, 15]
    },
    vehicleYear: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  // Post.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Post.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return User;
};
