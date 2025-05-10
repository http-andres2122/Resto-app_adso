// DynamicSelector.js
import React from "react";

const DynamicSelector = ({
  options,
  selectedValue,
  onChange,
  label,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}:
      </label>
      <select
        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-300"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DynamicSelector;
