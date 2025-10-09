import { describe, expect, it } from 'vitest';
import {
  calculatedValorFiscal,
  calculateValorFiscalSolicitado,
  calculateOtras,
  calculateRentaLiquidaUnicamenteDividendos,
  calculateRentaPresuntiva,
  calculateRentasLiquidasGravables,
  calculateGananciasOcasionalesGravables,
  calculateTotalRetencionesAnioGravableQueDeclara,
} from '../../../src/forms/utils/RentaLiquida';

describe('RentaLiquida - calculatedValorFiscal', () => {
  it('debería calcular ValorFiscal correctamente con todos los componentes', () => {
    const data = {
      ValorContable: 10000,
      EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano: 500,
      MenorValorFiscalPorReconocimientoExencionesLimitaciones: 1000,
      MayorValorFiscalPorReconocimientoExencionesLimitaciones: 300,
      ValorFiscal: 0,
    };

    calculatedValorFiscal(data);

    // ValorFiscal = ValorContable + EfectoConversion - MenorValor + MayorValor
    // = 10000 + 500 - 1000 + 300 = 9800
    expect(data.ValorFiscal).toBe(9800);
  });

  it('debería manejar valores undefined usando el operador OR', () => {
    const data = {
      ValorFiscal: 0,
    };

    calculatedValorFiscal(data);

    // Todos los valores son undefined, se convierten a 0
    // = 0 + 0 - 0 + 0 = 0
    expect(data.ValorFiscal).toBe(0);
  });

  it('debería manejar valores parcialmente undefined', () => {
    const data = {
      ValorContable: 5000,
      MayorValorFiscalPorReconocimientoExencionesLimitaciones: 200,
      ValorFiscal: 0,
    };

    calculatedValorFiscal(data);

    // ValorFiscal = 5000 + 0 - 0 + 200 = 5200
    expect(data.ValorFiscal).toBe(5200);
  });

  it('no debería calcular si ValorFiscal es null', () => {
    const data = {
      ValorContable: 5000,
      ValorFiscal: null,
    };

    calculatedValorFiscal(data);

    // No debería modificar el valor si es null
    expect(data.ValorFiscal).toBeNull();
  });

  it('no debería calcular si ValorFiscal es undefined', () => {
    const data = {
      ValorContable: 5000,
    };

    calculatedValorFiscal(data);

    // No debería agregar la propiedad si no existe
    expect(data).not.toHaveProperty('ValorFiscal');
  });

  it('debería manejar números negativos correctamente', () => {
    const data = {
      ValorContable: 1000,
      EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano: -200,
      MenorValorFiscalPorReconocimientoExencionesLimitaciones: 500,
      MayorValorFiscalPorReconocimientoExencionesLimitaciones: 100,
      ValorFiscal: 0,
    };

    calculatedValorFiscal(data);

    // ValorFiscal = 1000 + (-200) - 500 + 100 = 400
    expect(data.ValorFiscal).toBe(400);
  });
});

describe('RentaLiquida - calculateValorFiscalSolicitado', () => {
  it('debería asignar ValorFiscalAlQueTieneDerecho cuando existe', () => {
    const data = {
      ValorFiscalAlQueTieneDerecho: 5000,
      ValorFiscalSolicitado: 0,
    };

    calculateValorFiscalSolicitado(data);

    // ValorFiscalAlQueTieneDerecho se mantiene igual
    expect(data.ValorFiscalAlQueTieneDerecho).toBe(5000);
  });

  it('debería manejar ValorFiscalAlQueTieneDerecho undefined como 0', () => {
    const data = {
      ValorFiscalSolicitado: 0,
    } as any;

    calculateValorFiscalSolicitado(data);

    // ValorFiscalAlQueTieneDerecho debe ser 0
    expect(data.ValorFiscalAlQueTieneDerecho).toBe(0);
  });

  it('no debería calcular si ValorFiscalSolicitado es null', () => {
    const data = {
      ValorFiscalAlQueTieneDerecho: 3000,
      ValorFiscalSolicitado: null,
    };

    const originalValue = data.ValorFiscalAlQueTieneDerecho;
    calculateValorFiscalSolicitado(data);

    // No debería modificar si ValorFiscalSolicitado es null
    expect(data.ValorFiscalAlQueTieneDerecho).toBe(originalValue);
  });

  it('no debería calcular si ValorFiscalSolicitado es undefined', () => {
    const data = {
      ValorFiscalAlQueTieneDerecho: 3000,
    };

    const originalValue = data.ValorFiscalAlQueTieneDerecho;
    calculateValorFiscalSolicitado(data);

    // No debería modificar si ValorFiscalSolicitado no existe
    expect(data.ValorFiscalAlQueTieneDerecho).toBe(originalValue);
  });
});

describe('RentaLiquida - calculateOtras', () => {
  it('debería asignar ValorFiscal a Otras', () => {
    const data = {
      ValorFiscal: 8000,
      Otras: 0,
    };

    calculateOtras(data);

    expect(data.Otras).toBe(8000);
  });

  it('debería manejar ValorFiscal undefined como 0', () => {
    const data = {
      Otras: 100,
    };

    calculateOtras(data);

    expect(data.Otras).toBe(0);
  });

  it('no debería calcular si Otras es null', () => {
    const data = {
      ValorFiscal: 5000,
      Otras: null,
    };

    calculateOtras(data);

    expect(data.Otras).toBeNull();
  });

  it('no debería calcular si Otras es undefined', () => {
    const data = {
      ValorFiscal: 5000,
    };

    calculateOtras(data);

    expect(data).not.toHaveProperty('Otras');
  });
});

describe('RentaLiquida - calculateRentaLiquidaUnicamenteDividendos', () => {
  it('debería calcular RentaLiquidaUnicamenteDividendos correctamente', () => {
    const data = {
      RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 0,
      },
      RentaLiquidaOrdinariaDelEjercicioExcedenteNetoIncluyeUnicamenteDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 5000,
      },
      Compensaciones: {
        Total: {
          ValorFiscal: 1500,
        },
      },
    };

    calculateRentaLiquidaUnicamenteDividendos(data);

    // RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal = 5000 - 1500 = 3500
    expect(data.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal).toBe(3500);
  });

  it('debería manejar valores undefined', () => {
    const data = {
      RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 0,
      },
    };

    calculateRentaLiquidaUnicamenteDividendos(data);

    // ValorFiscal = 0 - 0 = 0
    expect(data.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal).toBe(0);
  });

  it('debería calcular correctamente sin compensaciones', () => {
    const data = {
      RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 0,
      },
      RentaLiquidaOrdinariaDelEjercicioExcedenteNetoIncluyeUnicamenteDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 3000,
      },
    };

    calculateRentaLiquidaUnicamenteDividendos(data);

    // ValorFiscal = 3000 - 0 = 3000
    expect(data.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal).toBe(3000);
  });
});

describe('RentaLiquida - calculateRentaPresuntiva', () => {
  it('debería calcular BaseDeCalculoDeLaRentaPresuntiva correctamente', () => {
    const data = {
      RentaPresuntiva: {
        BaseDeCalculoDeLaRentaPresuntiva: { ValorFiscal: 0 },
        PatrimonioLiquidoDelAnioOPeriodoGravableAnterior: { ValorFiscal: 100000 },
        ValorPatrimonialNeto: {
          AccionesYAportesPoseidosEnSociedadesNacionales: { ValorFiscal: 10000 },
          BienesAfectadosPorHechosConstitutosDeFuerzaMayorOCasoFortuito: { ValorFiscal: 5000 },
        },
        CalculoRentaPresuntiva0PorcientoSalvoExcepciones: { ValorFiscal: 0 },
        Total: { ValorFiscal: 0 },
      },
    };

    calculateRentaPresuntiva(data);

    // BaseDeCalculoDeLaRentaPresuntiva = 100000 + 10000 + 5000 + 0 + 0 + 0 + 0 + 0 = 115000
    expect(data.RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal).toBe(115000);
    expect(data.RentaPresuntiva.CalculoRentaPresuntiva0PorcientoSalvoExcepciones.ValorFiscal).toBe(0);
    expect(data.RentaPresuntiva.Total.ValorFiscal).toBe(115000);
  });

  it('debería calcular con todos los valores en cero', () => {
    const data = {
      RentaPresuntiva: {
        BaseDeCalculoDeLaRentaPresuntiva: { ValorFiscal: 0 },
        CalculoRentaPresuntiva0PorcientoSalvoExcepciones: { ValorFiscal: 0 },
        Total: { ValorFiscal: 0 },
      },
    };

    calculateRentaPresuntiva(data);

    // Todo en 0
    expect(data.RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal).toBe(0);
    expect(data.RentaPresuntiva.Total.ValorFiscal).toBe(0);
  });

  it('debería calcular con exclusiones', () => {
    const data = {
      RentaPresuntiva: {
        BaseDeCalculoDeLaRentaPresuntiva: { ValorFiscal: 0 },
        PatrimonioLiquidoDelAnioOPeriodoGravableAnterior: { ValorFiscal: 50000 },
        Primeras19000UVTDeActivosDestinadosAlSectorAgropecuario: { ValorFiscal: 10000 },
        OtrasExclusiones: { ValorFiscal: 5000 },
        CalculoRentaPresuntiva0PorcientoSalvoExcepciones: { ValorFiscal: 0 },
        Total: { ValorFiscal: 0 },
      },
    };

    calculateRentaPresuntiva(data);

    // BaseDeCalculoDeLaRentaPresuntiva = 50000 + 0 + 0 + 0 + 0 + 0 + 10000 + 5000 = 65000
    expect(data.RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal).toBe(65000);
    expect(data.RentaPresuntiva.Total.ValorFiscal).toBe(65000);
  });

  it('debería calcular con todos los componentes de ValorPatrimonialNeto', () => {
    const data = {
      RentaPresuntiva: {
        BaseDeCalculoDeLaRentaPresuntiva: { ValorFiscal: 0 },
        PatrimonioLiquidoDelAnioOPeriodoGravableAnterior: { ValorFiscal: 20000 },
        ValorPatrimonialNeto: {
          AccionesYAportesPoseidosEnSociedadesNacionales: { ValorFiscal: 1000 },
          BienesAfectadosPorHechosConstitutosDeFuerzaMayorOCasoFortuito: { ValorFiscal: 2000 },
          BienesVinculadosAEmpresasEnPeriodoImproductivo: { ValorFiscal: 3000 },
          BienesDestinadosExclusivamenteAActividadesDeportivas: { ValorFiscal: 4000 },
          BienesVinculadosAEmpresasExclusivamenteMineras: { ValorFiscal: 5000 },
        },
        CalculoRentaPresuntiva0PorcientoSalvoExcepciones: { ValorFiscal: 0 },
        Total: { ValorFiscal: 0 },
      },
    };

    calculateRentaPresuntiva(data);

    // BaseDeCalculoDeLaRentaPresuntiva = 20000 + 1000 + 2000 + 3000 + 4000 + 5000 + 0 + 0 = 35000
    expect(data.RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal).toBe(35000);
    expect(data.RentaPresuntiva.Total.ValorFiscal).toBe(35000);
  });
});

describe('RentaLiquida - calculateRentasLiquidasGravables', () => {
  it('debería calcular RentasLiquidasGravables correctamente cuando RentaPresuntiva > RentaExenta', () => {
    const data = {
      RentasLiquidasGravables: {
        ValorFiscal: 0,
      },
      RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 10000,
      },
      RentaExenta: {
        ValorFiscal: 2000,
      },
      RentasGravablesRentaLiquida: {
        Total: {
          ValorFiscal: 3000,
        },
      },
      RentaPresuntiva: {
        Total: {
          ValorFiscal: 5000,
        },
      },
    };

    calculateRentasLiquidasGravables(data);

    // valueFiscal = 10000 - 2000 + 3000 = 11000
    // RentaPresuntiva.Total (5000) > RentaExenta (2000) => ValorFiscal = 11000
    expect(data.RentasLiquidasGravables.ValorFiscal).toBe(11000);
  });

  it('debería retornar 0 cuando RentaPresuntiva <= RentaExenta', () => {
    const data = {
      RentasLiquidasGravables: {
        ValorFiscal: 0,
      },
      RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral: {
        ValorFiscal: 10000,
      },
      RentaExenta: {
        ValorFiscal: 5000,
      },
      RentasGravablesRentaLiquida: {
        Total: {
          ValorFiscal: 2000,
        },
      },
      RentaPresuntiva: {
        Total: {
          ValorFiscal: 3000,
        },
      },
    };

    calculateRentasLiquidasGravables(data);

    // RentaPresuntiva.Total (3000) <= RentaExenta (5000) => ValorFiscal = 0
    expect(data.RentasLiquidasGravables.ValorFiscal).toBe(0);
  });

  it('debería manejar valores undefined', () => {
    const data = {
      RentasLiquidasGravables: {
        ValorFiscal: 0,
      },
    };

    calculateRentasLiquidasGravables(data);

    // Todo en 0, 0 > 0 es false => ValorFiscal = 0
    expect(data.RentasLiquidasGravables.ValorFiscal).toBe(0);
  });
});

describe('RentaLiquida - calculateGananciasOcasionalesGravables', () => {
  it('debería calcular TotalIngresosPorGananciasOcasionales correctamente', () => {
    const data = {
      GananciasOcasionalesGravables: {
        TotalIngresosPorGananciasOcasionales: { ValorFiscal: 0 },
        IngresosPorGananciaOcasionalEnVentaDeActivosFijos: { ValorFiscal: 5000 },
        OtrosIngresosPorGananciaOcasional: { ValorFiscal: 3000 },
        TotalCostosPorGananciasOcasionales: { ValorFiscal: 0 },
        CostosPorGananciaOcasionalEnVentaDeActivosFijos: { ValorFiscal: 1000 },
        OtrosCostosPorGananciasOcasionales: { ValorFiscal: 500 },
      },
    };

    calculateGananciasOcasionalesGravables(data);

    // TotalIngresosPorGananciasOcasionales = 5000 + 3000 = 8000
    expect(data.GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal).toBe(8000);
    
    // TotalCostosPorGananciasOcasionales = 1000 + 500 = 1500
    expect(data.GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal).toBe(1500);
  });

  it('debería manejar valores undefined', () => {
    const data = {
      GananciasOcasionalesGravables: {
        TotalIngresosPorGananciasOcasionales: { ValorFiscal: 0 },
        TotalCostosPorGananciasOcasionales: { ValorFiscal: 0 },
      },
    };

    calculateGananciasOcasionalesGravables(data);

    // Todo en 0
    expect(data.GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal).toBe(0);
    expect(data.GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal).toBe(0);
  });

  it('debería calcular solo con ingresos por venta de activos fijos', () => {
    const data = {
      GananciasOcasionalesGravables: {
        TotalIngresosPorGananciasOcasionales: { ValorFiscal: 0 },
        IngresosPorGananciaOcasionalEnVentaDeActivosFijos: { ValorFiscal: 10000 },
        TotalCostosPorGananciasOcasionales: { ValorFiscal: 0 },
        CostosPorGananciaOcasionalEnVentaDeActivosFijos: { ValorFiscal: 2000 },
      },
    };

    calculateGananciasOcasionalesGravables(data);

    expect(data.GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal).toBe(10000);
    expect(data.GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal).toBe(2000);
  });

  it('debería calcular solo con otros ingresos', () => {
    const data = {
      GananciasOcasionalesGravables: {
        TotalIngresosPorGananciasOcasionales: { ValorFiscal: 0 },
        OtrosIngresosPorGananciaOcasional: { ValorFiscal: 7000 },
        TotalCostosPorGananciasOcasionales: { ValorFiscal: 0 },
        OtrosCostosPorGananciasOcasionales: { ValorFiscal: 1500 },
      },
    };

    calculateGananciasOcasionalesGravables(data);

    expect(data.GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal).toBe(7000);
    expect(data.GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal).toBe(1500);
  });
});

describe('RentaLiquida - calculateTotalRetencionesAnioGravableQueDeclara', () => {
  it('debería calcular TotalRetencionesAnioGravableQueDeclara correctamente (resta)', () => {
    const data = {
      TotalRetencionesAnioGravableQueDeclara: {
        ValorFiscal: 0,
      },
      Autorretenciones: {
        TotalAutorretenciones: {
          ValorFiscal: 5000,
        },
      },
      OtrasRetenciones: {
        TotalOtrasRetenciones: {
          ValorFiscal: 2000,
        },
      },
    };

    calculateTotalRetencionesAnioGravableQueDeclara(data);

    // ValorFiscal = 5000 - 2000 = 3000
    expect(data.TotalRetencionesAnioGravableQueDeclara.ValorFiscal).toBe(3000);
  });

  it('debería manejar valores undefined', () => {
    const data = {
      TotalRetencionesAnioGravableQueDeclara: {
        ValorFiscal: 0,
      },
    };

    calculateTotalRetencionesAnioGravableQueDeclara(data);

    // ValorFiscal = 0 - 0 = 0
    expect(data.TotalRetencionesAnioGravableQueDeclara.ValorFiscal).toBe(0);
  });

  it('debería manejar resultado negativo', () => {
    const data = {
      TotalRetencionesAnioGravableQueDeclara: {
        ValorFiscal: 0,
      },
      Autorretenciones: {
        TotalAutorretenciones: {
          ValorFiscal: 1000,
        },
      },
      OtrasRetenciones: {
        TotalOtrasRetenciones: {
          ValorFiscal: 3000,
        },
      },
    };

    calculateTotalRetencionesAnioGravableQueDeclara(data);

    // ValorFiscal = 1000 - 3000 = -2000
    expect(data.TotalRetencionesAnioGravableQueDeclara.ValorFiscal).toBe(-2000);
  });
});
