const express = require('express')
const routesD = express.Router()


routesD.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM tasas_cambio', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routesD.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO tasas_cambio SET ?', [req.body],(err, rows)=>{
            if(err) return res.send(err)

            res.json('Divisa insertada')
        })
    })
})



module.exports = routesD