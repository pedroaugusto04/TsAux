import { databaseConnection } from "../database/databaseConnection.js";

export class ForumDAO {
  async insertPost(post,pessoaId) {
    const db = await databaseConnection();

    try {
      await db`
              INSERT INTO posts (titulo,texto,pessoa_id)
              VALUES (${post.title}, ${post.text}, ${pessoaId})
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

  async buscarPosts() {
    const db = await databaseConnection();
    try {
      const empresas = await db`
              SELECT * FROM posts
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
