const {
    MongoClient,
    ObjectId
} = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE)
    return singleton;
}

async function findAll(collection) {
    const db = await connect();
    return db.collection(collection).findAll().toArray();
}

module.exports = {
    findAll
}

let findOne = async (collection, id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({
        '_id': new ObjectId(id)
    }).toArray();
    if (obj)
        return obj[0];
    return false;
}

let updateOne = async (collection, objeto, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, {
        $set: object
    });

    return result;
}