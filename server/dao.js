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
                if (params.collection == 'films') {
                    params.collection = params.attr;
                    params.attr = 'films';
                }

                const collection = db.collection(`${params.attr}_${params.collection}`);
                const key = `${params.collection.slice(0, -1)}_id`;
                const docs = await collection.find({ [key]: + params.id }).toArray();

                const attr_key = `${params.attr.slice(0, -1)}_id`;
                const attr_collection = db.collection(params.attr);
                const attr_docs = await Promise.all(docs.map(async (doc) => await attr_collection.findOne({id: +doc[attr_key]})));
                callback({ body: attr_docs, status: 200 });
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

