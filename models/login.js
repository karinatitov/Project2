module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    Email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    completed: DataTypes.BOOLEAN
  });
  return Login;
};
