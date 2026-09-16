import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { adminOnly } from '../middlewares/roleMiddleware.js'
import { create,getAll,getOne,update,remove } from '../controllers/categoryController.js'
const router = express.Router()

router.post('/',protect,adminOnly,create)
router.put('/:id',protect,adminOnly,update)
router.delete('/:id',protect,adminOnly,remove)
router.get('/',getAll)
router.get('/:id',getOne)
export default router