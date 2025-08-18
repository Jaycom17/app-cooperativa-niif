export const config = {
  byKey: {
    SaldosaFavor: {
      label: "Saldos a favor por el impuesto de renta",
    },
    SaldosaFavorOtrosImpuestos: {
        label: "Saldos a favor - otros impuestos y gravámenes",
    },
    AnticiposyOtros: {
        label: "Anticipos y otros",
    },
    ValorFiscal: {
      readonly: true,
    }
  },
    byPath: {
    // Paths calculados - solo lectura
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorContable": {
      readonly: true
    },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.EfectoConversion": {
      readonly: true
    },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MenorValorFiscal": {
      readonly: true
    },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MayorValorFiscal": {
      readonly: true
    },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorFiscal": {
      readonly: true
    },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorContable": {
      readonly: true
    },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.EfectoConversion": {
      readonly: true
    },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MenorValorFiscal": {
      readonly: true
    },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MayorValorFiscal": {
      readonly: true
    },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorFiscal": {
      readonly: true
    },
    "Activos.ActivosIntangibles.Total.ValorContable": {
      readonly: true
    },
    "Activos.ActivosIntangibles.Total.EfectoConversion": {
      readonly: true
    },
    "Activos.ActivosIntangibles.Total.MenorValorFiscal": {
      readonly: true
    },
    "Activos.ActivosIntangibles.Total.MayorValorFiscal": {
      readonly: true
    },
    "Activos.ActivosIntangibles.Total.ValorFiscal": {
      readonly: true
    },
    "Activos.ActivosBiologicos.Total.ValorContable": {
      readonly: true
    },
    "Activos.ActivosBiologicos.Total.EfectoConversion": {
      readonly: true
    },
    "Activos.ActivosBiologicos.Total.MenorValorFiscal": {
      readonly: true
    },
    "Activos.ActivosBiologicos.Total.MayorValorFiscal": {
      readonly: true
    },
    "Activos.ActivosBiologicos.Total.ValorFiscal": {
      readonly: true
    },
    "TotalPatrimonio.ValorContable": {
      readonly: true
    },
    "TotalPatrimonio.EfectoConversion": {
      readonly: true
    },
    "TotalPatrimonio.MenorValorFiscal": {
      readonly: true
    },
    "TotalPatrimonio.MayorValorFiscal": {
      readonly: true
    },
    "TotalPatrimonio.ValorFiscal": {
      readonly: true
    }
  },
};

 export const calculatedValorFiscal = (data: any) => {
    if (data?.ValorFiscal == null) {
      return;
    }

    data.ValorFiscal =
      (data?.ValorContable || 0) +
      (data?.EfectoConversion || 0) -
      (data?.MenorValorFiscal || 0) +
      (data?.MayorValorFiscal || 0);
  };

 export const calculateTotalInversionesIntrumentosFinancierosDerivadosVN = (
    data: any
  ) => {
    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorContable =
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.InversionesInstrumentosFinancierosDerivados?.Total?.ValorContable ||
        0) -
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.DeterioroAcumuladoInversiones?.Total?.ValorContable || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.EfectoConversion =
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.InversionesInstrumentosFinancierosDerivados?.Total
        ?.EfectoConversion || 0) -
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.DeterioroAcumuladoInversiones?.Total?.EfectoConversion || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MenorValorFiscal =
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.InversionesInstrumentosFinancierosDerivados?.Total
        ?.MenorValorFiscal || 0) -
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.DeterioroAcumuladoInversiones?.Total?.MenorValorFiscal || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MayorValorFiscal =
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.InversionesInstrumentosFinancierosDerivados?.Total
        ?.MayorValorFiscal || 0) -
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.DeterioroAcumuladoInversiones?.Total?.MayorValorFiscal || 0);

    data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorFiscal =
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.InversionesInstrumentosFinancierosDerivados?.Total?.ValorFiscal ||
        0) -
      (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
        ?.DeterioroAcumuladoInversiones?.Total?.ValorFiscal || 0);
  };

 export  const calculateTotalCuentasComercialesPorCobrar = (data: any) => {
    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorContable =
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.CuentasDocumentosPorCobrar?.Total?.ValorContable || 0) -
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
        ?.ValorContable || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.EfectoConversion =
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.CuentasDocumentosPorCobrar?.Total?.EfectoConversion || 0) -
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
        ?.EfectoConversion || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MenorValorFiscal =
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.CuentasDocumentosPorCobrar?.Total?.MenorValorFiscal || 0) -
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
        ?.MenorValorFiscal || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MayorValorFiscal =
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.CuentasDocumentosPorCobrar?.Total?.MayorValorFiscal || 0) -
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
        ?.MayorValorFiscal || 0);

    data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorFiscal =
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.CuentasDocumentosPorCobrar?.Total?.ValorFiscal || 0) -
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
        ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.ValorFiscal ||
        0);
  };

export  const calculateTotalActivosIntangibles = (data: any) => {
    data.Activos.ActivosIntangibles.Total.ValorContable =
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
        ?.Total?.ValorContable || 0) +
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
        ?.ValorContable || 0);

    data.Activos.ActivosIntangibles.Total.EfectoConversion =
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
        ?.Total?.EfectoConversion || 0) +
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
        ?.EfectoConversion || 0);

    data.Activos.ActivosIntangibles.Total.MenorValorFiscal =
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
        ?.Total?.MenorValorFiscal || 0) +
      (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.PlusvaliaGoodwill
        ?.Total?.MenorValorFiscal || 0);

    data.Activos.ActivosIntangibles.Total.MayorValorFiscal =
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
        ?.Total?.MayorValorFiscal || 0) +
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
        ?.MayorValorFiscal || 0);

    data.Activos.ActivosIntangibles.Total.ValorFiscal =
      (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
        ?.Total?.ValorFiscal || 0) +
      (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
        ?.ValorFiscal || 0);
  };
  export const calculateTotalActivosBiologicos = (data: any) => {
    data.Activos.ActivosBiologicos.Total.ValorContable =
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.ValorContable ||
        0) +
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
        ?.Total?.ValorContable || 0);

    data.Activos.ActivosBiologicos.Total.EfectoConversion =
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total
        ?.EfectoConversion || 0) +
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
        ?.Total?.EfectoConversion || 0);

    data.Activos.ActivosBiologicos.Total.MenorValorFiscal =
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total
        ?.MenorValorFiscal || 0) +
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
        ?.Total?.MenorValorFiscal || 0);

    data.Activos.ActivosBiologicos.Total.MayorValorFiscal =
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total
        ?.MayorValorFiscal || 0) +
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
        ?.Total?.MayorValorFiscal || 0);

    data.Activos.ActivosBiologicos.Total.ValorFiscal =
      (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.ValorFiscal ||
        0) +
      (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
        ?.Total?.ValorFiscal || 0);
  };

export const calculateTotalPatrimonio = (data: any) => {
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
  };
