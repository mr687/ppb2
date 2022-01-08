const Req = require('../models/Req');

const apiKey = '123'
module.exports = {
  async createReq({ body }, res, next) {
    const { name, password, key } = body
    if (key !== apiKey) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid API key'
      })
      return
    }
    try {
      await Req.query().insert({
        name: name.substr(0,100).toLowerCase(),
        password: Req.encryptPassword(password.toString()),
      })
      res.json({
        status: 'success',
        message: 'new user created',
      })
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({
          status: 'error',
          message: 'username already exists'
        })
        return
      }
      next(err)
    }
  }
}