const { default: mongoose } = require("mongoose")
const ApiError = require("../exceptions/apiError")
const Post = require("../models/post-model")
const postService = require("../services/postService")
const tagModel = require("../models/tag-model")

class postController{
    async create(req, res, next){
        try {
            const {title, description, cover, img, tag} = req.body
            const post = await Post.create({title, description, cover, img, tag})
            return res.json(post)
        } 
        catch (e) {
            next(e)            
        }
    }

    async getAll(req, res, next){
        try {
            let {page, limit} = req.query
            page = page || 1 
            limit = limit || 9
            let offset = page * limit - limit
            const posts = await Post.find({}).limit(limit).skip(offset).populate('tag', 'name')
            return res.json(posts)
        } 
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params
            console.log(id)
            if(!id){
                return res.status(400).json('Не существует поста с таким ID')
            }
            const post = await Post.findById(id).populate('tag', 'name')
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
            const changedPost = await postModel.findByIdAndUpdate(id, {title, description, cover, img, tag}).populate('tag', 'name')
            return res.json(changedPost)
        } 
        catch (e) {
            next(e)
        }
    }
    
    async deleteOne(req, res, next){
        try {
            const {id} = req.param
            const post = await postModel.findByIdAndDelete(id) 
            return res.json(console.log('Пост удалён'))          
        }
        
        catch (e) {
        }
    }
}
module.exports = new postController()