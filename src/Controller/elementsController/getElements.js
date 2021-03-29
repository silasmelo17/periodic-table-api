
const { getFields, selectElements } = require('./structureSelect')



async function getElements( req, res ) {
	const fields = getFields(req)

	const result = await selectElements({},fields)
	
	return res.json(result)
}



module.exports = getElements
