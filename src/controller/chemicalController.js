const knex = require('../database/index.js')

module.exports = {
  
  index: async ( req, res, next ) => {
    try {
      const result = await knex.select('*').from('chemical_series')
      res.json(result)
    } catch ( error ) {
      next(error)
    }
  }

}
