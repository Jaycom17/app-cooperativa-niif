export const config = {
  byKey:{
    TotalPPEPIANCMVYINTANGIBLES: {
      label: "TOTAL PPE, PI, ANCMV e INTANGIBLES"
    },
    TotalPPEPIANCMV: {
      label: "Total PPE, PI y ANCMV"
    },
    OtrasPropiedadesPlantasEquipo: {
      label: "Otras Propiedades, Plantas y Equipos"
    },
    TotalPropiedadesPlantasEquipo: {
      label: "Total Propiedades, Plantas y Equipos"
    },
    TotalPorpiedadesDeInversion: {
      label: "Total Propiedades de Inversión"
    },
    CabecerasDePeriodicosRevistasOTitulosPublicaciones: {
      label: "Cabeceras de Periódicos, Revistas, Títulos de Publicaciones"
    },
    PropiedadIntelectualPatentesYOtraPropiedadIndustrialServiciosYDerechosOperacion: {
      label: "Propiedad Intelectual, Patentes y Otra Propiedad Industrial, Servicios y Derechos de Operación"
    }
  },
  byPath: {
    // Propiedades, Plantas y Equipos - TotalPropiedadesPlantasEquipo
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.ImporteAlComienzoDelPeriodo.Costo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.ImporteAlComienzoDelPeriodo.EfectoDeConversion": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.ImporteAlComienzoDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Incrementos.TransferenciasAdquisiciones": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Incrementos.CambiosEnValorRazonable": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Disminuciones.TransferenciasEliminaciones": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Disminuciones.CambiosEnValorRazonable": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Depreciacion.PorCosto": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Depreciacion.EfectoDeConversion": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.Depreciacion.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.DeterioroAcumuladoAlFinalDelPeriodo": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.ImporteNetoAlFinalDelPeriodo.Costo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorCosto": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorAjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.GastoDelPeriodoPorDeterioro": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.IngresosDelPeriodoPorRecuperacionDelDeterioro": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.ValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasing": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.DesmantelamientoRestauracion": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosContables.MayorValorPorRevaluacionAcumuladoAlFinalDelPeriodo": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SaldoAlComienzoDelPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.IncrementosPorTransferenciasAdquisicionesYOtrosCambios": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DisminucionesPorTransferenciasYOtrosCambios": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.GastoFiscalPorDepresiacionYAmortizacionDelPeriodo": { readonly: true },

    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorTotalAlFinalDelPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo": { readonly: true },
    "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.GastoFiscalDepreciacionYAmortizacionDelPeriodo": { readonly: true },

    // Propiedades de Inversión - TotalPorpiedadesDeInversion
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.ImporteAlComienzoDelPeriodo.Costo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.ImporteAlComienzoDelPeriodo.EfectoDeConversion": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.ImporteAlComienzoDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Incrementos.TransferenciasAdquisiciones": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Incrementos.CambiosEnValorRazonable": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Disminuciones.TransferenciasEliminaciones": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Disminuciones.CambiosEnValorRazonable": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Depreciacion.PorCosto": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Depreciacion.EfectoDeConversion": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.Depreciacion.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.DeterioroAcumuladoAlFinalDelPeriodo": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.ImporteNetoAlFinalDelPeriodo.Costo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorCosto": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorAjustePorRevaluacionesOReExpresiones": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.GastoDelPeriodoPorDeterioro": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.IngresosDelPeriodoPorRecuperacionDelDeterioro": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.ValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasing": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.DesmantelamientoRestauracion": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosContables.MayorValorPorRevaluacionAcumuladoAlFinalDelPeriodo": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SaldoAlComienzoDelPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.IncrementosPorTransferenciasAdquisicionesYOtrosCambios": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DisminucionesPorTransferenciasYOtrosCambios": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.GastoFiscalPorDepresiacionYAmortizacionDelPeriodo": { readonly: true },

    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorTotalAlFinalDelPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo": { readonly: true },
    "PropiedadesDeInversión.TotalPorpiedadesDeInversion.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.GastoFiscalDepreciacionYAmortizacionDelPeriodo": { readonly: true },

    // Total TotalPPEPIANCMV
    "TotalPPEPIANCMV.DatosContables.ImporteAlComienzoDelPeriodo.Costo": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.ImporteAlComienzoDelPeriodo.EfectoDeConversion": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.ImporteAlComienzoDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.Incrementos.TransferenciasAdquisiciones": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.Incrementos.CambiosEnValorRazonable": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.Disminuciones.TransferenciasEliminaciones": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.Disminuciones.CambiosEnValorRazonable": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.Depreciacion.PorCosto": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.Depreciacion.EfectoDeConversion": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.Depreciacion.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.DeterioroAcumuladoAlFinalDelPeriodo": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.ImporteNetoAlFinalDelPeriodo.Costo": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorCosto": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorAjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMV.DatosContables.GastoDelPeriodoPorDeterioro": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.IngresosDelPeriodoPorRecuperacionDelDeterioro": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.ValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasing": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.DesmantelamientoRestauracion": { readonly: true },
    "TotalPPEPIANCMV.DatosContables.MayorValorPorRevaluacionAcumuladoAlFinalDelPeriodo": { readonly: true },

    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SaldoAlComienzoDelPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.IncrementosPorTransferenciasAdquisicionesYOtrosCambios": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DisminucionesPorTransferenciasYOtrosCambios": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.GastoFiscalPorDepresiacionYAmortizacionDelPeriodo": { readonly: true },

    "TotalPPEPIANCMV.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorTotalAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMV.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.GastoFiscalDepreciacionYAmortizacionDelPeriodo": { readonly: true },

    // Activos Intangibles - TotalActivosIntangibles
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.ImporteAlComienzoDelPeriodo.Costo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.ImporteAlComienzoDelPeriodo.EfectoDeConversion": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.ImporteAlComienzoDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Incrementos.TransferenciasAdquisiciones": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Incrementos.CambiosEnValorRazonable": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Disminuciones.TransferenciasEliminaciones": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Disminuciones.CambiosEnValorRazonable": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Depreciacion.PorCosto": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Depreciacion.EfectoDeConversion": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.Depreciacion.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.DeterioroAcumuladoAlFinalDelPeriodo": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.ImporteNetoAlFinalDelPeriodo.Costo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorCosto": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorAjustePorRevaluacionesOReExpresiones": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.GastoDelPeriodoPorDeterioro": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.IngresosDelPeriodoPorRecuperacionDelDeterioro": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.ValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasing": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.DesmantelamientoRestauracion": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosContables.MayorValorPorRevaluacionAcumuladoAlFinalDelPeriodo": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SaldoAlComienzoDelPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.IncrementosPorTransferenciasAdquisicionesYOtrosCambios": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DisminucionesPorTransferenciasYOtrosCambios": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.GastoFiscalPorDepresiacionYAmortizacionDelPeriodo": { readonly: true },

    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorTotalAlFinalDelPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo": { readonly: true },
    "ActivosIntangibles.TotalActivosIntangibles.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.GastoFiscalDepreciacionYAmortizacionDelPeriodo": { readonly: true },

    // TotalPPEPIANCMVYINTANGIBLES
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.ImporteAlComienzoDelPeriodo.Costo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.ImporteAlComienzoDelPeriodo.EfectoDeConversion": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.ImporteAlComienzoDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Incrementos.TransferenciasAdquisiciones": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Incrementos.CambiosEnValorRazonable": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Disminuciones.TransferenciasEliminaciones": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Disminuciones.CambiosEnValorRazonable": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Depreciacion.PorCosto": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Depreciacion.EfectoDeConversion": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.Depreciacion.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.DeterioroAcumuladoAlFinalDelPeriodo": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.ImporteNetoAlFinalDelPeriodo.Costo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorCosto": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.GastoPeriodoPorDepreciacionOAmortizacion.PorAjustePorRevaluacionesOReExpresiones": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.GastoDelPeriodoPorDeterioro": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.IngresosDelPeriodoPorRecuperacionDelDeterioro": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.ValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasing": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.DesmantelamientoRestauracion": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosContables.MayorValorPorRevaluacionAcumuladoAlFinalDelPeriodo": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SaldoAlComienzoDelPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.IncrementosPorTransferenciasAdquisicionesYOtrosCambios": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DisminucionesPorTransferenciasYOtrosCambios": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.GastoFiscalPorDepresiacionYAmortizacionDelPeriodo": { readonly: true },

    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorTotalAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo": { readonly: true },
    "TotalPPEPIANCMVYINTANGIBLES.DatosFiscales.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.GastoFiscalDepreciacionYAmortizacionDelPeriodo": { readonly: true },
  },
}

export const calculateImporteNetoFinalPeriodoCosto = (data: any) => {
  if (data?.ImporteNetoAlFinalDelPeriodo?.Costo == null) {
    return;
  }

  data.ImporteNetoAlFinalDelPeriodo.Costo =
    (data?.ImporteAlComienzoDelPeriodo?.Costo || 0) +
    (data?.ImporteAlComienzoDelPeriodo?.EfectoDeConversion || 0) +
    (data?.Incrementos?.TransferenciasAdquisiciones || 0) -
    (data?.Disminuciones?.TransferenciasEliminaciones || 0) -
    (data?.Depreciacion?.PorCosto || 0) -
    (data?.Depreciacion?.EfectoDeConversion || 0) -
    (data?.DeterioroAcumuladoAlFinalDelPeriodo || 0);
};

export const calculateImporteNetoFinalPeriodoAjustePorRevaluacion = (
  data: any
) => {
  if (
    data?.ImporteNetoAlFinalDelPeriodo?.AjustePorRevaluacionesOReExpresiones ==
    null
  ) {
    return;
  }

  data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones =
    (data?.ImporteAlComienzoDelPeriodo?.AjustePorRevaluacionesOReExpresiones ||
      0) +
    (data?.ImporteAlComienzoDelPeriodo?.EfectoDeConversion || 0) +
    (data?.Incrementos?.CambiosEnValorRazonable || 0) -
    (data?.Disminuciones?.CambiosEnValorRazonable || 0) -
    (data?.Depreciacion?.AjustePorRevaluacionesOReExpresiones || 0);
};

export const calculateSubtotalAlFinalDelPeriodo = (data: any) => {
  if (
    data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.SubtotalAlFinalPeriodo == null
  ) {
    return;
  }

  data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.SubtotalAlFinalPeriodo =
    (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.SaldoAlComienzoDelPeriodo || 0) +
    (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.IncrementosPorTransferenciasAdquisicionesYOtrosCambios || 0) -
    (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.DisminucionesPorTransferenciasYOtrosCambios || 0);
};

export const calculateTotalNetoAlFinalDelPeriodoFinanciero = (data: any) => {
  if (
    data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.TotalNetoAlFinalDelPeriodo == null
  ) {
    return;
  }

  data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero.TotalNetoAlFinalDelPeriodo =
    (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.SubtotalAlFinalPeriodo || 0) -
    (data?.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
      ?.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo || 0);
};

export const calculateTotalNetoAlFinalDelPeriodoInformativo = (data: any) => {
  if (
    data
      ?.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
      ?.ValorNetoAlFinalDelPeriodo == null
  ) {
    return;
  }

  data.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero.ValorNetoAlFinalDelPeriodo =
    (data
      ?.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
      ?.ValorTotalAlFinalDelPeriodo || 0) -
    (data
      ?.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
      ?.DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo || 0);
};
