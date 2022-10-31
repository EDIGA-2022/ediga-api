'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Observation', 
    'title', {
        type: Sequelize.TEXT('long'),
        allowNull: true.valueOf,
    }),
    await queryInterface.addColumn('Observation',
    'type', {
        type: Sequelize.CHAR,
        allowNull: true.valueOf,
    }),
    await queryInterface.addColumn('Observation', 
    'likes', {
        type: Sequelize.INTEGER,
        allowNull: true.valueOf,
       }),
    await queryInterface.addColumn('Observation', 
    'comments', {
        type: Sequelize.INTEGER,
        allowNull: true.valueOf,
      }),
    await queryInterface.addColumn('Observation', 
    'music', {
        type: Sequelize.TEXT('long'),
        allowNull: true.valueOf,
       }),
    await queryInterface.addColumn('Observation', 
    'hasMusic', {
        type: Sequelize.BOOLEAN,
        allowNull: true.valueOf,
       }),
    await queryInterface.addColumn('Observation', 
    'publication_date', {
        type: Sequelize.DATE,
        allowNull: true.valueOf,
     });
       
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Observation', 'title'),
    queryInterface.removeColumn('Observation', 'type'),
    queryInterface.removeColumn('Observation', 'likes'),
    queryInterface.removeColumn('Observation', 'comments'),
    queryInterface.removeColumn('Observation', 'music'),
    queryInterface.removeColumn('Observation', 'hasMusic'),
    queryInterface.removeColumn('Observation', 'publication_date');
  }
};
