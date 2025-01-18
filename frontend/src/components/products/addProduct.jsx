import React, { useState, useEffect } from 'react';
import * as categoriaService from '../../api/services/products/categoriaService'; // Importa el servicio de categorías
import * as productoService from '../../api/services/products/productoService'; // Importa el servicio de productos
import * as inventarioService from '../../api/services/products/inventarioService' //importa el servicio de inventario

const AddProduct = ({ onCancel }) => { // Recibe la prop onCancel
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('')
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [errorCategorias, setErrorCategorias] = useState(null);
    const [errorProducto, setErrorProducto] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const categoriasData = await categoriaService.getCategorias();
            setCategorias(categoriasData);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            setErrorCategorias("Error al cargar las categorías.");
        } finally {
            setLoadingCategorias(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorProducto(null); // Limpiar errores anteriores
        setSuccessMessage(null);

        try {
            const nuevoProducto = {
                nombre,
                descripcion,
                precio,
                categoria_id: parseInt(categoriaId, 10), // Asegúrate de que sea un número
            };
            console.log(nuevoProducto)
            //Crear el producto (llamada a la primera API)
            await productoService.createProducto(nuevoProducto);
            if (!productoCreado || !productoCreado.id) {
                throw new Error("No se recibió el ID del producto creado.");
            }
            const productoId = productoCreado.id;
            setSuccessMessage("Producto creado con éxito!");
            //Preparar los datos para la API de stock
            const stockData = {
                producto_id: productoId,
                cantidad: parseInt(stock, 10), // Asegúrate de tener el valor de stock en tu estado
                // ... otros campos que requiera la API de stock
            };
            //Llamar a la API de stock
            try {
                await 
            } catch (error) {

            }

            // Limpiar el formulario después de la creación exitosa
            setNombre("");
            setDescripcion("");
            setPrecio("");
            setCategoriaId("");
        } catch (error) {
            console.error("Error al crear producto:", error);
            setErrorProducto("Error al crear el producto. Por favor, inténtalo de nuevo.");
        }
    };

    const handleAddCategory = async () => {
        try {
            // Lógica para guardar la nueva categoría en la API
            await categoriaService.createCategoria({ nombre: newCategoryName });
            // Recargar las categorías después de agregar una nueva
            fetchCategorias();
            setNewCategoryName('');
            setShowAddCategoryModal(false);
        } catch (error) {
            console.error("Error al crear categoría:", error);
            // Manejar el error
        }
    };

    // Función para manejar la eliminación de una categoría
    const handleDeleteCategory = async (id) => {
        if (!window.confirm("¿Está seguro de que desea eliminar esta categoría?")) {
            return;
        }

        // setLoading(true); // Mostrar indicador de carga
        try {
            const response = await categoriaService.deleteCategoria(id);
            console.log("response:", response.message)
            //SetCategoriaId(vacio)
            setCategoriaId('')
            // Recargar las categorías después de agregar una nueva
            fetchCategorias();
            alert("Categoría eliminada con éxito");
            // showSuccessMessage("Categoría eliminada con éxito"); // Notificación más elegante
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            alert("Categoría NO eliminada con éxito");
            // showErrorMessage("Error al eliminar la categoría. Inténtelo nuevamente."); // Notificación más elegante
        } //finally {
        //     setLoading(false); // Ocultar indicador de carga
        // }
    };

    if (loadingCategorias) {
        return <div>Cargando categorías...</div>;
    }

    if (errorCategorias) {
        return <div className="text-red-500">{errorCategorias}</div>;
    }

    return (
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <h2 className="text-3xl font-bold mb-6">Agregar Producto</h2>

            {errorProducto && <div className="text-red-500 mb-4">{errorProducto}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Nombre:</label>
                    <input type="text" id="nombre" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Descripción:</label>
                    <textarea id="descripcion" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="precio" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Precio:</label>
                    <input type="number" id="precio" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Stock:</label>
                    <input type="number" id="stock" className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>

                {/* Categoría */}
                <div className="mb-4">
                    <label htmlFor="categoria" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Categoría:</label>
                    <div className="flex">
                        <select
                            id="categoria"
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(e.target.value)}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                        {/* Botón para eliminar la categoría */}
                        <button
                            type="button"
                            className="ml-2 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300" // Mejora la accesibilidad con focus:outline-none
                            onClick={() => { handleDeleteCategory(categoriaId) }}
                        >
                            x Eliminar
                        </button>
                        {/* Botón para agregar una categoria */}
                        <button
                            type="button"
                            onClick={() => setShowAddCategoryModal(true)}
                            className="ml-2 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-300"
                        >
                            + Categoría
                        </button>
                    </div>
                </div>

                {/* Modal para agregar categoría */}
                {showAddCategoryModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={(e) => { if (e.target === e.currentTarget) { setShowAddCategoryModal(false) } }}>
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-700">
                            <h3 className="text-lg font-bold mb-4">Agregar Nueva Categoría</h3>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Nombre de la categoría"
                            />
                            <div className="mt-4 flex justify-end">
                                <button onClick={handleAddCategory} className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300">Guardar</button>
                                <button onClick={() => setShowAddCategoryModal(false)} className="ml-2 px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
                    + Agregar Producto
                </button>
                <button type="button" onClick={onCancel} className="ml-2 px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300">
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default AddProduct;