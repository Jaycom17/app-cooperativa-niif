// import { ValuesNames, CalculatedValues } from "../utils/form110";

// interface Form110ValuesProps {
//   title: string;
//   path: string;
//   data: any;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// const Form110Values = ({ title, path, data, handleChange }: Form110ValuesProps) => {
//   const getFriendlyName = (key: string) => ValuesNames[key as keyof typeof ValuesNames] || key;

//   const renderField = (value: any, fullPath: string) => {
//     const fieldKey = fullPath.split('.').pop() || '';
//     const isCalculated = CalculatedValues.includes(fieldKey);

//     if (isCalculated) {
//       return <p className="p-1 text-xl font-medium border-b-4">{value}</p>;
//     }

//     if (typeof value === "string") {
//       return (
//         <input
//           className="bg-white border rounded-md p-1"
//           type="text"
//           name={fullPath}
//           value={value}
//           placeholder={fullPath}
//           onChange={handleChange}
//         />
//       );
//     }

//     if (typeof value === "boolean") {
//       return (
//         <select
//           className="bg-white border rounded-md p-1"
//           name={fullPath}
//           value={value ? "true" : "false"}
//           onChange={handleChange}
//         >
//           <option value="true">Sí</option>
//           <option value="false">No</option>
//         </select>
//       );
//     }

//     if (typeof value === "number") {
//       return (
//         <input
//           className="bg-white border rounded-md p-1"
//           type="number"
//           name={fullPath}
//           value={value === 0 ? "" : value}
//           placeholder={fullPath}
//           onChange={handleChange}
//         />
//       );
//     }

//     return null;
//   };

//   const renderEntry = (key: string, value: any, currentPath: string) => {
//     const fullPath = `${currentPath}.${key}`;
//     const label = getFriendlyName(key);

//     if (typeof value === "object" && value !== null && !Array.isArray(value)) {
//       return (
//         <div key={key} className="flex flex-col space-y-2 bg-white">
//           <h5 className="text-md font-medium">{label}</h5>
//           {Object.entries(value).map(([subKey, subValue]) =>
//             renderEntry(subKey, subValue, fullPath)
//           )}
//         </div>
//       );
//     }

//     return (
//       <div key={key} className="flex flex-col space-y-2 bg-white">
//         <label htmlFor={fullPath} className="text-sm">{label}</label>
//         {renderField(value, fullPath)}
//       </div>
//     );
//   };

//   const renderSection = (sectionData: any, basePath: string) => {
//     if (typeof sectionData !== "object" || sectionData === null) {
//       return renderField(sectionData, basePath);
//     }

//     return (
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//         {Object.entries(sectionData).map(([key, value]) => (
//           <article key={key} className="flex flex-col border p-3 rounded-md">
//             <h4 className="mb-3 font-semibold">{getFriendlyName(key)}</h4>
//             {renderEntry(key, value, basePath)}
//           </article>
//         ))}
//       </section>
//     );
//   };

//   return (
//     <div className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white">
//       <h3 className="w-full font-bold text-xl pb-2">{getFriendlyName(title)}</h3>
//       {renderSection(data, path)}
//     </div>
//   );
// };

// export default Form110Values;
import { ValuesNames, CalculatedValues } from "../utils/form110";

interface Form110ValuesProps {
  title: string;
  path: string;
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Form110Values = ({ title, path, data, handleChange }: Form110ValuesProps) => {
  const getFriendlyName = (key: string) =>
    ValuesNames[key as keyof typeof ValuesNames] || key;

  const buildFieldName = (parentPath: string, key: string) =>
    parentPath ? `${parentPath}.${key}` : key;

  const renderInput = (name: string, value: any) => {
    const fieldKey = name.split(".").pop() || "";
    const isCalculated = CalculatedValues.includes(fieldKey);

    if (isCalculated) {
      return <p className="p-1 text-xl font-medium border-b-4">{value}</p>;
    }

    if (typeof value === "boolean") {
      return (
        <select
          className="bg-white border rounded-md p-1"
          name={name}
          value={value ? "true" : "false"}
          onChange={handleChange}
        >
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      );
    }

    if (typeof value === "string") {
      return (
        <input
          className="bg-white border rounded-md p-1"
          type="text"
          name={name}
          value={value}
          placeholder={name}
          onChange={handleChange}
        />
      );
    }

    if (typeof value === "number") {
      return (
        <input
          className="bg-white border rounded-md p-1"
          type="number"
          name={name}
          value={value === 0 ? "" : value}
          placeholder={name}
          onChange={handleChange}
        />
      );
    }

    return null;
  };

  const renderFields = (node: any, currentPath = "") => {
    if (typeof node !== "object" || node === null) {
      return (
        <div className="flex flex-col space-y-2 bg-white">
          {renderInput(currentPath, node)}
        </div>
      );
    }

    return Object.entries(node).map(([key, value]) => {
      const fieldPath = buildFieldName(currentPath, key);
      const friendlyName = getFriendlyName(key);

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return (
          <article key={fieldPath} className="flex flex-col border p-3 rounded-md">
            <label className="mb-3 font-semibold">{friendlyName}</label>
            <section className="grid grid-cols-1 gap-2">
              {renderFields(value, fieldPath)}
            </section>
          </article>
        );
      }

      return (
        <div key={fieldPath} className="flex flex-col space-y-2">
          <label htmlFor={fieldPath} className="text-sm">
            {friendlyName}
          </label>
          {renderInput(fieldPath, value)}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white">
      <h3 className="w-full font-bold text-xl pb-2">
        {getFriendlyName(title)}
      </h3>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderFields(data, path)}
      </section>
    </div>
  );
};

export default Form110Values;
