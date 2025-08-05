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
    Variacion:{
      label: "Variación",
      readonly: true,
    },
    TasaFiscalAplicada: {
      label: "Tasa Fiscal Aplicada",
      readonly: true,
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
  "OtrosActivos"
];
