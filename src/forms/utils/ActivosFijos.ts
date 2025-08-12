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
