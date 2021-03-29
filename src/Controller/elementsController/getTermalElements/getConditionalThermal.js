
const { getFields, selectElements } = require('../structureSelect')



const possibleConditional = {
    "greateThan": "$gt",
    "greateThanEqual": "$gte",
    "lessThan": "$lt",
    "lessThanEqual": "$lte"
}



const getThermalProperty = req => req.route.path
    .replace('/elements/', '')
    .replace('/:value', '')

const getConditional = req => possibleConditional[req.query.conditional] 
    || possibleConditional['between']



const getConditionalOperator = (conditional, value)=> {
    const thermalPropertyObject = {}
    thermalPropertyObject[conditional] = value

    return thermalPropertyObject
}

const getWhere = ( thermalProperty, conditional, value) => {
    const where = {}

    where[thermalProperty] = conditional !== undefined
        ? getConditionalOperator(conditional,value)
        : value

    return where
}



async function getConditionalThermal(req, res) {
    const { value } = req.params

    const fields = getFields(req)

    const thermalProperty = getThermalProperty(req)
    const conditional = getConditional(req)

    const where = getWhere( thermalProperty, conditional, value )
    const result = await selectElements(where, fields)

    return res.json({
        length: result.length,
        result
    })
}



module.exports = getConditionalThermal
