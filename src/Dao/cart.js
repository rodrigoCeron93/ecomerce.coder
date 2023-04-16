const {CartModel} = require("./Model/cartSchema")

class Carrito {
    constructor() {
    }
  
    async getById(id) {
      try {
        const carrito = await CartModel.findById(id).exec();
        return carrito;
      } catch (error) {
        console.log(error);
      }
    }
  
    async getAll() {
      try {
        const carritos = await CartModel.find();
        return carritos;
      } catch (error) {
        console.log(error);
      }
    }
  
    async save(obj) {
      try {
        const carrito = new CartModel(obj);
        await carrito.save();
        return carrito;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  
    async saveProduct(id, obj) {
        try {
            // Actualizar el carrito utilizando el método findOneAndUpdate
            const updatedCart = await CartModel.findOneAndUpdate(
              { _id: id }, // Filtrar por el ID del carrito
              obj, // Datos del carrito actualizados
              { new: true } // Opción para retornar el carrito actualizado en lugar del carrito original
            );
        
            if (updatedCart) {
              console.log('Carrito actualizado:', updatedCart);
              return updatedCart;
            } else {
              console.log('El carrito no fue encontrado o no se realizó ninguna actualización');
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
    }
  
    async deleteById(id) {
      try {
        await CartModel.findByIdAndDelete(id)
        return 1;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  
    async deleteProductsById(id, idproduct) {
      try {
        const response=await CartModel.updateOne(
            { _id: id }, // Filtrar por el ID del carrito
            { $pull: { products: { id: idproduct } } } // Eliminar el producto con el ID especificado del array de productos
        )

       
        if (response.nModified === 1) {
            console.log('Producto eliminado del carrito:', response);
            return 1;
        } else {
            console.log('El producto no fue encontrado en el carrito:', response);
            return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
  
  module.exports = Carrito;