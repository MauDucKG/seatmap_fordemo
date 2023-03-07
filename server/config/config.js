const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectDataBase = async () => {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log('Database connected');
    })
    .catch((error)=> {
        console.log('Error connecting to database');
    });
};

module.exports = connectDataBase;