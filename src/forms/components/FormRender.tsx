import React, { useCallback, useMemo } from "react";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [k: string]: JSONValue;
}
type JSONArray = JSONValue[];

type WidgetType = "text" | "number" | "checkbox" | "textarea" | "select";

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
};

function isObject(v: JSONValue): v is JSONObject {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isArray(v: JSONValue): v is JSONArray {
  return Array.isArray(v);
}

function humanizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-ZÁÉÍÓÚÑ])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .replace(/([A-ZÁÉÍÓÚÑ]+)([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/g, "$1 $2")
    .replace(/\bValor Contable\b/gi, "Valor contable")
    .replace(/\bValor Fiscal\b/gi, "Valor fiscal")
    .replace(/\bVariacion\b/gi, "Variación")
    .trim();
}

function pathToString(path: (string | number)[]) {
  return path
    .map((p) => (typeof p === "number" ? `[${p}]` : p))
    .join(".")
    .replace(/\.\[/g, "[");
}

function inferWidget(v: JSONValue): WidgetType {
  if (typeof v === "number") return "number";
  if (typeof v === "boolean") return "checkbox";
  if (typeof v === "string") return v.length > 80 ? "textarea" : "text";
  return "text";
}

/* ---------------- PRIMITIVE INPUT ---------------- */
const PrimitiveInput: React.FC<{
  value: JSONValue;
  onChange: (v: JSONValue, path?: string) => void;
  path: (string | number)[];
  label?: string;
  cfg?: FieldConfig;
  canEdit?: boolean;
}> = ({ value, onChange, path, label, cfg, canEdit }) => {
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
              onChange={(e) => onChange(e.target.checked, pathToString(path.slice(0, -2)))}
              readOnly={!canEdit || cfg?.readonly}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            {effectiveLabel}
          </label>
          {cfg?.help && <p className="text-xs text-gray-500">{cfg.help}</p>}
        </div>
      );
    }
    case "number":
    case "text":
    case "textarea": {
      const Component = widget === "textarea" ? "textarea" : "input";
      const strValue =
        value === null || value === undefined ? "" : String(value);

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
                pathToString(path.slice(0, -2))
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
            onChange={(e) => onChange(e.target.value, pathToString(path.slice(0, -2)))}
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
};

/* ---------------- OBJECT FIELDSET ---------------- */
const ObjectFieldset: React.FC<{
  obj: JSONObject;
  path: (string | number)[];
  onChange: (newObj: JSONObject, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
}> = ({ obj, path, onChange, config, defaultOpen, canEdit }) => {
  const keys = useMemo(() => Object.keys(obj), [obj]);

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm mb-4">
      {keys.map((k) => {
        const val = obj[k];
        const childPath = [...path, k];
        const labelCfg =
          config?.byPath?.[pathToString(childPath)] ?? config?.byKey?.[k];

        if (isObject(val)) {
          return (
            <details key={k} open={defaultOpen} className="mb-4">
              <summary className="cursor-pointer text-black bg-gray-100 p-2 rounded font-semibold hover:bg-gray-200">
                {labelCfg?.label ?? humanizeKey(k)}
              </summary>
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
                />
              </div>
            </details>
          );
        }

        if (isArray(val)) {
          return (
            <details key={k} open={defaultOpen} className="mb-4">
              <summary className="cursor-pointer text-black bg-gray-100 p-2 rounded font-semibold hover:bg-gray-200">
                {labelCfg?.label ?? humanizeKey(k)} (lista)
              </summary>
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
                />
              </div>
            </details>
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
    </div>
  );
};

/* ---------------- ARRAY FIELDSET ---------------- */
const ArrayFieldset: React.FC<{
  arr: JSONArray;
  path: (string | number)[];
  onChange: (newArr: JSONArray, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
}> = ({ arr, path, onChange, config, defaultOpen, canEdit }) => {

  const addItem = useCallback(() => {
  if (arr.length === 0) return; // Evitar si no hay elementos para duplicar

  const lastItem = arr[arr.length - 1];

  // Clonar el último ítem (profundamente si es un objeto/array)
  const cloneItem =
    isObject(lastItem) || isArray(lastItem)
      ? structuredClone(lastItem)
      : lastItem;

  if (isObject(cloneItem)) {
    for (const key in cloneItem) {
      if (typeof cloneItem[key] === "number") {
        cloneItem[key] = 0; // Reiniciar números a 0
      } else if (typeof cloneItem[key] === "string") {
        cloneItem[key] = ""; // Reiniciar strings a vacío
      } else if (typeof cloneItem[key] === "boolean") {
        cloneItem[key] = false; // Reiniciar booleanos a false
      }
    }
  }

  onChange([...arr, cloneItem]);
}, [arr, onChange]);


  const removeAt = (idx: number) => {
    const newArr = arr.filter((_, i) => i !== idx);
    onChange(newArr, pathToString(path));
  };

  return (
    <div>
      {arr.map((item, idx) => {
        const itemPath = [...path, idx];

        if (isObject(item)) {
          return (
            <details key={idx} open={defaultOpen} className="mb-3">
              <summary className="cursor-pointer font-medium text-blue-600">
                Item {idx + 1}
              </summary>
              <div className="mt-2 pl-4 border-l-2 border-blue-100">
                <ObjectFieldset
                  obj={item}
                  path={itemPath}
                  onChange={(newItem) => {
                    const clone = [...arr];
                    clone[idx] = newItem;
                    onChange(clone, pathToString(itemPath.slice(0, -2)));
                  }}
                  config={config}
                  canEdit={canEdit}
                  defaultOpen={defaultOpen}
                />
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="text-xs mt-1 text-red-500 hover:underline"
                >
                  Eliminar item
                </button>
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
                onChange(clone, pathToString(itemPath.slice(0, -2)));
              }}
              canEdit={canEdit}
              label={`Item ${idx + 1}`}
            />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="text-xs text-red-500 hover:underline"
            >
              ✕
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={addItem}
        className="text-sm px-3 py-1 mt-2 bg-blue-100 rounded-md text-black p-2 hover:bg-blue-200"
      >
        + Agregar item
      </button>
    </div>
  );
};

/* ---------------- ROOT FORM ---------------- */
export const FormRender: React.FC<JSONFormProps> = ({
  value,
  onChange = () => {},
  config,
  defaultOpen = true,
  canEdit = true,
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
        />
      </div>
    );
  }

  return <PrimitiveInput value={value} onChange={onChange} path={[]} />;
};
