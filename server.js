const express = require('express')
const productsRouter = require('./src/routes/products')
const cartRouter = require('./src/routes/cart')
const app=  express()

const PORT=8080

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


server.on("error",error =>console.log(`error e el servidor ${error}`));
