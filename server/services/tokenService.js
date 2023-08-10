const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class tokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }
    async findToken(refreshToken){
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
    
    async validateAccessToken(token){
        try {
            const userData = jwt.verify(token, JWT_ACCESS_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    async validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, JWT_REFRESH_KEY)
            return userData
        } catch (e) {
            
        }
    }
}

module.exports = new tokenService()