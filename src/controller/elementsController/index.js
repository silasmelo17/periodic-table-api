
const { getFields, selectElements } = require('./structureSelect')
const { getConditionalThermal, getIntervalThermal } = require('./getTermalElements')


const tryCatchHelper = callback => ( req, res, next ) => {
	try {
		callback( req, res, next )
	} catch (error) {
		next(error)
	}
}



async function getSpecific( req, res ) {
	const { property, value } = req.params
	const fields = getFields(req)

	const result = await selectElements(fields)
		.where( property, value )

	res.json(result)
}

async function getElements( req, res ) {
	const fields = getFields(req)

	const result = await selectElements(fields)
	res.json(result)
}



module.exports = {
	getSpecific: tryCatchHelper(getSpecific),
	getElements: tryCatchHelper(getElements),
	getConditionalThermal: tryCatchHelper(getConditionalThermal),
	getIntervalThermal: tryCatchHelper(getIntervalThermal)
}
