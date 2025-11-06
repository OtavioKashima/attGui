const { User } = require('../models');

class UserController {
  // Função 1 (ADMIN): Criar novo usuário
  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // O "password" será hasheado pelo hook do model
      const user = await User.create({ 
        name, 
        email, 
        password_hash: password, // O hook 'beforeCreate' vai transformar isso
        role 
      });

      // Não retornar a senha
      user.password_hash = undefined;
      return res.status(201).json(user);

    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  // Função 2 (ADMIN): Listar todos os usuários
  async listAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password_hash'] } // Exclui o hash da senha
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();