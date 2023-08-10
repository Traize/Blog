const Router = require('express')
const postController = require('../controllers/post-controller')
const router = new Router()

router.post('/', postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.put('/:id', postController.change)
router.delete('/:id', postController.delete)

module.exports = router