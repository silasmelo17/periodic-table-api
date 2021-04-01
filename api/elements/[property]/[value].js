
const { getFields, selectElements } = require('../../../src/Util/structureSelect')


const getWhere = req => {
	const { property, value } = req.query

	const where = {}
	where[property] = value

	return where
}


module.exports = async function( req, res ) {
	const fields = getFields(req)
	const where = getWhere(req)

	const result = await selectElements(where, fields)
	res.json(result)
}
