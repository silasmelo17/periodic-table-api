
const mongoose = require('../Util/database')



const ChemicalSerieSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: "String",
        required: true,
    },
})



const ChemicalSerie = mongoose.models['ChemicalSerie'] || mongoose.model( 'ChemicalSerie', ChemicalSerieSchema, 'ChemicalSeries' )

module.exports = ChemicalSerie
