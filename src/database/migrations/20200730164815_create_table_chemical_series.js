
exports.up = knex => knex.schema
    .createTable( 'chemical_series', table => {
        table.increments( 'id' )
        table.text( 'name' )
    })

exports.down = knex => knex.schema.dropTable( 'chemical_series' )
