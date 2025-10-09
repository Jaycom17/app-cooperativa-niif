import { describe, it, expect } from 'vitest';
import {
  calculateFirstValues,
  calculateAll,
  calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma,
  calculateDiferenciaTemporariaAcivoDiferidoSegundaForma,
} from '../../../src/forms/utils/impuestoDiferido';

describe('calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma', () => {
  it('debería contener los elementos esperados', () => {
    expect(calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma).toEqual([
      'EfectivoYEquivalentesAlEfectivo',
      'InversionesEInstrumentosDerivados',
      'CuentasPorCobrar',
      'Inventarios',
      'PropiedadesPlantaYEquipo',
      'ActivosIntangibles',
      'PropiedadesDeInversion',
      'ActivosBiologicos',
      'ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios',
    ]);
  });

  it('debería tener 9 elementos', () => {
    expect(calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma).toHaveLength(
      9
    );
  });
});

describe('calculateDiferenciaTemporariaAcivoDiferidoSegundaForma', () => {
  it('debería contener los elementos esperados', () => {
    expect(calculateDiferenciaTemporariaAcivoDiferidoSegundaForma).toEqual([
      'PasivosFinancierosYCuentasPorPagar',
      'ImpuestosGravamenesYTasas',
      'BeneficiosAEmpleados',
      'Provisiones',
      'OtrosPasivosAnticiposYAvancesRecibidos',
      'OperacionesConTitulosYDerivados',
      'PerdidasFiscalesYExcesosDeRentaPresuntiva',
      'ActivosReconocidosSolamenteParaFinesFiscales',
      'OtrosActivos',
    ]);
  });

  it('debería tener 9 elementos', () => {
    expect(calculateDiferenciaTemporariaAcivoDiferidoSegundaForma).toHaveLength(
      9
    );
  });
});

describe('calculateFirstValues', () => {
  it('debería procesar objetos con números sin errores', () => {
    const data = {
      ImpuestosDiferidosProvenientesDeDiferenciasTemporarias: {
        ActivosDiferidos: {
          EfectivoYEquivalentesAlEfectivo: {
            BaseFiscal: 100,
            BaseContable: 80,
            DiferenciaTemporaria: 0,
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
            TasaFiscalAplicada: 0,
          },
          InversionesEInstrumentosDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          CuentasPorCobrar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Inventarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesPlantaYEquipo: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosIntangibles: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesDeInversion: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosBiologicos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PasivosFinancierosYCuentasPorPagar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ImpuestosGravamenesYTasas: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          BeneficiosAEmpleados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Provisiones: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosPasivosAnticiposYAvancesRecibidos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OperacionesConTitulosYDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PerdidasFiscalesYExcesosDeRentaPresuntiva: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosReconocidosSolamenteParaFinesFiscales: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosActivos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ValorTotal: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
        },
      },
    };

    // La función recorre el objeto y llama a calculateAll con cada path encontrado
    expect(() =>
      calculateFirstValues(
        data.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias,
        data
      )
    ).not.toThrow();
  });

  it('debería procesar objetos anidados recursivamente', () => {
    const data = {
      Nivel1: {
        Nivel2: {
          Nivel3: {
            valor: 100,
          },
        },
      },
    };

    expect(() => calculateFirstValues(data.Nivel1, data)).not.toThrow();
  });

  it('debería procesar múltiples números en el mismo objeto una sola vez', () => {
    const data = {
      DetalleCompensacionPerdidasFiscales: {
        AñoAnterior: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 5000,
          PerdidaFiscalGeneradaEnElPeriodo: 1000,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          PerdidaFiscalLiquidaCompensada: 0,
          TasaFiscalAplicada: 0,
          ValorFiscalDeLaPerdidaLiquidaCompensadaEnElPeriodo: 0,
          SaldoAjustadoImpuestoDiferidoDeBPPorPerdidasFiscales: 0,
        },
      },
    };

    // La función recorre el objeto y llama a calculateAll con cada path encontrado
    expect(() =>
      calculateFirstValues(data.DetalleCompensacionPerdidasFiscales, data)
    ).not.toThrow();
  });

  it('debería manejar objetos vacíos sin error', () => {
    const data = {};

    expect(() => calculateFirstValues({}, data)).not.toThrow();
  });
});

describe('calculateAll - ImpuestosDiferidosProvenientesDeDiferenciasTemporarias', () => {
  it('debería calcular DiferenciaTemporaria usando primera forma (BaseFiscal - BaseContable)', () => {
    const data = {
      ImpuestosDiferidosProvenientesDeDiferenciasTemporarias: {
        ActivosDiferidos: {
          EfectivoYEquivalentesAlEfectivo: {
            BaseFiscal: 1000,
            BaseContable: 800,
            DiferenciaTemporaria: 0,
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 100,
            Variacion: 0,
            TasaFiscalAplicada: 0,
          },
          InversionesEInstrumentosDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          CuentasPorCobrar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Inventarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesPlantaYEquipo: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosIntangibles: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesDeInversion: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosBiologicos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PasivosFinancierosYCuentasPorPagar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ImpuestosGravamenesYTasas: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          BeneficiosAEmpleados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Provisiones: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosPasivosAnticiposYAvancesRecibidos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OperacionesConTitulosYDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PerdidasFiscalesYExcesosDeRentaPresuntiva: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosReconocidosSolamenteParaFinesFiscales: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosActivos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ValorTotal: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
        },
      },
    };

    calculateAll(
      'ImpuestosDiferidosProvenientesDeDiferenciasTemporarias.ActivosDiferidos.EfectivoYEquivalentesAlEfectivo',
      data
    );

    const element =
      data.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias
        .ActivosDiferidos.EfectivoYEquivalentesAlEfectivo;

    // DiferenciaTemporaria = BaseFiscal - BaseContable = 1000 - 800 = 200
    expect(element.DiferenciaTemporaria).toBe(200);

    // SaldoImpuestoDiferidoActual = DiferenciaTemporaria * 0.35 = 200 * 0.35 = 70
    expect(element.SaldoImpuestoDiferidoActual).toBe(70);

    // Variacion = SaldoImpuestoDiferidoAnterior - SaldoImpuestoDiferidoActual = 100 - 70 = 30
    expect(element.Variacion).toBe(30);

    // TasaFiscalAplicada = (SaldoImpuestoDiferidoActual / DiferenciaTemporaria) * 100 = (70 / 200) * 100 = 35
    expect(element.TasaFiscalAplicada).toBe(35);
  });

  it('debería calcular DiferenciaTemporaria usando segunda forma (BaseContable - BaseFiscal)', () => {
    const data = {
      ImpuestosDiferidosProvenientesDeDiferenciasTemporarias: {
        ActivosDiferidos: {
          EfectivoYEquivalentesAlEfectivo: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          InversionesEInstrumentosDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          CuentasPorCobrar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Inventarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesPlantaYEquipo: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosIntangibles: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesDeInversion: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosBiologicos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PasivosFinancierosYCuentasPorPagar: {
            BaseFiscal: 500,
            BaseContable: 700,
            DiferenciaTemporaria: 0,
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 50,
            Variacion: 0,
            TasaFiscalAplicada: 0,
          },
          ImpuestosGravamenesYTasas: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          BeneficiosAEmpleados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Provisiones: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosPasivosAnticiposYAvancesRecibidos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OperacionesConTitulosYDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PerdidasFiscalesYExcesosDeRentaPresuntiva: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosReconocidosSolamenteParaFinesFiscales: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosActivos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ValorTotal: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
        },
      },
    };

    calculateAll(
      'ImpuestosDiferidosProvenientesDeDiferenciasTemporarias.ActivosDiferidos.PasivosFinancierosYCuentasPorPagar',
      data
    );

    const element =
      data.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias
        .ActivosDiferidos.PasivosFinancierosYCuentasPorPagar;

    // DiferenciaTemporaria = BaseContable - BaseFiscal = 700 - 500 = 200
    expect(element.DiferenciaTemporaria).toBe(200);

    // SaldoImpuestoDiferidoActual = DiferenciaTemporaria * 0.35 = 200 * 0.35 = 70
    expect(element.SaldoImpuestoDiferidoActual).toBe(70);

    // Variacion = SaldoImpuestoDiferidoAnterior - SaldoImpuestoDiferidoActual = 50 - 70 = -20
    expect(element.Variacion).toBe(-20);

    // TasaFiscalAplicada = (SaldoImpuestoDiferidoActual / DiferenciaTemporaria) * 100 = (70 / 200) * 100 = 35
    expect(element.TasaFiscalAplicada).toBe(35);
  });

  it('debería calcular TasaFiscalAplicada como 0 cuando DiferenciaTemporaria es 0', () => {
    const data = {
      ImpuestosDiferidosProvenientesDeDiferenciasTemporarias: {
        ActivosDiferidos: {
          EfectivoYEquivalentesAlEfectivo: {
            BaseFiscal: 1000,
            BaseContable: 1000,
            DiferenciaTemporaria: 0,
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
            TasaFiscalAplicada: 0,
          },
          InversionesEInstrumentosDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          CuentasPorCobrar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Inventarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesPlantaYEquipo: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosIntangibles: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesDeInversion: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosBiologicos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PasivosFinancierosYCuentasPorPagar: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ImpuestosGravamenesYTasas: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          BeneficiosAEmpleados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Provisiones: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosPasivosAnticiposYAvancesRecibidos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OperacionesConTitulosYDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PerdidasFiscalesYExcesosDeRentaPresuntiva: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosReconocidosSolamenteParaFinesFiscales: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosActivos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ValorTotal: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
        },
      },
    };

    calculateAll(
      'ImpuestosDiferidosProvenientesDeDiferenciasTemporarias.ActivosDiferidos.EfectivoYEquivalentesAlEfectivo',
      data
    );

    const element =
      data.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias
        .ActivosDiferidos.EfectivoYEquivalentesAlEfectivo;

    expect(element.DiferenciaTemporaria).toBe(0);
    expect(element.SaldoImpuestoDiferidoActual).toBe(0);
    expect(element.TasaFiscalAplicada).toBe(0);
  });

  it('debería calcular ValorTotal sumando todos los elementos', () => {
    const data = {
      ImpuestosDiferidosProvenientesDeDiferenciasTemporarias: {
        ActivosDiferidos: {
          EfectivoYEquivalentesAlEfectivo: {
            BaseFiscal: 1000,
            BaseContable: 800,
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 50,
            Variacion: 0,
          },
          InversionesEInstrumentosDerivados: {
            SaldoImpuestoDiferidoActual: 10,
            SaldoImpuestoDiferidoAnterior: 5,
            Variacion: 5,
          },
          CuentasPorCobrar: {
            SaldoImpuestoDiferidoActual: 20,
            SaldoImpuestoDiferidoAnterior: 15,
            Variacion: 5,
          },
          Inventarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesPlantaYEquipo: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosIntangibles: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PropiedadesDeInversion: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosBiologicos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PasivosFinancierosYCuentasPorPagar: {
            SaldoImpuestoDiferidoActual: 15,
            SaldoImpuestoDiferidoAnterior: 10,
            Variacion: 5,
          },
          ImpuestosGravamenesYTasas: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          BeneficiosAEmpleados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          Provisiones: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosPasivosAnticiposYAvancesRecibidos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OperacionesConTitulosYDerivados: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          PerdidasFiscalesYExcesosDeRentaPresuntiva: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ActivosReconocidosSolamenteParaFinesFiscales: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          OtrosActivos: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
          ValorTotal: {
            SaldoImpuestoDiferidoActual: 0,
            SaldoImpuestoDiferidoAnterior: 0,
            Variacion: 0,
          },
        },
      },
    };

    calculateAll(
      'ImpuestosDiferidosProvenientesDeDiferenciasTemporarias.ActivosDiferidos.EfectivoYEquivalentesAlEfectivo',
      data
    );

    const valorTotal =
      data.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias
        .ActivosDiferidos.ValorTotal;

    // EfectivoYEquivalentesAlEfectivo calculado: 70
    // InversionesEInstrumentosDerivados: 10
    // CuentasPorCobrar: 20
    // PasivosFinancierosYCuentasPorPagar: 15
    // Total: 70 + 10 + 20 + 15 = 115
    expect(valorTotal.SaldoImpuestoDiferidoActual).toBe(115);

    // SaldoImpuestoDiferidoAnterior: 50 + 5 + 15 + 10 = 80
    expect(valorTotal.SaldoImpuestoDiferidoAnterior).toBe(80);

    // Variacion: (50-70) + 5 + 5 + 5 = -20 + 15 = -5
    expect(valorTotal.Variacion).toBe(-5);
  });

  it('no debería calcular si el path no incluye ImpuestosDiferidosProvenientesDeDiferenciasTemporarias', () => {
    const data = {
      OtraSeccion: {
        valor: 100,
      },
    };

    expect(() => calculateAll('OtraSeccion', data)).not.toThrow();
  });
});

describe('calculateAll - ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior', () => {
  it('debería calcular Variacion para SaldosAFavor con valores presentes', () => {
    const data = {
      ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior: {
        SaldosAFavor: {
          Saldo31VigenciaActual: 1000,
          Saldo31VigenciaAnterior: 0,
          Variacion: 0,
          ExplicacionDeLaVariacion: {
            ReduccionCompensacionApliacion: 0,
          },
        },
        ImpuestosPagadosEnELExterior: {
          Saldo31VigenciaActual: 0,
          Saldo31VigenciaAnterior: 0,
          Variacion: 0,
        },
      },
    };

    calculateAll(
      'ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior',
      data
    );

    // Variacion = (Actual || 0) - (Anterior || 0) = 1000 - 0 = 1000
    expect(
      data.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior
        .SaldosAFavor.Variacion
    ).toBe(1000);
    expect(
      data.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior
        .SaldosAFavor.ExplicacionDeLaVariacion.ReduccionCompensacionApliacion
    ).toBe(1000);
  });

  it('debería calcular Variacion para ImpuestosPagadosEnELExterior con valores presentes', () => {
    const data = {
      ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior: {
        SaldosAFavor: {
          Saldo31VigenciaActual: 0,
          Saldo31VigenciaAnterior: 0,
          Variacion: 0,
          ExplicacionDeLaVariacion: {
            ReduccionCompensacionApliacion: 0,
          },
        },
        ImpuestosPagadosEnELExterior: {
          Saldo31VigenciaActual: 500,
          Saldo31VigenciaAnterior: 200,
          Variacion: 0,
        },
      },
    };

    calculateAll(
      'ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior',
      data
    );

    // Variacion = (Actual || 0) - (Anterior || 0) = 500 - 200 = 300
    expect(
      data.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior
        .ImpuestosPagadosEnELExterior.Variacion
    ).toBe(300);
  });

  it('debería manejar cuando Actual es 0', () => {
    const data = {
      ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior: {
        SaldosAFavor: {
          Saldo31VigenciaActual: 0,
          Saldo31VigenciaAnterior: 100,
          Variacion: 0,
          ExplicacionDeLaVariacion: {
            ReduccionCompensacionApliacion: 0,
          },
        },
        ImpuestosPagadosEnELExterior: {
          Saldo31VigenciaActual: 0,
          Saldo31VigenciaAnterior: 0,
          Variacion: 0,
        },
      },
    };

    calculateAll(
      'ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior',
      data
    );

    // Variacion = (Actual || 0) - (Anterior || 0) = 0 - 100 = -100
    expect(
      data.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior
        .SaldosAFavor.Variacion
    ).toBe(-100);
  });

  it('debería manejar valores undefined usando operador OR', () => {
    const data = {
      ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior: {
        SaldosAFavor: {
          Variacion: 0,
          ExplicacionDeLaVariacion: {
            ReduccionCompensacionApliacion: 0,
          },
        } as any,
        ImpuestosPagadosEnELExterior: {
          Variacion: 0,
        } as any,
      },
    };

    calculateAll(
      'ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior',
      data
    );

    // Variacion = (undefined || 0) - (undefined || 0) = 0 - 0 = 0
    expect(
      data.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior
        .SaldosAFavor.Variacion
    ).toBe(0);
  });
});

describe('calculateAll - DetalleCompensacionPerdidasFiscales', () => {
  it('debería calcular PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo para AñoAnterior', () => {
    const data = {
      DetalleCompensacionPerdidasFiscales: {
        AñoAnterior: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 10000,
          PerdidaFiscalGeneradaEnElPeriodo: 2000,
          PerdidaFiscalCompensadaEnElPeriodo: 1000,
          ValoresNoCompensadosPorCaducidad: 500,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 300,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 200,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
        AñoActual: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 0,
          PerdidaFiscalGeneradaEnElPeriodo: 0,
          PerdidaFiscalCompensadaEnElPeriodo: 0,
          ValoresNoCompensadosPorCaducidad: 0,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 0,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 0,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
      },
    };

    calculateAll('DetalleCompensacionPerdidasFiscales.AñoAnterior', data);

    const añoAnterior = data.DetalleCompensacionPerdidasFiscales.AñoAnterior;

    // PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo =
    // 10000 + 2000 - 1000 - 500 + 300 - 200 = 10600
    expect(
      añoAnterior.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo
    ).toBe(10600);

    // SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo = 10600 * 0.35 = 3710
    expect(añoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo).toBe(
      3710
    );
  });

  it('debería calcular PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo para AñoActual', () => {
    const data = {
      DetalleCompensacionPerdidasFiscales: {
        AñoAnterior: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 0,
          PerdidaFiscalGeneradaEnElPeriodo: 0,
          PerdidaFiscalCompensadaEnElPeriodo: 0,
          ValoresNoCompensadosPorCaducidad: 0,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 0,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 0,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
        AñoActual: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 10600,
          PerdidaFiscalGeneradaEnElPeriodo: 3000,
          PerdidaFiscalCompensadaEnElPeriodo: 2000,
          ValoresNoCompensadosPorCaducidad: 100,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 500,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 300,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
      },
    };

    calculateAll('DetalleCompensacionPerdidasFiscales.AñoActual', data);

    const añoActual = data.DetalleCompensacionPerdidasFiscales.AñoActual;

    // PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo =
    // 10600 + 3000 - 2000 - 100 + 500 - 300 = 11700
    expect(añoActual.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo).toBe(
      11700
    );

    // SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo = 11700 * 0.35 = 4095
    expect(añoActual.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo).toBe(
      4095
    );
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      DetalleCompensacionPerdidasFiscales: {
        AñoAnterior: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 5000,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
        AñoActual: {
          perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo: 0,
          PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
      },
    };

    calculateAll('DetalleCompensacionPerdidasFiscales.AñoAnterior', data);

    const añoAnterior = data.DetalleCompensacionPerdidasFiscales.AñoAnterior;

    // Solo tiene valor inicial de 5000
    expect(
      añoAnterior.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo
    ).toBe(5000);
    expect(añoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo).toBe(
      1750
    ); // 5000 * 0.35
  });
});

describe('calculateAll - DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva', () => {
  it('debería calcular ValorAcumuladoPorCompensarAlFinalDelPeriodo para AñoAnterior', () => {
    const data = {
      DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva: {
        AñoAnterior: {
          ValorAcumuladoPorCompensarAlInicioDelPeriodo: 8000,
          ValorGeneradoEnElPeriodo: 1500,
          ValorCompensadoEnElPeriodo: 800,
          ValoresNoCompensadosPorCaducidad: 300,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 200,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 100,
          ValorAcumuladoPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
        AñoActual: {
          ValorAcumuladoPorCompensarAlInicioDelPeriodo: 0,
          ValorGeneradoEnElPeriodo: 0,
          ValorCompensadoEnElPeriodo: 0,
          ValoresNoCompensadosPorCaducidad: 0,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 0,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 0,
          ValorAcumuladoPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
      },
    };

    calculateAll(
      'DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva.AñoAnterior',
      data
    );

    const añoAnterior =
      data.DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva.AñoAnterior;

    // ValorAcumuladoPorCompensarAlFinalDelPeriodo =
    // 8000 + 1500 - 800 - 300 + 200 - 100 = 8500
    expect(añoAnterior.ValorAcumuladoPorCompensarAlFinalDelPeriodo).toBe(8500);

    // SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo = 8500 * 0.35 = 2975
    expect(añoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo).toBe(
      2975
    );
  });

  it('debería calcular ValorAcumuladoPorCompensarAlFinalDelPeriodo para AñoActual', () => {
    const data = {
      DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva: {
        AñoAnterior: {
          ValorAcumuladoPorCompensarAlInicioDelPeriodo: 0,
          ValorGeneradoEnElPeriodo: 0,
          ValorCompensadoEnElPeriodo: 0,
          ValoresNoCompensadosPorCaducidad: 0,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 0,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 0,
          ValorAcumuladoPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
        AñoActual: {
          ValorAcumuladoPorCompensarAlInicioDelPeriodo: 8500,
          ValorGeneradoEnElPeriodo: 2000,
          ValorCompensadoEnElPeriodo: 1500,
          ValoresNoCompensadosPorCaducidad: 200,
          AjustesPorCorreccionDeLaDeclaracionMayorValor: 300,
          AjustesPorCorreccionDeLaDeclaracionMenorValor: 150,
          ValorAcumuladoPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
      },
    };

    calculateAll(
      'DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva.AñoActual',
      data
    );

    const añoActual =
      data.DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva.AñoActual;

    // ValorAcumuladoPorCompensarAlFinalDelPeriodo =
    // 8500 + 2000 - 1500 - 200 + 300 - 150 = 8950
    expect(añoActual.ValorAcumuladoPorCompensarAlFinalDelPeriodo).toBe(8950);

    // SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo = 8950 * 0.35 = 3132.5
    expect(añoActual.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo).toBe(
      3132.5
    );
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva: {
        AñoAnterior: {
          ValorAcumuladoPorCompensarAlInicioDelPeriodo: 3000,
          ValorAcumuladoPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
        AñoActual: {
          ValorAcumuladoPorCompensarAlInicioDelPeriodo: 0,
          ValorAcumuladoPorCompensarAlFinalDelPeriodo: 0,
          SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo: 0,
        },
      },
    };

    calculateAll(
      'DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva.AñoAnterior',
      data
    );

    const añoAnterior =
      data.DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva.AñoAnterior;

    // Solo tiene valor inicial de 3000
    expect(añoAnterior.ValorAcumuladoPorCompensarAlFinalDelPeriodo).toBe(3000);
    expect(añoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo).toBe(
      1050
    ); // 3000 * 0.35
  });
});
