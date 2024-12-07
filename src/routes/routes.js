import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

import { AvaliacaoController } from "../controllers/AvaliacaoController.js";
import { LoginController } from "../controllers/LoginController.js";
import { ParceiroController } from "../controllers/ParceiroController.js";
import { PessoaController } from "../controllers/PessoaController.js";
import { AdminController } from "../controllers/AdminController.js";
import { enviarEmail } from "../controllers/EmailController.js";
import { uploadFile } from "../utils/fileUpload.js";
import { upload } from "../utils/fileParser.js";
import { ArtigoController } from "../controllers/ArtigoController.js";

const AvaliacaoControllerImpl = new AvaliacaoController();
const LoginControllerImpl = new LoginController();
const ParceiroControllerImpl = new ParceiroController();
const PessoaControllerImpl = new PessoaController();
const AdminControllerImpl = new AdminController();
const ArtigoControllerImpl = new ArtigoController();

const sessionChecker = (req, res, next) => {
  if (req.session.token) {
    next();
  } else {
    res.status(401).send("Faça login para realizar esta ação!");
  }
};

const adminChecker = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.status(401);
  }
};

const grantAdmin = (req, res, next) => {
  if (
    req.body.username === process.env.EMAIL_ADMIN &&
    req.body.password === process.env.PASSWORD_ADMIN
  ) {
    req.session.admin = true;
  }
  next();
};

router.get("/", (req, res) => {
  const homePath = path.join(__dirname, "../../index.html");
  res.sendFile(homePath);
});

router.get("/pessoas", (req, res) =>
  PessoaControllerImpl.selectPessoas(req, res)
);
router.get("/pessoa", (req, res) =>
  PessoaControllerImpl.selectPessoa(req, res)
);
router.post("/pessoa", (req, res) =>
  PessoaControllerImpl.insertPessoa(req, res)
);
router.post("/send-email", enviarEmail);
router.post("/parceiros", sessionChecker, upload.single('image'), async (req, res) => {
  const downloadUrl = await uploadFile(req.file);
  const dataParceiro = {
    name: req.body.name,
    imagePath: downloadUrl,
  };
  const pessoaId = await PessoaControllerImpl.buscaId(req, res);
  ParceiroControllerImpl.insertParceiro(dataParceiro, pessoaId, req, res);
});

router.post("/avaliacoes", sessionChecker, async (req, res) => {
  const pessoaId = await PessoaControllerImpl.buscaId(req, res);
  AvaliacaoControllerImpl.insertAvaliacao(pessoaId, req, res);
});
router.get("/parceiros", (req, res) =>
  ParceiroControllerImpl.buscarParceiros(req, res)
);
router.get("/pages/avaliacao-empresa/:id", (req, res) =>
  AvaliacaoControllerImpl.buscarAvaliacoes(req, res)
);
router.post("/login", grantAdmin, (req, res) =>
  LoginControllerImpl.login(req, res)
);
router.get("/logout", (req, res) => LoginControllerImpl.logout(req, res));
router.get("/sessionUserName", (req, res) => {
  const username = req.session.clientName;
  if (username) {
    res.status(200).json(username);
  } else {
    res.status(401).json("");
  }
});
router.post("/pessoa/email", (req, res) =>
  PessoaControllerImpl.verificaEmail(req, res)
);
router.get("/admin", sessionChecker, adminChecker, (req, res) =>
  AdminControllerImpl.buscarSolicitacoes(req, res)
);
router.post("/admin", sessionChecker, adminChecker, async (req, res) => {
  const pessoaId = await PessoaControllerImpl.buscaId(req, res);
  AdminControllerImpl.confirmarSolicitacao(req, res, pessoaId);
});
router.delete("/admin/:id", sessionChecker, adminChecker, (req, res) =>
  AdminControllerImpl.removerSolicitacao(req, res)
);

router.get("/artigos",(req,res) => {
  ArtigoControllerImpl.buscarArtigos(req,res);
});

export default router;
