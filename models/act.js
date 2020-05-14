module.exports = function (sequelize, DataTypes) {
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
    });
  };


  return Activity;
}, {
  timestamps: false
};