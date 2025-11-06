const { Router } = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const router = Router();

// Todas as rotas de usuário são protegidas e restritas ao ADMIN
router.use(authMiddleware);
router.use(checkRole(['ADMIN']));

// POST /users (Admin)
router.post('/', UserController.create);

// GET /users (Admin)
router.get('/', UserController.listAll);

module.exports = router;