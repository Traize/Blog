const { default: mongoose } = require("mongoose")
const ApiError = require("../exceptions/apiError")
const postModel = require("../models/post-model")
const tagModel = require("../models/tag-model")

class postController{
    async create(req, res, next){
        try {
            const {title, description, cover, img, tag} = req.body
            const post = await postModel.create({title, description, cover, img, tag})
            return res.json(post)
        } 
        catch (e) {
            next(e)            
        }
    }

    async getAll(req, res, next){
        try {
            const posts = await postModel.find({})
            return res.json(posts)
        } 
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params
            const post = await postModel.findById(id)
            if(!post){
                return res.status(400).json('Не существует поста с таким ID')
            }
            return res.json(post)
        } 
        catch (e) {
            next(e)
        }
    }

    async change(req, res, next){
        try {
            
            const {id} = req.params
            const {title, description, cover, img, tag} = req.body
            const changedPost = await postModel.findByIdAndUpdate(id, {title, description, cover, img, tag})
            return res.json(changedPost)
        } 
        catch (e) {
            next(e)
        }
    }
    
    async delete(req, res, next){
        try {
            const {id} = req.params
            const post = await postModel.findByIdAndDelete(id)
            return res.json(post)          
        }       
        catch (e){
            return console.log(e)
        }
    }
}
module.exports = new postController()