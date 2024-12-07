import { ForumDAO } from "../dao/ForumDAO";

export class ForumController {

  constructor() {
    this.forumDAO = new ForumDAO();
  }

  async insertPost(pessoaId,req, res) {
    try {
      const post = req.body;
      await this.forumDAO.insertPost(post,pessoaId);
      res.status(201).send("Post cadastrado com sucesso!");
    } catch (error) {
      res.status(500).send("Erro interno ao cadastrar post");
    }
  }

  async buscarPosts(req, res) {
    try {
      const posts = await this.forumDAO.buscarPosts();
      res.status(200).json({
        data: posts
      });
    } catch (error) {
      res.status(500).send("Erro ao buscar posts");
    }
  }
}
