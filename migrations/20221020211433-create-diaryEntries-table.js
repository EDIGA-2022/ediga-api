'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DiaryEntry', {
      diary_entry_id: {
        type: Sequelize.UUID,
        allowNull: false.valueOf,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: { type: Sequelize.UUID },
      text: Sequelize.TEXT('long'),
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DiaryEntry');
  }
};
