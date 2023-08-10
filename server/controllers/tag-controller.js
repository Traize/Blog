const tagModel = require("../models/tag-model")

class tagController{
    async create(req, res, next){
        try {
            const {name} = req.body
            const tag = new tagModel({name, posts: req.post.id})
            await tag.save()
            return res.json({tag})
        } 
        catch (e) {
        }
    }
    async update(req, res, next){
        try {
            const {id} = req.params
            const {name, posts} = req.body
            const tag = await tagModel.findByIdAndUpdate(id, {name, posts} ).populate('posts', 'title')
            return res.json(tag)
        } 
        catch (e) {
            return console.log(e)
        }
    }
    async getAll(req, res, next){
        try {
            const tags = await tagModel.find({}).populate('posts', 'title')
            return res.json({tags})
        } catch (error) {
            
        }
    }
    async deleteOne(req, res, next){
        try {
            const id = req.params
            const deleteTag = await tagModel.findOneAndDelete(id)
            return res.json('Тэг Удалён')
        } catch (error) {
            
        }
    }
}

module.exports = new tagController()