
const { getFields, selectElements } = require('../../src/Util/structureSelect')



module.exports = async function( req, res ) {
	const fields = getFields(req)

	const result = await selectElements({},fields)
	
	return res.json(result)
}
