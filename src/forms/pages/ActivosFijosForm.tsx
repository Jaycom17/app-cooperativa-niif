import StudentLayout from "../../components/templates/StudentLayout";
import { useEffect, useRef, useState } from "react";
import { ActivosFijosService } from "../services/activosFijos.service";
import { FormRender } from "../components/FormRender";
import { FiCheckCircle, FiEdit3, FiLoader } from "react-icons/fi";

import { ActivosFijosInput } from "../models/ActivosFijosJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

import { calculateTotals } from "../utils/totalOperations";

const ActivosFijosForm = () => {
  const [data, setData] = useState(ActivosFijosInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ActivosFijosService.getActivosFijosFormStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(ActivosFijosInput, response.data.actContent);
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const calculateImporteNetoFinalPeriodoCosto = (data: any) => {

    if (data?.ImporteNetoAlFinalDelPeriodo?.Costo == null) {
      return;
    }

    data.ImporteNetoAlFinalDelPeriodo.Costo = (data?.ImporteAlComienzoDelPeriodo?.Costo || 0) + (data?.ImporteAlComienzoDelPeriodo?.EfectoDeConversion || 0) + (data?.Incrementos?.TransferenciasAdquisiciones || 0) - (data?.Disminuciones?.TransferenciasEliminaciones || 0) - (data?.Depreciacion?.PorCosto || 0) - (data?.Depreciacion?.EfectoDeConversion || 0) - (data?.DeterioroAcumuladoAlFinalDelPeriodo || 0);
  }

  const calculateImporteNetoFinalPeriodoAjustePorRevaluacion = (data: any) => {

    if (data?.ImporteNetoAlFinalDelPeriodo?.AjustePorRevaluacionesOReExpresiones == null) {
      return;
    }

    data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones = (data?.ImporteAlComienzoDelPeriodo?.AjustePorRevaluacionesOReExpresiones || 0) + (data?.ImporteAlComienzoDelPeriodo?.EfectoDeConversion || 0) + (data?.Incrementos?.CambiosEnValorRazonable || 0) - (data?.Disminuciones?.CambiosEnValorRazonable || 0) - (data?.Depreciacion?.AjustePorRevaluacionesOReExpresiones || 0);
  }

  const calculateSubtotalAlFinalDelPeriodo = (data: any) => {

    if (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.SubtotalAlFinalPeriodo == null) {
      return;
    }

    data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo = (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.SaldoAlComienzoDelPeriodo || 0) + (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.IncrementosPorTransferenciasAdquisicionesYOtrosCambios || 0) - (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.DisminucionesPorTransferenciasYOtrosCambios || 0);
  }

  const calculateTotalNetoAlFinalDelPeriodoFinanciero = (data: any) => {

    if (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.TotalNetoAlFinalDelPeriodo == null) {
      return;
    }

    data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo = (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.SubtotalAlFinalPeriodo || 0) - (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero?.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo || 0);
  }

  const calculateTotalNetoAlFinalDelPeriodoInformativo = (data: any) => {

    if (data?.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero?.ValorNetoAlFinalDelPeriodo == null) {
      return;
    }

    data.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo = (data?.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero?.ValorTotalAlFinalDelPeriodo || 0) - (data?.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero?.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo || 0);
  }

  const handleChange = (newData: any, changedPath?: string) => {

    const arrayPath = changedPath!.split(".").slice(0, -1);

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculateImporteNetoFinalPeriodoCosto(element);
    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(element);
    calculateSubtotalAlFinalDelPeriodo(element);
    calculateTotalNetoAlFinalDelPeriodoFinanciero(element);
    calculateTotalNetoAlFinalDelPeriodoInformativo(element);

    calculateTotals(arrayPath, newData, "TotalPropiedadesPlantasEquipo");

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      ActivosFijosService.updateACtivosFijosFormStudent(newData)
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
        />
      </main>
    </StudentLayout>
  );
};

export default ActivosFijosForm;
