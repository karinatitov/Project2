module.exports = function (sequelize, DataTypes) {
<<<<<<< HEAD
  var Activity = sequelize.define("Activity", {

    act_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },

    category: {
      type: DataTypes.STRING,
      defaultValue: "Random"
    },


    todo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }


  });

  Activity.associate = function (models) {
    // We're saying that a Activity should belong to an Author
    // A Activity can't be created without an Author due to the foreign key constraint
    Activity.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
=======
    var Activity = sequelize.define("Activity", {

        act_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:"random",
            validate: {
                len: [1]
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
          },

        category: {
            type: DataTypes.STRING,
            defaultValue: "Random"
        },


        todo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }


>>>>>>> d736e9df11d4d328d5589ec4fd4b54396d2c4b86
    });
  };


<<<<<<< HEAD
  return Activity;
}, {
  timestamps: false
};
=======
   
    return Activity;
  }, {
    timestamps: false
  };
    

    
>>>>>>> d736e9df11d4d328d5589ec4fd4b54396d2c4b86
