const express = require('express')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const app=  express()
const {config} = require("./config/config")
const handlebars = require("express-handlebars")
const PORT=8080

config.connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',productsRouter)
app.use('/api',cartRouter)


app.get('/',(req,res)=>{
    
    return res.send({sas:"sada"})
})

const server= app.listen(8080,()=>{
    console.log(`servidor escuchando ${server.address().port}`)
})

app.engine("hbs",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","hbs")

app.use('/static',express.static(__dirname+'/public'))

server.on("error",error =>console.log(`error e el servidor ${error}`));
