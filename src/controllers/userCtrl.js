const bcrypt = require('bcrypt')
const { unlink } = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class UserCtrl {
  async addUser(req, res) {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    delete req.body.cf_password
    const user = {
      ...req.body,
      password: hashPassword
    }
    const rs = await prisma.users.create({
      data: user
    })
    if (!rs) {
      return res.status(400)
    }
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async getUsers(req, res) {
    const rs = await prisma.users.findMany()

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async getUser(req, res) {
    const rs = await prisma.users.findUnique({
      where: {
        id: req.params.id
      }
    })
    delete rs.password

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async updateUser(req, res) {
    const id = req.params.id
    delete req.body.id
    req.body.createdAt = new Date(req.body.createdAt)
    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10)
      await prisma.users.update({
        where: {
          id: id
        },
        data: {
          password: hashPassword
        }
      })
    }
    const rs = await prisma.users.update({
      where: {
        id: id
      },
      data: {
        avatar: req.body.avatar,
        name: req.body.name,
        phone: req.body.phone,
        amoutBlock: req.body.amoutBlock,
        createdAt: req.body.createdAt
      }
    })

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async deleteUser(req, res) {
    const rs = await prisma.users.delete({
      where: {
        id: req.params.id
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async updateMoney(req, res) {
    const { id, bonus } = req.body
    const user = await prisma.users.findUnique({
      where: {
        id
      }
    })
    await prisma.users.update({
      where: {
        id
      },
      data: {
        money: user.money + bonus
      }
    })
  }

  async updateBlocked(req, res) {
    const { id, blocked } = req.body
    await prisma.users.update({
      where: {
        id
      },
      data: {
        blocked
      }
    })

    res.json({ msg: 'success' })
  }
}
module.exports = new UserCtrl()
