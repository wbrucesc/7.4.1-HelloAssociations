'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(        //adding a new column to Dogs table
      'Dogs',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,              //dogs don't have to have an owner
        references: {
          model: "Users",
          key: 'id'       //what it is foreign key to
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Dogs', 'userId');
  }
};
