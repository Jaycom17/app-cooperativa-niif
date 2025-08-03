export const config = {
  byKey: {
    SaldoImpuestoDiferidoActual: {
      label: "Saldo impuesto diferido a 31 -DIC vigencia actual",
    },
    SaldoImpuestoDiferidoAnterior: {
      label: "Saldo impuesto diferido a 31 -DIC vigencia anterior",
    },
  },
};

export const calculateDiferenciaTemporariaAcivoDiferidoPrimeraFormaUno = [
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

export const calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaUno = [
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

export const calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaDos = [
  "EfectivoYEquivalentesAlEfectivo",
  "InversionesEInstrumentosDerivados",
  "CuentasPorCobrar",
  "Inventarios",
  "PropiedadesPlantaYEquipo",
  "ActivosIntangibles",
  "PropiedadesDeInversion",
  "ActivosBiologicos",
  "ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios"
];

export const calculateDiferenciaTemporariaAcivoDiferidoTerceraFormaDos =[
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
