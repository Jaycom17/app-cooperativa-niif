import {
  ActivosFijosTotal,
  friendlyNames,
  contablesDatosInformativosKeys,
  contablesValorTotalKeys,
  fiscalesDatosInformativosKeys,
  fiscalesValorTotalKeys,
} from "../utils/ActivosFijos";

/**
 * Componente para mostrar y editar valores de activos fijos.
 *
 * Este componente permite mostrar y editar valores de activos fijos para datos contables y fiscales,
 * incluyendo información detallada como valor total y datos informativos.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.title - Título del componente.
 * @param {string} props.path - Ruta para acceder a los datos dentro de la estructura de activos fijos.
 * @param {Object} props.data - Objeto que contiene los datos de activos fijos.
 * @param {Function} props.handleChange - Función llamada cuando cambia el valor de un input.
 * @returns {JSX.Element} Elemento JSX que representa los valores de activos fijos.
 */
interface ActivosFijosValuesProps {
  title: string;
  path: string;
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, path: string) => void;
}

function ActivosFijosValues({
  title,
  path,
  data,
  handleChange,
}: ActivosFijosValuesProps) {
  /**
   * Renderiza una sección de datos utilizando las keys proporcionadas.
   * @param {Object} sectionData - Datos de la sección.
   * @param {Array} keys - Arreglo de keys para mostrar.
   * @param {string} sectionTitle - Título de la sección.
   * @param {string} category - Categoría de los datos (Contables o Fiscales).
   * @returns {JSX.Element} Elemento JSX que representa la sección de datos.
   */
  const renderSection = (sectionData, keys, sectionTitle, category) => (
    <section className="flex flex-col gap-3 border rounded-md p-2">
      <h3 className="font-semibold text-xl">{sectionTitle}</h3>
      <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
        {keys.map((key) => (
          <article key={key} className="flex flex-col border p-3 rounded-md">
            <h4 className="mb-3 font-semibold">{friendlyNames[key]}</h4>
            <section className="flex flex-col gap-y-2 justify-between">
              {typeof sectionData[key] === "object" ? (
                Object.entries(sectionData[key]).map(([subKey, subValue]) => (
                  <div
                    key={subKey}
                    className="flex flex-col space-y-2 bg-white"
                  >
                    <label className="bg-white text-sm" htmlFor={subKey}>
                      {friendlyNames[subKey] || subKey}
                    </label>
                    {ActivosFijosTotal.includes(`${key}.${subKey}`) ? (
                      <p className="p-1 font-medium border-b-2">
                        {subValue === 0 ? "0" : subValue}
                      </p>
                    ) : (
                      <input
                        className="bg-white border rounded-md p-1"
                        type="number"
                        name={subKey}
                        value={subValue === 0 ? "" : subValue}
                        placeholder="0"
                        onChange={(e) =>
                          handleChange(
                            e,
                            `${path}.${category}.${key}.${subKey}`
                          )
                        }
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col space-y-2 bg-white">
                  {ActivosFijosTotal.includes(`${key}`) ? (
                    <p className="p-1 font-medium border-b-2">
                      {sectionData[key] === 0 ? "0" : sectionData[key]}
                    </p>
                  ) : (
                    <input
                      className="bg-white border rounded-md p-1"
                      type="number"
                      name={key}
                      value={sectionData[key] === 0 ? "" : sectionData[key]}
                      placeholder="0"
                      onChange={(e) =>
                        handleChange(e, `${path}.${category}.${key}`)
                      }
                    />
                  )}
                </div>
              )}
            </section>
          </article>
        ))}
      </section>
    </section>
  );

  return (
    <div className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white">
      <h3 className="w-full font-bold text-xl pb-2">{title}</h3>
      <section className="flex flex-col gap-3 border rounded-md p-2">
        <h3 className="font-semibold text-2xl text-center">Datos contables</h3>
        {data.Contables && (
          <>
            {renderSection(
              data.Contables,
              contablesValorTotalKeys,
              "Valor total, incluyendo arrendamiento financiero o leasing financiero",
              "Contables"
            )}
            {renderSection(
              data.Contables,
              contablesDatosInformativosKeys,
              "Datos informativos",
              "Contables"
            )}
          </>
        )}
      </section>
      <section className="flex flex-col gap-3 border rounded-md p-2">
        <h3 className="font-semibold text-2xl text-center">Datos Fiscales</h3>
        {data.Fiscales && (
          <>
            {renderSection(
              data.Fiscales,
              fiscalesValorTotalKeys,
              "Valor total, incluyendo arrendamiento financiero o leasing financiero",
              "Fiscales"
            )}
            {renderSection(
              data.Fiscales,
              fiscalesDatosInformativosKeys,
              "Datos informativos: Valor activos adquiridos mediante arrendamiento financiero o leasing financiero",
              "Fiscales"
            )}
          </>
        )}
      </section>
    </div>
  );
}
export default ActivosFijosValues;
