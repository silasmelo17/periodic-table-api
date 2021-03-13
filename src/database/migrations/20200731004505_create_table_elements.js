
exports.up = knex => knex.schema.createTable( 'elements', table => { 
    table.increments('id'),
    table.text('name').unique().notNullable(),
    table.text('symbol').unique().notNullable(),
    table.float('atomicMass').notNullable(),
    table.integer('atomicNumber').unique().notNullable(),
    table.integer('family').notNullable(),
    table.integer('period').notNullable(),
    table.float('meltingPoint').nullable(),
    table.float('boilingPoint').nullable(),
    table.integer( 'chemicalSeriesId' ).references( 'id' ).inTable( 'chemical_series' );
})

exports.down =  knex => knex.schema.dropTable( 'elements' )
