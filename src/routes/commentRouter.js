const express = require('express')
const router = express.Router()
const CommentCtrl = require('../controllers/commentCtrl')
router.get('/comments/:id', CommentCtrl.getCommentsByProId)
router.post('/comments/create', CommentCtrl.createComment)
router.get('/comments', CommentCtrl.getComments)
module.exports = router
