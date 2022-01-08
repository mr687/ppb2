const Knex = require('knex').default
const config = require('../../knexfile')
const database = Knex(config[process.env.NODE_ENV || 'development'])
module.exports = database