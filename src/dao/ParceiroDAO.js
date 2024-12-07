import { databaseConnection } from '../database/databaseConnection.js';

export class ParceiroDAO {
    async insertParceiro(dataParceiro, pessoaId) {
        const db = await databaseConnection();
        try {
            await db`
              INSERT INTO solicitacoes (nome, foto, pessoa_id)
              VALUES (${dataParceiro.name}, ${dataParceiro.imagePath}, ${pessoaId})
            `;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }

    async buscarParceiros() {
        const db = await databaseConnection();
        try {
            const empresas = await db`
              SELECT * FROM empresas
            `;
            return empresas;
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }
}
