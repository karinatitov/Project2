/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {

    // eslint-disable-next-line camelcase
    act_name: {
      type: DataTypes.STRING,
      allowNull: false,
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


  });
  return Activity;
},{
  timestamps: false
};
