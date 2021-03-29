
const { getFields, selectElements } = require('../structureSelect')



const possibleConditional = {
    between: [ '$gt', '$lt' ],
    outside: [ '$lt', '$gt' ]
}



const getConditional = ( conditional, include ) => {
    const intervalFunctions = possibleConditional[conditional] || possibleConditional.between
    
    return include 
        ? intervalFunctions.map( value => `${value}e` )
        : intervalFunctions    
}

const getConditionalBetween = ( thermalProperty, intervalFunctions, interval ) => {
    const where = {}
    
    where[thermalProperty] = intervalFunctions
        .reduce( (acc,nameFunc,index) => {
            acc[nameFunc] = interval[index]
            return acc
        }, {})

    return where
}

const getConditionalOutside = ( thermalProperty, intervalFunctions, interval ) => ({
    $or: intervalFunctions.map( (func, index) => {
        const obj = {}

        const option = {}
        option[func] = interval[index]
        
        obj[thermalProperty] = option
        
        return obj
    })
})




const getInclude = req => {
    const dict = {
        "false": false,
        "true": true
    }

    const include = dict[req.query.include]

    return include === undefined 
        ? true:
        include
}



const getThermalProperty = req => req.route.path
    .replace('/elements/', '')
    .replace('/:value', '')



const getInterval = req => {
    const { interval } = req.query

    if( interval !== undefined ) {
        const [ min, max ] = interval.split(',').map( value => Number(value) )

        return [ 
            Number.isNaN(min) ? 0: min, 
            Number.isNaN(max) ? 1000: max
        ]
    }

    return [ -Infinity, Infinity ]
} 



async function getIntervalThermal( req, res ) {
    const fields = getFields(req)
    const {typeInterval} = req.query

    const thermalProperty = getThermalProperty(req)
    const include = getInclude(req)
    const interval = getInterval(req)
    const intervalFunction = getConditional(typeInterval,include)

    const where = typeInterval === 'outside' 
        ? getConditionalOutside( thermalProperty, intervalFunction, interval )
        : getConditionalBetween( thermalProperty, intervalFunction, interval ) 

    const result = await selectElements(where, fields)

    return res.json(result)
}



module.exports = getIntervalThermal
