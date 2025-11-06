// Este é o conteúdo CORRETO para config/config.js

require('dotenv').config(); // Isso carrega o seu arquivo .env

module.exports = {
  // O único ambiente que importa agora é o 'development'
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  },

  // Vamos deixar os outros com valores padrão para não dar erro
  test: {
    username: "root",
    password: "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};