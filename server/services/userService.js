const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError')
const userModel = require('../models/user-model')
class userService {

    async registration(email, password){
        const candidate = await UserModel.findOne({email})
        if (candidate){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(){
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw new ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email, password){
        const user = await userModel.findOne({email})
        if(!user){
            throw ApiError.BadRequest('Пользователь не найден')
        }
        
        const isPassEqual = await bcrypt.compare(password, user.password)
        if(!isPassEqual){
            throw ApiError.BadRequest('Неверный пароль')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const user = await userModel.findById(userData.id)
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }

    }
    async getAllUsers(){
        const users = await UserModel.find()
        return users
    }

}

module.exports = new userService()