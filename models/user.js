'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Um Gerente gerencia N Projetos
      User.hasMany(models.Project, {
        foreignKey: 'id_gerente',
        as: 'projectsManaged',
      });
      
      // Um Funcionário tem N Tarefas
      User.hasMany(models.Task, {
        foreignKey: 'id_funcionario',
        as: 'tasksAssigned',
      });
    }

    // Método para checar a senha (será usado no login)
    checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.ENUM('ADMIN', 'GERENTE', 'FUNCIONARIO')
  }, {
    sequelize,
    modelName: 'User',
    // Hook para fazer o hash da senha ANTES de criar o usuário
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
          user.password_hash = await bcrypt.hash(user.password_hash, 8);
        }
      }
    }
  });
  return User;
};