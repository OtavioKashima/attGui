// Este é o conteúdo de: /controllers/authController.js

const { User } = require('../models');
const jwt = require('jsonwebtoken');

class AuthController {

  // Lógica para POST /login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Encontrar o usuário pelo email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        // Não seja específico (segurança), apenas "inválido"
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // 2. Checar a senha
      // (Estamos usando o método 'checkPassword' que definimos no model 'User')
      const isPasswordCorrect = await user.checkPassword(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // 3. Se tudo estiver certo, gerar o Token JWT
      const token = jwt.sign(
        { 
          id: user.id, 
          role: user.role // O payload contém o ID e a ROLE
        },
        process.env.JWT_SECRET, // Nosso segredo do .env
        { expiresIn: '8h' }    // Token expira em 8 horas
      );

      // 4. Retornar o usuário (sem a senha) e o token
      return res.json({
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        },
        token,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
}

// Exporta uma nova instância da classe
module.exports = new AuthController();