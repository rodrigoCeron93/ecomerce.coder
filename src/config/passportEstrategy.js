const passport = require("passport");
const User = require("../Dao/Model/userSchema");
const GitHubStrategy = require("passport-github2").Strategy;

const initializePassport = () => {
    passport.use(
        new GitHubStrategy(
            {
                clientID: "Iv1.0907147aec869fe7",
                clientSecret: "158565958b7b7eae7826e29e02f22e5e9a8617dc",
                callbackURL: "http://localhost:3000/auth/github/callback", // Ruta de callback para redirigir después de la autenticación
                scope: ["user:email"],
            },
            async function (accessToken, refreshToken, profile, cb) {
                // Aquí puedes guardar el usuario en la base de datos o hacer cualquier otra lógica de autenticación

                try {
                    const user = await User.findOne({ email: profile.emails[0].value });
                    if (!user) {
                        const newUser = {
                            first_name: profile.name,
                            last_name: profile.name,
                            username: profile.username,
                            email: profile.emails[0].value,
                        };
                        const reponse = await  User.create(newUser);
                        return cb(null, reponse);
                    }else{
                        return cb(null, user);
                    }
                } catch (error) {
                    return cb(error)
                }

                //return cb(null, profile);
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
