
exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('chemical_series').del()
    .then( () => {
      const data = require('./chemical.json')
      return knex('chemical_series').insert(data);
    });
};
