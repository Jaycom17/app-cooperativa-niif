import StudentLayout from "../../components/templates/StudentLayout";
import ActivosFijosValues from "../components/ActivosFijosValues";
import ActivosFijosTotals from "../components/ActivosFijosTotals";
import basicInformation from "../models/ActivosFijos.json";
import Accordeon from "../components/Accordeon";
import TabBar from "../components/TabBar";
import { useEffect, useRef, useState } from "react";
import {
  friendlyNamesPPE,
  friendlyNamesAI,
  calculateCostoImpNetoFinPeriodo,
  calculateAjusteImpNetoFinPeriodo,
  calculateSubTotalFinPeriodo,
  calculateTotalNetoFinPeriodo,
  calculateValorNetoFinPeriodo,
  calcultateTotal,
} from "../utils/ActivosFijos";

import { ActivosFijosService } from "../services/activosFijos.service";

const ActivosFijosForm = () => {
  const [data, setData] = useState(basicInformation);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tabs = [
    { name: "PPE", label: "Propiedades, plantas y equipos" },
    { name: "PI", label: "Propiedades de inversión" },
    { name: "ANCMV", label: "ANCMV" },
    { name: "AI", label: "Activos Intangibles" },
    { name: "TOTALES", label: "TOTALES" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  useEffect(() => {
    ActivosFijosService.getActivosFijosFormStudent()
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.actContent);
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

      const keys = Object.keys(newData);

      keys.forEach((key) => {
        Object.keys(newData[key]).forEach((subKey) => {
          const contables = newData[key][subKey].Contables;
          const fiscales = newData[key][subKey].Fiscales;

          if (contables && contables.ImporteNeto) {
            contables.ImporteNeto.Costo = calculateCostoImpNetoFinPeriodo(
              newData[key][subKey]
            );
            contables.ImporteNeto.Ajuste = calculateAjusteImpNetoFinPeriodo(
              newData[key][subKey]
            );
          }

          if (fiscales) {
            fiscales.SubtotalFinalPeriodo = calculateSubTotalFinPeriodo(
              newData[key][subKey]
            );
            fiscales.TotalNeto = calculateTotalNetoFinPeriodo(
              newData[key][subKey]
            );
            fiscales.ValorNeto = calculateValorNetoFinPeriodo(
              newData[key][subKey]
            );
          }
        });
      });

      const PPE = newData.PropiedadesPlantasEquipos;
      const PI = newData.PropiedadesInversión;
      const ANCMV = newData.ANCMV.ANCMV;
      const AI = newData.ActivosIntangibles;
      const TotalPPEPIANCMV = newData.TotalPPEPIANCMV;
      const TotalTodo = newData.TotalTodo;

      const elementosPPE = [
        PPE.Terrenos,
        PPE.Edificios,
        PPE.Maquinaria,
        PPE.Buques,
        PPE.Aeronave,
        PPE.EquiposTransporte,
        PPE.EnseresAccesorios,
        PPE.EquiposInformaticos,
        PPE.EquiposRedesComunicacion,
        PPE.InfraestructuraRed,
        PPE.ActivosTangiblesExploracionEvaluacion,
        PPE.ActivosMineria,
        PPE.ActivosPetroleoGas,
        PPE.PPyEArrendamientoOperativo,
        PPE.PlantasProductoras,
        PPE.AnimalesProductores,
        PPE.ConstruccionesProceso,
        PPE.Otras,
      ];

      const elementosPI = [PI.Terrenos, PI.Edificios];

      const elementosAI = [
        AI.MarcasComerciales,
        AI.ActivosIntangiblesExploracionEvaluacion,
        AI.CabecerasOeriodicosRevistasTitulosPublicaciones,
        AI.ProgramasAplicacionesInformaticos,
        AI.LicenciasFranquicias,
        AI.PropiedadIntelectualPatentesPropiedadIndustrialServiciosDerechosOperacion,
        AI.RecetasFormulasModelosDiseñosPrototipos,
        AI.Concesiones,
        AI.DesembolsosDesarrolloCapitalizados,
        AI.ActivosIntangiblesDesarrollo,
        AI.Plusvalia,
        AI.MejorasDerechosArrendamiento,
        AI.SubvencionesEstado,
        AI.Otros,
      ];

      const elementosPPEPIANCMV = [PPE.Total, PI.Total, ANCMV];

      const elementosTodo = [TotalPPEPIANCMV, AI.Total];

      calcultateTotal(PPE.Total, elementosPPE);
      calcultateTotal(PI.Total, elementosPI);
      calcultateTotal(AI.Total, elementosAI);
      calcultateTotal(TotalPPEPIANCMV, elementosPPEPIANCMV);
      calcultateTotal(TotalTodo, elementosTodo);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        ActivosFijosService.updateACtivosFijosFormStudent(newData);
        timeoutRef.current = null;
      }, 5000);

      return newData;
    });
  };

  const renderSections = (
    sectionData,
    pathPrefix,
    excludeSection = "",
    friendlyNames = []
  ) => {
    return Object.keys(sectionData).map((sectionKey) => {
      if (sectionKey === excludeSection) return null;

      const friendlyName = friendlyNames[sectionKey] || sectionKey;

      return (
        <Accordeon key={sectionKey} title={friendlyName}>
          <ActivosFijosValues
            title={friendlyName}
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
            "Total",
            friendlyNamesPPE
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
            path={"ANCMV.ANCMV"}
            data={data.ANCMV.ANCMV}
            handleChange={handleChange}
          />
        )}
        {activeTab === "AI" &&
          renderSections(
            data.ActivosIntangibles,
            "ActivosIntangibles",
            "Total",
            friendlyNamesAI
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
              <ActivosFijosTotals
                title="Total PI"
                data={data.PropiedadesInversión.Total}
              />
            </Accordeon>
            <Accordeon title={"Total Activos Intangibles"}>
              <ActivosFijosTotals
                title="Total AI"
                data={data.ActivosIntangibles.Total}
              />
            </Accordeon>
            <Accordeon title={"Total PPE, PI y ANCMV"}>
              <ActivosFijosTotals
                title="Total PPE, PI y ANCMV"
                data={data.TotalPPEPIANCMV}
              />
            </Accordeon>
            <Accordeon title={"Total PPE, PI, ANCMV y AI"}>
              <ActivosFijosTotals
                title="Total PPE, PI, ANCMV y AI"
                data={data.TotalTodo}
              />
            </Accordeon>
          </div>
        )}
      </section>
    </StudentLayout>
  );
};

export default ActivosFijosForm;
