const bcrypt = require('bcrypt')
const db = require('../services/database')

const Req = function () {
  this._table = 'reqs'
}
Req.prototype.query = function () {
  return db(this._table)
}
Req.prototype.encryptPassword = function (text) {
  return bcrypt.hashSync(text, 8)
}
Req.prototype.validPassword = function (text, password) {
  return bcrypt.compare(text, password)
}

module.exports = new Req()