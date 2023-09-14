const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class CommentCtrl {
  async getComments(req, res) {
    const rs = await prisma.comments.findMany({
      include: {
        user: true
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }

  async getCommentsByProId(req, res) {
    const rs = await prisma.comments.findMany({
      where: {
        productId: req.params.id
      },
      include: {
        user: true
      }
    })
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
  async createComment(req, res) {
    const rs = await prisma.comments.create({
      data: req.body
    })
    if (rs) {
      await prisma.users.update({
        where: {
          id: req.body.userId
        },
        data: {
          money: {
            decrement: 100
          }
        }
      })
      const comments = await prisma.comments.findMany({
        where: {
          productId: req.body.productId
        }
      })
      const total = comments.reduce((acc, cur) => {
        return acc + cur.votes
      }, 0)

      await prisma.products.update({
        where: {
          id: req.body.productId
        },
        data: {
          votes: {
            set: total / comments.length
          }
        }
      })
    }
    if (rs) res.json(rs)
    else return res.status(400).json({ msg: 'Something went wrong' })
  }
}
module.exports = new CommentCtrl()
