// Este middleware é uma "Factory", ele retorna uma função
// Deve ser usado DEPOIS do authMiddleware

const checkRole = (rolesPermitidas) => {
    return (req, res, next) => {
      
      // Pega a role que foi anexada pelo authMiddleware
      const userRole = req.userRole;
  
      if (!rolesPermitidas.includes(userRole)) {
        return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
      }
  
      return next();
    };
  };
  
  module.exports = checkRole;