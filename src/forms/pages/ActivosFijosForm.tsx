import StudentLayout from "../../components/templates/StudentLayout";
import { useEffect, useRef, useState } from "react";
import { ActivosFijosService } from "../services/activosFijos.service";
import { FormRender } from "../components/FormRender";
import { FiCheckCircle, FiEdit3, FiLoader } from "react-icons/fi";

import { ActivosFijosInput } from "../models/ActivosFijosJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

import {
  calculateTotals,
  calculateTotalsSources,
} from "../utils/totalOperations";
import {
  calculateImporteNetoFinalPeriodoCosto,
  calculateImporteNetoFinalPeriodoAjustePorRevaluacion,
  calculateSubtotalAlFinalDelPeriodo,
  calculateTotalNetoAlFinalDelPeriodoFinanciero,
  calculateTotalNetoAlFinalDelPeriodoInformativo,
  config
} from "../utils/ActivosFijos";

const ActivosFijosForm = () => {
  const [data, setData] = useState(ActivosFijosInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ActivosFijosService.getActivosFijosFormStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(
          ActivosFijosInput,
          response.data.actContent
        );
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {
    const arrayPath = changedPath!.split(".").slice(0, -1);

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    if (element.hasOwnProperty("DatosContables")) {
      calculateImporteNetoFinalPeriodoCosto(element.DatosContables);
    }else {
      calculateImporteNetoFinalPeriodoCosto(element);
    }

    
    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(element);
    calculateSubtotalAlFinalDelPeriodo(element);
    calculateTotalNetoAlFinalDelPeriodoFinanciero(element);
    calculateTotalNetoAlFinalDelPeriodoInformativo(element);

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculateTotals(arrayPath, newData, "TotalPropiedadesPlantasEquipo");
      calculateTotals(arrayPath, newData, "TotalPorpiedadesDeInversion");
      calculateTotals(arrayPath, newData, "TotalActivosIntangibles");
      calculateTotalsSources(
      newData,
      [
        newData?.PropiedadesPlantasYEquipos?.TotalPropiedadesPlantasEquipo,
        newData?.PropiedadesDeInversión?.TotalPorpiedadesDeInversion,
        newData?.ANCMV,
      ],
      "TotalPPEPIANCMV"
    );

    calculateTotalsSources(
      newData,
      [
        newData?.TotalPPEPIANCMV,
        newData?.ActivosIntangibles?.TotalActivosIntangibles,
      ],
      "TotalPPEPIANCMVYINTANGIBLES"
    );
      ActivosFijosService.updateACtivosFijosFormStudent(newData)
        .then(() => setSaveStatus("saved"))
        .catch(() => setSaveStatus("idle"));
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <StudentLayout>
      <main className="w-full pt-7 md:p-8 max-h-screen overflow-auto">
        <div className="text-sm text-gray-600 flex justify-end items-center gap-2 pr-3 md:pr-0 absolute top-0 right-0 mt-3 mr-3 md:mr-10">
          {saveStatus === "saving" && (
            <>
              <FiLoader className="animate-spin" />
              <span>Guardando...</span>
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <FiCheckCircle />
              <span>Guardado</span>
            </>
          )}
          {saveStatus === "idle" && (
            <>
              <FiEdit3 />
              <span>Cambios no guardados</span>
            </>
          )}
        </div>
        <div className="min-w-[500px]">
          <FormRender
          value={data}
          onChange={handleChange}
          canEdit={true}
          config={config}
          defaultOpen={false}
        />
        </div>
      </main>
    </StudentLayout>
  );
};

export default ActivosFijosForm;
