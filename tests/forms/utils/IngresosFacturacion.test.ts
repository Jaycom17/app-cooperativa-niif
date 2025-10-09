import { describe, expect, it } from 'vitest';
import {
  calculateSaldofinalPeriodo,
  calculateValorTotalFacturacion,
  calculateValorTotalIngresoContable,
} from '../../../src/forms/utils/IngresosFacturacion';

describe('IngresosFacturacion - calculateSaldofinalPeriodo', () => {
  it('debería calcular el saldo al final del periodo correctamente', () => {
    const data = {
      PasivoPorIngresoDiferido: {
        SaldoAlInicioDelPeriodo: 10000,
        RegistradoComoIngresoContableEnElPeriodo: 3000,
        GeneradoEnElPeriodo: 5000,
        SaldoAlFinalDelPeriodo: 0,
      },
    };

    calculateSaldofinalPeriodo(data);

    // SaldoAlFinalDelPeriodo = SaldoAlInicioDelPeriodo - RegistradoComoIngresoContableEnElPeriodo + GeneradoEnElPeriodo
    // = 10000 - 3000 + 5000 = 12000
    expect(data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo).toBe(12000);
  });

  it('debería manejar valores undefined usando el operador OR', () => {
    const data = {
      PasivoPorIngresoDiferido: {
        SaldoAlFinalDelPeriodo: 0,
      },
    };

    calculateSaldofinalPeriodo(data);

    // Todos los valores son undefined, se convierten a 0
    // = 0 - 0 + 0 = 0
    expect(data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo).toBe(0);
  });

  it('debería manejar valores parcialmente undefined', () => {
    const data = {
      PasivoPorIngresoDiferido: {
        SaldoAlInicioDelPeriodo: 8000,
        GeneradoEnElPeriodo: 2000,
        SaldoAlFinalDelPeriodo: 0,
      },
    };

    calculateSaldofinalPeriodo(data);

    // SaldoAlFinalDelPeriodo = 8000 - 0 + 2000 = 10000
    expect(data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo).toBe(10000);
  });

  it('no debería calcular si PasivoPorIngresoDiferido no existe', () => {
    const data = {};

    calculateSaldofinalPeriodo(data);

    // No debería agregar la propiedad si no existe
    expect(data).toEqual({});
  });

  it('no debería calcular si SaldoAlFinalDelPeriodo es null', () => {
    const data = {
      PasivoPorIngresoDiferido: {
        SaldoAlInicioDelPeriodo: 5000,
        SaldoAlFinalDelPeriodo: null,
      },
    };

    calculateSaldofinalPeriodo(data);

    // No debería modificar el valor si es null
    expect(data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo).toBeNull();
  });

  it('no debería calcular si SaldoAlFinalDelPeriodo es undefined', () => {
    const data = {
      PasivoPorIngresoDiferido: {
        SaldoAlInicioDelPeriodo: 5000,
      },
    } as any;

    calculateSaldofinalPeriodo(data);

    // No debería agregar la propiedad si no existe
    expect(data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo).toBeUndefined();
  });

  it('debería manejar números negativos correctamente', () => {
    const data = {
      PasivoPorIngresoDiferido: {
        SaldoAlInicioDelPeriodo: 5000,
        RegistradoComoIngresoContableEnElPeriodo: 8000,
        GeneradoEnElPeriodo: 1000,
        SaldoAlFinalDelPeriodo: 0,
      },
    };

    calculateSaldofinalPeriodo(data);

    // SaldoAlFinalDelPeriodo = 5000 - 8000 + 1000 = -2000
    expect(data.PasivoPorIngresoDiferido.SaldoAlFinalDelPeriodo).toBe(-2000);
  });
});

describe('IngresosFacturacion - calculateValorTotalFacturacion', () => {
  it('debería calcular el valor total de facturación correctamente', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresoEnPeriodosAnteriores: 1000,
        DevengadaComoIngresosDelPeriodo: 2000,
        RegistradaComoIngresoDiferido: 500,
        SoloFacturadoNoHaGeneradoIngresoNiPasivoDiferido: 300,
        ValorTotal: 0,
      },
    };

    calculateValorTotalFacturacion(data);

    // ValorTotal = DevengadaComoIngresoEnPeriodosAnteriores + DevengadaComoIngresosDelPeriodo + 
    //              RegistradaComoIngresoDiferido + SoloFacturadoNoHaGeneradoIngresoNiPasivoDiferido
    // = 1000 + 2000 + 500 + 300 = 3800
    expect(data.FacturacionEmitidaEnElPeriodo.ValorTotal).toBe(3800);
  });

  it('debería manejar valores undefined usando el operador OR', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        ValorTotal: 0,
      },
    };

    calculateValorTotalFacturacion(data);

    // Todos los valores son undefined, se convierten a 0
    // = 0 + 0 + 0 + 0 = 0
    expect(data.FacturacionEmitidaEnElPeriodo.ValorTotal).toBe(0);
  });

  it('debería manejar valores parcialmente undefined', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresoEnPeriodosAnteriores: 3000,
        RegistradaComoIngresoDiferido: 1500,
        ValorTotal: 0,
      },
    };

    calculateValorTotalFacturacion(data);

    // ValorTotal = 3000 + 0 + 1500 + 0 = 4500
    expect(data.FacturacionEmitidaEnElPeriodo.ValorTotal).toBe(4500);
  });

  it('no debería calcular si FacturacionEmitidaEnElPeriodo no existe', () => {
    const data = {};

    calculateValorTotalFacturacion(data);

    // No debería agregar la propiedad si no existe
    expect(data).toEqual({});
  });

  it('no debería calcular si ValorTotal es null', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresoEnPeriodosAnteriores: 1000,
        ValorTotal: null,
      },
    };

    calculateValorTotalFacturacion(data);

    // No debería modificar el valor si es null
    expect(data.FacturacionEmitidaEnElPeriodo.ValorTotal).toBeNull();
  });

  it('no debería calcular si ValorTotal es undefined', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresoEnPeriodosAnteriores: 1000,
      },
    } as any;

    calculateValorTotalFacturacion(data);

    // No debería agregar la propiedad si no existe
    expect(data.FacturacionEmitidaEnElPeriodo.ValorTotal).toBeUndefined();
  });

  it('debería manejar todos los componentes con valores altos', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresoEnPeriodosAnteriores: 50000,
        DevengadaComoIngresosDelPeriodo: 75000,
        RegistradaComoIngresoDiferido: 10000,
        SoloFacturadoNoHaGeneradoIngresoNiPasivoDiferido: 5000,
        ValorTotal: 0,
      },
    };

    calculateValorTotalFacturacion(data);

    // ValorTotal = 50000 + 75000 + 10000 + 5000 = 140000
    expect(data.FacturacionEmitidaEnElPeriodo.ValorTotal).toBe(140000);
  });
});

describe('IngresosFacturacion - calculateValorTotalIngresoContable', () => {
  it('debería calcular el valor total de ingreso contable correctamente', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 1000,
        FacturadoPeriodosAnteriores: 2000,
        ValorTotal: 0,
      },
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 3000,
      },
    };

    calculateValorTotalIngresoContable(data);

    // ValorTotal = SinFacturar + FacturadoPeriodosAnteriores + DevengadaComoIngresosDelPeriodo
    // = 1000 + 2000 + 3000 = 6000
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBe(6000);
  });

  it('debería manejar valores undefined usando el operador OR', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        ValorTotal: 0,
      },
      FacturacionEmitidaEnElPeriodo: {},
    };

    calculateValorTotalIngresoContable(data);

    // Todos los valores son undefined, se convierten a 0
    // = 0 + 0 + 0 = 0
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBe(0);
  });

  it('debería manejar valores parcialmente undefined', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 5000,
        ValorTotal: 0,
      },
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 3000,
      },
    };

    calculateValorTotalIngresoContable(data);

    // ValorTotal = 5000 + 0 + 3000 = 8000
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBe(8000);
  });

  it('no debería calcular si IngresoContableDevengadoEnElPeriodo no existe', () => {
    const data = {
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 1000,
      },
    };

    calculateValorTotalIngresoContable(data);

    // No debería agregar la propiedad si no existe
    expect(data).not.toHaveProperty('IngresoContableDevengadoEnElPeriodo');
  });

  it('no debería calcular si ValorTotal es null', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 1000,
        ValorTotal: null,
      },
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 2000,
      },
    };

    calculateValorTotalIngresoContable(data);

    // No debería modificar el valor si es null
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBeNull();
  });

  it('no debería calcular si ValorTotal es undefined', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 1000,
      },
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 2000,
      },
    } as any;

    calculateValorTotalIngresoContable(data);

    // No debería agregar la propiedad si no existe
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBeUndefined();
  });

  it('debería usar DevengadaComoIngresosDelPeriodo de FacturacionEmitidaEnElPeriodo', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 2000,
        FacturadoPeriodosAnteriores: 3000,
        ValorTotal: 0,
      },
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 5000,
      },
    };

    calculateValorTotalIngresoContable(data);

    // Verifica que usa el valor de FacturacionEmitidaEnElPeriodo
    // ValorTotal = 2000 + 3000 + 5000 = 10000
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBe(10000);
  });

  it('debería lanzar error cuando FacturacionEmitidaEnElPeriodo no existe', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 4000,
        FacturadoPeriodosAnteriores: 1000,
        ValorTotal: 0,
      },
    };

    // El código tiene un bug: usa data?.FacturacionEmitidaEnElPeriodo.DevengadaComoIngresosDelPeriodo
    // que lanza error cuando FacturacionEmitidaEnElPeriodo es undefined
    // Debería ser: data?.FacturacionEmitidaEnElPeriodo?.DevengadaComoIngresosDelPeriodo
    expect(() => calculateValorTotalIngresoContable(data)).toThrow(
      "Cannot read properties of undefined (reading 'DevengadaComoIngresosDelPeriodo')"
    );
  });

  it('debería calcular correctamente con valores altos', () => {
    const data = {
      IngresoContableDevengadoEnElPeriodo: {
        SinFacturar: 100000,
        FacturadoPeriodosAnteriores: 50000,
        ValorTotal: 0,
      },
      FacturacionEmitidaEnElPeriodo: {
        DevengadaComoIngresosDelPeriodo: 75000,
      },
    };

    calculateValorTotalIngresoContable(data);

    // ValorTotal = 100000 + 50000 + 75000 = 225000
    expect(data.IngresoContableDevengadoEnElPeriodo.ValorTotal).toBe(225000);
  });
});
