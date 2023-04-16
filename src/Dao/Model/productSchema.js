const mongoose = require('mongoose');

// Definición del esquema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: 'Sin categoría' },
  thumbnails: [{ type: String }],
});

// Creación del modelo
const Product = mongoose.model('Product', productSchema);

module.exports = {Product};