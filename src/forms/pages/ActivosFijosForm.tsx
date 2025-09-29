import { useEffect, useRef, useState } from "react";

import StudentLayout from "@/components/templates/StudentLayout";
import { ActivosFijosService } from "@/forms/services/activosFijos.service";
import { FormRender } from "@/forms/components/FormRender";
import { ActivosFijosInput } from "@/forms/models/ActivosFijosJson";
import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";

import {
  calculateTotals,
  calculateTotalsSources,
} from "@/forms/utils/totalOperations";
import {
  calculateImporteNetoFinalPeriodoCosto,
  calculateImporteNetoFinalPeriodoAjustePorRevaluacion,
  calculateSubtotalAlFinalDelPeriodo,
  calculateTotalNetoAlFinalDelPeriodoFinanciero,
  calculateTotalNetoAlFinalDelPeriodoInformativo,
  config
} from "@/forms/utils/ActivosFijos";
import Loading from "@/forms/components/atoms/Loading";

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

    if (Object.prototype.hasOwnProperty.call(element, "DatosContables")) {
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
        
        <Loading saveStatus={saveStatus} />

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
