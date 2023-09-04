const express = require('express');

const app = express()


app.get("/", (req, res)=>{
    console.log("Se requiere el /")
    res.json({
        ok:true
    })
})


app.listen(4002, ()=>{
    console.log("Servidor corriendo en puerto " + 4002)
})