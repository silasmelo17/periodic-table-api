
const { ChemicalSeries } = require('../Models')


module.exports = {
  
  index: async ( req, res, next ) => {
    try {
      const result = await ChemicalSeries.find()
      return res.json(result)
    } catch ( error ) {
      next(error)
    }
  }

}
