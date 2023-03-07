const { mongoDBObjectModeling } = require('../shared/internalServices')

const Schema = mongoDBObjectModeling.Schema
let User = new Schema({
    fullname: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}, 
    role: { type: String, required: true},
    image: String
})

module.exports = mongoDBObjectModeling.model('User', User)