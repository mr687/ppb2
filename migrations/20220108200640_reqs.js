const tableName = 'reqs'
exports.up = function (knex) {
  return knex.schema.hasTable(tableName)
    .then(x => {
      if (!x) {
        return knex.schema.createTable(tableName, (table) => {
          table.increments('id').primary()
          table.string('name', 100).nullable().index().unique()
          table.string('password').nullable()
          table.timestamps(true, true)
        })
      }
    })
}
exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
}