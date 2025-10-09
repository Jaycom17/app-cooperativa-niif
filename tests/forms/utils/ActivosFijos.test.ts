import { describe, it, expect } from 'vitest';
import {
  calculateImporteNetoFinalPeriodoCosto,
  calculateImporteNetoFinalPeriodoAjustePorRevaluacion,
  calculateSubtotalAlFinalDelPeriodo,
  calculateTotalNetoAlFinalDelPeriodoFinanciero,
  calculateTotalNetoAlFinalDelPeriodoInformativo,
} from '../../../src/forms/utils/ActivosFijos';

describe('calculateImporteNetoFinalPeriodoCosto', () => {
  it('debería calcular correctamente el importe neto con todos los valores presentes', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 10000,
        EfectoDeConversion: 500,
      },
      Incrementos: {
        TransferenciasAdquisiciones: 2000,
      },
      Disminuciones: {
        TransferenciasEliminaciones: 1000,
      },
      Depreciacion: {
        PorCosto: 800,
        EfectoDeConversion: 200,
      },
      DeterioroAcumuladoAlFinalDelPeriodo: 500,
      ImporteNetoAlFinalDelPeriodo: {
        Costo: 0,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);

    // 10000 + 500 + 2000 - 1000 - 800 - 200 - 500 = 10000
    expect(data.ImporteNetoAlFinalDelPeriodo.Costo).toBe(10000);
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 5000,
      },
      Incrementos: {},
      Disminuciones: {},
      Depreciacion: {},
      ImporteNetoAlFinalDelPeriodo: {
        Costo: 0,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);

    // 5000 + 0 + 0 - 0 - 0 - 0 - 0 = 5000
    expect(data.ImporteNetoAlFinalDelPeriodo.Costo).toBe(5000);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 1000,
        EfectoDeConversion: -100,
      },
      Incrementos: {
        TransferenciasAdquisiciones: 500,
      },
      Disminuciones: {
        TransferenciasEliminaciones: 200,
      },
      Depreciacion: {
        PorCosto: 300,
        EfectoDeConversion: 50,
      },
      DeterioroAcumuladoAlFinalDelPeriodo: 100,
      ImporteNetoAlFinalDelPeriodo: {
        Costo: 0,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);

    // 1000 + (-100) + 500 - 200 - 300 - 50 - 100 = 750
    expect(data.ImporteNetoAlFinalDelPeriodo.Costo).toBe(750);
  });

  it('no debería hacer nada si ImporteNetoAlFinalDelPeriodo.Costo es null', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 1000,
      },
      ImporteNetoAlFinalDelPeriodo: {
        Costo: null,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);

    expect(data.ImporteNetoAlFinalDelPeriodo.Costo).toBeNull();
  });

  it('no debería hacer nada si ImporteNetoAlFinalDelPeriodo es undefined', () => {
    const data: any = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 1000,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);

    expect(data.ImporteNetoAlFinalDelPeriodo).toBeUndefined();
  });

  it('debería calcular correctamente con todos los valores en 0', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 0,
        EfectoDeConversion: 0,
      },
      Incrementos: {
        TransferenciasAdquisiciones: 0,
      },
      Disminuciones: {
        TransferenciasEliminaciones: 0,
      },
      Depreciacion: {
        PorCosto: 0,
        EfectoDeConversion: 0,
      },
      DeterioroAcumuladoAlFinalDelPeriodo: 0,
      ImporteNetoAlFinalDelPeriodo: {
        Costo: 0,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);

    expect(data.ImporteNetoAlFinalDelPeriodo.Costo).toBe(0);
  });
});

describe('calculateImporteNetoFinalPeriodoAjustePorRevaluacion', () => {
  it('debería calcular correctamente el ajuste por revaluación con todos los valores presentes', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 5000,
        EfectoDeConversion: 300,
      },
      Incrementos: {
        CambiosEnValorRazonable: 1000,
      },
      Disminuciones: {
        CambiosEnValorRazonable: 500,
      },
      Depreciacion: {
        AjustePorRevaluacionesOReExpresiones: 400,
      },
      ImporteNetoAlFinalDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 0,
      },
    };

    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(data);

    // 5000 + 300 + 1000 - 500 - 400 = 5400
    expect(
      data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones
    ).toBe(5400);
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 3000,
      },
      Incrementos: {},
      Disminuciones: {},
      Depreciacion: {},
      ImporteNetoAlFinalDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 0,
      },
    };

    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(data);

    // 3000 + 0 + 0 - 0 - 0 = 3000
    expect(
      data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones
    ).toBe(3000);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 2000,
        EfectoDeConversion: -50,
      },
      Incrementos: {
        CambiosEnValorRazonable: 500,
      },
      Disminuciones: {
        CambiosEnValorRazonable: 200,
      },
      Depreciacion: {
        AjustePorRevaluacionesOReExpresiones: 100,
      },
      ImporteNetoAlFinalDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 0,
      },
    };

    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(data);

    // 2000 + (-50) + 500 - 200 - 100 = 2150
    expect(
      data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones
    ).toBe(2150);
  });

  it('no debería hacer nada si AjustePorRevaluacionesOReExpresiones es null', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 1000,
      },
      ImporteNetoAlFinalDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: null,
      },
    };

    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(data);

    expect(
      data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones
    ).toBeNull();
  });

  it('no debería hacer nada si ImporteNetoAlFinalDelPeriodo es undefined', () => {
    const data: any = {
      ImporteAlComienzoDelPeriodo: {
        AjustePorRevaluacionesOReExpresiones: 1000,
      },
    };

    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(data);

    expect(data.ImporteNetoAlFinalDelPeriodo).toBeUndefined();
  });
});

describe('calculateSubtotalAlFinalDelPeriodo', () => {
  it('debería calcular correctamente el subtotal con todos los valores presentes', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SaldoAlComienzoDelPeriodo: 20000,
        IncrementosPorTransferenciasAdquisicionesYOtrosCambios: 5000,
        DisminucionesPorTransferenciasYOtrosCambios: 3000,
        SubtotalAlFinalPeriodo: 0,
      },
    };

    calculateSubtotalAlFinalDelPeriodo(data);

    // 20000 + 5000 - 3000 = 22000
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .SubtotalAlFinalPeriodo
    ).toBe(22000);
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SaldoAlComienzoDelPeriodo: 15000,
        SubtotalAlFinalPeriodo: 0,
      },
    };

    calculateSubtotalAlFinalDelPeriodo(data);

    // 15000 + 0 - 0 = 15000
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .SubtotalAlFinalPeriodo
    ).toBe(15000);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SaldoAlComienzoDelPeriodo: 10000,
        IncrementosPorTransferenciasAdquisicionesYOtrosCambios: -500,
        DisminucionesPorTransferenciasYOtrosCambios: 1000,
        SubtotalAlFinalPeriodo: 0,
      },
    };

    calculateSubtotalAlFinalDelPeriodo(data);

    // 10000 + (-500) - 1000 = 8500
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .SubtotalAlFinalPeriodo
    ).toBe(8500);
  });

  it('no debería hacer nada si SubtotalAlFinalPeriodo es null', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SaldoAlComienzoDelPeriodo: 10000,
        SubtotalAlFinalPeriodo: null,
      },
    };

    calculateSubtotalAlFinalDelPeriodo(data);

    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .SubtotalAlFinalPeriodo
    ).toBeNull();
  });

  it('no debería hacer nada si ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero es undefined', () => {
    const data: any = {};

    calculateSubtotalAlFinalDelPeriodo(data);

    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
    ).toBeUndefined();
  });
});

describe('calculateTotalNetoAlFinalDelPeriodoFinanciero', () => {
  it('debería calcular correctamente el total neto financiero con todos los valores presentes', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SubtotalAlFinalPeriodo: 25000,
        DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo: 8000,
        TotalNetoAlFinalDelPeriodo: 0,
      },
    };

    calculateTotalNetoAlFinalDelPeriodoFinanciero(data);

    // 25000 - 8000 = 17000
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .TotalNetoAlFinalDelPeriodo
    ).toBe(17000);
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SubtotalAlFinalPeriodo: 18000,
        TotalNetoAlFinalDelPeriodo: 0,
      },
    };

    calculateTotalNetoAlFinalDelPeriodoFinanciero(data);

    // 18000 - 0 = 18000
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .TotalNetoAlFinalDelPeriodo
    ).toBe(18000);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SubtotalAlFinalPeriodo: 12000,
        DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo: -500,
        TotalNetoAlFinalDelPeriodo: 0,
      },
    };

    calculateTotalNetoAlFinalDelPeriodoFinanciero(data);

    // 12000 - (-500) = 12500
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .TotalNetoAlFinalDelPeriodo
    ).toBe(12500);
  });

  it('no debería hacer nada si TotalNetoAlFinalDelPeriodo es null', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SubtotalAlFinalPeriodo: 15000,
        TotalNetoAlFinalDelPeriodo: null,
      },
    };

    calculateTotalNetoAlFinalDelPeriodoFinanciero(data);

    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .TotalNetoAlFinalDelPeriodo
    ).toBeNull();
  });

  it('no debería hacer nada si ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero es undefined', () => {
    const data: any = {};

    calculateTotalNetoAlFinalDelPeriodoFinanciero(data);

    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
    ).toBeUndefined();
  });
});

describe('calculateTotalNetoAlFinalDelPeriodoInformativo', () => {
  it('debería calcular correctamente el total neto informativo con todos los valores presentes', () => {
    const data = {
      DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero:
        {
          ValorTotalAlFinalDelPeriodo: 30000,
          DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo: 10000,
          ValorNetoAlFinalDelPeriodo: 0,
        },
    };

    calculateTotalNetoAlFinalDelPeriodoInformativo(data);

    // 30000 - 10000 = 20000
    expect(
      data
        .DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
        .ValorNetoAlFinalDelPeriodo
    ).toBe(20000);
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero:
        {
          ValorTotalAlFinalDelPeriodo: 22000,
          ValorNetoAlFinalDelPeriodo: 0,
        },
    };

    calculateTotalNetoAlFinalDelPeriodoInformativo(data);

    // 22000 - 0 = 22000
    expect(
      data
        .DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
        .ValorNetoAlFinalDelPeriodo
    ).toBe(22000);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero:
        {
          ValorTotalAlFinalDelPeriodo: 15000,
          DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo: -1000,
          ValorNetoAlFinalDelPeriodo: 0,
        },
    };

    calculateTotalNetoAlFinalDelPeriodoInformativo(data);

    // 15000 - (-1000) = 16000
    expect(
      data
        .DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
        .ValorNetoAlFinalDelPeriodo
    ).toBe(16000);
  });

  it('no debería hacer nada si ValorNetoAlFinalDelPeriodo es null', () => {
    const data = {
      DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero:
        {
          ValorTotalAlFinalDelPeriodo: 20000,
          ValorNetoAlFinalDelPeriodo: null,
        },
    };

    calculateTotalNetoAlFinalDelPeriodoInformativo(data);

    expect(
      data
        .DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
        .ValorNetoAlFinalDelPeriodo
    ).toBeNull();
  });

  it('no debería hacer nada si DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero es undefined', () => {
    const data: any = {};

    calculateTotalNetoAlFinalDelPeriodoInformativo(data);

    expect(
      data.DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
    ).toBeUndefined();
  });
});

describe('ActivosFijos - Integración de cálculos', () => {
  it('debería ejecutar múltiples cálculos en secuencia correctamente', () => {
    const data = {
      ImporteAlComienzoDelPeriodo: {
        Costo: 10000,
        EfectoDeConversion: 500,
        AjustePorRevaluacionesOReExpresiones: 2000,
      },
      Incrementos: {
        TransferenciasAdquisiciones: 3000,
        CambiosEnValorRazonable: 400,
      },
      Disminuciones: {
        TransferenciasEliminaciones: 1000,
        CambiosEnValorRazonable: 200,
      },
      Depreciacion: {
        PorCosto: 800,
        EfectoDeConversion: 100,
        AjustePorRevaluacionesOReExpresiones: 150,
      },
      DeterioroAcumuladoAlFinalDelPeriodo: 600,
      ImporteNetoAlFinalDelPeriodo: {
        Costo: 0,
        AjustePorRevaluacionesOReExpresiones: 0,
      },
    };

    calculateImporteNetoFinalPeriodoCosto(data);
    calculateImporteNetoFinalPeriodoAjustePorRevaluacion(data);

    // Verificar que ambos cálculos se hayan ejecutado correctamente
    expect(data.ImporteNetoAlFinalDelPeriodo.Costo).toBe(11000);
    expect(
      data.ImporteNetoAlFinalDelPeriodo.AjustePorRevaluacionesOReExpresiones
    ).toBe(2550);
  });

  it('debería manejar cálculos financieros e informativos en secuencia', () => {
    const data = {
      ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero: {
        SaldoAlComienzoDelPeriodo: 20000,
        IncrementosPorTransferenciasAdquisicionesYOtrosCambios: 5000,
        DisminucionesPorTransferenciasYOtrosCambios: 3000,
        DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo: 6000,
        SubtotalAlFinalPeriodo: 0,
        TotalNetoAlFinalDelPeriodo: 0,
      },
      DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero:
        {
          ValorTotalAlFinalDelPeriodo: 15000,
          DepreciacionYAmortizacionAcumuladaAlFinalDelPeriodo: 4000,
          ValorNetoAlFinalDelPeriodo: 0,
        },
    };

    calculateSubtotalAlFinalDelPeriodo(data);
    calculateTotalNetoAlFinalDelPeriodoFinanciero(data);
    calculateTotalNetoAlFinalDelPeriodoInformativo(data);

    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .SubtotalAlFinalPeriodo
    ).toBe(22000);
    expect(
      data.ValorTotalIncluyendoArrendamientoFinancieroOLeasingFinanciero
        .TotalNetoAlFinalDelPeriodo
    ).toBe(16000);
    expect(
      data
        .DatosInformativosValorActivosAdquiridosMedianteArrendamientoFinancieroOLeasingFinanciero
        .ValorNetoAlFinalDelPeriodo
    ).toBe(11000);
  });
});
