import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { RentaLiquidaService } from "../services/rentaLiquida.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import { config } from "../utils/RentaLiquida";

import { RentaLiquidaInput } from "../models/RentaLiquidaJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

import { calculateTotals, calculateTotalsSources } from "../utils/totalOperations";

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

  const calculateTotalIngresosNetosAvIn = (data: any) => {
    if (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.Total == null) {
      return;
    }

    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.ValorContable = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.ValorContable || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.ValorContable || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MenorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.ValorFiscal = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.ValorFiscal || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.ValorFiscal || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel9Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaDel9Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaDel9Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel15Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaDel15Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaDel15Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel20Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaDel20Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaDel20Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MegaInversiones = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MegaInversiones || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MegaInversiones || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MegaInversiones27Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MegaInversiones27Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MegaInversiones27Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaGeneralArticulo240ET = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaGeneralArticulo240ET || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaGeneralArticulo240ET || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.Otras = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.Otras || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.Otras || 0);
  }
  
  const calculateTotalIngresos = (data: any) => {
    calculateTotalsSources(data?.Ingresos,
      [
        data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.Total,
        data?.Ingresos?.IngresosFinancieros?.Total,
        data?.Ingresos?.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos?.Total,
        data?.Ingresos?.IngresosPorMedicionesAValorRazonable?.Total,
        data?.Ingresos?.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios?.Total,
        data?.Ingresos?.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional?.Total,
        data?.Ingresos?.IngresosPorReversionDeDeterioroDelValor?.Total,
        data?.Ingresos?.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos?.Total,
        data?.Ingresos?.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados?.Total,
        data?.Ingresos?.OtrosIngresos?.Total,
        data?.Ingresos?.GananciasNetasEnOperacionesDiscontinuas,
      ],
      "TotalIngresos"
    );

    data.Ingresos.TotalIngresos.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.TotalIngresos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);

    data.Ingresos.TotalIngresos.ValorFiscal = (data?.Ingresos?.TotalIngresos?.ValorFiscal || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.ValorFiscal || 0);

    data.Ingresos.TotalIngresos.TarifaDel9Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel9Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaDel9Porciento || 0);

    data.Ingresos.TotalIngresos.TarifaDel15Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel15Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaDel15Porciento || 0);

    data.Ingresos.TotalIngresos.TarifaDel20Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel20Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaDel20Porciento || 0);

    data.Ingresos.TotalIngresos.MegaInversiones = (data?.Ingresos?.TotalIngresos?.MegaInversiones || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.MegaInversiones || 0);

    data.Ingresos.TotalIngresos.MegaInversiones27Porciento = (data?.Ingresos?.TotalIngresos?.MegaInversiones27Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.MegaInversiones27Porciento || 0);

    data.Ingresos.TotalIngresos.TarifaGeneralArticulo240ET = (data?.Ingresos?.TotalIngresos?.TarifaGeneralArticulo240ET || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaGeneralArticulo240ET || 0);

    data.Ingresos.TotalIngresos.Otras = (data?.Ingresos?.TotalIngresos?.Otras || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.Otras || 0);
  }

  const calculateGananciaOPerdida = (data: any) => {
    if (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida == null) {
      return;
    }
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.ValorContable = (data?.Ingresos?.TotalIngresos?.ValorContable || 0) - (data?.Costos?.TotalCostos?.ValorContable || 0) - (data?.Gastos?.TotalGastos?.ValorContable || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano = (data?.Ingresos?.TotalIngresos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.Costos?.TotalCostos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.Gastos?.TotalGastos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MenorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.TotalIngresos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Costos?.TotalCostos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Gastos?.TotalGastos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.TotalIngresos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Costos?.TotalCostos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Gastos?.TotalGastos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.ValorFiscal = (data?.Ingresos?.TotalIngresos?.ValorFiscal || 0) - (data?.Costos?.TotalCostos?.ValorFiscal || 0) - (data?.Gastos?.TotalGastos?.ValorFiscal || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel9Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel9Porciento || 0) - (data?.Costos?.TotalCostos?.TarifaDel9Porciento || 0) - (data?.Gastos?.TotalGastos?.TarifaDel9Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel15Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel15Porciento || 0) - (data?.Costos?.TotalCostos?.TarifaDel15Porciento || 0) - (data?.Gastos?.TotalGastos?.TarifaDel15Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel20Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel20Porciento || 0) - (data?.Costos?.TotalCostos?.TarifaDel20Porciento || 0) - (data?.Gastos?.TotalGastos?.TarifaDel20Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MegaInversiones = (data?.Ingresos?.TotalIngresos?.MegaInversiones || 0) - (data?.Costos?.TotalCostos?.MegaInversiones || 0) - (data?.Gastos?.TotalGastos?.MegaInversiones || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MegaInversiones27Porciento = (data?.Ingresos?.TotalIngresos?.MegaInversiones27Porciento || 0) - (data?.Costos?.TotalCostos?.MegaInversiones27Porciento || 0) - (data?.Gastos?.TotalGastos?.MegaInversiones27Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaGeneralArticulo240ET = (data?.Ingresos?.TotalIngresos?.TarifaGeneralArticulo240ET || 0) - (data?.Costos?.TotalCostos?.TarifaGeneralArticulo240ET || 0) - (data?.Gastos?.TotalGastos?.TarifaGeneralArticulo240ET || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.Otras = (data?.Ingresos?.TotalIngresos?.Otras || 0) - (data?.Costos?.TotalCostos?.Otras || 0) - (data?.Gastos?.TotalGastos?.Otras || 0);
  }

  const calculateLiquidasPasivasECE = (data: any) => {

    data.RentaLiquidaOrdinariaDelEjercicioIncluyendeoDividendosYAntesDeLasRentasLiquidasPasivasECE = (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) > 0 ? (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) : 0;
    
    data.OPerdidaLiquidaOrdinariaDelEjercicioIncluyendoDividendosYAntesDeLaRentasLiquidasPasivasECE = ((data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) + (data?.Ingresos?.RentasLiquidasPasivasECE?.ValorFiscal || 0)) < 0 ? ((data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) + (data?.Ingresos?.RentasLiquidasPasivasECE?.ValorFiscal || 0)) : 0;
  }

  const calculateRentaLiquidaUnicamenteDividendos = (data: any) => {
    data.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal = (data?.RentaLiquidaOrdinariaDelEjercicioExcedenteNetoIncluyeUnicamenteDividendosDeSociedadesNacionalesATarifaGeneral?.ValorFiscal || 0) - (data?.Compensaciones?.Total?.ValorFiscal || 0);
  }

  const handleChange = (newData: any, changedPath?: string) => {

    const arrayPath = changedPath!.split(".");

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculatedValorFiscal(element);

    calculateValorFiscalSolicitado(element);

    calculateOtras(element);

    calculateTotals(arrayPath.slice(0, -1), newData, "Total");
    calculateTotalIngresosNetosAvIn(newData);
    calculateTotalIngresos(newData);
    calculateTotalsSources(newData?.Costos, 
      [
        newData?.Costos?.MateriasPrimasReventaDeBienesTerminadosYServicios?.Total,
        newData?.Costos?.ManoObra?.Total,
        newData?.Costos?.DepresionacionesAmortizacionesYDeterioros?.Total,
        newData?.Costos?.OtrosCostos?.Total,
        newData?.Costos?.MenosCostoAjustePreciosDeTrasferencia,
      ],
      "TotalCostos"
    );

    calculateTotalsSources(newData?.Gastos?.DeAdministracion, 
      [
        newData?.Gastos?.DeAdministracion?.ManoDeObra?.Total,
        newData?.Gastos?.DeAdministracion?.OtrosGastosDeAdministracion?.Total,
        newData?.Gastos?.DeAdministracion?.DepreciacionesAmortizacionesDeterioros?.Total,
      ],
      "Total"
    );

    calculateTotalsSources(newData?.Gastos?.GastosDeDistribucionYVentas, 
      [
        newData?.Gastos?.GastosDeDistribucionYVentas?.ManoDeObra?.Total,
        newData?.Gastos?.GastosDeDistribucionYVentas?.OtrosGastosDeDistribucionYVentas?.Total,
        newData?.Gastos?.GastosDeDistribucionYVentas?.DepreciacionesAmortizacionesYDeterioros?.Total,
      ],
      "Total"
    );

    calculateTotalsSources(newData?.Gastos, 
      [
        newData?.Gastos?.DeAdministracion?.Total,
        newData?.Gastos?.GastosDeDistribucionYVentas?.Total,
        newData?.Gastos?.GastosFinancieros?.Total,
        newData?.Gastos?.PerdidasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos?.Total,
        newData?.Gastos?.PerdidasPorMedicionesAValorRazonable?.Total,
        newData?.Gastos?.PerdidaEnLaVentaOEnajenacionDeActivosFijos?.Total,
        newData?.Gastos?.GastosPorProvisionesPasivosDeMontoOFechaInciertos?.Total,
        newData?.Gastos?.OtrosGastos?.Total,
        newData?.Gastos?.PerdidasNetasEnOperacionesDiscontinuas
      ],
      "TotalGastos"
    );

    calculateGananciaOPerdida(newData);

    calculateTotals(arrayPath.slice(0, -1), newData, "TotalDiferenciasTemporalesDeducibles");
    calculateTotals(arrayPath.slice(0, -1), newData, "TotalDiferenciasTemporalesImponibles");
    calculateTotals(arrayPath.slice(0, -1), newData, "TotalOtrasDiferenciasTemporales");

    calculateTotalsSources(newData?.InformativoClasificacionDiferencias?.AjustesAlResultadoContablePorDiferenciasTemporalesQueAfectenAlResultado, 
      [
        newData?.InformativoClasificacionDiferencias?.AjustesAlResultadoContablePorDiferenciasTemporalesQueAfectenAlResultado?.DiferenciasTemporalesDeducibles?.TotalDiferenciasTemporalesDeducibles,
        newData?.InformativoClasificacionDiferencias?.AjustesAlResultadoContablePorDiferenciasTemporalesQueAfectenAlResultado?.DiferenciasTemporalesImponibles?.TotalDiferenciasTemporalesImponibles,
        newData?.InformativoClasificacionDiferencias?.AjustesAlResultadoContablePorDiferenciasTemporalesQueAfectenAlResultado?.OtrasDiferenciasTemporales?.TotalOtrasDiferenciasTemporales,
      ],
      "Total"
    );

    calculateLiquidasPasivasECE(newData);

    calculateRentaLiquidaUnicamenteDividendos(newData);

    calculateTotals(arrayPath.slice(0, -1), newData, "TotalAutorretenciones");
    calculateTotals(arrayPath.slice(0, -1), newData, "TotalOtrasRetenciones");
    calculateTotals(arrayPath.slice(0, -1), newData, "OTROResultadoIntegralAntesDeImpuestos");
    calculateTotals(arrayPath.slice(0, -1), newData, "ValorNetoGastoPorImpuesto");

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
