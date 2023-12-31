/* 
    Ruta de usuarios / auth
    host + /api/auth
*/

const { crearUsuario, logearUsuario, recargarCredenciales } = require("../controllers/auth")


const {Router} = require("express")
const {check} = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const { validarJWT } = require("../middlewares/validar-jwt")
const router = Router()

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe tener al menos 6 caracteres").isLength({min:6}),
        validarCampos
    ],
    logearUsuario 
)

router.post(
    "/new", 
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe tener al menos 6 caracteres").isLength({min:6}),
        validarCampos
    ],
    crearUsuario
)

router.get("/renew", [
    validarJWT
],recargarCredenciales)



module.exports = router