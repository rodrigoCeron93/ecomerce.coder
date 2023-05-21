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

// Ruta para iniciar el proceso de autenticación de GitHub
router.get("/auth/github", passport.authenticate("github"));

// Ruta de callback después de la autenticación de GitHub
router.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), function (req, res) {
    // Autenticación exitosa, redirigir a la página deseada
    req.session.user = req.user;

    if (req.session.user.role === "admin") {
        // Redirigir al usuario administrador a la vista de administrador
        res.redirect("/admin");
    } else {
        // Redirigir a los usuarios normales a la vista de productos
        res.redirect("/profile");
    }
});

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
    res.json(req.user);
  });
  

module.exports = router;
