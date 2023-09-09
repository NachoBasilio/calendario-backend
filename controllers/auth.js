const {response} = require("express")
const {validationResult} = require("express-validator")

const crearUsuario = (req, res = response)=>{

    const {name, email, password} = req.body


    res.status(201).json({
        ok:true,
        msg: "registro",
        name,
        email,
        password
    })
}

const logearUsuario = (req, res = response)=>{
    const {email, password} = req.body 



    res.json({
        ok:true,
        msg: "login",
        email,
        password
        
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