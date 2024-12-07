import { AdminDAO } from "../dao/AdminDAO.js";
export class AdminController {
  constructor() {
    this.adminDAO = new AdminDAO();
  }

  async buscarSolicitacoes(req, res) {
    await this.adminDAO.buscarSolicitacoes().then((solicitacoes) => {
      res.status(200).json(solicitacoes);
    });
  }

  async confirmarSolicitacao(req, res, pessoaId) {
    let solicitacao = req.body;
    await this.adminDAO.insertSolicitacao(solicitacao, pessoaId);
    res.status(201).send("Solicitação enviada com sucesso!");
  }

  async removerSolicitacao(req, res) {
    const { id } = req.params;
    await this.adminDAO.removeSolicitacao(id).then(() => {
      res.status(204);
    });
  }
}
