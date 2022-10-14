'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     */
    return queryInterface.renameColumn('EdigaUser', 'edigaUserId', 'ediga_user_id')

  },

  async down (queryInterface, Sequelize) {
    /**
     * 
     * Add reverting commands here.
     *
     */
     return queryInterface.renameColumn('EdigaUser', 'ediga_user_id', 'edigaUserId')

  }
};
