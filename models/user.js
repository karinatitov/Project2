module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
  
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
    return User;
  };
  