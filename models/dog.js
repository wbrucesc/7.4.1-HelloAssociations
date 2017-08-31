'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    isWearingHat: DataTypes.BOOLEAN,
    isAggressive: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',         //assigning foreign key to id from Users table 
        key: 'id'
      }
    }
  }, {});

  Dog.associate = function(models){
    Dog.belongsTo(models.User, {foreignKey: 'userId'});   //sets up foreign key to user model by using userID
  };
  return Dog;
};
