'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EdigaUser', {
      ediga_user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      profile_image: Sequelize.STRING,
      email_verified_at: Sequelize.DATE,
      token: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deleted_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EdigaUser');
  }
};
