'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Uma Tarefa pertence a 1 Projeto
      Task.belongsTo(models.Project, {
        foreignKey: 'id_projeto',
        as: 'project',
      });

      // Uma Tarefa pertence a 1 Funcionário
      Task.belongsTo(models.User, {
        foreignKey: 'id_funcionario',
        as: 'funcionario',
      });
    }
  }
  Task.init({
    descricao: DataTypes.STRING,
    status: DataTypes.ENUM('PENDENTE', 'CONCLUIDA'),
    id_projeto: DataTypes.INTEGER,
    id_funcionario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};