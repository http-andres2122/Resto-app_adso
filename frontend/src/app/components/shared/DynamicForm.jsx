import { useForm } from "react-hook-form";
import React, { forwardRef, useEffect } from "react";

const DynamicForm = forwardRef(({ fields, onSubmit, initialValues = {} }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Función para actualizar los valores del formulario
  } = useForm({
    defaultValues: initialValues,
  });

  // Cada vez que `initialValues` cambia, reseteamos el formulario con los nuevos valores
  useEffect(() => {
    reset(initialValues);
  }, []); // Removed `reset` from dependency array to prevent infinite loop

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            {...register(field.name, { required: field.required })}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          {errors[field.name] && (
            <p className="text-red-500">Este campo es obligatorio</p>
          )}
        </div>
      ))}
      <button type="submit" className="hidden">
        Submit
      </button>{" "}
      {/* Botón de envío oculto */}
    </form>
  );
});

export default DynamicForm;