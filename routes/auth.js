/* 
    Ruta de usuarios / auth
    host + /api/auth
*/

const { crearUsuario, logearUsuario, recargarCredenciales } = require("../controllers/auth")


const {Router} = require("express")
const router = Router()

router.post("/",logearUsuario )

router.post("/new", crearUsuario)

router.get("/renew", recargarCredenciales)



module.exports = router