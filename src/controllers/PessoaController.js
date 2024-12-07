import { PessoaDAO } from "../dao/PessoaDAO.js";
import bcrypt from "bcryptjs";

export class PessoaController {

    constructor() {
        this.pessoaDAO = new PessoaDAO();
    }

    async selectPessoas(req, res) {
        const pessoas = await this.pessoaDAO.selectPessoas();
        res.status(200).json(pessoas);
    }

    async selectPessoa(req, res) {
        let id = req.body.id;
        const pessoa = await this.pessoaDAO.selectPessoa(id);
        res.status(200).json(pessoa);
    }

    async insertPessoa(req, res) {
        let pessoa = req.body;
        pessoa.password = await bcrypt.hash(pessoa.password,8);
        await this.pessoaDAO.insertPessoa(pessoa);
        res.status(201).send('Usuário cadastrado com sucesso!')
    }

    async verificaEmail(req,res){
        let email = req.body.email;
        const emailExiste = await this.pessoaDAO.verificaEmail(email);
        if (emailExiste){
            res.status(400).type('text').send("Email já utilizado");
            return;
        }
        res.status(200).json();
    }

    async buscaId(req,res){
        let email = req.session.username;
        const id = await this.pessoaDAO.buscaId(email);
        return id.id;
    }
}

