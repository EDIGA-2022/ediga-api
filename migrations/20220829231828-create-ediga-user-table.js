'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EdigaUser', {
      edigaUserId: {
        type: Sequelize.UUID,
        allowNull: false.valueOf,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      password: Sequelize.STRING,
      profile_image: Sequelize.STRING,
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

