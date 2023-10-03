const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const db_name = "swapi";

module.exports.call = async function call(operation, params, callback) {
    const db = client.db(db_name);

    switch(operation.toLowerCase()) {
        case 'get_all':
            try{
                const collection = db.collection(params.collection)
                const docs = await collection.find({}).toArray();
                callback({ body: docs, status: 200 })
            } catch (e) {
                console.log(e);
                callback({ body: false, status: 404});
            } finally {
                break;
            }
        
        case 'get_one':
            try{
                const collection = db.collection(params.collection)
                const doc = await collection.findOne({id: +params.id});
                callback({ body: doc, status: 200 })
            } catch (e) {
                console.log(e);
                callback({ body: false, status: 404});
            } finally {
                break;
            }

            

        case 'get_attr':
            try{
                const collection = db.collection(params.collection)
                const doc = await collection.findOne({id: +params.id});
                callback({ body: doc[params.attr], status: 200 })
            } catch (e) {
                console.log(e);
                callback({ body: false, status: 404});
            } finally {
                break;
            }

        default:
            callback({ status: "requested data not found", body: params });
            break;
    };

    console.log('call complete: ' + operation);
    // client.close();
    return 'call complete';
};

