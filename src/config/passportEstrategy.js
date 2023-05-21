const passport = require("passport");
const User = require("../Dao/Model/userSchema");
const LocalStrategy = require('passport-local').Strategy;

const initializePassport = () => {
    passport.use("current",
        new LocalStrategy(
          {
            usernameField: 'email', // Campo del formulario que contiene el correo electrónico
          },
          async (email, password, done) => {
            try {
              // Buscar el usuario en la base de datos por su correo electrónico
              let user = await User.findOne({ email });
    
              if (!user) {
                // Crear un nuevo usuario si no existe
                const newUser = {
                  first_name: profile.name,
                  last_name: profile.name,
                  username: profile.username,
                  email: profile.emails[0].value,
                  password: password, // Guardar la contraseña como hash antes de usar en producción
                };
    
                user = await User.create(newUser);
              }
    
              // Verificar la contraseña del usuario
              const isMatch = await bcrypt.compare(password, user.password);
    
              if (!isMatch) {
                return done(null, false, { message: 'Correo electrónico o contraseña incorrectos' });
              }
    
              // El usuario y la contraseña son válidos, devolver el usuario
              return done(null, user);
            } catch (error) {
              return done(error);
            }
          }
        )
      );

    // Serializar el usuario para almacenarlo en la sesión
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserializar el usuario a partir de la sesión
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

module.exports = {
    initializePassport,
};
