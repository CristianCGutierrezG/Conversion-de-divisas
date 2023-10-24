const express = require('express')
const routesM = express.Router()


routesM.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM moneda', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routesM.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO moneda SET ?', [req.body],(err, rows)=>{
            if(err) return res.send(err)

            res.json('Divisa insertada')
        })
    })
})



module.exports = routesM