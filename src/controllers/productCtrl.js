const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ProductCtrl {
  async getProducts(_, res) {
    res.json(
      await prisma.products.findMany({
        include: {
          comments: true
        }
      })
    )
  }
  async getProduct(req, res) {
    const rs = await prisma.products.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        comments: true
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async createProduct(req, res) {
    delete req.body.id
    const product = {
      ...req.body,
      price: Number(req.body.price),
      votes: Number(req.body.votes),
      purchases: Number(req.body.purchases)
    }
    const rs = await prisma.products.create({
      data: product
    })

    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async updateProduct(req, res) {
    const id = req.params.id
    const product = {
      ...req.body,
      price: Number(req.body.price),
      votes: Number(req.body.votes),
      purchases: Number(req.body.purchases),
      views: Number(req.body.views)
    }
    delete product.id
    delete product.comments
    const rs = await prisma.products.update({
      where: {
        id: id
      },
      data: product
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async deleteProduct(req, res) {
    const id = req.params.id
    await prisma.comments.deleteMany({
      where: {
        productId: id
      }
    })

    const rs = await prisma.products.delete({
      where: {
        id: id
      }
    })
    if (rs) {
      if (rs) res.json(rs)
      else return res.status(400).json({ msg: 'Something went wrong' })
    } else {
      return res.status(403)
    }
  }
}
module.exports = new ProductCtrl()
