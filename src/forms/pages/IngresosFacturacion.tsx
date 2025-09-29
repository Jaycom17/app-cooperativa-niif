import { useState, useEffect, useRef } from "react";

import StudentLayout from "@/components/templates/StudentLayout";
import { IngresosFacturacionService } from "@/forms/services/ingresosFacturacion.service";
import { FormRender } from "@/forms/components/FormRender";

import { IngresosFacturacionInput } from "@/forms/models/IngFactJson";

import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";

import { calculateTotals } from "@/forms/utils/totalOperations";

import { config, calculateSaldofinalPeriodo, calculateValorTotalFacturacion, calculateValorTotalIngresoContable } from "@/forms/utils/IngresosFacturacion";
import Loading from "@/forms/components/atoms/Loading";

function IngresosFacturacionForm() {
  const [data, setData] = useState(IngresosFacturacionInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    IngresosFacturacionService.getIngresosFacturacionForStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(
          IngresosFacturacionInput,
          response.data.ingContent
        );

        calculateValorTotalFacturacion(merged?.VentaDeBienes);
        calculateValorTotalIngresoContable(merged?.VentaDeBienes);

        calculateValorTotalFacturacion(merged?.PrestacionDeServicios);
        calculateValorTotalIngresoContable(merged?.PrestacionDeServicios);

        calculateTotals(["VentaDeBienes"], merged, "Total");

        IngresosFacturacionService.updateIngresosFacturacionForStudent(merged);

        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {

    const arrayPath = changedPath!.split(".").slice(0, -1);

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculateSaldofinalPeriodo(element);
    calculateValorTotalFacturacion(element);
    calculateValorTotalIngresoContable(element);

    calculateTotals(arrayPath, newData, "Total");

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      IngresosFacturacionService.updateIngresosFacturacionForStudent(newData)
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
}

export default IngresosFacturacionForm;
