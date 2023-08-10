const Router = require('express')
const tagController = require('../controllers/tag-controller')

const router = new Router()

router.post('/', tagController.create)
router.put('/:id', tagController.update)
router.get('/', tagController.getAll)
router.delete('/:id', tagController.deleteOne)



module.exports = router