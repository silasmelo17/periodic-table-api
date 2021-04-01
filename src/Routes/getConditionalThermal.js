const { getFields, selectElements } = require('../Util/structureSelect')



const possibleConditional = {
    "greateThan": "$gt",
    "greateThanEqual": "$gte",
    "lessThan": "$lt",
    "lessThanEqual": "$lte"
}



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



module.exports = thermalProperty => async function (req, res) {
    const { value } = req.query

    const fields = getFields(req)

    const conditional = getConditional(req)

    const where = getWhere( thermalProperty, conditional, value )
    const result = await selectElements(where, fields)

    return res.json(result)
}
