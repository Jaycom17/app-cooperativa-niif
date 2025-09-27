import React, { memo } from 'react';

export const SearchBox: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = memo(({ value, onChange, placeholder = "Buscar campos..." }) => (
  <div className="mb-3">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>
));