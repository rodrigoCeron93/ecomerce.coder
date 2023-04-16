const { Product } = require("./Model/productSchema");

class Productos {
  constructor() {}

  async getById(id) {
    try {
      const producto = await Product.findById(id);
      return producto;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll(limit = null) {
    try {
      let productos = null;
      if (limit) {
        productos = await Product.find().limit(limit);
      } else {
        productos = await Product.find();
      }
      return productos;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener todos los productos');
    }
  }

  async save(obj) {
    try {
      const producto = new Product(obj);
      await producto.save();
      return producto;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      const result = await Product.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new Error(`No se encontró ningún objeto con el id ${id}`);
      }
      return 1;
    } catch (error) {
      console.log(`Error al borrar objeto con id ${id}: ${error}`);
      return null;
    }
  }

  async updateById(id, obj) {
    try {
      const updatedProducto = await Product.findByIdAndUpdate(id, obj, { new: true });
      if (updatedProducto) {
        return updatedProducto;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = Productos;