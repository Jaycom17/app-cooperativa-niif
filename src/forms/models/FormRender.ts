export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export interface JSONObject {
  [k: string]: JSONValue;
}

export type JSONArray = JSONValue[];

export type WidgetType = "text" | "number" | "checkbox" | "textarea" | "select" | "currency";

export type FieldConfig = {
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

export type JSONFormConfig = {
  byKey?: Record<string, FieldConfig>;
  byPath?: Record<string, FieldConfig>;
};

export type JSONFormProps = {
  value: JSONValue;
  onChange?: (val: JSONValue, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
  maxInitialItems?: number;
  virtualizeThreshold?: number;
  lazyLoadChildren?: boolean;
};