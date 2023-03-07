const { mongoDBObjectModeling } = require('../shared/internalServices')

const Schema = mongoDBObjectModeling.Schema
let Token = new Schema({
    id: { type: String, required: true},
    token: { type: String, required: true},
})

module.exports = mongoDBObjectModeling.model('Token', Token)