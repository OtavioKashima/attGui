const { Router } = require('express');
const AuthController = require('../controllers/authController');
const router = Router();

// Rota pública de login
router.post('/login', AuthController.login);

module.exports = router;