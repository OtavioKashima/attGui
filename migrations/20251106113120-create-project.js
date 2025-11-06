'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Dentro de migrations/xxxxxxxx-create-project.js

      // ...
      id_gerente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nome da tabela
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' // <-- MUDE DE 'SET NULL' PARA 'RESTRICT'
      },
      // ...
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};