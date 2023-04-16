const mongoose = require('mongoose');

// Definir el esquema del item del carrito
const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  quantity: { type: Number, required: true }
});

// Definir el esquema del carrito
const CartSchema = new mongoose.Schema({
  products: [CartItemSchema],
  timestamp: { type: Date, default: Date.now },

});

// Crear el modelo de Carrito utilizando el esquema definido
const CartModel = mongoose.model('Cart', CartSchema);

module.exports = {CartModel};