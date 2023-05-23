var express = require("express");
var app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req, res) => {
    res.status(200).send("<h1>API-CHAT</h1>");
}));

app.use("/", router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome": "API - CHAT",
        "versão": "0.1.0",
        "autor": "Lucas Meregali"
    })
}))

app.use("/salas", router.get("/salas", (req, res, next) => {
    const salaController = require("./controller/salaController")
    let resp = salaController.get();
    res.status(200).send(resp);
}))

app.use("/entrar", router.post("/entrar", async (req, res, next) => {
    const usuarioController = require("./controller/usuarioController")
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}))

app.use("/sair", router.post("/sair", async (req, res, next) => {
    const usuarioController = require("./controller/usuarioController")
    let resp = await usuarioController.sair(req.body.idUser);
    res.status(200).send(resp);
}))

app.use("/salas", router.post("/salas", async (req, res, next) => {
    if (await token.checkToken(req.hearders.token, req.headers.idUser, req.hearders.nick)) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({
            msg: "Token inválido"
        });
    }
}))

app.use("/salas/entrar",router.put("/sala/entrar", async(req,res)=>{
    if(!token.checkToken(req.hearders.token, req.headers.idUser, req.hearders.nick)){
        return false;
        let resp = await salaController.entrar(req.headers.idUser, req.query.idSala);
    }
}))

app.use("sala/mensagem/", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.hearders.token, req.headers.idUser, req.hearders.nick))
    return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp); 
}));

app.use("/sala/mensagens/", router.get("/sala/mensagens", async (req, res) => {
    if(!token.checkToken(req.hearders.token, req.headers.idUser, req.hearders.nick))
    return false;
    let resp = await salaController.getMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}));

module.exports = app;