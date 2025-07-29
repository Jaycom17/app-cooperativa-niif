import { rentaLiquidaNames } from "../utils/RentaLiquida";

interface ResumenESFValuesProps {
    path: string;
    data: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalculatedValues = [];

function ResumenESFValues({ path, data, handleChange }: ResumenESFValuesProps) {
  const renderTextField = (sectionData, sectionTitle = "", value = 0) => {
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
      return <p className="p-1 text-xl font-medium border-b-4">{value}</p>;
    } else {
      return (
        <input
          className="bg-white border rounded-md p-1"
          type="number"
          name={newPath}
          defaultValue={value === 0 ? "" : value}
          placeholder={newPath}
          onChange={(e) => handleChange(e)}
        />
      );
    }
  };

  const renderSection = (sectionData, subSection = "") => (
    <>
      {typeof sectionData !== "object" ? (
        <>
          {renderTextField(
            sectionData,
            `${subSection !== "" ? subSection : ""}`
          )}
        </>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
          {Object.keys(sectionData).map((key) => (
            <article key={key} className="flex flex-col border p-3 rounded-md">
              <h4 className="mb-3 font-semibold">
                {rentaLiquidaNames[key] || key}
              </h4>
              <section className="flex flex-col gap-y-2">
                {typeof sectionData[key] === "object" ? (
                  Object.entries(sectionData[key]).map(([subKey, subValue]) => (
                    <div
                      key={subKey}
                      className="flex flex-col space-y-2 bg-white"
                    >
                      <label className="bg-white text-sm" htmlFor={subKey}>
                        {rentaLiquidaNames[subKey] || subKey}
                      </label>
                      {
                        <>
                          {renderTextField(
                            sectionData[key],
                            `${
                              subSection !== "" ? `${subSection}.` : ""
                            }${key}.${subKey}`,
                            subValue
                          )}
                        </>
                      }
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col space-y-2 bg-white">
                    {
                      <>
                        {renderTextField(
                          sectionData[key],
                          `${subSection !== "" ? `${subSection}.` : ""}${key}`
                        )}
                      </>
                    }
                  </div>
                )}
              </section>
            </article>
          ))}
        </section>
      )}
    </>
  );

  if (typeof data !== "object") {
    return (
      <div className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white">
        <h3 className="w-full font-bold text-xl pb-2">
          {rentaLiquidaNames[path] || path}
        </h3>
        {renderTextField(data)}
      </div>
    );
  }

  return (
    <>
      {Object.keys(data).map((key) => (
        <div
          key={key}
          className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white"
        >
          <h3 className="w-full font-bold text-xl pb-2">
            {rentaLiquidaNames[key] || key}
          </h3>
          {<>{renderSection(data[key], key)}</>}
        </div>
      ))}
    </>
  );
}

export default ResumenESFValues;
