import { friendlyNames, calculatedValues, excludedValues } from "../utils/impuestoDiferido";

interface ImpuestoDiferidoValuesProps {
  title: string;
  path: string;
  data: object;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, path: string) => void;
}

function ImpuestoDiferidoValues({ title, path, data, handleChange }: ImpuestoDiferidoValuesProps) {
  const renderSection = (sectionData, sectionTitle) => (
    <section className="flex flex-col gap-3 border rounded-md p-2">
      <h3 className="font-semibold text-xl">{sectionTitle}</h3>
      <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
        {Object.keys(sectionData).map((key) => (
          <article key={key} className="flex flex-col border p-3 rounded-md">
            <h4 className="mb-3 font-semibold">{friendlyNames[key] || key}</h4>
            <section className="flex flex-col gap-y-2">
              {typeof sectionData[key] === "object" ? (
                Object.entries(sectionData[key]).map(([subKey, subValue]) => (
                  <div
                    key={subKey}
                    className="flex flex-col space-y-2 bg-white"
                  >
                    <label className="bg-white text-sm" htmlFor={subKey}>
                      {friendlyNames[subKey] || subKey}
                    </label>
                    {console.log(`${path.split(".")[path.split(".").length -1]}.${key}.${subKey}`)}
                    {((calculatedValues.includes(`${key}.${subKey}`) || calculatedValues.includes(subKey) || key === "Total") && !excludedValues.includes(`${path.split(".")[path.split(".").length -1]}.${key}.${subKey}`)) ? (
                      <p className="p-1 font-medium border-b-4">
                        {subValue}
                      </p>
                    ) : (
                      <input
                        className="bg-white border rounded-md p-1"
                        type="number"
                        name={subKey}
                        value={subValue === 0 ? "" : subValue}
                        placeholder="0"
                        onChange={(e) =>
                          handleChange(e, `${path}.${key}.${subKey}`)
                        }
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col space-y-2 bg-white">
                  {(calculatedValues.includes(`${path.split(".")[path.split(".").length-1]}.${key}`) || calculatedValues.includes(key) || key === "Total") ? (
                    <p className="p-1 font-medium border-b-4">
                      {sectionData[key]}
                    </p>
                  ) : (
                    <input
                      className="bg-white border rounded-md p-1"
                      type="number"
                      name={key}
                      value={sectionData[key] === 0 ? "" : sectionData[key]}
                      placeholder="0"
                      onChange={(e) => handleChange(e, `${path}.${key}`)}
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
      {data && <>{renderSection(data, "")}</>}
    </div>
  );
}

export default ImpuestoDiferidoValues;
