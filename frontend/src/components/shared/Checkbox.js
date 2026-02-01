import React from 'react';

function Checkbox({ children, checked, ...props }) {
  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
        checked
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        {...props}
      />
      <span className="text-sm text-gray-700">{children}</span>
    </label>
  );
}

export default Checkbox;
