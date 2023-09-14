const bcrypt = require('bcrypt')
const { unlink } = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class ConnectCtrl {
  async addConnect(req, res) {
    await prisma.connects.create({
      data: {
        address: req.body.address,
        job: req.body.job,
        favorite: req.body.favorite,
        avatar: req.body.avatar,
        name: req.body.name,
        age: Number(req.body.age),
        gender: req.body.gender
      }
    })
    res.json({ message: 'Add connect successfully' })
  }
  async getConnects(req, res) {
    const rs = await prisma.connects.findMany()
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async getConnect(req, res) {
    res.json(
      await prisma.connects.findUnique({
        where: {
          id: req.params.id
        }
      })
    )
  }
  async updateConnect(req, res) {
    const id = req.params.id
    delete req.body.id
    const rs = await prisma.connects.update({
      where: {
        id: id
      },
      data: {
        address: req.body.address,
        job: req.body.job,
        favorite: req.body.favorite,
        avatar: req.body.avatar,
        name: req.body.name,
        age: Number(req.body.age),
        gender: req.body.gender
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async deleteConnect(req, res) {
    const rs = await prisma.connects.delete({
      where: {
        id: req.params.id
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
}
module.exports = new ConnectCtrl()
