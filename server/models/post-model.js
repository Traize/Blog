const {Schema, model, ObjectId } = require('mongoose')

const post = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String},
    cover: {type: String},
    tag: [{type:ObjectId, ref: 'Tag'}],
})

module.exports = model('Post', post)