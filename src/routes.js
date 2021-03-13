
const express = require('express')
const routes = express.Router()



const elementsController = require('./controller/elementsController/index.js')
const chemicalController = require('./controller/chemicalController.js')



routes.get( '/elements', elementsController.getElements )

routes.get( '/elements/meltingPoint', elementsController.getIntervalThermal )
routes.get( '/elements/boilingPoint', elementsController.getIntervalThermal )

routes.get( '/elements/meltingPoint/:value', elementsController.getConditionalThermal )
routes.get( '/elements/boilingPoint/:value', elementsController.getConditionalThermal )

routes.get( '/elements/:property/:value', elementsController.getSpecific )
routes.get( '/chemicalSeries/', chemicalController.index )

routes.get( '*', (_, res) => res.send('404 - NOT FOUND'))



module.exports = routes
