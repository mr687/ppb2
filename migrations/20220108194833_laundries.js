const tableName = 'laundries'

exports.up = function (knex) {
  return knex.schema.hasTable(tableName)
    .then(x => {
      if (!x) {
        return knex.schema.createTable(tableName, (table) => {
          table.increments('id').primary()
          table.string('nama', 100).nullable()
          table.string('alamat', 191).nullable()
          table.string('nohp', 100).nullable()
          table.string('kota', 100).nullable()
          table.timestamps(true, true)
        })
      }
    })
}
exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
}