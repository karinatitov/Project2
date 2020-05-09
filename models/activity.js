module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    actName: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING
    },

    completed: DataTypes.BOOLEAN
  });
  return Activity;
};
