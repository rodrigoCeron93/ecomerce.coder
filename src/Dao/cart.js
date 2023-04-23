const {CartModel} = require("./Model/cartSchema")

class Carrito {
    constructor() {
    }
  
    async getById(id) {
      try {
        const carrito = await CartModel.findById(id).populate('products.id');
        return carrito;
      } catch (error) {
        console.log(error);
      }
    }
  
    async getAll() {
      try {
        const carritos = await CartModel.find().populate('products.id');
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

    async updateProduct(cartId,products){
      try {
        console.log(products)
        const updatedCart = await CartModel.findByIdAndUpdate(
          cartId,
          { products: products },
          { new: true }
        );
    
        if (!updatedCart) {
          return {
            status: "error",
            message: "No se encontró el carrito con el ID especificado",
          };
        }
    
        return {
          status: "success",
          message: "Carrito actualizado correctamente",
          payload: updatedCart,
        };
      } catch (error) {
        console.error(error);
        return {
          status: "error",
          message: "Error al actualizar el carrito",
        };
      }
    }

    async updateProductQuantity(cid,pid,quantity){
      try { 
        
        
        const cart = await CartModel.findOneAndUpdate(
          { _id: cid, "products.id": pid },
          { $set: { "products.$.quantity": quantity } },
          { new: true }
        );
    
    
        return cart;
      } catch (error) {
        console.log(error);
      }
    }

    async deletecart(cartId){
      try {
        const cart = await CartModel.findById(cartId);
    
        if (!cart) {
          return { message: 'El carrito no existe' };
        }
    
        cart.products = [];
        await cart.save();
    
        return { message: 'carrito eliminado' };
      } catch (error) {
        console.log(error);
        return { message: 'Error al eliminar carrito' };
      }
    }
  }
  
  module.exports = Carrito;