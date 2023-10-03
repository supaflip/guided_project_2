const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:2707";
const client = new MongoClient(url);
const db_name = "swapi";

module.exports.call = async function call(operation, params, callback) {
    const db = client.db(db_name);

    switch(operation.toLowerCase()) {
        case 'get_all':
            callback({ body: [params.collection]});
            break;
        
        case 'get_one':
            callback({ body: [params.collection, params.id]});
            break;

        case 'get_attr':
            callback({ body: [params.collection, params.id, params.attr]})
            break;

        default:
            callback({ status: "requested data not found", body: params });
            break;
    };

    console.log('call complete: ' + operation);
    client.close();
    return 'call complete';
};

