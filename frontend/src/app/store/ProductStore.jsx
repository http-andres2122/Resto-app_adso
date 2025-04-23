// store/ProductStore.js
import { create } from "zustand";
import * as productoService from "../components/products/services/productoService";
import * as categoriaService from "../components/products/services/categoriaService";

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  showAddProduct: false,
  showEditProduct: false,
  productToEdit: null,
  lastFetch: null, // Timestamp de la última carga

  // opcion de mostrar el formulario de agregar producto
  setShowAddProduct: (value) => {
    // Recibe un argumento 'value'
    set({ showAddProduct: value }); // Actualiza el estado con el valor proporcionado
  },

  //opcion de mostrar el formulario de editar producto
  setShowEditProduct: (value) => {
    set({ showEditProduct: value });
  },

  //opcion de editar producto
  setProductToEdit: (product) => {
    set({ productToEdit: product });
  },

  //limpiar el producto a editar
  clearProductToEdit: () => {
    set({ productToEdit: null });
  },

  // Obtener productos desde la API
  fetchProducts: async () => {
    const { lastFetch } = get();
    const now = Date.now();
    if (lastFetch && now - lastFetch < 60000) return; // Evita recargar si los datos tienen menos de 1 minuto
    try {
      const data = await productoService.getProductos();
      set({ products: data, lastFetch: now }); // Actualiza productos y timestamp
      console.log("Productos cargados:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // Agregar producto
  addProduct: async (newProduct) => {
    try {
      const response = await productoService.createProducto(newProduct);
      console.log("Producto agregado en el servidor:", response);

      const { fetchProducts } = get(); // Obtener fetchProducts usando get()
      await fetchProducts();

      return response;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error; // Re-lanza el error para que se maneje en el componente
    }
  },

  // Editar producto
  editProduct: async (id, updatedProduct) => {
    console.log("ID del producto a editar:", id);
    console.log("Datos del producto a editar:", updatedProduct);
    try {
      // Actualizar en el servidor
      const data = await productoService.updateProducto(id, updatedProduct);

      // Actualizar el estado local
      set((state) => {
        const updatedProducts = state.products.map((product) => {
          if (product.id === updatedProduct.id) {
            //console.log("Producto editado:", product);
            return { ...updatedProduct }; // Sustituir el producto con el actualizado
          }
          return product; // Mantener los productos que no coinciden
        });
        //console.log("Productos actualizados:", updatedProducts);
        return { products: updatedProducts };
      });

      // Depurar el estado de products después de la actualización
      console.log("Estado actualizado de products:", get().products);

      console.log("Producto editado en el servidor y actualizado localmente:", data);
      return data;
    } catch (error) {
      console.error("Error al editar el producto:", error);
      throw error; // Re-lanza el error para manejarlo en el componente
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
