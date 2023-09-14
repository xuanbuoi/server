const express = require('express')
const router = express.Router()
const BankingCtrl = require('../controllers/bankingCtrl')
router.get('/banking/deposite', BankingCtrl.getDepositeAllRequest)
router.get('/banking/deposite-history/:id', BankingCtrl.getDepositeHistory)
router.post('/banking/deposite', BankingCtrl.requestDeposite)
router.put('/banking/deposite/:id', BankingCtrl.rejectDeposite)

router.get('/banking/withdraw', BankingCtrl.getWithdrawAllRequest)
router.get('/banking/withdraw-history/:id', BankingCtrl.getWithdrawHistory)
router.post('/banking/withdraw', BankingCtrl.requestWithdraw)
router.put('/banking/withdraw/:id', BankingCtrl.rejectWithdraw)

router.put('/banking/update', BankingCtrl.updateStatus)

router.get('/banking/owner', BankingCtrl.getAllOwnBanking)
router.post('/banking/owner', BankingCtrl.createOwnBanking)
router.delete('/banking/owner/:id', BankingCtrl.deleteOwnBanking)

router.get('/banking/history', BankingCtrl.history)
router.post('/banking/history', BankingCtrl.changeMoneyByAdmin)

module.exports = router
