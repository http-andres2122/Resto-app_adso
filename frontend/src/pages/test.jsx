import React from "react";

export default function test() {
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Editar Producto</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nombre</label>
                    <input
                        type="text"
                        value={selectedProduct.nombre}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, nombre: e.target.value })}
                        className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Precio</label>
                    <input
                        type="number"
                        value={selectedProduct.precio}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, precio: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Stock</label>
                    <input
                        type="number"
                        value={selectedProduct.stock}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value, 10) })}
                        className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-gray-200"
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-300"
                >
                    Guardar
                </button>
            </div>
        </div>


    )

}