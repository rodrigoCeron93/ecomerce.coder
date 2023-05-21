const User = require('../Dao/Model/userSchema');
const bcrypt = require('bcrypt');


// Controlador para mostrar el formulario de login
function showLogin(req, res) {
  console.log(req.session)
  if (req.session.user) {
    // Si el usuario ya está logueado, redirigir al perfil
    return res.redirect('/profile');
  }
  res.render('login');
}

// Controlador para mostrar el formulario de registro
function showRegister(req, res) {
  console.log(req.session)
  if (req.session.user) {
    // Si el usuario ya está logueado, redirigir al perfil
    return res.redirect('/profile');
  }
  res.render('register');
}

// Controlador para mostrar el perfil del usuario
function showProfile(req, res) {
  const user = req.session.user;
  res.render('profile', { user });
}

// Controlador para registrar un usuario
async function register(req, res) {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    // Generar el hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario en la base de datos con la contraseña hasheada
    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    await user.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
}

// Controlador para realizar el login de un usuario
function login(req, res) {
  const { email, password } = req.body;

  // Buscar al usuario en la base de datos por email
  User.findOne({ email })
    .then(user => {
      if (user) {
        // Comparar la contraseña ingresada con la contraseña hasheada almacenada
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            // Contraseña válida, guardar el usuario en la sesión
            req.session.user = user;
            console.log(req.session)
            if (user.role === 'admin') {
              // Redirigir al usuario administrador a la vista de administrador
              res.redirect('/admin');
            } else {
              // Redirigir a los usuarios normales a la vista de productos
              res.redirect('/profile');
            }
          } else {
            // Contraseña incorrecta
            res.redirect('/');
          }
        });
      } else {
        // Usuario no encontrado
        res.redirect('/');
      }
    })
    .catch(error => {
      // Manejar el error de búsqueda
      console.error(error);
      res.redirect('/');
    });
}
// Controlador para realizar el logout de un usuario
function logout(req, res) {
  // Elimina la propiedad user de la sesión para cerrar la sesión
  delete req.session.user;
  res.redirect('/');
}
// Controlador para mostrar la vista de administrador

function showAdmin(req, res) {
  const user = req.session.user;
  res.render('admin', { user });
}


module.exports = {
  showLogin,
  showRegister,
  showProfile,
  register,
  login,
  logout,
  showAdmin
};