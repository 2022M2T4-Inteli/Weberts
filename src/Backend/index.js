const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const hostname = "127.0.0.1";
const port = 3031;
const db = new sqlite3.Database("database.db")

const path = require("path");
const cors = require("cors");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static("../frontend/Parceiro"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/antecipacoesInfo", (req,res) =>{
  res.sendFile(
    path.resolve(__dirname + "/../frontend/Parceiro/pages/antecipacoesInfo.html")
  )});

app.get("/financeiro", (req,res) =>{
  res.sendFile(
    path.resolve(__dirname + "/../frontend/Parceiro/pages/financeiro.html")
  )});

app.get("/historico", (req,res) =>{
  res.sendFile(
    path.resolve(__dirname + "/../frontend/Parceiro/pages/historico.html")
  )});

  
app.post("/login", (req, res) => {
  const infos = req.body;
//   console.log(infos.email);
  db.get(
    `SELECT password_, id FROM usuarios WHERE email == '${infos.email}'`,
    (error, response) => {
      if (response) {
        console.log(response.password_, infos.password_);
        if (response.password_ == infos.password_) {
          res.cookie("id", response.id);
          res.sendFile(
            path.resolve(
              __dirname + "/../frontend/Parceiro/pages/dashboard.html"
            )
          );
        } else {
          res.send("Email ou senha incorreta, tente novamente!");
          res.end();
        }
      }
    }
  );
});

