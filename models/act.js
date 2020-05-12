module.exports = function (sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {

        act_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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
};