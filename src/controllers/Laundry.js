const req = require('express/lib/request')
const Laundry = require('../models/Laundry')
const Req = require('../models/Req')
const validate = ({ body, res }) => {
  if (body['name'] && typeof body['name'] === 'string' && body['name'].length > 0 && body['name'].length < 100 &&
    body['address'] && typeof body['address'] === 'string' && body['address'].length > 0 && body['address'].length < 191 &&
    body['phone'] && typeof body['phone'] === 'string' && body['phone'].length > 0 && body['phone'].length < 20 &&
    body['nim'] && typeof body['nim'] === 'string' && body['nim'].length > 0 && body['nim'].length < 20) {
    req.validated = {
      name: body['name'],
      address: body['address'],
      phone: body['phone'],
      nim: body['nim']
    }
    return
  }
  res.status(422).send({
    status: 'error',
    message: 'invalid request body'
  })
}

module.exports = {
  async middleware({ headers, params: { user } }, res, next) {
    const acc = await Req.query().where('name', user).select('id', 'password').first()
    const key = headers['pi-key'] || null
    if (!acc) {
      res.status(404).send({
        status: 'error',
        message: 'user not found'
      })
      return
    }
    if (await Req.validPassword(key, acc.password)) {
      return next()
    }
    res.status(401).send({
      status: 'error',
      message: 'invalid password'
    })
  },
  async getLaundries(req, res) {
    const laundries = await Laundry.query()
      .select('id', 'name', 'address', 'phone', 'nim', 'created_at')
    res.json({
      status: 'success',
      message: 'laundries retrieved',
      data: laundries
    })
  },
  async createLaundry(req, res) {
    validate(req)
    if (!req.validated) return
    try {
      await Laundry.query().insert(req.validated)
      res.json({
        status: 'success',
        message: 'laundry created'
      })
    } catch (err) {
      next(err)
    }
  },
  async getLaundry({ params: { laundryId } }, res) {
    const laundry = await Laundry.query().where('id', laundryId).select('id', 'name', 'address', 'phone', 'nim', 'created_at').first()
    if (!laundry) {
      res.status(404).send({
        status: 'error',
        message: 'laundry not found'
      })
      return
    }
    res.json({
      status: 'success',
      message: 'laundry retrieved',
      data: laundry
    })
  },
  async updateLaundry(req, res) {
    validate(req)
    if (!req.validated) return
    const { params: { laundryId } } = req
    try {
      await Laundry.query().where('id', laundryId).update({
        ...req.validated,
        updated_at: new Date()
      })
      res.json({
        status: 'success',
        message: 'laundry updated'
      })
    } catch (err) {
      next(err)
    }
  },
  async deleteLaundry({ params: { laundryId } }, res) {
    try {
      await Laundry.query().where('id', laundryId).delete()
      res.json({
        status: 'success',
        message: 'laundry deleted'
      })
    } catch (err) {
      next(err)
    }
  }
}