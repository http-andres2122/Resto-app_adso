import { useForm } from "react-hook-form";
import React, { forwardRef } from "react";

const DynamicForm = forwardRef(
  ({ fields, onSubmit, initialValues = {} }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: initialValues,
    });

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
  }
);

export default DynamicForm;
