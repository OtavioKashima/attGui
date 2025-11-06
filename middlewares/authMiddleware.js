const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O formato é 'Bearer TOKEN'
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Token mal formatado.' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Anexa o payload (id e role) ao objeto request
    req.userId = decoded.id;
    req.userRole = decoded.role;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};