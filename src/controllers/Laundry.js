const req = require('express/lib/request')
const Laundry = require('../models/Laundry')
const Req = require('../models/Req')
const validate = ({ body, res }) => {
  if (body['nama'] && typeof body['nama'] === 'string' && body['nama'].length > 0 && body['nama'].length < 100 &&
    body['alamat'] && typeof body['alamat'] === 'string' && body['alamat'].length > 0 && body['alamat'].length < 191 &&
    body['nohp'] && typeof body['nohp'] === 'string' && body['nohp'].length > 0 && body['nohp'].length < 20 &&
    body['kota'] && typeof body['kota'] === 'string' && body['kota'].length > 0 && body['kota'].length < 20) {
    req.validated = {
      nama: body['nama'],
      alamat: body['alamat'],
      nohp: body['nohp'],
      kota: body['kota']
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
      .select('id', 'nama', 'alamat', 'nohp', 'kota', 'created_at')
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
    const laundry = await Laundry.query().where('id', laundryId).select('id', 'nama', 'alamat', 'nohp', 'kota', 'created_at').first()
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