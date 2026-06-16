import { Request, Response } from 'express';
import { FilmeDAO } from '../DAO/filme.dao.ts';

export const FilmeController = {
  async listarLocais(req: Request, res: Response) {
    try {
      const filmes = await FilmeDAO.listarTodos();
      return res.json(filmes);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async cadastrarFilmeManual(req: Request, res: Response) {
    try {
      const { titulo, ano_lancamento, diretor, sinopse, capa_url } = req.body;

      if (!titulo || !ano_lancamento) {
        return res.status(400).json({ erro: "Título e ano são obrigatórios." });
      }

      const novoFilme = await FilmeDAO.inserir(
        titulo,
        Number(ano_lancamento),
        diretor,
        sinopse,
        capa_url
      );

      return res.status(201).json(novoFilme);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }
};