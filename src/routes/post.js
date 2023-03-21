import express from 'express'
import * as controllers from '../controllers/post'

const router = express.Router()
router.get('/all', controllers.getPosts)
router.get('/limit', controllers.getLimitPosts)

export default router