export const config = {
  byKey: {
    SaldoImpuestoDiferidoActual: {
      label: "Saldo impuesto diferido a 31 -DIC vigencia actual",
      readonly: true,
    },
    SaldoImpuestoDiferidoAnterior: {
      label: "Saldo impuesto diferido a 31 -DIC vigencia anterior",
    },
    DiferenciaTemporaria: {
      label: "Diferencia Temporaria",
      readonly: true,
    },
    Variacion: {
      label: "Variación",
      readonly: true,
    },
    TasaFiscalAplicada: {
      label: "Tasa Fiscal Aplicada (%)",
      readonly: true,
      widget: "number" as const,
    },
  },
};

export const calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma = [
  "EfectivoYEquivalentesAlEfectivo",
  "InversionesEInstrumentosDerivados",
  "CuentasPorCobrar",
  "Inventarios",
  "PropiedadesPlantaYEquipo",
  "ActivosIntangibles",
  "PropiedadesDeInversion",
  "ActivosBiologicos",
  "ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios",
];

export const calculateDiferenciaTemporariaAcivoDiferidoSegundaForma = [
  "PasivosFinancierosYCuentasPorPagar",
  "ImpuestosGravamenesYTasas",
  "BeneficiosAEmpleados",
  "Provisiones",
  "OtrosPasivosAnticiposYAvancesRecibidos",
  "OperacionesConTitulosYDerivados",
  "PerdidasFiscalesYExcesosDeRentaPresuntiva",
  "ActivosReconocidosSolamenteParaFinesFiscales",
  "OtrosActivos",
];

export const calculateFirstValues = (
  obj: any,
  data: any,
  parents: any = [],
  arrayPath: string[] = []
) => {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "number") {
      if (!parents.includes(obj)) {
        parents.push(obj);
        calculateAll(arrayPath.join("."), data);
      }
    }

    if (typeof value === "object" && value !== null) {
      calculateFirstValues(value, data, parents, [...arrayPath, key]);
    }
  }
};

export const calculateAll = (changedPath: string, newData: any) => {
  const arrayPath: string[] = changedPath!.split(".");

  if (
    changedPath?.startsWith(
      "ImpuestosDiferidosProvenientesDeDiferenciasTemporarias"
    )
  ) {
    const element =
      newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
        arrayPath![arrayPath!.length - 2]
      ][arrayPath![arrayPath!.length - 1]];

    if (
      calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma.includes(
        arrayPath![arrayPath!.length - 1]
      )
    ) {
      if (
        element?.BaseFiscal !== undefined &&
        element?.BaseContable !== undefined
      ) {
        element.DiferenciaTemporaria =
          element.BaseFiscal - element.BaseContable;
      }
    } else if (
      calculateDiferenciaTemporariaAcivoDiferidoSegundaForma.includes(
        arrayPath![arrayPath!.length - 1]
      )
    ) {
      if (
        element?.BaseFiscal !== undefined &&
        element?.BaseContable !== undefined
      ) {
        element.DiferenciaTemporaria =
          element.BaseContable - element.BaseFiscal;
      }
    }

    element.SaldoImpuestoDiferidoActual = Number(
      (element.DiferenciaTemporaria * 0.35).toFixed(3)
    );

    element.Variacion =
      element.SaldoImpuestoDiferidoAnterior -
      element.SaldoImpuestoDiferidoActual;

    element.TasaFiscalAplicada =
      element.DiferenciaTemporaria > 0
        ? (element.SaldoImpuestoDiferidoActual / element.DiferenciaTemporaria) *
          100
        : 0;

    const total = {
      SaldoImpuestoDiferidoActual: 0,
      SaldoImpuestoDiferidoAnterior: 0,
      Variacion: 0,
    };

    [
      ...calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma,
      ...calculateDiferenciaTemporariaAcivoDiferidoSegundaForma,
    ].forEach((item) => {
      const basePath =
        newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
          arrayPath![arrayPath!.length - 2]
        ];

      total.SaldoImpuestoDiferidoActual +=
        basePath[item].SaldoImpuestoDiferidoActual || 0;
      total.SaldoImpuestoDiferidoAnterior +=
        basePath[item].SaldoImpuestoDiferidoAnterior || 0;
      total.Variacion += basePath[item].Variacion || 0;
    });

    newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
      arrayPath![arrayPath!.length - 2]
    ].ValorTotal.SaldoImpuestoDiferidoActual =
      Number(total.SaldoImpuestoDiferidoActual.toFixed(3)) || 0;
    newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
      arrayPath![arrayPath!.length - 2]
    ].ValorTotal.SaldoImpuestoDiferidoAnterior =
      Number(total.SaldoImpuestoDiferidoAnterior.toFixed(3)) || 0;
    newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
      arrayPath![arrayPath!.length - 2]
    ].ValorTotal.Variacion = Number(total.Variacion.toFixed(3));
  }

  if (
    changedPath!.includes(
      "ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior"
    )
  ) {
    const basePath =
      newData.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior;

    basePath.SaldosAFavor.Variacion =
      basePath.SaldosAFavor.Saldo31VigenciaActual ||
      0 - basePath.SaldosAFavor.Saldo31VigenciaAnterior ||
      0;

    basePath.ImpuestosPagadosEnELExterior.Variacion =
      basePath.ImpuestosPagadosEnELExterior.Saldo31VigenciaActual ||
      0 - basePath.ImpuestosPagadosEnELExterior.Saldo31VigenciaAnterior ||
      0;

    basePath.SaldosAFavor.ExplicacionDeLaVariacion.ReduccionCompensacionApliacion =
      basePath.SaldosAFavor.Variacion || 0;
  }

  if (changedPath!.includes("DetalleCompensacionPerdidasFiscales")) {
    const basePath = newData.DetalleCompensacionPerdidasFiscales;

    basePath.AñoAnterior.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo =
      (basePath.AñoAnterior
        .perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo || 0) +
      (basePath.AñoAnterior.PerdidaFiscalGeneradaEnElPeriodo || 0) -
      (basePath.AñoAnterior.PerdidaFiscalCompensadaEnElPeriodo || 0) -
      (basePath.AñoAnterior.ValoresNoCompensadosPorCaducidad || 0) +
      (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMayorValor ||
        0) -
      (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMenorValor || 0);

    basePath.AñoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
      Number(
        (
          basePath.AñoAnterior
            .PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo * 0.35
        ).toFixed(3)
      ) || 0;

    basePath.AñoActual.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo =
      (basePath.AñoActual
        .perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo || 0) +
      (basePath.AñoActual.PerdidaFiscalGeneradaEnElPeriodo || 0) -
      (basePath.AñoActual.PerdidaFiscalCompensadaEnElPeriodo || 0) -
      (basePath.AñoActual.ValoresNoCompensadosPorCaducidad || 0) +
      (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMayorValor || 0) -
      (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMenorValor || 0);

    basePath.AñoActual.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
      Number(
        (
          basePath.AñoActual
            .PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo * 0.35
        ).toFixed(3)
      ) || 0;
  }

  if (
    changedPath!.includes("DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva")
  ) {
    const basePath = newData.DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva;

    basePath.AñoAnterior.ValorAcumuladoPorCompensarAlFinalDelPeriodo =
      (basePath.AñoAnterior.ValorAcumuladoPorCompensarAlInicioDelPeriodo || 0) +
      (basePath.AñoAnterior.ValorGeneradoEnElPeriodo || 0) -
      (basePath.AñoAnterior.ValorCompensadoEnElPeriodo || 0) -
      (basePath.AñoAnterior.ValoresNoCompensadosPorCaducidad || 0) +
      (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMayorValor ||
        0) -
      (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMenorValor || 0);

    basePath.AñoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
      Number(
        (
          basePath.AñoAnterior.ValorAcumuladoPorCompensarAlFinalDelPeriodo *
          0.35
        ).toFixed(3)
      ) || 0;

    basePath.AñoActual.ValorAcumuladoPorCompensarAlFinalDelPeriodo =
      (basePath.AñoActual.ValorAcumuladoPorCompensarAlInicioDelPeriodo || 0) +
      (basePath.AñoActual.ValorGeneradoEnElPeriodo || 0) -
      (basePath.AñoActual.ValorCompensadoEnElPeriodo || 0) -
      (basePath.AñoActual.ValoresNoCompensadosPorCaducidad || 0) +
      (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMayorValor || 0) -
      (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMenorValor || 0);

    basePath.AñoActual.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
      Number(
        (
          basePath.AñoActual.ValorAcumuladoPorCompensarAlFinalDelPeriodo * 0.35
        ).toFixed(3)
      ) || 0;
  }
};
