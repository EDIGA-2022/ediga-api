'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('EdigaUser', 'first_log_in', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('EdigaUser', 'first_log_in');
  }
}
