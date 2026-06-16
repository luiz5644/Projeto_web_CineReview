import { Request, Response } from 'express';
import { UsuarioService } from '../aplication/services/usuario.service.ts';

export const UsuarioController = {
  /**
   * Realiza o cadastro de um novo usuário com foto de perfil
   */
  async cadastrar(req: Request, res: Response) {
    try {
      // O Multer descompacta os textos e joga dentro de req.body
      const { nome, email, senha, bio } = req.body;
      
      // Se um arquivo foi enviado, pegamos o caminho gerado pelo Multer
      // Caso contrário, deixamos como undefined
      const foto_perfil = req.file ? `/uploads/${req.file.filename}` : undefined;

      // Validação manual de segurança para garantir que o banco não receba nulo
      if (!nome || !email || !senha) {
        return res.status(400).json({ 
          erro: "Os campos Nome, Email e Senha são obrigatórios." 
        });
      }

      // Envia os dados tratados para o Service
      const novoUsuario = await UsuarioService.cadastrar({
        nome,
        email,
        senha,
        bio,
        foto_perfil
      });

      // Como o envio vem de um formulário HTML nativo (<form action="/register">),
      // o ideal é redirecionar o usuário diretamente para a página de login ('/') após o sucesso.
      return res.redirect('/');

    } catch (error: any) {
      // Se cair aqui (ex: email duplicado), devolvemos o erro em formato JSON
      return res.status(400).json({ erro: error.message });
    }
  },

  /**
   * Autentica o usuário no sistema
   */
  async logar(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios." });
      }

      const usuario = await UsuarioService.logar(email, senha);

      if (!usuario) {
        return res.status(401).json({ erro: "E-mail ou senha incorretos." });
      }

      // Retorna os dados do usuário autenticado para o frontend salvar no localStorage
      return res.status(200).json({
        msg: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  /**
   * Recupera o perfil do usuário logado (Usado na rota /api/me)
   */
  async obterPerfil(req: Request, res: Response) {
    try {
      // Nota: Idealmente o ID viria de um token JWT decodificado no middleware de autenticação.
      // Se você estiver passando o ID via query string ou body temporariamente, ajuste aqui:
      const idUsuario = Number(req.query.id || req.body.id);

      if (!idUsuario) {
        return res.status(400).json({ erro: "ID do usuário não fornecido." });
      }

      const perfil = await UsuarioService.obtenerPerfil(idUsuario);

      if (!perfil) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      return res.status(200).json(perfil);

    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  /**
   * Atualiza as informações de perfil do usuário
   */
  async atualizarPerfil(req: Request, res: Response) {
    try {
      const { id, nome, email, bio } = req.body;
      const foto_perfil = req.file ? `/uploads/${req.file.filename}` : undefined;

      if (!id || !nome || !email) {
        return res.status(400).json({ erro: "ID, Nome e Email são obrigatórios para atualização." });
      }

      const perfilAtualizado = await UsuarioService.atualizarPerfil(
        Number(id),
        nome,
        email,
        bio,
        foto_perfil
      );

      return res.status(200).json({
        msg: "Perfil atualizado com sucesso!",
        perfil: perfilAtualizado
      });

    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
};