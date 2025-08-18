export const config = {
  byKey: {
    SaldoAlFinalDelPeriodo: {
      readonly: true,
    },
    ValorTotal: {
      readonly: true,
    },
  },
  byPath: {
    "VentaDeBienes.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo":
      {
        readonly: true,
      },
    "Total.PasivoPorIngresoDiferido.SaldoAlInicioDelPeriodo": {
      readonly: true,
    },
    "Total.PasivoPorIngresoDiferido.RegistradoComoIngresoContableEnElPeriodo": {
      readonly: true,
    },
    "Total.PasivoPorIngresoDiferido.GeneradoEnElPeriodo": {
      readonly: true,
    },
    "Total.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo": {
      readonly: true,
    },
    "Total.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresoEnPeriodosAnteriores":
      {
        readonly: true,
      },
    "Total.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo": {
      readonly: true,
    },
    "Total.FacturacionEmitidaEnElPeriodo.RegistradaComoIngresoDiferido": {
      readonly: true,
    },
    "Total.FacturacionEmitidaEnElPeriodo.SoloFacturadoNoHaGeneradoIngresoNiPasivoDiferido":
      {
        readonly: true,
      },
    "Total.FacturacionEmitidaEnElPeriodo.ValorTotal": {
      readonly: true,
    },
    "Total.IngresoContableDevengadoEnElPeriodo.SinFacturar": {
      readonly: true,
    },
    "Total.IngresoContableDevengadoEnElPeriodo.FacturadoPeriodosAnteriores": {
      readonly: true,
    },
    "Total.IngresoContableDevengadoEnElPeriodo.ValorTotal": {
      readonly: true,
    },
  },
};

export const calculateSaldofinalPeriodo = (data: any) => {
  if (data?.PasivoPorIngresoDiferido?.SaldoAlFinalDelPeriodo == null) {
    return;
  }

  data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo =
    (data?.PasivoPorIngresoDiferido.SaldoAlInicioDelPeriodo || 0) -
    (data?.PasivoPorIngresoDiferido.RegistradoComoIngresoContableEnElPeriodo ||
      0) +
    (data?.PasivoPorIngresoDiferido.GeneradoEnElPeriodo || 0);
};

export const calculateValorTotalFacturacion = (data: any) => {
  if (data?.FacturacionEmitidaEnElPeriodo?.ValorTotal == null) {
    return;
  }

  data.FacturacionEmitidaEnElPeriodo.ValorTotal =
    (data?.FacturacionEmitidaEnElPeriodo
      .DevengadaComoIngresoEnPeriodosAnteriores || 0) +
    (data?.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo || 0) +
    (data?.FacturacionEmitidaEnElPeriodo.RegistradaComoIngresoDiferido || 0) +
    (data?.FacturacionEmitidaEnElPeriodo
      .SoloFacturadoNoHaGeneradoIngresoNiPasivoDiferido || 0);
};

export const calculateValorTotalIngresoContable = (data: any) => {
  if (data?.IngresoContableDevengadoEnElPeriodo?.ValorTotal == null) {
    console.log("first");
    return;
  }

  data.IngresoContableDevengadoEnElPeriodo.ValorTotal =
    (data?.IngresoContableDevengadoEnElPeriodo.SinFacturar || 0) +
    (data?.IngresoContableDevengadoEnElPeriodo.FacturadoPeriodosAnteriores ||
      0) +
    (data?.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo || 0);
};
