import { ParceiroDAO } from "../dao/ParceiroDAO.js";

export class ParceiroController {

    constructor() {
        this.parceiroDAO = new ParceiroDAO();
    }

    async insertParceiro(dataParceiro,id,req,res) {
        await this.parceiroDAO.insertParceiro(dataParceiro,id);
        res.status(200).send('Empresa cadastrada com sucesso!')
    }
    
    async buscarParceiros(req, res) {
        try {
            const empresas = await this.parceiroDAO.buscarParceiros();
            res.status(200).json({
                data: empresas
            });
        } catch (error) {
            res.status(500).send('Erro ao buscar parceiros')
        }
    }
}
