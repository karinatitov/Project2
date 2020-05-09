module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    actName: {
      type: Datatypes.String,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    actTag: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    actDescription: {
      type: DataTypes.String
    },

    completed: DataTypes.Boolean
  });
  return Activity;
};
