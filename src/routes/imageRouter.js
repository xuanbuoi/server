const express = require('express')
const router = express.Router()
const ImageCtrl = require('../controllers/imageCtrl')

router.get('/images', ImageCtrl.getImages)
router.get('/images/:id', ImageCtrl.getImage)
router.post('/images/create', ImageCtrl.createImage)
router.delete('/images/:id', ImageCtrl.deleteImage)
router.put('/images/:id', ImageCtrl.updateCouple)

module.exports = router
