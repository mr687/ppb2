require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      port : process.env.DB_PORT || 3306,
      user : process.env.DB_USERNAME || 'root',
      password : process.env.DB_PASSWORD || '',
      database : process.env.DB_NAME || ''
    },
    migrations: {
      tableName: 'schema_migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      port : process.env.DB_PORT || 3306,
      user : process.env.DB_USERNAME || 'root',
      password : process.env.DB_PASSWORD || '',
      database : process.env.DB_NAME || ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'schema_migrations'
    }
  }
}