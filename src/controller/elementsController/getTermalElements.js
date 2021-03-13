
const { getFields, selectElements } = require('./structureSelect')


const getConditionalThermal = async (req, res) => {
    const fields = getFields(req)

    const thermalProperty = req.route.path.replace('/elements/', '').replace('/:value', '')
    const { value } = req.params
    const { conditional } = req.query

    const possibleConditional = {
        "larger": ">",
        "smaller": "<",
        "greaterEqual": ">=",
        "smallerEqual": "<=",
        undefined: "="
    }

    const cond = possibleConditional[conditional] || "="

    const result = await selectElements(fields)
        .where(thermalProperty, cond, value)
        .orderBy(thermalProperty)

    return res.json({
        length: result.length,
        result
    })
}



const getIntervalThermal = async (req, res) => {
    const { interval, typeInterval } = req.query

    const thermalProperty = req.route.path.replace('/elements/', '')

    const fields = getFields(req)
    const select = selectElements(fields);



    const getInclude = include => {
        const dict = {
            "false": false,
            "true": true,
            undefined: true
        }

        return dict[include]
    }

    const getSignalByInclude = include => include
        ? ['<=', '>=']
        : ['<', '>']



    const selectBetweenTherminalElement = ([smaller, larger], [min, max]) =>
        select
            .where(thermalProperty, larger, min)
            .where(thermalProperty, smaller, max)

    const selectOutsideTherminalElement = (signs, [min, max]) => {
        const [start, end] = signs.reverse()

        return select
            .where(thermalProperty, start, min)
            .orWhere(thermalProperty, end, max)
    }



    const getElementsByTypeInterval = () => {
        const limit = interval.split(',')
        const include = getInclude(req.query.include)
        const signs = getSignalByInclude(include)

        const dict = {
            undefined: selectBetweenTherminalElement,
            "between": selectBetweenTherminalElement,
            "outside": selectOutsideTherminalElement
        }

        const selectTherminalElement = dict[typeInterval]
        return selectTherminalElement(signs, limit) || []
    }




    const result = interval !== undefined
        ? await getElementsByTypeInterval()
        : []

    return res.json(result)
}

module.exports = {
    getConditionalThermal,
    getIntervalThermal
}
