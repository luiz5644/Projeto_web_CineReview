import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

if (!process.env.PGUSER || !process.env.PGPASSWORD || !process.env.PGDATABASE) {
  console.error('❌ Variáveis de ambiente do PostgreSQL ausentes ou incompletas. Verifique o arquivo .env.');
}

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT || '5432'),
});

pool
  .query('SELECT NOW()')
  .then(() => {
    console.log(' Conexão com o banco PostgreSQL estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error(' Erro ao conectar no banco de dados:', err.message);
  });