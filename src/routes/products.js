const { response } = require("express");
const express = require("express");
const { Router } = express;
const Productos = require("../Dao/products");


const producto = new Productos();

const router = Router();

router.get("/products/:id?", async (req, res) => {

    const id = req.params.id;
    const limit = req.query.limit;
    try {
      if (!!id) {
        res.send(await producto.getById(id));
      } else {
        res.send(await producto.getAll(limit));
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: -1, descripcion: "Error al obtener productos" });
    }
  
});

router.post("/products", async (req, res) => {
  
    const { title, description, code, price, category, stock, thumbnails } = req.body;

    if (!title || !description || !code || !price || !category || !stock) {
      return res.status(400).send({ error: -1, descripcion: "Faltan campos obligatorios" });
    }

    const obj = {
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };

    try {
      const response = await producto.save(obj);
      if (response !== null) {
        res.status(201).send({ success: true, data: response });
      } else {
        res.status(500).send({ success: false, message: "Error saving product" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Error saving product", error: error });
    }
  
});

router.put("/products/:id", async (req, res) => {
 
    const id = req.params.id;
    const obj = req.body;
    obj.timestamp = Date.now();
    
    try {
      const result = await producto.updateById(id, obj);
      res.status(201).send({ message: "Producto actualizado correctamente." });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Ha ocurrido un error al actualizar el producto." });
    }
 
});


router.delete("/products/:id", async (req, res) => {
 
    const id = req.params.id;
    const result = await producto.deleteById(id);
    if (result != null) {
      res.status(201).send({ mensaje: `El producto con id ${id} fue eliminado correctamente` });
    } else {
      res.status(500).send({ error : -1, descripcion: `Error al eliminar el producto con id ${id}` });
    }
  
});
module.exports = router;
