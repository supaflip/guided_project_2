const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:2707";
const client = MongoClient(url);
const db_name = "swapi";

module.exports.call = async function call(operation, params, callback) {
    const db = client.db(db_name);

    // do stuff
}