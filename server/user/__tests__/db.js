const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = undefined;

module.exports.connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const mongooseOpts  = {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    };
    await mongoose.connect(uri, mongooseOpts);
}

module.exports.closeDatabase = async () => {
    if(mongod) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    }
};

module.exports.clearDatabase = async () => {
    if (mongod) {    
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};

