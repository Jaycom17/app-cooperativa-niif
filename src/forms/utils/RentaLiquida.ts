import { calculateTotalsSources } from "./totalOperations";

export const config = {
  byKey: {
    TarifaGeneralArticulo240ET: {
        label: "Tarifa general art. 240 ET"
    },
  },
  byPath: {
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.ValorContable": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.ValorFiscal": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel9Porciento": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel15Porciento": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel20Porciento": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MegaInversiones": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MegaInversiones27Porciento": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaGeneralArticulo240ET": {
      readonly: true
    },
    "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.Otras": {
      readonly: true
    },
    "Ingresos.TotalIngresos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "Ingresos.TotalIngresos.ValorFiscal": {
      readonly: true
    },
    "Ingresos.TotalIngresos.TarifaDel9Porciento": {
      readonly: true
    },
    "Ingresos.TotalIngresos.TarifaDel15Porciento": {
      readonly: true
    },
    "Ingresos.TotalIngresos.TarifaDel20Porciento": {
      readonly: true
    },
    "Ingresos.TotalIngresos.MegaInversiones": {
      readonly: true
    },
    "Ingresos.TotalIngresos.MegaInversiones27Porciento": {
      readonly: true
    },
    "Ingresos.TotalIngresos.TarifaGeneralArticulo240ET": {
      readonly: true
    },
    "Ingresos.TotalIngresos.Otras": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.ValorContable": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.ValorFiscal": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel9Porciento": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel15Porciento": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel20Porciento": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MegaInversiones": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MegaInversiones27Porciento": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaGeneralArticulo240ET": {
      readonly: true
    },
    "GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.Otras": {
      readonly: true
    },
    "RentaLiquidaOrdinariaDelEjercicioIncluyendeoDividendosYAntesDeLasRentasLiquidasPasivasECE": {
      readonly: true
    },
    "OPerdidaLiquidaOrdinariaDelEjercicioIncluyendoDividendosYAntesDeLaRentasLiquidasPasivasECE": {
      readonly: true
    },
    "RentasLiquidasPasivasECE.ValorContable": {
      readonly: true
    },
    "RentasLiquidasPasivasECE.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano": {
      readonly: true
    },
    "RentasLiquidasPasivasECE.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "RentasLiquidasPasivasECE.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
      readonly: true
    },
    "RentasLiquidasPasivasECE.ValorFiscal": {
      readonly: true
    },
    "RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal": {
      readonly: true
    },
    "RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal": {
      readonly: true
    },
    "RentaPresuntiva.CalculoRentaPresuntiva0PorcientoSalvoExcepciones.ValorFiscal": {
      readonly: true
    },
    "RentaPresuntiva.Total.ValorFiscal": {
      readonly: true
    },
    "RentasLiquidasGravables.ValorFiscal": {
      readonly: true
    },
    "GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal": {
      readonly: true
    },
    "GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal": {
      readonly: true
    },
    "TotalRetencionesAnioGravableQueDeclara.ValorFiscal": {
      readonly: true
    },
    "InformativoOtroResultadoIntegralORII.OTROResultadoIntegralAntesDeImpuestos.Ganancia": {
      readonly: true
    },
    "InformativoOtroResultadoIntegralORII.OTROResultadoIntegralAntesDeImpuestos.EfectoConversion": {
      readonly: true
    },
    "InformativoOtroResultadoIntegralORII.ResultadoIntegralTotalDelAnio.Ganancia": {
      readonly: true
    },
    "InformativoOtroResultadoIntegralORII.ResultadoIntegralTotalDelAnio.Perdida": {
      readonly: true
    }
  }
}

export const calculatedValorFiscal = (data: any) => {
    if (data?.ValorFiscal == null) {
      return;
    }

    data.ValorFiscal = (data?.ValorContable || 0) + (data?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) + (data?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
  }

  export const calculateValorFiscalSolicitado = (data: any) => {
    if (data?.ValorFiscalSolicitado == null) {
      return;
    }

    data.ValorFiscalAlQueTieneDerecho = (data?.ValorFiscalAlQueTieneDerecho || 0)
  }

  export const calculateOtras = (data: any) => {
    if (data?.Otras == null) {
      return;
    }

    data.Otras = (data?.ValorFiscal || 0);
  }

  export const calculateTotalIngresosNetosAvIn = (data: any) => {
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
  
 export const calculateTotalIngresos = (data: any) => {
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

  export const calculateGananciaOPerdida = (data: any) => {
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

  export const calculateLiquidasPasivasECE = (data: any) => {

    data.RentaLiquidaOrdinariaDelEjercicioIncluyendeoDividendosYAntesDeLasRentasLiquidasPasivasECE = (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) > 0 ? (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) : 0;
    
    data.OPerdidaLiquidaOrdinariaDelEjercicioIncluyendoDividendosYAntesDeLaRentasLiquidasPasivasECE = ((data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) + (data?.Ingresos?.RentasLiquidasPasivasECE?.ValorFiscal || 0)) < 0 ? ((data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) + (data?.Ingresos?.RentasLiquidasPasivasECE?.ValorFiscal || 0)) : 0;

    data.RentasLiquidasPasivasECE.ValorContable = (data?.RentasPasivasECE?.Ingresos?.Total?.ValorContable || 0) - (data?.RentasPasivasECE?.Costos?.ValorContable || 0) - (data?.RentasPasivasECE?.Deduccionesl?.ValorContable || 0);

    data.RentasLiquidasPasivasECE.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano = (data?.RentasPasivasECE?.Ingresos?.Total?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.RentasPasivasECE?.Costos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.RentasPasivasECE?.Deduccionesl?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0);

    data.RentasLiquidasPasivasECE.MenorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.RentasPasivasECE?.Ingresos?.Total?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Costos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Deduccionesl?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0);

    data.RentasLiquidasPasivasECE.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.RentasPasivasECE?.Ingresos?.Total?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Costos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Deduccionesl?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);

    data.RentasLiquidasPasivasECE.ValorFiscal = (data?.RentasPasivasECE?.Ingresos?.Total?.ValorFiscal || 0) - (data?.RentasPasivasECE?.Costos?.ValorFiscal || 0) - (data?.RentasPasivasECE?.Deduccionesl?.ValorFiscal || 0);
  }

  export const calculateRentaLiquidaUnicamenteDividendos = (data: any) => {
    data.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal = (data?.RentaLiquidaOrdinariaDelEjercicioExcedenteNetoIncluyeUnicamenteDividendosDeSociedadesNacionalesATarifaGeneral?.ValorFiscal || 0) - (data?.Compensaciones?.Total?.ValorFiscal || 0);
  }

  export const calculateRentaPresuntiva = (data: any) => {
    data.RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal = (data?.RentaPresuntiva?.PatrimonioLiquidoDelAnioOPeriodoGravableAnterior?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.AccionesYAportesPoseidosEnSociedadesNacionales?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesAfectadosPorHechosConstitutosDeFuerzaMayorOCasoFortuito?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesVinculadosAEmpresasEnPeriodoImproductivo?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesDestinadosExclusivamenteAActividadesDeportivas?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesVinculadosAEmpresasExclusivamenteMineras?.ValorFiscal || 0) + (data?.RentaPresuntiva?.Primeras19000UVTDeActivosDestinadosAlSectorAgropecuario?.ValorFiscal || 0) + (data?.RentaPresuntiva?.OtrasExclusiones?.ValorFiscal || 0);

    data.RentaPresuntiva.CalculoRentaPresuntiva0PorcientoSalvoExcepciones.ValorFiscal = 0;

    data.RentaPresuntiva.Total.ValorFiscal = (data?.RentaPresuntiva?.BaseDeCalculoDeLaRentaPresuntiva?.ValorFiscal || 0);
  }

  export const calculateRentasLiquidasGravables = (data: any) => {

    const valueFiscal = (data?.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral?.ValorFiscal || 0) - (data?.RentaExenta?.ValorFiscal || 0) + (data?.RentasGravablesRentaLiquida?.Total?.ValorFiscal || 0);

    data.RentasLiquidasGravables.ValorFiscal = ((data?.RentaPresuntiva?.Total?.ValorFiscal || 0) > (data?.RentaExenta?.ValorFiscal || 0)) ? valueFiscal : 0;
  }

  export const calculateGananciasOcasionalesGravables = (data: any) => {
    data.GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal = (data?.GananciasOcasionalesGravables?.IngresosPorGananciaOcasionalEnVentaDeActivosFijos?.ValorFiscal || 0) + (data?.GananciasOcasionalesGravables?.OtrosIngresosPorGananciaOcasional?.ValorFiscal || 0);

    data.GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal = (data?.GananciasOcasionalesGravables?.CostosPorGananciaOcasionalEnVentaDeActivosFijos?.ValorFiscal || 0) + (data?.GananciasOcasionalesGravables?.OtrosCostosPorGananciasOcasionales?.ValorFiscal || 0);
  }

  export const calculateTotalRetencionesAnioGravableQueDeclara = (data: any) => {
    data.TotalRetencionesAnioGravableQueDeclara.ValorFiscal = (data?.Autorretenciones?.TotalAutorretenciones?.ValorFiscal || 0) - (data?.OtrasRetenciones?.TotalOtrasRetenciones?.ValorFiscal || 0);
  }

  export const calculateInformativoOtroResultadoIntegralORII = (data: any) => {
    const valuesGanancia = (data?.InformativoOtroResultadoIntegralORII?.NoSeReclasificanAlResultado?.Total?.Ganancia || 0) + (data?.InformativoOtroResultadoIntegralORII?.SeReclasificanAlResultado?.Total?.Ganancia || 0);

    const valuesPerdida = (data?.InformativoOtroResultadoIntegralORII?.NoSeReclasificanAlResultado?.Total?.Perdida || 0) + (data?.InformativoOtroResultadoIntegralORII?.SeReclasificanAlResultado?.Total?.Perdida || 0);

    data.InformativoOtroResultadoIntegralORII.OTROResultadoIntegralAntesDeImpuestos.Ganancia = (valuesGanancia - valuesPerdida) > 0 ? (valuesGanancia - valuesPerdida) : 0;

    data.InformativoOtroResultadoIntegralORII.OTROResultadoIntegralAntesDeImpuestos.EfectoConversion = (valuesPerdida - valuesGanancia) > 0 ? (valuesPerdida - valuesGanancia) : 0;

    const auxValue = (data?.CreditoFiscalParaInversionesEnProyectosDeInvestigacionDesarrolloTecnologicoEInnovacionOVinculacionDeCapitalHumanoDeAltoNivelArt2561DelETCreadoConArt168Ley1955MayoDe2019?.ValorFiscal || 0) + ((data?.InformativoOtroResultadoIntegralORII?.OTROResultadoIntegralAntesDeImpuestos?.ValorFiscal || 0) - (data?.InformativoOtroResultadoIntegralORII?.OTROResultadoIntegralAntesDeImpuestos?.EfectoConversion || 0));

    data.InformativoOtroResultadoIntegralORII.ResultadoIntegralTotalDelAnio.Ganancia = auxValue > 0 ? auxValue : 0;

    data.InformativoOtroResultadoIntegralORII.ResultadoIntegralTotalDelAnio.Perdida = auxValue < 0 ? (auxValue * -1) : 0;
  }