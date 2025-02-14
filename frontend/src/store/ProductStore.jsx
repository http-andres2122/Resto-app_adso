// store/ProductStore.js
import { create } from "zustand";
import * as productoService from "../api/services/products/productoService";
import * as categoriaService from "../api/services/products/categoriaService";
// Importa el servicio de productos
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  showAddProduct: false,
  showEditProduct: false,

  // opcion de mostrar el formulario de agregar producto
  setShowAddProduct: (value) => {
    // Recibe un argumento 'value'
    set({ showAddProduct: value }); // Actualiza el estado con el valor proporcionado
  },

  //opcion de mostrar el formulario de editar producto
  setShowEditProduct: () => {
    set((state) => ({ showEditProduct: !state.showEditProduct }));
  },

  // Obtener productos desde la API
  fetchProducts: async () => {
    try {
      const data = await productoService.getProductos();
      set({ products: data }); // Aquí asignamos `data` directamente
      console.log("Productos cargados:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // Agregar producto
  addProduct: async (newProduct) => {
    try {
      const response = await productoService.createProducto(newProduct);
      fetchProducts();
      console.log("Producto agregado:", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },

  // Editar producto
  editProduct: async (id, updatedProduct) => {
    try {
      await productoService.updateProducto(id, updatedProduct);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        ),
      }));
    } catch (error) {
      console.error("Error editing product:", error);
    }
  },

  // Eliminar producto
  deleteProduct: async (id) => {
    try {
      await productoService.deleteProducto(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },

  // Obtener categorías desde la API
  fetchCategories: async () => {
    try {
      const data = await categoriaService.getCategorias();
      set({ categories: data });
      console.log("Categorías cargadas:", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  // Agregar categoría
  addCategory: async (newCategory) => {
    try {
      const response = await categoriaService.createCategoria(newCategory);

      // Verificamos que la respuesta tenga un 'message' y una categoría válida
      if (response && response.id && response.nombre) {
        // Si la respuesta es correcta, agregamos la categoría al estado
        set((state) => ({ categories: [...state.categories, response] }));
        return response; // Devolvemos la categoría agregada
      } else {
        console.warn("Respuesta inválida del servidor:", response);
        return null; // Si la respuesta no es válida, no la agregamos
      }
    } catch (error) {
      console.error("Error adding category:", error);
      return null; // Devolvemos null en caso de error
    }
  },

  // Eliminar categoría
  deleteCategory: async (id) => {
    try {
      await categoriaService.deleteCategoria(id);
      set((state) => {
        const updatedCategories = state.categories.filter(
          (category) => category.id !== id
        );
        console.log("Categorías actualizadas:", updatedCategories);
        return { categories: updatedCategories };
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  },
}));

export default useProductStore;
