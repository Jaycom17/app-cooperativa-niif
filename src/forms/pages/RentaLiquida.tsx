import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { RentaLiquidaService } from "../services/rentaLiquida.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import { config } from "../utils/RentaLiquida";

import { RentaLiquidaInput } from "../models/RentaLiquidaJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

import { calculateTotals } from "../utils/totalOperations";

function RentaLiquidaForm() {
  const [data, setData] = useState(RentaLiquidaInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    RentaLiquidaService.getRentaLiquidaForStudent()
      .then((res) => {
        const merged = mergeDeepPreservingOrder(RentaLiquidaInput, res.data.renContent);
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const calculatedValorFiscal = (data: any) => {
    if (data?.ValorFiscal == null) {
      return;
    }

    data.ValorFiscal = (data?.ValorContable || 0) + (data?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) + (data?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
  }

  const calculateValorFiscalSolicitado = (data: any) => {
    if (data?.ValorFiscalSolicitado == null) {
      return;
    }

    data.ValorFiscalAlQueTieneDerecho = (data?.ValorFiscalAlQueTieneDerecho || 0)
  }

  const calculateOtras = (data: any) => {
    if (data?.Otras == null) {
      return;
    }

    data.Otras = (data?.ValorFiscal || 0);
  }
  

  const handleChange = (newData: any, changedPath?: string) => {

    const arrayPath = changedPath!.split(".");

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculatedValorFiscal(element);

    calculateValorFiscalSolicitado(element);

    calculateOtras(element);

    calculateTotals(arrayPath.slice(0, -1), newData, "Total");

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      RentaLiquidaService.updateRentaLiquidaForStudent(newData)
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

export default RentaLiquidaForm;
