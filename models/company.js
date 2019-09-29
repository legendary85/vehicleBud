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
    mechanic: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    service: {
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

  return Company;
};
