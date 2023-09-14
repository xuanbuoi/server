const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv')
dotenv.config()

class BankingCtrl {
  async requestDeposite(req, res) {
    const { amount, select, user, content } = req.body
    delete select.id
    const deposite = {
      ...select,
      amount: Number(amount),
      transactionType: 'deposite',
      userId: user.id,
      content
    }
    const rs = await prisma.bankingHistory.create({
      data: deposite
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getDepositeAllRequest(req, res) {
    const rs = await prisma.bankingHistory.findMany({
      where: {
        status: 'pending',
        transactionType: 'deposite'
      },
      include: {
        user: true
      }
    })
    rs.map((item) => {
      delete item.user.password
      delete item.userId
      return item
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async rejectDeposite(req, res) {
    const rs = await prisma.bankingHistory.update({
      where: {
        id: req.params.id
      },
      data: {
        status: 'reject'
      }
    })

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async updateStatus(req, res) {
    const {
      selected: {
        user: { id: userId, money },
        id,
        amount,
        transactionType
      },
      status
    } = req.body

    const rs = await prisma.bankingHistory.update({
      where: {
        id
      },
      data: {
        status
      }
    })
    if (rs)
      await prisma.users.update({
        where: {
          id: userId
        },
        data: {
          money:
            transactionType === 'deposite' ? money + amount : money - amount
        }
      })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getDepositeHistory(req, res) {
    if (req.params.id !== 'undefined') {
      const rs = await prisma.bankingHistory.findMany({
        where: {
          userId: req.params.id,
          transactionType: 'deposite'
        }
      })
      if (rs) res.json(rs)
      else return res.status(400).json({ msg: 'Something went wrong' })
    }
  }

  async requestWithdraw(req, res) {
    const userId = req.body.user.id
    delete req.body.user
    const withdraw = {
      ...req.body,
      amount: Number(req.body.amount),
      transactionType: 'withdraw',
      userId
    }
    const rs = await prisma.bankingHistory.create({
      data: withdraw
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getWithdrawAllRequest(req, res) {
    const rs = await prisma.bankingHistory.findMany({
      where: {
        status: 'pending',
        transactionType: 'withdraw'
      },
      include: {
        user: true
      }
    })
    rs.map((item) => {
      delete item.user.password
      delete item.userId
      return item
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getWithdrawHistory(req, res) {
    if (req.params.id !== 'undefined') {
      const rs = await prisma.bankingHistory.findMany({
        where: {
          userId: req.params.id,
          transactionType: 'withdraw'
        }
      })

      if (rs) res.json(rs)
      else return res.status(400).json({ msg: 'Something went wrong' })
    }
  }

  async rejectWithdraw(req, res) {
    const rs = await prisma.bankingHistory.update({
      where: {
        id: req.params.id
      },
      data: {
        status: 'reject'
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getAllOwnBanking(req, res) {
    const rs = await prisma.adminBank.findMany()
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async createOwnBanking(req, res) {
    const rs = await prisma.adminBank.create({
      data: req.body
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async deleteOwnBanking(req, res) {
    const rs = await prisma.adminBank.delete({
      where: {
        id: req.params.id
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async history(req, res) {
    const rs = await prisma.bankingHistory.findMany({
      include: {
        user: true
      }
    })
    rs.sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async changeMoneyByAdmin(req, res) {
    const {
      amount,
      user: { money, id },
      transactionType
    } = req.body
    const rs = await prisma.bankingHistory.create({
      data: {
        amount: Number(amount),
        transactionType,
        status: 'accept',
        userId: id
      }
    })
    if (rs)
      await prisma.users.update({
        where: {
          id
        },
        data: {
          money:
            transactionType === 'deposite'
              ? money + Number(amount)
              : money - Number(amount)
        }
      })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
}

module.exports = new BankingCtrl()
