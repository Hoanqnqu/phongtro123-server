import express from 'express'
import * as controllers from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()
router.get('/all', controllers.getPosts)
router.get('/limit', controllers.getLimitPosts)
router.get('/new-post', controllers.getNewPosts)

router.use(verifyToken)
router.post('/create-new',controllers.createNewPost)
router.get('/limit-admin',controllers.getLimitPostsAdmin)


export default router