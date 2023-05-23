const db = require("./db");
async function registrarUsuario(nick) {
    return await db.insertOne("usuario", {
        "nick": nick
    })
}

module.exports = { registrarUsuario }

async function insertedOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let buscarUsuario = async (iduser) => {
    let user = await db.findOne("usuario", iduser);
    return user;
}

let alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user,{_id:user._id});
}