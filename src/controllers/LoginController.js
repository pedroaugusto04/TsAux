import { LoginDAO } from "../dao/LoginDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginController {
  constructor() {
    this.loginDAO = new LoginDAO();
  }

  async login(req, res) {
    let email = req.body.username;
    let password = req.body.password;
    try {
      const pessoa = await this.loginDAO.login(email);
      if (pessoa) {
        return new Promise(function (resolve, reject) {
          bcrypt.compare(password, pessoa.senha, function (err, hash) {
            if (err) {
              reject(err);
            } else {
              if (hash) {
                const secret = process.env.SECRET;
                const token = jwt.sign({ d: "dd" }, secret, {
                  expiresIn: 86400,
                });
                req.session.token = token;
                req.session.username = email;
                req.session.clientName = pessoa.nome;
                res.json({ success: true});
                resolve(hash);
              } else {
                reject("Senha incorreta!");
              }
            }
          });
        }).catch((err) => {
          res.status(401).json({
            message: err,
          });
        });
      } else {
        res.status(401).json({
          message: "Usuário não cadastrado!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Erro no servidor",
      });
    }
  }

  async logout(req, res) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({
          statusCode: 500,
          message: "Erro ao fazer logout!",
        });
      } else {
        res.json({ success: true });
      }
    });
  }
}
