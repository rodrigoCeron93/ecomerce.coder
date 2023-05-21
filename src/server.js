const express = require('express')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const sessionRouter = require('./routes/session')
const session = require('express-session');
const app=  express()
const {config} = require("./config/config")
const handlebars = require("express-handlebars")
const passport = require('passport');
const MongoStore = require('connect-mongo');
const {initializePassport} = require("./config/passportEstrategy")


config.connectDB()
// URL de conexión a MongoDB
const mongoURI = 'mongodb+srv://rodcerflo:K03QGaME93yhiB7B@coder.ctilfrd.mongodb.net/test?authSource=admin&replicaSet=atlas-sp1qta-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

// Conexión a MongoDB
const sessionStore = MongoStore.create({
    mongoUrl: mongoURI,
    mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true},
    ttl: 15
  })


  initializePassport()

// Configuración de Handlebars

app.engine("hbs",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","hbs")
app.use(express.urlencoded({ extended: true }));


// Configuración del middleware de sesiones
app.use(
  session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
  })
);

// Configuración del router

app.use('/api/', productsRouter);

app.use('/api/', cartRouter);
app.use('/', sessionRouter);
app.use(passport.initialize())
// Configuración de otros middlewares y ajustes adicionales

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});