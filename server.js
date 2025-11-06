require('dotenv').config(); // Carrega o .env
const express = require('express');
const routes = require('./routes/index.routes');
require('./models'); // Importa e inicializa os models/conexão

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON
app.use(routes);         // Carrega todas as rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});