const { Project, User, Task } = require('../models');

class ProjectController {
  
  // Função 3 (ADMIN BÔNUS): Criar projeto e designar gerente
  async create(req, res) {
    try {
      const { name, id_gerente } = req.body;

      // Validação opcional: verificar se o id_gerente é realmente um 'GERENTE'
      const gerente = await User.findByPk(id_gerente);
      if (!gerente || gerente.role !== 'GERENTE') {
        return res.status(400).json({ error: 'ID de gerente inválido ou usuário não é gerente.' });
      }

      const project = await Project.create({ name, id_gerente });
      return res.status(201).json(project);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ... (outras funções do gerente virão aqui)
  // ... (imports e função create do Admin)

  // Função 1 (GERENTE): Listar tarefas do seu projeto
  async listTasks(req, res) {
    try {
      const projectId = req.params.id;
      const gerenteId = req.userId; // ID do gerente logado (do token)

      // 1. Buscar o projeto
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado.' });
      }

      // 2. VERIFICAR PERMISSÃO: O usuário logado é o gerente deste projeto?
      if (project.id_gerente !== gerenteId) {
        return res.status(403).json({ error: 'Acesso negado. Você não gerencia este projeto.' });
      }

      // 3. Se for, listar as tarefas
      const tasks = await Task.findAll({
        where: { id_projeto: projectId },
        include: [{ model: User, as: 'funcionario', attributes: ['id', 'name'] }]
      });

      return res.json(tasks);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
// ... (export)
}

module.exports = new ProjectController();