import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { UsuarioController } from '../controler/usuario.controller.ts';
import { ReviewController } from '../controler/review.cotroller.ts';
import { FilmeController } from '../controler/filme.controller.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = Router();

// ---- CONFIGURAÇÃO DO MULTER ----
// Define onde os arquivos de foto de perfil serão salvos temporariamente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Alvo: pasta 'uploads' dentro do seu projeto
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: (req, file, cb) => {
    // Gera um nome único: milissegundos_nome_original.jpg
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ---- ROTAS DA API ----

// Usuários 
// 💡 ADICIONADO: upload.single('foto_perfil') intercepta o formulário antes de chamar o Controller
routes.post('/register', upload.single('foto_perfil'), UsuarioController.cadastrar);
routes.post('/login', UsuarioController.logar);
routes.get('/api/me', UsuarioController.obterPerfil);
routes.post('/api/usuarios/editar', UsuarioController.atualizarPerfil);

// Filmes
routes.get('/api/filmes/locais', FilmeController.listarLocais);
routes.post('/api/filmes', FilmeController.cadastrarFilmeManual);

// Reviews e Integração Externa
routes.get('/api/catalogo-externo', ReviewController.buscarCatalogoExterno);
routes.post('/api/reviews', ReviewController.criarAvaliacao);

// Status da API
routes.get('/api/status', (req, res) => {
  res.json({ status: "online", msg: "CineReview funcionando perfeitamente!" });
});

export default routes;