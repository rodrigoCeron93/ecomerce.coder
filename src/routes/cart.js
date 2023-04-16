const { response } = require("express");
const express = require("express");
const { Router } = express;
const Carrito = require("../Dao/cart");



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
  
    if (!cart) {
      return res.status(404).send({ error: "Carrito no encontrado" });
    }
  
    const existingProduct = cart.products.find((p) => p.id === pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ id: pid, quantity: quantity?quantity:1 });
    }
    console.log(cart,"sdsa")
    const response = await carrito.saveProduct(cid,cart);
    response != null
      ? res.status(201).send(response)
      : res.status(500).send();
  });

  

router.delete("/cart/:id/products/:idproduct", async (req, res) => {
  
      const id = req.params.id;
      const idproduct= req.params.idproduct
      const result = await carrito.deleteProductsById(id,idproduct);
      result!=null?res.status(201).send("eliminado"):res.status(500).send("no fue posible eliminar el producto")
  });

module.exports = router;
