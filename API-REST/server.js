const express = require('express')
const mysql = require('mysql2')
const myconnect = require('express-myconnection')
const cors = require('cors')


const routesM = require('./routesM')
const routesD = require('./routesd')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbConf = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cris_123_Gut',
    database: 'conversion_divisas'
}

app.use(myconnect(mysql, dbConf, 'single'))

//para que el servidor entienda los datos tipo json
app.use(express.json())
app.use(cors())


//Rutas
app.get('/', (req, res)=>{
    res.send("Bienvenido")
})

app.use('/moneda', routesM)

app.use('/tasa_de_cambio', routesD)

//Server
app.listen(app.get('port'), ()=>{
    console.log('server corriendo en el puerto', app.get('port'))
})