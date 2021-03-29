
require('dotenv').config()

const express = require('express')
const cors = require('cors') 

const app = express()

const routes = require('./src/routes.js')



app.use(cors())
app.use(express.json())
app.use(routes)


const port = process.env.PORT || 8080
app.listen( port, () => {
    console.log( `Servidor aberto: http://localhost:${port}` )
    console.log( `Pressione Ctrl + C para desligar o servidor` )
})
