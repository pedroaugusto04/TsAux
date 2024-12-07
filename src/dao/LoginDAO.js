import { databaseConnection } from '../database/databaseConnection.js';

export class LoginDAO {
    async login(email) {
        const db = await databaseConnection();
        try {
            const pessoa = await db `SELECT * FROM pessoas WHERE email = ${email} LIMIT 1`;
            return pessoa[0];
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (db) {
                await db.end();
            }
        }
    }
}