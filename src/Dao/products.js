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

  async getAll(consulta) {
    console.log(consulta)
    try {
      
      let response = null;
      if (consulta) {

        
        const productos = await Product.find(JSON.parse(consulta.query))
        .sort(consulta.sort)
        .skip((consulta.page - 1) * consulta.limit)
        .limit(consulta.limit);
        
        const totalProducts =await Product.find(JSON.parse(consulta.query)).count();
        const totalPages = Math.ceil(totalProducts / consulta.limit);
        const hasPrevPage = consulta.page > 1;
        const hasNextPage = consulta.page < totalPages;

        response= {
          status: "success",
          payload: productos,
          totalPages,
          prevPage: hasPrevPage ? consulta.page - 1 : null,
          nextPage: hasNextPage ? consulta.page + 1 : null,
          "page":consulta.page,
          hasPrevPage,
          hasNextPage,
          prevLink: hasPrevPage ? `?page=${consulta.page - 1}&limit=${consulta.limit}&sort=${consulta.sort}&query=${consulta.query}` : null,
          nextLink: hasNextPage ? `?page=${consulta.page + 1}&limit=${consulta.limit}&sort=${consulta.sort}&query=${consulta.query}` : null
        };

      } else {
        response = await Product.find();
      }
      return response
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