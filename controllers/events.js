const {response} = require("express")

const Evento = require("../models/Eventos")


const getEventos = async (req, res =response)=>{

    const event = await Evento.find()
    .populate('user', "name")


    res.json({
        ok:true, 
        event
    })
}

const crearEvento = async (req, res =response)=>{


    const evento = new Evento(req.body)
    
    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save()
        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

const actualizarEvento = async(req, res =response)=>{
    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId)
        if(!evento){
            res.status(404).json({
                true: false,
                msg: "El evento no existe"
            })
        }

        if(evento.user.toString() !== uid){
            res.status(401).json({
                true: false,
                msg: "Usuario no valido"
            })
        }


        const nuevoEvento = {
            ...req.body,
            user: uid
        }



        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento,{new:true})



        res.json({
            true: true,
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            true: false,
            msg: "Hable con el admin"
        })
    }
}

const eliminarEvento = (req, res =response)=>{
    res.json({
        ok:true, 
        msg: "eliminarEvento"
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
