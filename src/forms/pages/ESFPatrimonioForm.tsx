import { useState, useEffect, useRef } from "react";
import StudentLayout from "../../components/templates/StudentLayout";
import { EsfPatrimonioService } from "../services/esfPatrimonio.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";

import { ESFPatrimonioInput } from "../models/EsfPatrimonioJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

import { calculateTotals, calculateTotalsSources } from "../utils/totalOperations";

const ESFpatrimonio = () => {
  const [data, setData] = useState(ESFPatrimonioInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    EsfPatrimonioService.getEsfPatrimonioFormStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(ESFPatrimonioInput, response.data.esfContent);
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

    data.ValorFiscal = (data?.ValorContable || 0) + (data?.EfectoConversion || 0) - (data?.MenorValorFiscal || 0) + (data?.MayorValorFiscal || 0);
  }

  const calculateTotalInversionesIntrumentosFinancierosDerivadosVN = (data: any) => {

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorContable = 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.InversionesInstrumentosFinancierosDerivados?.Total?.ValorContable || 0) - 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.DeterioroAcumuladoInversiones?.Total?.ValorContable || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.EfectoConversion = 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.InversionesInstrumentosFinancierosDerivados?.Total?.EfectoConversion || 0) - 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.DeterioroAcumuladoInversiones?.Total?.EfectoConversion || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MenorValorFiscal = 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.InversionesInstrumentosFinancierosDerivados?.Total?.MenorValorFiscal || 0) - 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.DeterioroAcumuladoInversiones?.Total?.MenorValorFiscal || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MayorValorFiscal = 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.InversionesInstrumentosFinancierosDerivados?.Total?.MayorValorFiscal || 0) - 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.DeterioroAcumuladoInversiones?.Total?.MayorValorFiscal || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorFiscal = 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.InversionesInstrumentosFinancierosDerivados?.Total?.ValorFiscal || 0) - 
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.DeterioroAcumuladoInversiones?.Total?.ValorFiscal || 0);
  }

  const calculateTotalCuentasComercialesPorCobrar = (data: any) => {

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorContable = 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.CuentasDocumentosPorCobrar?.Total?.ValorContable || 0) - 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.ValorContable || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.EfectoConversion = 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.CuentasDocumentosPorCobrar?.Total?.EfectoConversion || 0) - 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.EfectoConversion || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MenorValorFiscal = 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.CuentasDocumentosPorCobrar?.Total?.MenorValorFiscal || 0) - 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.MenorValorFiscal || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MayorValorFiscal = 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.CuentasDocumentosPorCobrar?.Total?.MayorValorFiscal || 0) - 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.MayorValorFiscal || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorFiscal = 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.CuentasDocumentosPorCobrar?.Total?.ValorFiscal || 0) - 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.ValorFiscal || 0);
  }

  const calculateTotalActivosIntangibles = (data: any) => {

    data.Activos.ActivosIntangibles.Total.ValorContable = 
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia?.Total?.ValorContable || 0) + 
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total?.ValorContable || 0);

    data.Activos.ActivosIntangibles.Total.EfectoConversion = 
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia?.Total?.EfectoConversion || 0) + 
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total?.EfectoConversion || 0);

    data.Activos.ActivosIntangibles.Total.MenorValorFiscal = 
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia?.Total?.MenorValorFiscal || 0) + 
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.PlusvaliaGoodwill?.Total?.MenorValorFiscal || 0);

    data.Activos.ActivosIntangibles.Total.MayorValorFiscal = 
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia?.Total?.MayorValorFiscal || 0) + 
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total?.MayorValorFiscal || 0);

    data.Activos.ActivosIntangibles.Total.ValorFiscal = 
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia?.Total?.ValorFiscal || 0) + 
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total?.ValorFiscal || 0);
  }

  const calculateTotalActivosBiologicos = (data: any) => {

    data.Activos.ActivosBiologicos.Total.ValorContable = 
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.ValorContable || 0) + 
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles?.Total?.ValorContable || 0);

    data.Activos.ActivosBiologicos.Total.EfectoConversion = 
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.EfectoConversion || 0) + 
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles?.Total?.EfectoConversion || 0);

    data.Activos.ActivosBiologicos.Total.MenorValorFiscal = 
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.MenorValorFiscal || 0) + 
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles?.Total?.MenorValorFiscal || 0);

    data.Activos.ActivosBiologicos.Total.MayorValorFiscal = 
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.MayorValorFiscal || 0) + 
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles?.Total?.MayorValorFiscal || 0);

    data.Activos.ActivosBiologicos.Total.ValorFiscal = 
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.ValorFiscal || 0) + 
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles?.Total?.ValorFiscal || 0);
  }

  const calculateTotalPatrimonio = (data: any) => {
    data.TotalPatrimonio.ValorContable = 
      (data?.Activos?.Total?.ValorContable || 0) - 
      (data?.Pasivos?.Total?.ValorContable || 0);

    data.TotalPatrimonio.EfectoConversion = 
      (data?.Activos?.Total?.EfectoConversion || 0) - 
      (data?.Pasivos?.Total?.EfectoConversion || 0);

    data.TotalPatrimonio.MenorValorFiscal = 
      (data?.Activos?.Total?.MenorValorFiscal || 0) - 
      (data?.Pasivos?.Total?.MenorValorFiscal || 0);

    data.TotalPatrimonio.MayorValorFiscal = 
      (data?.Activos?.Total?.MayorValorFiscal || 0) - 
      (data?.Pasivos?.Total?.MayorValorFiscal || 0);

    data.TotalPatrimonio.ValorFiscal = 
      (data?.Activos?.Total?.ValorFiscal || 0) - 
      (data?.Pasivos?.Total?.ValorFiscal || 0);
  }

  const handleChange = (newData: any, changedPath?: string) => {

    const arrayPath = changedPath!.split(".");

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculatedValorFiscal(element);

    calculateTotals(arrayPath, newData, "Total");

    calculateTotalInversionesIntrumentosFinancierosDerivadosVN(newData);
    calculateTotalCuentasComercialesPorCobrar(newData);
    calculateTotalActivosIntangibles(newData);
    calculateTotalActivosBiologicos(newData);

    calculateTotalsSources(newData?.Activos,
      [
        newData?.Activos?.ActivosEquivalentesEfectivo?.Total,
        newData?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.Total,
        newData?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.Total,
        newData?.Activos?.Inventarios?.Total,
        newData?.Activos?.GastosPagadosPorAnticipado?.Total,
        newData?.Activos?.ActivosImpuestosCorrientes?.Total,
        newData?.Activos?.ActivosImpuestosDiferidos?.Total,
        newData?.Activos?.PropiedadesPlantaEquipo?.Total,
        newData?.Activos?.ActivosIntangibles?.Total,
        newData?.Activos?.PropiedadesInversion?.Total,
        newData?.Activos?.ActivosNoCorrientes?.Total,
        newData?.Activos?.ActivosBiologicos?.Total,
        newData?.Activos?.OtrosActivos?.Total,
      ],
      "Total"
    );

    calculateTotalsSources(newData?.Pasivos,
      [
        newData?.Pasivos?.ObligacionesFinancierasCuentasPorPagar?.Total,
        newData?.Pasivos?.ArrendamientosPorPagar?.Total,
        newData?.Pasivos?.OtrosPasivosFinancieros?.Total,
        newData?.Pasivos?.ImpuestosGravamenesTasasPorPagar?.Total,
        newData?.Pasivos?.PasivosImpuestosDiferidos?.Total,
        newData?.Pasivos?.PasivosBeneficiosEmpleados?.Total,
        newData?.Pasivos?.Provisiones?.Total,
        newData?.Pasivos?.PasivosIngresosDiferidos?.Total,
        newData?.Pasivos?.OtrosPasivos?.Total
      ],
      "Total"
    );

    calculateTotalPatrimonio(newData);

    calculateTotalsSources(newData?.PatrimonioContable,
      [
        newData?.PatrimonioContable?.CapitalSocialReservas?.Total,
        newData?.PatrimonioContable?.ResultadoEjercicio?.Total,
        newData?.PatrimonioContable?.ResultadosAcumulados?.Total,
        newData?.PatrimonioContable?.GananciasPerdidasAcumuladasRetenidasAdopcionPrimera?.Total,
        newData?.PatrimonioContable?.OtroResultadoIntegralAcumulado?.Total
      ],
      "Total"
    );

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      EsfPatrimonioService.updateAEsfPatrimonioFormStudent(newData)
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

export default ESFpatrimonio;
