import { pool } from '../util/conexao.ts';

export const FilmeDAO = {

  async listarTodos() {
    const query =
      'SELECT * FROM filmes ORDER BY titulo ASC';

    const { rows } =
      await pool.query(query);

    return rows;
  },

  async buscarPorId(id: number) {

    const query =
      'SELECT * FROM filmes WHERE id = $1';

    const { rows } =
      await pool.query(query, [id]);

    return rows[0] || null;
  },

  async buscarPorTitulo(titulo: string) {

    const query =
      'SELECT * FROM filmes WHERE titulo = $1';

    const { rows } =
      await pool.query(query, [titulo]);

    return rows[0] || null;
  },

  async inserir(
    titulo: string,
    ano: number,
    diretor: string,
    sinopse: string,
    capaUrl: string
  ) {

    const query = `
      INSERT INTO filmes
      (
        titulo,
        ano_lancamento,
        diretor,
        sinopse,
        capa_url
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *
    `;

    const { rows } =
      await pool.query(
        query,
        [
          titulo,
          ano,
          diretor,
          sinopse,
          capaUrl
        ]
      );

    return rows[0];
  },

  async atualizarMediaNota(
    filmeId: number,
    media: number
  ) {

    const query = `
      UPDATE filmes
      SET media_nota = $1
      WHERE id = $2
      RETURNING *
    `;

    const { rows } =
      await pool.query(
        query,
        [media, filmeId]
      );

    return rows[0];
  }
};