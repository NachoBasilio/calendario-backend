const {response} = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/Usuario")
const { generarJWT } = require("../hellpers/jwt")



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
    
        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }



}

const logearUsuario = async (req, res = response)=>{
    const {email, password} = req.body 

    try {
        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password)
        console.log(validPassword)

        if(!validPassword){
        
            res.status(400).json({
                ok:false,
                msg: "La contraseña ta mal"
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)


        res.status(200).json({
            ok:true,
            msg: "login",
            uid: usuario.id,
            name: usuario.name,
            token
        })
    }
    catch{
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
}

const recargarCredenciales = async (req, res = response)=>{
    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid, name)

    res.json({
         ok:true,
         uid,
         name,
         token
    })
}


module.exports = {
    crearUsuario,
    logearUsuario,
    recargarCredenciales
}