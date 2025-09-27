import type { JSONValue, JSONObject, WidgetType } from '../models/FormRender';

export function isObject(v: JSONValue): v is JSONObject {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function humanizeKey(key: string): string {
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
    .replace(/(\w+)cion\b/gi, (_match, p1) => p1 + "ción")
    .replace(/(\w+)sion\b/gi, (_match, p1) => p1 + "sión")
    
    // Siglas y términos especiales
    .replace(/\biva\b/gi, "IVA")
    
    // Limpiar espacios extras
    .replace(/\s+/g, ' ')
    .trim();
}

export function pathToString(path: (string | number)[]) {
  return path
    .map((p) => (typeof p === "number" ? `[${p}]` : p))
    .join(".")
    .replace(/\.\[/g, "[");
}

export function inferWidget(v: JSONValue): WidgetType {
  if (typeof v === "number") return "currency";
  if (typeof v === "boolean") return "checkbox";
  if (typeof v === "string") return v.length > 80 ? "textarea" : "text";
  return "text";
}

export function formatCurrency(value: number, currency = 'COP', locale = 'es-CO'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    signDisplay: 'auto',
  }).format(value);
}

export function parseCurrencyInput(input: string): number {
  const cleanInput = input.replace(/[^\d-]/g, '');
  if (cleanInput === '-' || cleanInput === '') return 0;
  const number = parseInt(cleanInput) || 0;
  return number;
}

export function isTypingNegative(input: string): boolean {
  return input.trim() === '-' || input.includes('-') && input.replace(/[^\d]/g, '').length === 0;
}