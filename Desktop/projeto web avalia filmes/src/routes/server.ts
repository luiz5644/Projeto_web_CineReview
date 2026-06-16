import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import routes from './router.ts';
import { pool } from '../util/conexao.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('foto_perfil'));

// Servir arquivos estáticos de Uploads (fotos de perfil)
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'public', 'uploads')));

// Libera todos os arquivos HTML, CSS e JS da pasta 'public/user'
app.use(express.static(path.join(__dirname, '..', '..', 'public', 'user')));

// Rota Raiz: Envia o usuário diretamente para a tela de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'user', 'admTelaLogin.html'));
});

// Vincula os endpoints da aplicação (Rotas da API como /api/login, /api/me, etc.)
app.use(routes);

// Inicializa o servidor principal
app.listen(PORT, () => {
    console.log(`🚀 Servidor principal do CineReview rodando em http://localhost:${PORT}`);
});