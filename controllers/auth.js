const {response} = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/Usuario")



const crearUsuario = async (req, res = response)=>{
    const {email, password} = req.body
    try {
        let usuario = await Usuario.findOne({email})

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese correo"
            })
        }
        usuario = new Usuario(req.body)
        
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
    
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }


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