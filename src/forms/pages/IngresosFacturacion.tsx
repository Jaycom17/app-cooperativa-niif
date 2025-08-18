import { useState, useEffect, useRef } from "react";
import StudentLayout from "../../components/templates/StudentLayout";
import { IngresosFacturacionService } from "../services/ingresosFacturacion.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";

import { IngresosFacturacionInput } from "../models/IngFactJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

import { calculateTotals } from "../utils/totalOperations";

import { config } from "../utils/IngresosFacturacion";

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

        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const calculateSaldofinalPeriodo = (data: any) => {
    if (data?.PasivoPorIngresoDiferido?.SaldoAlFinalDelPeriodo == null) {
      return;
    }

    data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo =
      (data?.PasivoPorIngresoDiferido.SaldoAlInicioDelPeriodo || 0) -
      (data?.PasivoPorIngresoDiferido.RegistradoComoIngresoContableEnElPeriodo || 0) +
      (data?.PasivoPorIngresoDiferido.GeneradoEnElPeriodo || 0);
  };

  const calculateValorTotalFacturacion = (data: any) => {
    if (data?.FacturacionEmitidaEnElPeriodo?.ValorTotal == null) {
      return;
    }

    data.FacturacionEmitidaEnElPeriodo.ValorTotal =
      (data?.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresoEnPeriodosAnteriores || 0) +
      (data?.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo || 0) +
      (data?.FacturacionEmitidaEnElPeriodo.RegistradaComoIngresoDiferido || 0) +
      (data?.FacturacionEmitidaEnElPeriodo.SoloFacturadoNoHaGeneradoIngresoNiPasivoDiferido || 0);
  }

  const calculateValorTotalIngresoContable = (data: any) => {
    if (data?.IngresoContableDevengadoEnElPeriodo?.ValorTotal == null) {
      console.log("first")
      return;
    }

    data.IngresoContableDevengadoEnElPeriodo.ValorTotal =
      (data?.IngresoContableDevengadoEnElPeriodo.SinFacturar || 0) +
      (data?.IngresoContableDevengadoEnElPeriodo.FacturadoPeriodosAnteriores || 0) +
      (data?.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo || 0);
  }

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
        <div className="mb-2 text-right text-sm text-gray-600 flex justify-end items-center gap-2 pr-3 md:pr-0">
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
        <FormRender
          value={data}
          onChange={handleChange}
          canEdit={true}
          defaultOpen={false}
          config={config}
        />
      </main>
    </StudentLayout>
  );
}

export default IngresosFacturacionForm;
