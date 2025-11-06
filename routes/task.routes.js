const { Router } = require('express');
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const router = Router();

// Todas as rotas de tarefas exigem autenticação
router.use(authMiddleware);

// POST /tasks (Gerente)
router.post('/', checkRole(['GERENTE']), TaskController.create);

// GET /tasks/my (Funcionário)
router.get('/my', checkRole(['FUNCIONARIO']), TaskController.listMyTasks);

// PATCH /tasks/:id/complete (Funcionário)
router.patch('/:id/complete', checkRole(['FUNCIONARIO']), TaskController.completeTask);

module.exports = router;