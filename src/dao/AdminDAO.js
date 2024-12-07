import { databaseConnection } from "../database/databaseConnection.js";

export class AdminDAO {
  async buscarSolicitacoes() {
    const db = await databaseConnection();
    try {
      const solicitacoes = await db`
            SELECT * FROM solicitacoes`;
      return solicitacoes;
    } catch (error) {
      throw error;
    } finally {
      if (db) {
        await db.end();
      }
    }
  }

  async insertSolicitacao(solicitacao, pessoaId) {
    let db;
    try {
      db = await databaseConnection();
      await db`
            INSERT INTO empresas (nome,foto, pessoa_id)
            VALUES (${solicitacao.nome}, ${solicitacao.foto},${pessoaId})
          `;

      await db`
        DELETE FROM solicitacoes WHERE id = ${solicitacao.id};
        `;
    } catch (error) {
      throw error;
    } finally {
      if (db) {
        db.end();
      }
    }
  }

  async removeSolicitacao(id) {
    let db;
    try {
      db = await databaseConnection();
      await db`
        DELETE FROM solicitacoes WHERE id = ${id}
          `;
    } catch (error) {
      throw error;
    } finally {
      if (db) {
        db.end();
      }
    }
  }
}
