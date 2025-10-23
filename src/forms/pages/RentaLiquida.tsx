import { useState, useEffect, useRef } from "react";

import StudentLayout from "@/components/templates/StudentLayout";
import { RentaLiquidaService } from "@/forms/services/rentaLiquida.service";
import { FormRender } from "@/forms/components/FormRender";
import { config, calculateOtras, calculateValorFiscalSolicitado, calculatedValorFiscal, calculateAllPartOne, calculateAllPartTwo, calculateFirstValorFiscal } from "../utils/RentaLiquida";

import { RentaLiquidaInput } from "@/forms/models/RentaLiquidaJson";

import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";

import { calculateTotals } from "@/forms/utils/totalOperations";
import Loading from "@/forms/components/atoms/Loading";

import { useStatusStore } from "@/stores/StatusStore";
import PopUpMessage from "@/components/molecules/PopUpMessage";

function RentaLiquidaForm() {
  const [data, setData] = useState(RentaLiquidaInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setStatus, message, show, title, type } = useStatusStore();

  useEffect(() => {
    RentaLiquidaService.getRentaLiquidaForStudent()
      .then((res) => {
        const merged = mergeDeepPreservingOrder(RentaLiquidaInput, res.data.renContent);

        calculateFirstValorFiscal(merged, merged);

        RentaLiquidaService.updateRentaLiquidaForStudent(merged);

        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {

    const arrayPath = changedPath!.split(".");

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculatedValorFiscal(element);

    calculateValorFiscalSolicitado(element);

    calculateOtras(element);

    calculateTotals(arrayPath.slice(0, -1), newData, "Total", /^(InventarioFinal)/);
    
    calculateAllPartOne(newData);

    calculateTotals(arrayPath.slice(0, -1), newData, "TotalDiferenciasTemporalesDeducibles");
    calculateTotals(arrayPath.slice(0, -1), newData, "TotalDiferenciasTemporalesImponibles");
    calculateTotals(arrayPath.slice(0, -1), newData, "TotalOtrasDiferenciasTemporales");

    calculateAllPartTwo(newData);

    calculateTotals(arrayPath.slice(0, -1), newData, "TotalAutorretenciones");
    calculateTotals(arrayPath.slice(0, -1), newData, "TotalOtrasRetenciones");
    calculateTotals(arrayPath.slice(0, -1), newData, "ValorNetoGastoPorImpuesto", /^(IngresoImpuestoDiferido)/);

    setData(newData);
    
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      RentaLiquidaService.updateRentaLiquidaForStudent(newData)
        .then(() => setSaveStatus("saved"))
        .catch((error) => {
          setSaveStatus("idle");
          setStatus({ show: true, message: error.response?.data?.message || "Error al guardar el formulario", title: "Error", type: "error" });
        });
      timeoutRef.current = null;
    }, 2000);
  };

  return (
    <StudentLayout>
      <main className="w-full pt-7 md:p-8 max-h-screen overflow-auto">
        {show && (
        <PopUpMessage
          message={message}
          title={title}
          onClose={() =>
            setStatus({ show: false, message: "", title: "", type: "info" })
          }
          type={type}
        />
      )}
        
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

export default RentaLiquidaForm;
