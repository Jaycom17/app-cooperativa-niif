import Accordeon from "../../../forms/components/Accordeon";

interface GenericValuesProps {
  json: Record<string, any>;
  ValuesNames: Record<string, string>;
}

function GenericValues({ json, ValuesNames }: GenericValuesProps) {
  const renderTextField = (label: string, value: any, key: string) => {
    // Validamos el título
    const displayTitle = ValuesNames?.[label] || label || "Sin nombre";

    // Validamos el valor
    let displayValue: string;

    if (value === null || value === undefined) {
        displayValue = ""; // Mostrar vacío si no hay valor
    } else if (typeof value === "object") {
        // Si es un objeto, lo convertimos a JSON para evitar error
        displayValue = JSON.stringify(value);
    } else {
        displayValue = String(value);
    }

    return (
        <div key={key} className="flex flex-col space-y-2 bg-white">
            <label className="bg-white font-semibold text-sm" htmlFor={key}>
                {displayTitle}
            </label>
            <p className="bg-white border-b-2 p-1">{displayValue}</p>
        </div>
    );
};


  const renderNumberField = (label: string, value: any, key: string) => {
    // Si el label viene vacío, forzamos un texto genérico
    const displayTitle = ValuesNames?.[label] || label || "Sin nombre";

    // Si el value es null, undefined o un objeto, mostramos algo controlado
    let displayValue: any = value;

    if (value === null || value === undefined) {
      displayValue = ""; // mostramos vacío
    } else if (typeof value === "object") {
      // Si es un objeto, mostramos en JSON para no romper
      displayValue = JSON.stringify(value);
    }

    return (
      <div
        key={key}
        className="flex flex-col justify-between space-y-2 bg-white"
      >
        <label className="bg-white font-semibold text-sm" htmlFor={key}>
          {displayTitle}
        </label>
        <p className="bg-white border-b-2 p-1">{displayValue}</p>
      </div>
    );
  };

  const renderBooleanField = (label: string, value: any, key: string) => {
    // Validamos el título
    const displayTitle = ValuesNames?.[label] || label || "Sin nombre";

    // Validamos el valor para que no explote
    let displayValue: string;

    if (value === null || value === undefined) {
      displayValue = ""; // Si no hay valor, lo mostramos vacío
    } else if (typeof value === "boolean") {
      displayValue = value ? "Si" : "No";
    } else {
      // Si no es booleano, lo mostramos tal cual (puede ser un texto u objeto)
      displayValue =
        typeof value === "object" ? JSON.stringify(value) : String(value);
    }

    return (
      <div key={key} className="flex flex-col space-y-2 bg-white">
        <label className="bg-white font-semibold text-sm" htmlFor={key}>
          {displayTitle}
        </label>
        <p className="bg-white border-b-2 p-1">{displayValue}</p>
      </div>
    );
  };

  const renderArrayButtons = (key: string) => {
    return (
      <div key={key} className="flex flex-col space-y-2 bg-white">
        <label className="bg-white font-semibold text-sm" htmlFor={key}>
          {key}
        </label>
      </div>
    );
  };

  const renderContent = (data: any, parentKey = "") => {
    if (!data || typeof data !== "object") return null;

    return Object.entries(data).map(([key, val]) => {
      const uniqueKey = `${parentKey}.${key}`;

      // Si el valor es null o undefined, muestra algo vacío
      if (val === null || val === undefined) {
        return renderTextField(key, "", uniqueKey);
      }

      if (key === "Data") {
        return renderArrayButtons(key);
      }

      if (typeof val === "object" && !Array.isArray(val)) {
        return renderAccordeon(key, val, uniqueKey);
      } else if (typeof val === "string") {
        return renderTextField(key, val, uniqueKey);
      } else if (typeof val === "boolean") {
        return renderBooleanField(key, val, uniqueKey);
      } else {
        return renderNumberField(key, val, uniqueKey);
      }
    });
  };

  const renderAccordeon = (title: string, content: any, key: string) => {
    // Validamos el título para evitar undefined
    const displayTitle = ValuesNames?.[title] || title || "Sin título";

    // Si el contenido es nulo, undefined o vacío mostramos un texto de fallback
    if (content === null || content === undefined) {
      return (
        <Accordeon key={key} title={displayTitle}>
          <p className="text-gray-500 italic">Sin datos</p>
        </Accordeon>
      );
    }

    // Si es un objeto vacío o array vacío
    if (typeof content === "object" && Object.keys(content).length === 0) {
      return (
        <Accordeon key={key} title={displayTitle}>
          <p className="text-gray-500 italic">Sin datos</p>
        </Accordeon>
      );
    }

    return (
      <Accordeon key={key} title={displayTitle}>
        {renderContent(content, key)}
      </Accordeon>
    );
  };

  return <>{renderContent(json)}</>;
}
export default GenericValues;
