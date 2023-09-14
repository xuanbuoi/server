const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/userCtrl')

router.get('/users', UserCtrl.getUsers)
router.get('/users/:id', UserCtrl.getUser)
router.put('/users/updateMoney', UserCtrl.updateMoney)
router.put('/users/blocked', UserCtrl.updateBlocked)
router.put('/users/:id', UserCtrl.updateUser)
router.delete('/users/:id', UserCtrl.deleteUser)
router.post('/users/create', UserCtrl.addUser)

module.exports = router
