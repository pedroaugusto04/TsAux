import {AvaliacaoDAO} from '../dao/AvaliacaoDAO.js'
export class AvaliacaoController {

    constructor() {
        this.avaliacaoDAO = new AvaliacaoDAO();
    }

    async insertAvaliacao(id,req, res) {
        let avaliacao = req.body;
        await this.avaliacaoDAO.insertAvaliacao(avaliacao, id);
        res.status(201).send("Avaliação enviada com sucesso!")  
    }

    async buscarAvaliacoes(req, res) {
        const { id } = req.params;
        await this.avaliacaoDAO.buscarAvaliacoes(id)
            .then((result) => {
                const { avaliacoes, empresa } = result;
                res.status(200).json({
                    avaliacoes,
                    empresa
                });
            })

    }
}
