const {response} = require("express")

const crearUsuario = (req, res = response)=>{

    res.json({
         ok:true,
         msg: "registro"
    })
}

const logearUsuario = (req, res = response)=>{

    res.json({
         ok:true,
         msg: "login"
    })
}

const recargarCredenciales = (req, res = response)=>{

    res.json({
         ok:true,
         msg: "renew"
    })
}


module.exports = {
    crearUsuario,
    logearUsuario,
    recargarCredenciales
}