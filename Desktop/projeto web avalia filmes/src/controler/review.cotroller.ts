import { Request, Response } from 'express';
import { ReviewService } from '../aplication/services/review.service.ts';
import { ApiFilmesService } from '../aplication/services/apiFilmes.service.ts';

export const ReviewController = {
  async criarAvaliacao(req: Request, res: Response) {
    try {
      const { usuario_id, nota, critica, assistido_em, filme } = req.body;

      const novaReview = await ReviewService.criarAvaliacao({
        usuario_id: Number(usuario_id),
        nota: Number(nota),
        critica,
        assistido_em,
        filme
      });

      return res.status(201).json(novaReview);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // Busca filmes da API externa de catálogo (Porta 3001)
  async buscarCatalogoExterno(req: Request, res: Response) {
    try {
      const termo = req.query.termo as string || '';
      const filmes = await ApiFilmesService.consultarCatalogo(termo);
      return res.json(filmes);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }
};