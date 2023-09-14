const express = require('express')
const router = express.Router()
const AuthCtrl = require('../controllers/authCtrl')
router.post('/auth/login', AuthCtrl.login)
module.exports = router
