const { response } = require("express");
const express = require("express");
const { Router } = express;
const Carrito = require("../containers/cart");



const carrito = new Carrito();

const router = Router();





router.post("/cart", async (req, res) => {

      const obj = {"products":[]};
      obj.timestamp = Date.now()
      console.log(res)
      const response= await carrito.save(obj)
      console.log(response)
      response!=null?res.status(201).send({id:response.id}):res.status(500).send();
   
  });

  
  router.get('/cart', async (req, res) => {
    try {
      const cartItems = await carrito.getAll();
      if (cartItems.length === 0) {
        res.send('No hay carritos');
      } else {
        res.send(cartItems);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos del carrito');
    }
  });

  router.get('/cart/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!!id) {
        const cartItem = await carrito.getById(id);
        if (cartItem) {
          res.send(cartItem);
        } else {
          res.status(404).send(`No se encontró el carrito con id ${id}`);
        }
      } else {
        res.status(400).send('Id de carrito inválido');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el carrito');
    }
  });

  router.post("/cart/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
  
    const cart = await carrito.getById(cid);
    console.log(cart.products)
    if (!cart) {
      return res.status(404).send({ error: "Carrito no encontrado" });
    }
  
    const existingProduct = cart.products.find((p) => p.id === pid);
    console.log(existingProduct,"sa")
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ id: pid, quantity: 1 });
    }
    console.log(cart)
    const response = await carrito.saveProduct(cid,cart);
    response != null
      ? res.status(201).send({ id: response.id })
      : res.status(500).send();
  });

  

router.delete("/cart/:id/productos/:idproduct", async (req, res) => {
  
      const id = req.params.id;
      const idproduct= req.params.idproduct
      const result = await carrito.deleteProductsById(id,idproduct);
      result!=null?res.status(201).send():res.status(500).send()
  });

module.exports = router;
