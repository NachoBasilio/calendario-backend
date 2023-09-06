/* 
    Ruta de usuarios / auth
    host + /api/auth
*/

const { crearUsuario, logearUsuario, recargarCredenciales } = require("../controllers/auth")


const {Router} = require("express")
const {check} = require("express-validator")
const router = Router()

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe tener al menos 6 caracteres").isLength({min:6})
    ],
    logearUsuario 
)

router.post(
    "/new", 
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe tener al menos 6 caracteres").isLength({min:6})
    ],
    crearUsuario
)

router.get("/renew", recargarCredenciales)



module.exports = router