const Router = require('express')
const UserController = require('../controllers/User-controller')
const router = new Router()
const {body} = require('express-validator')


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max: 20}),
    UserController.registration)
router.post('/login',UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/', UserController.getUsers)

module.exports = router