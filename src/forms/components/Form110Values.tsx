import { ValuesNames, CalculatedValues } from "../utils/form110";

interface ActivosFijosValuesProps {
  title: string;
  path: string;
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function Form110Values({ title, path, data, handleChange }: ActivosFijosValuesProps) {
  const renderTextField = (sectionData, sectionTitle, value = 0) => {
    let newPath = "";
    if (sectionTitle !== "") {
      newPath = path + "." + sectionTitle;
    } else {
      newPath = path;
    }
    if (typeof sectionData !== "object") {
      value = sectionData;
    }
    const pathParts = newPath.split(".");
    if (CalculatedValues.includes(pathParts[pathParts.length - 1])) {
      return (<p className="p-1 text-xl font-medium border-b-4">{value}</p>);
    } else {
      if (typeof sectionData === "string") {
        return (
          <input
            className="bg-white border rounded-md p-1"
            type="string"
            name={newPath}
            value={value}
            placeholder={newPath}
            onChange={(e) => handleChange(e)}
          />
        );
      } else if (typeof sectionData === "boolean") {
        return (
          <div className="flex flex-col space-y-2 bg-white">
            <select
              className="bg-white border rounded-md p-1"
              name={newPath}
              defaultValue={sectionData ? "true" : "false"}
              onChange={(e) => handleChange(e)}
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        );
      } else {
        return (
          <input
            className="bg-white border rounded-md p-1"
            type="number"
            name={newPath}
            value={value === 0 ? "" : value}
            placeholder={newPath}
            onChange={(e) => handleChange(e)}
          />
        );
      }
    }
  };

  const renderSection = (sectionData) => (
    <>
      {typeof sectionData !== "object" ? (
        <>{renderTextField(sectionData, "")}</>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
          {Object.keys(sectionData).map((key) => (
            <article key={key} className="flex flex-col border p-3 rounded-md">
              <h4 className="mb-3 font-semibold">{ValuesNames[key] || key}</h4>
              <section className="flex flex-col gap-y-2">
                {typeof sectionData[key] === "object" ? (
                  Object.entries(sectionData[key]).map(([subKey, subValue]) => (
                    <div
                      key={subKey}
                      className="flex flex-col space-y-2 bg-white"
                    >
                      <label className="bg-white text-sm" htmlFor={subKey}>
                        {ValuesNames[subKey] || subKey}
                      </label>
                      {
                        <>
                          {renderTextField(
                            sectionData[key],
                            `${key}.${subKey}`,
                            subValue
                          )}
                        </>
                      }
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col space-y-2 bg-white">
                    {<>{renderTextField(sectionData[key], key)}</>}
                  </div>
                )}
              </section>
            </article>
          ))}
        </section>
      )}
    </>
  );

  return (
    <div className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white">
      <h3 className="w-full font-bold text-xl pb-2">
        {ValuesNames[title] || title}
      </h3>
      {<>{renderSection(data)}</>}
    </div>
  );
}

export default Form110Values;
