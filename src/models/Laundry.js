const db = require('../services/database')
const Laundry = function () {
  this._table = 'laundries'
}
Laundry.prototype.query = function () {
  return db(this._table)
}

module.exports = new Laundry()