import cors from "cors";
import express from "express";
import router from "./src/routes/routes.js";
import { createTable } from "./src/utils/table.js";
import session from "express-session";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(
  session({
    secret: "asldqjeghgfgwp1124fd",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  express.static(path.join(__dirname, "/public/"), {
    maxAge: "5d",
  })
);
app.use(router);
createTable();

app.listen(3000);
