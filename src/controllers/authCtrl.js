const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv')
dotenv.config()
class AuthCtrl {
  async login(req, res) {
    const user = await prisma.users.findUnique({
      where: {
        phone: req.body.phone
      }
    })
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(403).json({ msg: 'Incorrect password.' })
    }
    delete user.password
    res.status(200).json(user)
  }
}

module.exports = new AuthCtrl()
