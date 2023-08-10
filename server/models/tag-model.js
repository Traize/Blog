const {Schema, model, ObjectId} = require('mongoose')



const tag = new Schema({
    name: {type: String, required: true}
})

module.exports = model('Tag', tag)