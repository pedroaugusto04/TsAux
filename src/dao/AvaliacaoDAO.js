import { databaseConnection } from "../database/databaseConnection.js";

export class AvaliacaoDAO {

    async insertAvaliacao(avaliacao, pessoaId) {
        let db;
        try {
            db = await databaseConnection();
            await db`
            INSERT INTO avaliacoes (stars, description, empresa_id, pessoa_id)
            VALUES (${avaliacao.numberStars}, ${avaliacao.textoAvaliacao}, ${avaliacao.EmpresaID}, ${pessoaId})
          `;
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.end();
            }
        }
    }

    async buscarAvaliacoes(id) {
        const db = await databaseConnection();
        try {
            const avaliacoes = await db`
            SELECT * FROM avaliacoes
            WHERE empresa_id = ${id}
          `;

            const empresa = await db`
            SELECT * FROM empresas
            WHERE id = ${id}
          `;

            return {
                avaliacoes: avaliacoes,
                empresa: empresa[0],
            };
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }
}
