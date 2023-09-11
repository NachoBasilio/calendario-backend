/* 
    Event Routers 
    /api/events

*/
const { Router } = require('express');

const { validarJWT } = require("../middlewares/validar-jwt")
const {getEventos,crearEvento,actualizarEvento,eliminarEvento} = require("../controllers/events")


const router = Router()

router.use(validarJWT)


router.get("/", getEventos)
router.post("/", crearEvento)
router.put("/", actualizarEvento)
router.delete("/", eliminarEvento)


module.exports = router