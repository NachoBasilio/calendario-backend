/* 
    Ruta de usuarios / auth
    host + /api/auth
*/

const { crearUsuario, logearUsuario, recargarCredenciales } = require("../controllers/auth")


const {Router} = require("express")
const router = Router()


 router.get("/renew", recargarCredenciales)



router.post("/new", crearUsuario)

router.post("/",logearUsuario )


module.exports = router