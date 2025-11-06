const { Task, Project, User } = require('../models');

class TaskController {

  // Função 2 (GERENTE): Criar nova tarefa
  async create(req, res) {
    try {
      const gerenteId = req.userId; // ID do gerente logado
      const { descricao, id_projeto, id_funcionario } = req.body;

      // 1. Validar se o projeto pertence ao gerente logado
      const project = await Project.findByPk(id_projeto);
      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado.' });
      }
      if (project.id_gerente !== gerenteId) {
        return res.status(403).json({ error: 'Acesso negado. Você não pode adicionar tarefas a este projeto.' });
      }

      // 2. (Opcional) Validar se o funcionário existe
      const funcionario = await User.findByPk(id_funcionario);
      if (!funcionario || funcionario.role !== 'FUNCIONARIO') {
        return res.status(400).json({ error: 'Funcionário inválido.' });
      }
      
      // 3. Criar a tarefa
      const task = await Task.create({
        descricao,
        id_projeto,
        id_funcionario,
        status: 'PENDENTE'
      });

      return res.status(201).json(task);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ... (funções do funcionário virão aqui)
  // ... (imports e função create do Gerente)

  // Função 1 (FUNCIONARIO): Listar minhas tarefas
  async listMyTasks(req, res) {
    try {
      const funcionarioId = req.userId; // ID do funcionário logado

      const tasks = await Task.findAll({
        where: {
          id_funcionario: funcionarioId
        },
        include: [{ model: Project, as: 'project', attributes: ['id', 'name'] }]
      });

      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Função 2 (FUNCIONARIO): Marcar tarefa como concluída
  async completeTask(req, res) {
    try {
      const taskId = req.params.id;
      const funcionarioId = req.userId; // ID do funcionário logado

      // 1. Buscar a tarefa
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }

      // 2. VERIFICAR PERMISSÃO: Esta tarefa pertence ao usuário logado?
      if (task.id_funcionario !== funcionarioId) {
        return res.status(403).json({ error: 'Acesso negado. Esta tarefa não é sua.' });
      }
      
      // 3. Atualizar o status
      task.status = 'CONCLUIDA';
      await task.save();

      return res.json(task);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
// ... (export)
}

module.exports = new TaskController();