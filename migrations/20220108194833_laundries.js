const tableName = 'laundries'

exports.up = function (knex) {
  return knex.schema.hasTable(tableName)
    .then(x => {
      if (!x) {
        return knex.schema.createTable(tableName, (table) => {
          table.increments('id').primary()
          table.string('name', 100).nullable()
          table.string('address', 191).nullable()
          table.string('phone', 20).nullable()
          table.string('nim', 20).nullable()
          table.timestamps(true, true)
        })
      }
    })
}
exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
}