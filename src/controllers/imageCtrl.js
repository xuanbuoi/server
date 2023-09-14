const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ImageCtrl {
  async getImages(_, res) {
    const rs = await prisma.images.findMany()
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getImage(req, res) {
    const { id } = req.params
    const rs = await prisma.images.findUnique({
      where: { id }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async createImage(req, res) {
    const rs = await prisma.images.create({
      data: req.body
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async deleteImage(req, res) {
    const { id } = req.params
    const rs = await prisma.images.delete({
      where: { id }
    })

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async updateCouple(req, res) {
    const { id } = req.params
    delete req.body.id
    const rs = await prisma.images.update({
      where: { id },
      data: {
        ...req.body
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
}
module.exports = new ImageCtrl()
