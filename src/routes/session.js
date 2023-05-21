const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
// Middleware para verificar si el usuario está autenticado
function requireAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/");
    }
}

// Ruta para mostrar el formulario de login
router.get("/", userController.showLogin);

// Ruta para mostrar el formulario de registro
router.get("/register", userController.showRegister);

// Ruta para mostrar el perfil del usuario
router.get("/profile", requireAuth, userController.showProfile);

// Ruta para registrar un usuario
router.post("/api/sessions/register", userController.register);

// Ruta para realizar el login de un usuario
router.post("/api/sessions/login", userController.login);

// Ruta para realizar el logout de un usuario
router.get("/logout", userController.logout);

router.get("/admin", requireAuth, userController.showAdmin);


router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
    
    res.send(req.user);
  });
  

module.exports = router;
