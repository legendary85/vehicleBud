module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define("Request", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    service: {
      type: DataTypes.STRING,
      defaultValue: "Oil Change"
    }
  });
  return Request;
};
