const db = require("./db");

function listarSalas() {
    let salas =  db.findAll("salas");
    return salas;
}

module.exports = {
    listarSalas
}

let buscarSala = async (idsala) => {
    return db.findOne("salas",idsala);
}

let atualizarMensagens = async (sala) => {
    return await db.updateOne("salas", sala, {_id:sala._id});
}

let buscarMensagens = async (idsala, timestamp) => {
    let sala = await buscarSala(idsala);
    if(sala.msgs){
        let msgs=[];
        sala.msgs.forEach((msg)=>{
            if(msg.timestamp >= timestamp){
                msgs.push(msg);
            }
        })
        return msgs;
    }
    return [];
}