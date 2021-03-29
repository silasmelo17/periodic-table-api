
const getSpecificElement = require('./getSpecificElement')
const getElements = require('./getElements')

const { getConditionalThermal, getIntervalThermal } = require('./getTermalElements')



const tryCatchHelper = callback => ( req, res, next ) => {
	try {
		callback( req, res, next )
	} catch (error) {
		next(error)
	}
}



module.exports = {
	getSpecific: tryCatchHelper(getSpecificElement),
	getElements: tryCatchHelper(getElements),
	getConditionalThermal: tryCatchHelper(getConditionalThermal),
	getIntervalThermal: tryCatchHelper(getIntervalThermal)
}
