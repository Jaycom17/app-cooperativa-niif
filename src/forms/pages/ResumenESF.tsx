import StudentLayout from "../../components/templates/StudentLayout";
import jsonData from "../models/ResumenESF.json";
import ResumenESFValues from "../components/ResumenESFValues";
import Accordeon from "../components/Accordeon";
import { useState, useEffect, useRef } from "react";
import TabBar from "../components/TabBar";
import { ResumenESFService } from "../services/resumenESF.service";

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

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ResumenESFService.getResumenESFForStudent().then((response) => {
      if (response.data.resContent) {
        setData(response.data.resContent);
      }
    });
  }, []);

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
    console.log(newData);

    setData(newData);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      ResumenESFService.updateResumenESFForStudent(newData);
      timeoutRef.current = null;
    }, 5000);
  };

  const renderSections = (sectionData, pathPrefix = "", friendlyNames = []) => {
    if (!sectionData || typeof sectionData !== "object") {
      return null;
    }
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
    <StudentLayout>
      <section className="w-full mt-12 md:mt-0 overflow-auto max-h-screen">
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
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
  );
}

export default ResumenESFForm;
