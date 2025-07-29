import StudentLayout from "../../components/templates/StudentLayout";
import ActivosFijosValues from "../components/Form110Values";
import ActivosFijosTotals from "../components/ActivosFijosTotals";
import basicInformation from "../models/ActivosFijos.json";
import Accordeon from "../components/Accordeon";
import TabBar from "../components/TabBar";
import { useEffect, useState } from "react";

import { ActivosFijosService } from "../services/activosFijos.service";

const ActivosFijosForm = () => {
  const [data, setData] = useState(basicInformation);

  const tabs = [
    { name: "PPE", label: "Propiedades, plantas y equipos" },
    { name: "PI", label: "Propiedades de inversión" },
    { name: "ANCMV", label: "ANCMV" },
    { name: "AI", label: "Activos Intangibles" },
    { name: "TOTALES", label: "TOTALES" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const updateArray = (length, path) => {
    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (path)
    let currentLevel = updatedData;
    const pathArray = path.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Actualizar el valor
    console.log("length", currentLevel[lastKey].length);
    for (let i = 0; i < length; i++) {
      if (currentLevel[lastKey].length < length) {
        currentLevel[lastKey].push({
          ...addRetencion,
        });
      }
    }
    setData(updatedData);
  };

  const updateValue = (value, path) => {
    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (path)
    let currentLevel = updatedData;
    const pathArray = path.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Actualizar el valor
    currentLevel[lastKey] = value;
    setData(updatedData);
  };

  const recieveData = (key, path) => {
    if (Array.isArray(key) && key.length > 1) {
      updateArray(key.length, path);
    }
    if (typeof key === "object") {
      Object.entries(key).map(([key, val]) => {
        recieveData(val, `${path}.${key}`);
      });
    } else {
      updateValue(key, path);
    }
  };

  useEffect(() => {
    ActivosFijosService.getActivosFijosFormStudent()
      .then((response) => {
        if (response.status === 200) {
          Object.entries(response.data.actContent).map(([key, val]) => {
            recieveData(val, key);
          });
        } else {
          console.error("Error en la respuesta", response);
        }
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (e, path) => {
    let { name, value } = e.target;
    if (value === "") value = 0;
    const pathArray = path.split(".");

    setData((prevData) => {
      let newData = { ...prevData };
      let temp = newData;

      for (let i = 0; i < pathArray.length; i++) {
        if (i === pathArray.length - 1) {
          if (typeof temp[pathArray[i]] === "object") {
            temp[pathArray[i]][name] = parseFloat(value) || 0;
          } else {
            temp[pathArray[i]] = parseFloat(value) || 0;
          }
        } else {
          temp = temp[pathArray[i]];
        }
      }

      // Calcular los totales
      const calculateTotals = (obj) => {
        const totals = {};

        Object.entries(obj).forEach(([key, values]) => {
          if (
            key !== "Total" &&
            typeof values === "object" &&
            values !== null
          ) {
            Object.entries(values).forEach(([subKey, subValue]) => {
              if (typeof subValue === "number") {
                if (!totals[subKey]) {
                  totals[subKey] = 0;
                }
                totals[subKey] += subValue;
              }
            });
          }
        });

        return totals;
      };

      // Actualizar los totales de PropiedadesInversión
      const PPE_Total = calculateTotals(newData.PropiedadesPlantasEquipos);
      const PI_Total = calculateTotals(newData.PropiedadesInversión);
      const AI_Total = calculateTotals(newData.ActivosIntangibles);

      newData.PropiedadesPlantasEquipos.Total = PPE_Total;
      newData.PropiedadesInversión.Total = PI_Total;
      newData.ActivosIntangibles.Total = AI_Total;

      console.log(newData); // Para depuración

      setData(newData);
      ActivosFijosService.updateACtivosFijosFormStudent(newData);
    });
  };

  const renderSections = (sectionData, pathPrefix, excludeSection = "") => {
    return Object.keys(sectionData).map((sectionKey) => {
      if (sectionKey === excludeSection) return null;
      return (
        <Accordeon key={sectionKey} title={sectionKey}>
          <ActivosFijosValues
            title={sectionKey}
            path={`${pathPrefix}.${sectionKey}`}
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
        {activeTab === "PPE" &&
          renderSections(
            data.PropiedadesPlantasEquipos,
            "PropiedadesPlantasEquipos",
            "Total"
          )}
        {activeTab === "PI" &&
          renderSections(
            data.PropiedadesInversión,
            "PropiedadesInversión",
            "Total"
          )}
        {activeTab === "ANCMV" && (
          <ActivosFijosValues
            title={"ANCMV"}
            path={"ANCMV"}
            data={data.ANCMV}
            handleChange={handleChange}
          />
        )}
        {activeTab === "AI" &&
          renderSections(
            data.ActivosIntangibles,
            "ActivosIntangibles",
            "Total"
          )}
        {activeTab === "TOTALES" && (
          <div>
            <Accordeon title={"Total Propiedades, plantas y equipos"}>
              <ActivosFijosTotals
                title="Total PPE"
                data={data.PropiedadesPlantasEquipos.Total}
              />
            </Accordeon>
            <Accordeon title={"Total Propiedades de inversión"}>
              <ActivosFijosTotals title="Total PPE" data={data.ANCMV} />
            </Accordeon>
            <Accordeon title={"Total Activos Intangibles"}>
              <ActivosFijosTotals title="Total PPE" data={data.ANCMV} />
            </Accordeon>
            <Accordeon title={"Total PPE, PI y ANCMV"}>
              <ActivosFijosTotals
                title="Total PPE"
                data={data.TotalPPEPIANCMV}
              />
            </Accordeon>
            <Accordeon title={"Total Propiedades, plantas y equipos"}>
              <ActivosFijosTotals title="Total PPE" data={data.ANCMV} />
            </Accordeon>
          </div>
        )}
      </section>
    </StudentLayout>
  );
};

export default ActivosFijosForm;
