import StudentLayout from "../../components/templates/StudentLayout";
import jsonData from "../models/ResumenESF.json";
import ResumenESFValues from "../components/ResumenESFValues";
import Accordeon from "../components/Accordeon";
import { useState } from "react";
import TabBar from "../components/TabBar";

function ResumenESFForm() {
  const tabs = [
    {
      name: "EstadoSituacionFinanciera",
      label: "Estado de Situación Financiera",
    },
    { name: "EstadosResultadoIntegral", label: "Estado de Resultado Integral" },
    { name: "ResultadoEjercicio", label: "Resultado del Ejercicio" },
  ];

  const [data, setData] = useState(jsonData);
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value === "") value = 0;
    const pathArray = name.split(".");

    let newData = { ...data };
    let temp = newData;

    for (let i = 0; i < pathArray.length; i++) {
      if (i === pathArray.length - 1) {
        if (typeof temp[pathArray[i]] === "object") {
          temp[pathArray[i]] = parseFloat(value) || 0;
        } else {
          temp[pathArray[i]] = parseFloat(value) || 0;
        }
      } else {
        temp = temp[pathArray[i]];
      }
    }

    setData(newData);

    console.log(data);
  };

  const renderSections = (sectionData, pathPrefix = "", friendlyNames = []) => {
    return Object.keys(sectionData).map((sectionKey) => {
      const friendlyName = friendlyNames[sectionKey] || sectionKey;

      if (typeof sectionData[sectionKey] !== "object") {
        return (
          <div key={sectionKey}>
            <ResumenESFValues
              path={`${pathPrefix === "" ? "" : `${pathPrefix}.`}${sectionKey}`}
              data={sectionData[sectionKey]}
              handleChange={handleChange}
            />
          </div>
        );
      }
      return (
        <Accordeon key={sectionKey} title={friendlyName}>
          <ResumenESFValues
            path={`${pathPrefix === "" ? "" : `${pathPrefix}.`}${sectionKey}`}
            data={sectionData[sectionKey]}
            handleChange={handleChange}
          />
        </Accordeon>
      );
    });
  };

  return (
    <main className="flex md:flex-row w-full">
      <StudentLayout>
        <section className="w-full mt-12 md:mt-0 overflow-auto max-h-screen">
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {activeTab === "EstadoSituacionFinanciera" &&
            renderSections(
              data.EstadoSituacionFinanciera,
              "EstadoSituacionFinanciera",
              []
            )}
          {activeTab === "EstadosResultadoIntegral" &&
            renderSections(
              data.EstadosResultadoIntegral,
              "EstadosResultadoIntegral",
              []
            )}
          {activeTab === "ResultadoEjercicio" &&
            renderSections(data.ResultadoEjercicio, "ResultadoEjercicio", [])}
        </section>
      </StudentLayout>
    </main>
  );
}

export default ResumenESFForm;
