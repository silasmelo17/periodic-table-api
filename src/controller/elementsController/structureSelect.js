
const knex = require('../../database/index.js')



const allowedFields = [ 
    'id', 'name', 'symbol', 'atomicMass', 'atomicNumber', 
    'family', 'period', 'meltingPoint', 'boilingPoint', 
    'chemicalSeriesId', 'chemicalSerie',
]

const getAllowedFields = fields => fields.split(',')
    .map( field => {
        const allowed = allowedFields.some( allowedField => field === allowedField )
        if ( allowed )
            return field !== 'chemicalSerie' 
                ? `elements.${field}`
                : 'chemical_series.name as chemicalSerie' 
        return ''
    })
    .filter( field => field !== '' )



function getFields ( req ) {
	const { fields } = req.query
	
	return fields !== undefined 
		? getAllowedFields(fields, allowedFields)
		: ['elements.*', 'chemical_series.name as chemicalSerie']
}



const selectElements = fields => knex('elements')
	.join('chemical_series', 'chemical_series.id', '=', 'elements.chemicalSeriesId')
	.select(fields)



module.exports = {
    selectElements,
    getFields
}