
const mongoose = require('../Util/database')



const ElementSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        default: -Infinity
    },
    boilingPoint: {
        type: "Number",
        default: Infinity
    },
    chemicalSeries: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChemicalSeries",
        required: true
    },
    __v: {
        type: "Number",
        select: false
    }
    
})


const collectionName = 'Elements'
const Element = mongoose.models[collectionName] || mongoose.model( collectionName, ElementSchema, collectionName )

module.exports = Element
