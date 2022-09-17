'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('EdigaUser', 'edigaUserId', 'ediga_user_id')
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * 
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.renameColumn('EdigaUser', 'ediga_user_id', 'edigaUserId')

  }
};
