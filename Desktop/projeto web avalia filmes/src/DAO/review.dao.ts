import { pool } from '../util/conexao.ts';

export const ReviewDAO = {

    async inserir(
        usuarioId: number,
        filmeId: number,
        nota: number,
        critica: string,
        assistidoEm?: string
    ) {

        const { rows } = await pool.query(
            `
            INSERT INTO reviews
            (
                usuario_id,
                filme_id,
                nota,
                critica,
                assistido_em
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [
                usuarioId,
                filmeId,
                nota,
                critica,
                assistidoEm
            ]
        );

        return rows[0];
    },

    async verificarDuplicidade(usuarioId: number, filmeId: number) {
        const { rows } = await pool.query(
            `
            SELECT 1
            FROM reviews
            WHERE usuario_id = $1 AND filme_id = $2
            LIMIT 1
            `,
            [usuarioId, filmeId]
        );

        return rows.length > 0;
    },

    async calcularMediaDoFilme(filmeId: number) {
        const { rows } = await pool.query(
            `
            SELECT AVG(nota) AS media
            FROM reviews
            WHERE filme_id = $1
            `,
            [filmeId]
        );

        return Number(rows[0]?.media || 0);
    },

    async listarPorFilme(filmeId: number) {

        const { rows } = await pool.query(
            `
            SELECT *
            FROM reviews
            WHERE filme_id = $1
            `,
            [filmeId]
        );

        return rows;
    }
};