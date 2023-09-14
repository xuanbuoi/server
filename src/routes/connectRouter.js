const express = require('express')
const router = express.Router()
const ConnectCtrl = require('../controllers/connectCtrl')

router.get('/connects', ConnectCtrl.getConnects)
router.get('/connects/:id', ConnectCtrl.getConnect)
router.put('/connects/:id', ConnectCtrl.updateConnect)
router.delete('/connects/:id', ConnectCtrl.deleteConnect)
router.post('/connects/create', ConnectCtrl.addConnect)

module.exports = router
