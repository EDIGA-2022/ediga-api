'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Observation',
      'created_by',
      Sequelize.UUID,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Observation',
      'created_by',
    );
  }
};
