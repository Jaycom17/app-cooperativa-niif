import React, { memo, useState } from 'react';
import type { JSONValue, FieldConfig } from '@/forms/models/FormRender';
import { humanizeKey, pathToString, formatCurrency, parseCurrencyInput, isTypingNegative } from '@/forms/utils/formRender';

export const PrimitiveInput: React.FC<{
  value: JSONValue;
  onChange: (v: JSONValue, path?: string) => void;
  path: (string | number)[];
  label?: string;
  cfg?: FieldConfig;
  canEdit?: boolean;
}> = memo(({ value, onChange, path, label, cfg, canEdit }) => {
  const effectiveLabel = label ?? humanizeKey(String(path[path.length - 1]));
  const widget = cfg?.widget ?? inferWidget(value);

  const [isFocused, setIsFocused] = useState(false);
  const [editingValue, setEditingValue] = useState("");

  if (cfg?.hidden) return null;

  function inferWidget(v: JSONValue) {
    if (typeof v === "number") return "currency";
    if (typeof v === "boolean") return "checkbox";
    if (typeof v === "string") return v.length > 80 ? "textarea" : "text";
    return "text";
  }
  

  switch (widget) {
    case "checkbox": {
      return (
        <div className="mb-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked, pathToString(path.slice(0, -1)))}
              readOnly={!canEdit || cfg?.readonly}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            {effectiveLabel}
          </label>
          {cfg?.help && <p className="text-xs text-gray-500">{cfg.help}</p>}
        </div>
      );
    }
    case "currency": {
      const numValue = typeof value === 'number' ? value : 0;
      const currency = cfg?.currency || 'COP';
      const locale = cfg?.locale || 'es-CO';

      const displayValue = isFocused 
        ? editingValue 
        : formatCurrency(numValue, currency, locale);

      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {effectiveLabel}
          </label>
          <input
            type="text"
            value={displayValue}
            placeholder={cfg?.placeholder || formatCurrency(0, currency, locale)}
            onChange={(e) => {
              const input = e.target.value;
              setEditingValue(input);
              
              if (isTypingNegative(input)) {
                return;
              }
              
              const numericValue = parseCurrencyInput(input);
              onChange(numericValue, pathToString(path.slice(0, -1)));
            }}
            onFocus={() => {
              setIsFocused(true);
              const currentValue = numValue === 0 ? '' : numValue.toString();
              setEditingValue(currentValue);
            }}
            onBlur={() => {
              setIsFocused(false);
              const numericValue = parseCurrencyInput(editingValue);
              onChange(numericValue, pathToString(path.slice(0, -1)));
            }}
            readOnly={!canEdit || cfg?.readonly}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {cfg?.help && (
            <p className="text-xs text-gray-500 mt-1">{cfg.help}</p>
          )}
        </div>
      );
    }
    case "number":
    case "text":
    case "textarea": {
      const Component = widget === "textarea" ? "textarea" : "input";
      const strValue = value === null || value === undefined ? "" : String(value);

      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {effectiveLabel}
          </label>
          <Component
            value={strValue}
            placeholder={cfg?.placeholder}
            onChange={(e: any) =>
              onChange(
                widget === "number"
                  ? Number(e.target.value) || 0
                  : e.target.value,
                pathToString(path.slice(0, -1))
              )
            }
            readOnly={!canEdit || cfg?.readonly}
            rows={widget === "textarea" ? 3 : undefined}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {cfg?.help && (
            <p className="text-xs text-gray-500 mt-1">{cfg.help}</p>
          )}
        </div>
      );
    }
    case "select": {
      const str = value === null || value === undefined ? "" : String(value);
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {effectiveLabel}
          </label>
          <select
            value={str}
            onChange={(e) => onChange(e.target.value, pathToString(path.slice(0, -1)))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">{cfg?.placeholder ?? "Selecciona..."}</option>
            {(cfg?.options ?? []).map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
          {cfg?.help && (
            <p className="text-xs text-gray-500 mt-1">{cfg.help}</p>
          )}
        </div>
      );
    }
  }
});