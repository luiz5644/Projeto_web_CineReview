import { pool } from '../util/conexao.ts';

export const UsuarioDAO = {

    async buscarPorEmail(email: string) {
        const { rows } = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        return rows[0] || null;
    },

    async buscarPorId(id: number) {
        const { rows } = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        );

        return rows[0] || null;
    },

    async inserir(
        nome: string,
        email: string,
        senha: string,
        bio?: string,
        foto_perfil?: string
    ) {

        const { rows } = await pool.query(
            `
            INSERT INTO usuarios
            (nome,email,senha,bio,foto_perfil)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [nome,email,senha,bio,foto_perfil]
        );

        return rows[0];
    },

    async atualizar(
      id: number,
      nome: string,
      email: string,
      bio?: string,
      foto_perfil?: string
    ) {
      const { rows } = await pool.query(
        `
        UPDATE usuarios
        SET nome = $1,
            email = $2,
            bio = $3,
            foto_perfil = $4
        WHERE id = $5
        RETURNING *
        `,
        [nome, email, bio, foto_perfil, id]
      );

      return rows[0] || null;
    }
};