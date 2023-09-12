/* 
    Event Routers 
    /api/events

*/
const { Router } = require('express');
const {check} = require("express-validator")
const { validarCampos } = require('../middlewares/validar-campos');



const { validarJWT } = require("../middlewares/validar-jwt")
const {getEventos,crearEvento,actualizarEvento,eliminarEvento} = require("../controllers/events");
const { isDate } = require('../hellpers/isDate');


const router = Router()

router.use(validarJWT)


router.get("/", getEventos)
router.post("/", 
[
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de final es obligatoria").custom(isDate),
    validarCampos
]
,crearEvento)
router.put("/:id", 
[
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de final es obligatoria").custom(isDate),
    validarCampos
],actualizarEvento)
router.delete("/", eliminarEvento)


module.exports = router