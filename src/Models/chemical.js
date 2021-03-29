
const mongoose = require('../Util/database')



const ChemicalSerieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: "String",
        required: true,
    },
    __v: {
        type: "Number",
        select: false
    }
})



const ChemicalSerie = mongoose.models['ChemicalSeries'] || mongoose.model( 'ChemicalSeries', ChemicalSerieSchema, 'ChemicalSeries' )

module.exports = ChemicalSerie
