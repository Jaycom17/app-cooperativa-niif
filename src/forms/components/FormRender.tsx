import React, { useCallback, useMemo, useState, memo } from "react";
import { IoIosArrowDroprightCircle, IoIosArrowDropdownCircle } from "react-icons/io";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [k: string]: JSONValue;
}
type JSONArray = JSONValue[];

type WidgetType = "text" | "number" | "checkbox" | "textarea" | "select" | "currency";

type FieldConfig = {
  label?: string;
  widget?: WidgetType;
  placeholder?: string;
  help?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string | number }>;
  hidden?: boolean;
  readonly?: boolean;
  currency?: string;
  locale?: string;
};

type JSONFormConfig = {
  byKey?: Record<string, FieldConfig>;
  byPath?: Record<string, FieldConfig>;
};

type JSONFormProps = {
  value: JSONValue;
  onChange?: (val: JSONValue, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
  // Nuevas props para optimización
  maxInitialItems?: number;
  virtualizeThreshold?: number;
  lazyLoadChildren?: boolean;
};

function isObject(v: JSONValue): v is JSONObject {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isArray(v: JSONValue): v is JSONArray {
  return Array.isArray(v);
}

function humanizeKey(key: string): string {
  return key
    // Separar números de letras (Renglon49 -> Renglon 49)
    .replace(/([a-záéíóúñA-ZÁÉÍÓÚÑ])(\d)/g, "$1 $2")
    .replace(/(\d)([a-záéíóúñA-ZÁÉÍÓÚÑ])/g, "$1 $2")
    
    // Separar camelCase y PascalCase
    .replace(/([a-záéíóúñ0-9])([A-ZÁÉÍÓÚÑ])/g, "$1 $2")
    
    // Reemplazar guiones bajos y guiones por espacios
    .replace(/[_\-]+/g, " ")
    
    // Separar secuencias de mayúsculas seguidas de minúsculas (XMLParser -> XML Parser)
    .replace(/([A-ZÁÉÍÓÚÑ]+)([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/g, "$1 $2")
    
    // Reglas de tildes usando patrones comunes
    .replace(/\banio\b/gi, "Año")
    .replace(/\banios\b/gi, "Años")
    .replace(/\btelefono\b/gi, "Teléfono")
    .replace(/\bcodigo\b/gi, "Código")
    .replace(/\bnumero\b/gi, "Número")
    .replace(/\bcedula\b/gi, "Cédula")
    .replace(/\brenglon\b/gi, "Renglón")
    .replace(/\bcompanias\b/gi, "Compañias")
    .replace(/\bcompania\b/gi, "Compañia")
    .replace(/\beconomico\b/gi, "Económico")
    .replace(/\beconomicos\b/gi, "Económicos")
    .replace(/\bmetodo\b/gi, "Método")
    .replace(/\bmetodos\b/gi, "Métodos")
    .replace(/\bseguno\b/gi, "Seguro")
    .replace(/\bsegunos\b/gi, "Seguros")
    .replace(/\bplayzo\b/gi, "Plazo")
    .replace(/\bbiologicos\b/gi, "Biológicos")
    .replace(/\bbiologico\b/gi, "Biológico")
    .replace(/\bYO\b/gi, "Y O")

    // Reglas de terminaciones comunes
    .replace(/(\w+)cion\b/gi, (match, p1) => p1 + "ción")
    .replace(/(\w+)sion\b/gi, (match, p1) => p1 + "sión")
    .replace(/(\w+)tico\b/gi, (match, p1) => p1 + "tico") // para automático, sistemático, etc.
    .replace(/(\w+)fico\b/gi, (match, p1) => p1 + "fico") // para específico, geográfico, etc.
    
    // Siglas y términos especiales
    .replace(/\biva\b/gi, "IVA")
    
    
    // Limpiar espacios extras
    .replace(/\s+/g, ' ')
    .trim();
}

function pathToString(path: (string | number)[]) {
  return path
    .map((p) => (typeof p === "number" ? `[${p}]` : p))
    .join(".")
    .replace(/\.\[/g, "[");
}

function inferWidget(v: JSONValue): WidgetType {
  if (typeof v === "number") return "currency";
  if (typeof v === "boolean") return "checkbox";
  if (typeof v === "string") return v.length > 80 ? "textarea" : "text";
  return "text";
}

function formatCurrency(value: number, currency = 'COP', locale = 'es-CO'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    signDisplay: 'auto',
  }).format(value);
}

function parseCurrencyInput(input: string): number {
  const cleanInput = input.replace(/[^\d-]/g, '');
  if (cleanInput === '-' || cleanInput === '') return 0;
  const number = parseInt(cleanInput) || 0;
  return number;
}

function isTypingNegative(input: string): boolean {
  return input.trim() === '-' || input.includes('-') && input.replace(/[^\d]/g, '').length === 0;
}

// Hook para búsqueda/filtrado
function useSearch(items: string[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(key => 
      humanizeKey(key).toLowerCase().includes(term)
    );
  }, [items, searchTerm]);
}

// Hook para paginación
function usePagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = Math.ceil(items.length / pageSize);
  const paginatedItems = useMemo(() => {
    const start = currentPage * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    hasNext: currentPage < totalPages - 1,
    hasPrev: currentPage > 0
  };
}

// Componente de paginación
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}> = memo(({ currentPage, totalPages, onPageChange, hasNext, hasPrev }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg mt-2">
      <div className="text-sm text-gray-600">
        Página {currentPage + 1} de {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="px-2 py-1 text-xs bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="px-2 py-1 text-xs bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
});

// Componente de búsqueda
const SearchBox: React.FC<{
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

/* ---------------- PRIMITIVE INPUT (Memoizado) ---------------- */
const PrimitiveInput: React.FC<{
  value: JSONValue;
  onChange: (v: JSONValue, path?: string) => void;
  path: (string | number)[];
  label?: string;
  cfg?: FieldConfig;
  canEdit?: boolean;
}> = memo(({ value, onChange, path, label, cfg, canEdit }) => {
  const effectiveLabel = label ?? humanizeKey(String(path[path.length - 1]));
  const widget = cfg?.widget ?? inferWidget(value);
  if (cfg?.hidden) return null;

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
      
      const [isFocused, setIsFocused] = React.useState(false);
      const [editingValue, setEditingValue] = React.useState('');

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
            onFocus={(_e) => {
              setIsFocused(true);
              const currentValue = numValue === 0 ? '' : numValue.toString();
              setEditingValue(currentValue);
            }}
            onBlur={(_e) => {
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

/* ---------------- OBJECT FIELDSET OPTIMIZADO ---------------- */
const ObjectFieldset: React.FC<{
  obj: JSONObject;
  path: (string | number)[];
  onChange: (newObj: JSONObject, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
  maxInitialItems?: number;
  lazyLoadChildren?: boolean;
}> = memo(({ obj, path, onChange, config, defaultOpen, canEdit, maxInitialItems = 50, lazyLoadChildren = false }) => {
  const keys = useMemo(() => Object.keys(obj), [obj]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  // Filtrar keys por búsqueda
  const filteredKeys = useSearch(keys, searchTerm);
  
  // Paginación solo si hay muchos items
  const shouldPaginate = filteredKeys.length > maxInitialItems;
  const pagination = usePagination(filteredKeys, maxInitialItems);
  const displayKeys = shouldPaginate ? pagination.paginatedItems : filteredKeys;

  const toggleSection = useCallback((key: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm mb-4">
      {/* Mostrar búsqueda solo si hay muchos campos */}
      {keys.length > 10 && (
        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={`Buscar en ${keys.length} campos...`}
        />
      )}

      {/* Stats */}
      {(shouldPaginate || searchTerm) && (
        <div className="text-xs text-gray-500 mb-3">
          Mostrando {displayKeys.length} de {filteredKeys.length} campos
          {searchTerm && ` (filtrados de ${keys.length} total)`}
        </div>
      )}

      {displayKeys.map((k) => {
        const val = obj[k];
        const childPath = [...path, k];
        const labelCfg = config?.byPath?.[pathToString(childPath)] ?? config?.byKey?.[k];
        const isExpanded = expandedSections.has(k);

        if (isObject(val)) {
          return (
            <div key={k} className="mb-4">
              <button
                onClick={() => toggleSection(k)}
                className="w-full text-left cursor-pointer text-black bg-gray-100 p-2 rounded font-semibold hover:bg-gray-200 flex items-center justify-between"
              >
                <span>{labelCfg?.label ?? humanizeKey(k)}</span>
                <span className="text-gray-500 text-2xl">
                  {isExpanded ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                </span>
              </button>
              {isExpanded && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  <ObjectFieldset
                    obj={val}
                    path={childPath}
                    onChange={(newChild, path) =>
                      onChange({ ...obj, [k]: newChild }, path)
                    }
                    config={config}
                    defaultOpen={defaultOpen}
                    canEdit={canEdit}
                    maxInitialItems={maxInitialItems}
                    lazyLoadChildren={lazyLoadChildren}
                  />
                </div>
              )}
            </div>
          );
        }

        if (isArray(val)) {
          return (
            <div key={k} className="mb-4">
              <button
                onClick={() => toggleSection(k)}
                className="w-full text-left cursor-pointer text-black bg-gray-100 p-2 rounded font-semibold hover:bg-gray-200 flex items-center justify-between"
              >
                <span>{labelCfg?.label ?? humanizeKey(k)} (lista)</span>
                <span className="text-gray-500 text-sm">
                  {val.length} items {isExpanded ? '▼' : '▶'}
                </span>
              </button>
              {isExpanded && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  <ArrayFieldset
                    arr={val}
                    path={childPath}
                    onChange={(newArr, path) =>
                      onChange({ ...obj, [k]: newArr }, path)
                    }
                    config={config}
                    defaultOpen={defaultOpen}
                    canEdit={canEdit}
                    maxInitialItems={maxInitialItems}
                  />
                </div>
              )}
            </div>
          );
        }

        return (
          <PrimitiveInput
            key={k}
            value={val}
            path={childPath}
            canEdit={canEdit}
            onChange={(newVal, path) => onChange({ ...obj, [k]: newVal }, path)}
            label={labelCfg?.label}
            cfg={labelCfg}
          />
        );
      })}

      {/* Paginación */}
      {shouldPaginate && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      )}
    </div>
  );
});

/* ---------------- ARRAY FIELDSET OPTIMIZADO ---------------- */
const ArrayFieldset: React.FC<{
  arr: JSONArray;
  path: (string | number)[];
  onChange: (newArr: JSONArray, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
  maxInitialItems?: number;
}> = memo(({ arr, path, onChange, config, defaultOpen, canEdit, maxInitialItems = 20 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Para arrays, la búsqueda es más simple (por índice o contenido de strings)
  const filteredIndices = useMemo(() => {
    if (!searchTerm.trim()) return arr.map((_, i) => i);
    const term = searchTerm.toLowerCase();
    return arr.map((item, i) => ({ item, index: i }))
      .filter(({ item, index }) => {
        if (typeof item === 'string') return item.toLowerCase().includes(term);
        if (typeof item === 'number') return item.toString().includes(term);
        return index.toString().includes(term);
      })
      .map(({ index }) => index);
  }, [arr, searchTerm]);

  const shouldPaginate = filteredIndices.length > maxInitialItems;
  const pagination = usePagination(filteredIndices, maxInitialItems);
  const displayIndices = shouldPaginate ? pagination.paginatedItems : filteredIndices;

  const addItem = useCallback(() => {
    if (arr.length === 0) return;
    const lastItem = arr[arr.length - 1];
    const cloneItem = isObject(lastItem) || isArray(lastItem) 
      ? structuredClone(lastItem) 
      : lastItem;

    if (isObject(cloneItem)) {
      for (const key in cloneItem) {
        if (typeof cloneItem[key] === "number") {
          cloneItem[key] = 0;
        } else if (typeof cloneItem[key] === "string") {
          cloneItem[key] = "";
        } else if (typeof cloneItem[key] === "boolean") {
          cloneItem[key] = false;
        }
      }
    }
    onChange([...arr, cloneItem]);
  }, [arr, onChange]);

  const removeAt = useCallback((idx: number) => {
    if (idx === 0) return;
    const newArr = arr.filter((_, i) => i !== idx);
    onChange(newArr, pathToString(path));
  }, [arr, onChange, path]);

  return (
    <div>
      {/* Búsqueda para arrays grandes */}
      {arr.length > 10 && (
        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={`Buscar en ${arr.length} items...`}
        />
      )}

      {/* Stats */}
      {(shouldPaginate || searchTerm) && (
        <div className="text-xs text-gray-500 mb-3">
          Mostrando {displayIndices.length} de {filteredIndices.length} items
          {searchTerm && ` (filtrados de ${arr.length} total)`}
        </div>
      )}

      {displayIndices.map((idx) => {
        const item = arr[idx];
        const itemPath = [...path, idx];

        if (isObject(item)) {
          return (
            <details key={idx} open={defaultOpen} className="mb-3">
              <summary className="cursor-pointer font-medium text-blue-600">
                Item {idx + 1} ({Object.keys(item).length} campos)
              </summary>
              <div className="mt-2 pl-4 border-l-2 border-blue-100">
                <ObjectFieldset
                  obj={item}
                  path={itemPath}
                  onChange={(newItem) => {
                    const clone = [...arr];
                    clone[idx] = newItem;
                    onChange(clone, pathToString(itemPath.slice(0, -1)));
                  }}
                  config={config}
                  canEdit={canEdit}
                  defaultOpen={false} // Arrays anidados cerrados por defecto
                  maxInitialItems={maxInitialItems}
                />
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAt(idx)}
                    className="text-xs mt-1 text-red-500 hover:underline"
                  >
                    Eliminar item
                  </button>
                )}
              </div>
            </details>
          );
        }

        return (
          <div key={idx} className="flex items-center gap-2 mb-3">
            <PrimitiveInput
              value={item}
              path={itemPath}
              onChange={(newVal) => {
                const clone = [...arr];
                clone[idx] = newVal;
                onChange(clone, pathToString(itemPath.slice(0, -1)));
              }}
              canEdit={canEdit}
              label={`Item ${idx + 1}`}
            />
            {idx > 0 && (
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="text-xs text-red-500 hover:underline"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}

      {/* Paginación */}
      {shouldPaginate && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      )}

      <button
        type="button"
        onClick={addItem}
        className="text-sm px-3 py-1 mt-2 bg-blue-100 rounded-md text-black p-2 hover:bg-blue-200"
      >
        + Agregar item
      </button>
    </div>
  );
});

/* ---------------- ROOT FORM OPTIMIZADO ---------------- */
export const FormRender: React.FC<JSONFormProps> = ({
  value,
  onChange = () => {},
  config,
  defaultOpen = false, // Cambiado a false por defecto para mejor performance
  canEdit = true,
  maxInitialItems = 50,
  virtualizeThreshold = 100,
  lazyLoadChildren = true,
}) => {
  if (isObject(value)) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl shadow-md">
        <ObjectFieldset
          obj={value}
          path={[]}
          onChange={onChange}
          canEdit={canEdit}
          config={config}
          defaultOpen={defaultOpen}
          maxInitialItems={maxInitialItems}
          lazyLoadChildren={lazyLoadChildren}
        />
      </div>
    );
  }

  if (isArray(value)) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl shadow-md">
        <ArrayFieldset
          arr={value}
          path={[]}
          onChange={onChange}
          canEdit={canEdit}
          config={config}
          defaultOpen={defaultOpen}
          maxInitialItems={maxInitialItems}
        />
      </div>
    );
  }

  return <PrimitiveInput value={value} onChange={onChange} path={[]} />;
};