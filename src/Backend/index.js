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

/*SERVIDOR DE PÁGINAS HTML - FRONTEND */

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

  app.get("/antecipacoes", (req,res) =>{
    res.sendFile(
      path.resolve(__dirname + "/../frontend/Parceiro/pages/antecipacoes.html")
    )});

    app.get("/dashboard", (req,res) =>{
      res.sendFile(
        path.resolve(__dirname + "/../frontend/Parceiro/pages/dashboard.html")
      )});

  /*SERVIDOR API - ENDPOINTS (ACESSO AO BANCO DE DADOS) */
  
//LOGIN
app.post("/login", (req, res) => {
  const infos = req.body;
  db.get(
    `SELECT senha, id FROM login WHERE email == '${infos.email}'`,
    (error, response) => {
      if (response) {
        console.log(response.senha, infos.senha);
        if (response.senha == infos.senha) {
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

//GET VALOR ANTECIPAVEL
app.get("/valor1", (req, res) => {
  db.get(
    `SELECT SUM(valor) FROM reserva`,
    (error, data) => {
      res.json(data)
    }
  );
});

//GET VALOR ANTECIPADO
app.get("/valor2", (req, res) => {
  db.get(
    `SELECT SUM(montante) FROM antecipacao`,
    (error, data) => {
      res.json(data)
    }
  );
});

//GET MES1
app.get("/mes1", (req, res) => {
  db.get(
    `SELECT SUM(montante) FROM antecipacao WHERE data_recebimento == '01/2022'`,
    (error, data) => {
      res.json(data)
    }
  );
});

//GET MES2
app.get("/mes2", (req, res) => {
  db.get(
    `SELECT SUM(montante) FROM antecipacao WHERE data_recebimento == '02/2022'`,
    (error, data) => {
      res.json(data)
    }
  );
});

//Dados para página de solicitação

app.get("/hotelReserva", (req, res) => {
  db.all(
    'SELECT hotel.nome, reserva.code, reserva.data_checkout, reserva.valor FROM reserva, hotel WHERE reserva.hotel_id = hotel.id ORDER BY hotel.id',
    (error, data) => {
      res.json(data)
    }
  );
});

app.get("/stateFilter", (req, res) => {
  db.all(
    `SELECT DISTINCT (estado) FROM hotel `,
    (error, data) => {
      res.json(data)
    }
  )
})
app.get("/antecipations?states=[]", (req, res) => {
  var stateFiltered = JSON.parse(req.query.state);
  console.log(stateFiltered)
  if (!stateFiltered) { 
    db.get( 
      `SELECT SUM(estado) FROM hotel`,
      (error, data) => {
        res.json(data)
      }
    )
  } else {
    db.get(
      `SELECT SUM(estado) FROM hotel WHERE estado in ${stateFiltered}`,
      (error, data) => {
        res.json(data)
      }
    )
  }
})