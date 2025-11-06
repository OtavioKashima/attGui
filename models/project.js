'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Um Projeto pertence a 1 Gerente
      Project.belongsTo(models.User, {
        foreignKey: 'id_gerente',
        as: 'gerente',
      });

      // Um Projeto tem N Tarefas
      Project.hasMany(models.Task, {
        foreignKey: 'id_projeto',
        as: 'tasks',
      });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    id_gerente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};