import { databaseConnection } from '../database/databaseConnection.js';

export class PessoaDAO {

    async selectPessoas() {
        let db;
        try {
            db = await databaseConnection();
            const pessoas = await db `SELECT * FROM pessoas`;
            return pessoas;
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.end();
            }
        }
    }

    async selectPessoa(id) {
        const db = await databaseConnection();
        try {
            const pessoa = await db`
            SELECT * FROM Pessoas
            WHERE id = ${id}
          `;
            return pessoa;
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }

    async insertPessoa(pessoa) {
        const db = await databaseConnection();
        try {
            await db`
            INSERT INTO pessoas (nome, email, senha)
            VALUES (${pessoa.name}, ${pessoa.email}, ${pessoa.password})
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

    async verificaEmail(email) {
        const db = await databaseConnection();
        try {
            const resultado = await db`
            SELECT EXISTS (SELECT 1 FROM pessoas WHERE email = ${email}) AS emailexiste
          `;
            return resultado[0].emailexiste;
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }
    
    async buscaId(email){
        const db = await databaseConnection();
        try {
            const result = await db`
            SELECT id FROM pessoas WHERE email = ${email}
          `;
            return result[0];
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }
}