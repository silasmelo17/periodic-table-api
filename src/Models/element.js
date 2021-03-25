
const mongoose = require('../Util/database')



const ElementSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: "String",
        required: true,
    },
    symbol: {
        type: "String",
        required: true,
    },
    atomicMass: {
        type: "Number",
        required: true,
    },
    atomicNumber: {
        type: "Number",
        required: true,
    },
    family: {
        type: "Number",
        required: true,
    },
    period: {
        type: "Number",
        required: true,
    },
    meltingPoint: {
        type: "Number",
        required: true,
    },
    boilingPoint: {
        type: "Number",
        required: true,
    },
    chemicalSeriesId: mongoose.Schema.Types.ObjectId
})



const Element = mongoose.models['Element'] || mongoose.model( 'Element', ElementSchema, 'Elements' )

module.exports = Element
