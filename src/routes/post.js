import express from 'express'
import * as controllers from '../controllers/post'

const router = express.Router()
router.get('/all', controllers.getPosts)
router.get('/limit', controllers.getLimitPosts)
router.get('/new-post', controllers.getNewPosts)


export default router