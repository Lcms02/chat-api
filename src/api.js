var express = require("express");
var app = express();

const usuarioController = require("./controller/usuarioController");
const salaController = require("./controller/salaController");
const tokenUtil = require("./util/token");
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const router = express.Router();

app.use('/', router.get('/', (req, res, next) => {
    res.send("API OK");
}));

app.use('/', router.get('/sobre', (req, res, next) => {
    res.send({
        "nome": "API de Chat",
        "versao": "1.0.0",
        "status": "em produção"
    });
}));

app.use('/entrar', router.post('/entrar', async (req, res, next) => {
    let resp = await usuarioController.entrar(req.body.nick);
    if (resp) {
        res.send(resp);
    } else {
        res.send({
            "msg": "erro"
        });
    }
}));

app.use('/salas', router.get('/salas', async (req, res, next) => {
    if (await tokenUtil.checktoken(req.headers.token, req.headers.idUser, req.headers.timestamp)) {
        let resp = await salaController.get();
        res.send(resp);
    } else {
        res.send({
            "msg": "erro, usuário não autenticado"
        });
    }
}));

app.use('/salas/entrar', router.get('/salas/entrar', async (req, res, next) => {
    if (await tokenUtil.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    let resp = await salaController.entrar(req.headers.idUser, req.query.idSala);
    req.send(resp);
}));

app.use('/sala/mensagens', router.get('/sala/mensagens', async (req, res, next) => {
    if (!tokenUtil.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    req.send(resp);
}));

module.exports = app;