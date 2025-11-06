const { Router } = require('express');
const ProjectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const router = Router();

// Todas as rotas de projeto exigem autenticação
router.use(authMiddleware);

// POST /projects (Admin)
router.post('/', checkRole(['ADMIN']), ProjectController.create);

// GET /projects/:id/tasks (Gerente)
router.get('/:id/tasks', checkRole(['GERENTE']), ProjectController.listTasks);

module.exports = router;