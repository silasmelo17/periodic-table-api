
const { Elements } = require('../../Models')



const allowedFields = [ 
    '_id', 'name', 'symbol', 'atomicMass', 'atomicNumber', 
    'family', 'period', 'meltingPoint', 'boilingPoint', 'chemicalSeries',
]



const getAllowedFields = fields => fields.split(',')
    .filter( field => allowedFields
        .some( allowedField => field === allowedField ) )

function getFields ( req ) {
	const { fields } = req.query
	
	return fields !== undefined 
		? getAllowedFields(fields, allowedFields)
		: []
}



const isPopulate = fields => 
    fields.some( field => field === 'chemicalSeries' ) 
    || fields.length === 0

const selectElements = (where,fields) => {
    const result = Elements.find( where, fields)

    const join = isPopulate(fields)
    if(join)
        result.populate("chemicalSeries")

    return result
}



module.exports = {
    selectElements,
    getFields
}