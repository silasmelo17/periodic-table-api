
const getData = ( start, end ) => {
  const data = require('./elements.json')
  return data.map( element => {
    delete element.id
    return element
  }).slice( start, end )
}

const insertDataRange = ( knex, start, end ) => () => {
  const data = getData( start, end )
  return knex('elements').insert(data);
}

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('elements').del()
    .then( insertDataRange( knex, 0, 69 ) )
    .then( insertDataRange( knex, 69, 118 ) )
};
