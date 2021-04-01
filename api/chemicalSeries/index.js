
const { ChemicalSeries } = require('../../src/Models')



module.exports = async function ( req, res, next ) {
    try {
        const result = await ChemicalSeries.find()
        return res.json(result)
    } catch ( error ) {
        next(error)
    }
}
