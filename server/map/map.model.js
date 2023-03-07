const { mongoDBObjectModeling } = require('../shared/internalServices')

const Schema = mongoDBObjectModeling.Schema
let mapModel = new Schema({
    name: {type: String, required: true},
    layout: {type: Array, required: true},
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    maxSeat: {type: Number, required: true}
})

module.exports = mongoDBObjectModeling.model('mapModel', mapModel)