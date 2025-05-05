import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useProductStore from '../../store/ProductStore';
import useOrderStore from '../../store/OrderStore';

// Definiendo un objeto con los estados posibles para mayor escalabilidad
const ORDER_STATES = {
  PREPARATION: { value: 'En preparación', label: 'En Preparación' },
  PENDING: { value: 'Pendiente', label: 'Pendiente' },
  SERVED: { value: 'Servido', label: 'Servido' },
  CANCELLED: { value: 'Cancelado', label: 'Cancelado' }
};

const FormOrder = ({ initialOrder = null, onSubmit, onCancel, isEditing = false }) => {
  const { products, fetchProducts } = useProductStore();

  const [formData, setFormData] = useState({
    shippingAddress: '',
    customer: {
      full_name: '',
      email: '',
      num_doc: ''
    },
    status: 'Pendiente',
    items: [],
    comments: '',
    total: 0,
    table_num: '',
  });

  // Usar initialOrder para inicializar el formulario cuando estamos editando
  useEffect(() => {
    if (isEditing && initialOrder) {
      console.log("Pedido a editar desde props:", initialOrder);
      const order = {
        ...initialOrder,
        items: initialOrder.items && initialOrder.items.length > 0 ? initialOrder.items : [],
        // Asegurarnos de que table_num sea un número o string simple, no un array
        table_num: typeof initialOrder.table_num === 'number' ?
          initialOrder.table_num :
          (initialOrder.table_num || '')
      };
      setFormData(order);
    }
  }, [initialOrder, isEditing]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Resto del código para productos, categorías, etc.
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Lista simulada de productos con categorías
  const availableProducts = products.map((product) => ({
    id: product.id,
    name: product.nombre,
    price: product.precio,
    category: product.categoria_nombre,
  }));

  const categories = ['Todas', ...new Set(availableProducts.map((p) => p.category))];

  // Filtrar productos disponibles, excluyendo los ya seleccionados
  const filteredProducts = availableProducts
    .filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todas' || product.category === selectedCategory;
      const isAlreadySelected = formData.items.some((item) => item.id === product.id);
      return matchesCategory && !isAlreadySelected; // Evita duplicados
    })
    .map((product) => ({
      value: product.id,
      label: `${product.name} - $${product.price} (${product.category})`,
    }));

  // Añadir un producto seleccionado desde el buscador
  const handleProductSelect = (selectedOption) => {
    if (!selectedOption) return;
    const selectedProduct = availableProducts.find((p) => p.id === selectedOption.value);
    const newItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      quantity: 1, // Cantidad inicial
      price: selectedProduct.price,
    };
    const newItems = [...formData.items, newItem];
    const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setFormData((prev) => ({ ...prev, items: newItems, total: newTotal }));
  };

  // Actualizar cantidad de un ítem
  const updateItemQuantity = (index, quantity) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], quantity: parseInt(quantity) || 1 };
    const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setFormData((prev) => ({ ...prev, items: newItems, total: newTotal }));
  };

  // Eliminar un ítem
  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setFormData((prev) => ({ ...prev, items: newItems, total: newTotal }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si estamos actualizando la mesa, manejar caso especial
    if (name === 'table_num') {
      // Si está vacío, mantener string vacío
      if (value === '') {
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else {
        // Intentar convertir a número
        const tableNumber = Number(value);
        if (!isNaN(tableNumber)) {
          setFormData((prev) => ({ ...prev, [name]: tableNumber }));
        } else {
          // Si no es un número válido, mantener el valor anterior
          console.warn("Valor de mesa inválido:", value);
        }
      }
    } else {
      // Para otros campos, comportamiento normal
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomerChange = (e) => {
    // Solo permitir cambios si no estamos en modo edición
    if (!isEditing) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        customer: { ...prev.customer, [name]: value },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      autoComplete="new-password"
      autoSave="off" // Agregar este atributo
    >
      {/* Información del Cliente */}
      <div>
        <label>Nombre del Cliente</label>
        <input
          type="text"
          name="full_name"
          value={formData.customer.full_name}
          onChange={handleCustomerChange}
          readOnly={isEditing}
          className="w-full p-2 border rounded"
          autoComplete="off"
        />
      </div>
      <div>
        <label>Identificacion</label>
        <input
          type="number"
          name="num_doc"
          value={formData.customer.num_doc}
          onChange={handleCustomerChange}
          readOnly={isEditing}
          className="w-full p-2 border rounded"
          autoComplete="off"
        />
      </div>

      <div>
        <label>Email del Cliente</label>
        <input
          type="email"
          name="email"
          value={formData.customer.email}
          onChange={handleCustomerChange}
          readOnly={isEditing}
          className="w-full p-2 border rounded"
          autoComplete="off"
        />
      </div>
      <div>
        <label>Dirección de Envío</label>
        <input
          type="text"
          name="address-line1" // Cambiar el nombre para evitar reconocimiento
          value={formData.shippingAddress}
          onChange={(e) => handleChange({ target: { name: 'shippingAddress', value: e.target.value } })}
          className="w-full p-2 border rounded"
          autoComplete="new-password"
          autoSave="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      <div>
        <label>Observaciones</label>
        <input
          type="text"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          autoComplete="off"
        />
      </div>

      {/* Estado */}
      <div>
        <label>Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {Object.values(ORDER_STATES).map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mesa como número simple */}
      <div>
        <label>Mesa</label>
        <div className="flex space-x-2">
          <input
            name='table_num'
            type="number"
            value={formData.table_num}
            onChange={handleChange}
            placeholder="Número de mesa"
            className="w-full p-2 border rounded"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setFormData({ ...formData, table_num: 0 })}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Domicilio
          </button>
        </div>
      </div>

      {/* Sección de Productos */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Productos</h3>
        <div className="mb-2 flex space-x-2">
          <div className="w-1/2">
            <label>Filtrar por categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label>Buscar y agregar producto</label>
            <Select
              options={filteredProducts}
              onChange={handleProductSelect}
              placeholder="Buscar producto..."
              className="w-full"
              isClearable
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Precio Unitario</th>
              <th className="p-2 border">Subtotal</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(index, e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border">${item.price}</td>
                <td className="p-2 border">${item.price * item.quantity}</td>
                <td className="p-2 border">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2">Total: ${formData.total}</p>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Actualizar Pedido' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormOrder;