
import { FilmeDAO } from '../../DAO/filme.dao.ts';
import { ReviewDAO } from '../../DAO/review.dao.ts';
import { CriarReviewDTO } from '../dto/review.dto.ts';

export const ReviewService = {
  async criarAvaliacao(dados: CriarReviewDTO) {
    if (dados.nota < 1 || dados.nota > 10) {
      throw new Error('A nota deve ser um valor inteiro entre 1 e 10.');
    }

    let filmeLocal = await FilmeDAO.buscarPorTitulo(dados.filme.titulo);

    if (!filmeLocal) {
      filmeLocal = await FilmeDAO.inserir(
        dados.filme.titulo,
        dados.filme.ano_lancamento,
        dados.filme.diretor,
        dados.filme.sinopse,
        dados.filme.capa_url
      );
    }

    const jaAvaliou = await ReviewDAO.verificarDuplicidade(dados.usuario_id, filmeLocal.id);
    if (jaAvaliou) {
      throw new Error('Você já enviou uma avaliação para este filme.');
    }

    const novaReview = await ReviewDAO.inserir(
      dados.usuario_id,
      filmeLocal.id,
      dados.nota,
      dados.critica,
      dados.assistido_em
    );

    const novaMedia = await ReviewDAO.calcularMediaDoFilme(filmeLocal.id);
    await FilmeDAO.atualizarMediaNota(filmeLocal.id, novaMedia);

    return novaReview;
  }
};