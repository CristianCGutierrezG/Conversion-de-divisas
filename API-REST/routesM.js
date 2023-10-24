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

            res.send('Divisa insertada')
        })
    })
})

routesM.delete('/:id_moneda', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('Delete from moneda where id_moneda = ?', [req.params.id_moneda],(err, rows)=>{
            if(err) return res.send(err)

            res.send('Divisa eliminada')
        })
    })
})



module.exports = routesM