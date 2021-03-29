
const { getFields, selectElements } = require('./structureSelect')



async function getSpecificElement( req, res ) {
	const { property, value } = req.params
	const fields = getFields(req)

	const where = {}
	where[property] = value

	const result = await selectElements( where, fields)

	res.json(result)
}



module.exports = getSpecificElement
