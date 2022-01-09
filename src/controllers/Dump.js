const db = require('../services/database')
const mysqlDump = require('mysqldump')
const config = require('../../knexfile')

async function dump(filename) {
  if (!filename) {
    filename = `laundry_sql_dump_${Date.now()}`
  }
  const options = {
    ...config[process.env.NODE_ENV || 'development'],
    // dumpToFile: `${filename}.sql`,
  }
  return await mysqlDump(options)
}

module.exports = {
  async getFileDump(_, res, next) {
    try {
      const { dump: { schema, data, trigger } } = await dump(`laundry_sql_dump_${Date.now()}`)
      res.set('Content-Type', 'text/plain')
      res.send([schema, data, trigger].join('\n').replaceAll(' COLLATE = utf8mb4_0900_ai_ci', ''))
    } catch (err) {
      next(err)
    }
  }
}