import { describe, it, expect } from 'vitest';
import {
  calculateSaldosFiscalesParciales,
  calculateTotalSaldos,
} from '../../../src/forms/utils/DetalleReng';

describe('calculateSaldosFiscalesParciales', () => {
  describe('cuando recibe un array', () => {
    it('debería calcular los saldos fiscales para cada elemento del array', () => {
      const data = [
        {
          SaldosContablesADiciembre31Parciales: 1000,
          AjustesParaLlegarASaldosFiscales1: 200,
          AjustesParaLlegarASaldosFiscales3: 100,
          SaldosFiscalesADiciembre31Parciales: 0,
        },
        {
          SaldosContablesADiciembre31Parciales: 2000,
          AjustesParaLlegarASaldosFiscales1: 300,
          AjustesParaLlegarASaldosFiscales3: 50,
          SaldosFiscalesADiciembre31Parciales: 0,
        },
      ];

      calculateSaldosFiscalesParciales(data);

      // 1000 + 200 - 100 = 1100
      expect(data[0].SaldosFiscalesADiciembre31Parciales).toBe(1100);
      // 2000 + 300 - 50 = 2250
      expect(data[1].SaldosFiscalesADiciembre31Parciales).toBe(2250);
    });

    it('debería manejar valores undefined como 0 en arrays', () => {
      const data = [
        {
          SaldosContablesADiciembre31Parciales: 1000,
          SaldosFiscalesADiciembre31Parciales: 0,
        },
        {
          AjustesParaLlegarASaldosFiscales1: 500,
          SaldosFiscalesADiciembre31Parciales: 0,
        },
      ];

      calculateSaldosFiscalesParciales(data);

      expect(data[0].SaldosFiscalesADiciembre31Parciales).toBe(1000);
      expect(data[1].SaldosFiscalesADiciembre31Parciales).toBe(500);
    });
  });

  describe('cuando recibe un objeto', () => {
    it('debería calcular correctamente con todos los valores presentes', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: 5000,
        AjustesParaLlegarASaldosFiscales1: 1000,
        AjustesParaLlegarASaldosFiscales3: 500,
        SaldosFiscalesADiciembre31Parciales: 0,
      };

      calculateSaldosFiscalesParciales(data);

      // 5000 + 1000 - 500 = 5500
      expect(data.SaldosFiscalesADiciembre31Parciales).toBe(5500);
    });

    it('debería manejar valores undefined como 0', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: 3000,
        SaldosFiscalesADiciembre31Parciales: 0,
      };

      calculateSaldosFiscalesParciales(data);

      // 3000 + 0 - 0 = 3000
      expect(data.SaldosFiscalesADiciembre31Parciales).toBe(3000);
    });

    it('debería manejar valores negativos correctamente', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: 1000,
        AjustesParaLlegarASaldosFiscales1: -200,
        AjustesParaLlegarASaldosFiscales3: 300,
        SaldosFiscalesADiciembre31Parciales: 0,
      };

      calculateSaldosFiscalesParciales(data);

      // 1000 + (-200) - 300 = 500
      expect(data.SaldosFiscalesADiciembre31Parciales).toBe(500);
    });

    it('no debería hacer nada si SaldosFiscalesADiciembre31Parciales es null', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: 1000,
        AjustesParaLlegarASaldosFiscales1: 200,
        SaldosFiscalesADiciembre31Parciales: null,
      };

      calculateSaldosFiscalesParciales(data);

      expect(data.SaldosFiscalesADiciembre31Parciales).toBeNull();
    });

    it('no debería hacer nada si todos los valores necesarios son null', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: null,
        AjustesParaLlegarASaldosFiscales1: null,
        AjustesParaLlegarASaldosFiscales3: null,
        SaldosFiscalesADiciembre31Parciales: 0,
      };

      calculateSaldosFiscalesParciales(data);

      expect(data.SaldosFiscalesADiciembre31Parciales).toBe(0);
    });
  });

  describe('casos especiales', () => {
    it('debería manejar data undefined', () => {
      expect(() => calculateSaldosFiscalesParciales(undefined)).not.toThrow();
    });

    it('debería manejar un array vacío', () => {
      const data: any[] = [];
      expect(() => calculateSaldosFiscalesParciales(data)).not.toThrow();
      expect(data).toEqual([]);
    });

    it('debería calcular correctamente cuando el resultado es 0', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: 500,
        AjustesParaLlegarASaldosFiscales1: 100,
        AjustesParaLlegarASaldosFiscales3: 600,
        SaldosFiscalesADiciembre31Parciales: 0,
      };

      calculateSaldosFiscalesParciales(data);

      // 500 + 100 - 600 = 0
      expect(data.SaldosFiscalesADiciembre31Parciales).toBe(0);
    });

    it('debería calcular correctamente cuando el resultado es negativo', () => {
      const data = {
        SaldosContablesADiciembre31Parciales: 500,
        AjustesParaLlegarASaldosFiscales1: 100,
        AjustesParaLlegarASaldosFiscales3: 800,
        SaldosFiscalesADiciembre31Parciales: 0,
      };

      calculateSaldosFiscalesParciales(data);

      // 500 + 100 - 800 = -200
      expect(data.SaldosFiscalesADiciembre31Parciales).toBe(-200);
    });
  });
});

describe('calculateTotalSaldos', () => {
  it('debería calcular totales contables y fiscales para un nivel con datos simples', () => {
    const data = {
      Renglon36: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 1000,
          SaldosFiscalesADiciembre31Parciales: 1100,
        },
        Item2: {
          SaldosContablesADiciembre31Parciales: 2000,
          SaldosFiscalesADiciembre31Parciales: 2200,
        },
        TotalSaldosContablesADiciembre31: 0,
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon36');

    expect(data.Renglon36.TotalSaldosContablesADiciembre31).toBe(3000);
    expect(data.Renglon36.TotalSaldosFiscalesADiciembre31).toBe(3300);
  });

  it('debería calcular totales con objetos anidados', () => {
    const data = {
      Renglon40: {
        Seccion1: {
          SubItem1: {
            SaldosContablesADiciembre31Parciales: 500,
            SaldosFiscalesADiciembre31Parciales: 550,
          },
          SubItem2: {
            SaldosContablesADiciembre31Parciales: 300,
            SaldosFiscalesADiciembre31Parciales: 330,
          },
        },
        Seccion2: {
          SaldosContablesADiciembre31Parciales: 1000,
          SaldosFiscalesADiciembre31Parciales: 1100,
        },
        TotalSaldosContablesADiciembre31: 0,
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon40');

    expect(data.Renglon40.TotalSaldosContablesADiciembre31).toBe(1800);
    expect(data.Renglon40.TotalSaldosFiscalesADiciembre31).toBe(1980);
  });

  it('debería manejar valores undefined como 0', () => {
    const data = {
      Renglon37: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 1000,
        },
        Item2: {
          SaldosFiscalesADiciembre31Parciales: 500,
        },
        TotalSaldosContablesADiciembre31: 0,
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon37');

    expect(data.Renglon37.TotalSaldosContablesADiciembre31).toBe(1000);
    expect(data.Renglon37.TotalSaldosFiscalesADiciembre31).toBe(500);
  });

  it('debería ignorar renglones en la lista de excepciones', () => {
    const data = {
      Renglon46: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 1000,
          SaldosFiscalesADiciembre31Parciales: 1100,
        },
        TotalSaldosContablesADiciembre31: 0,
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon46');

    // No debería calcular porque Renglon46 está en excepciones
    expect(data.Renglon46.TotalSaldosContablesADiciembre31).toBe(0);
    expect(data.Renglon46.TotalSaldosFiscalesADiciembre31).toBe(0);
  });

  it('no debería hacer nada si data es undefined', () => {
    expect(() => calculateTotalSaldos(undefined, 'Renglon36')).not.toThrow();
  });

  it('no debería hacer nada si currentLevel no existe en data', () => {
    const data = {
      Renglon36: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 1000,
        },
      },
    };

    expect(() =>
      calculateTotalSaldos(data, 'RenglonInexistente')
    ).not.toThrow();
  });

  it('no debería hacer nada si no hay labels de total contable ni fiscal', () => {
    const data = {
      Renglon50: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 1000,
          SaldosFiscalesADiciembre31Parciales: 1100,
        },
        // No hay TotalSaldosContablesADiciembre31 ni TotalSaldosFiscalesADiciembre31
        OtroTotal: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon50');

    // No debería modificar nada
    expect(data.Renglon50.OtroTotal).toBe(0);
  });

  it('debería calcular solo el total contable si solo existe ese label', () => {
    const data: any = {
      Renglon60: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 500,
          SaldosFiscalesADiciembre31Parciales: 550,
        },
        Item2: {
          SaldosContablesADiciembre31Parciales: 300,
          SaldosFiscalesADiciembre31Parciales: 330,
        },
        TotalSaldosContablesADiciembre31: 0,
        // No hay TotalSaldosFiscalesADiciembre31
      },
    };

    calculateTotalSaldos(data, 'Renglon60');

    expect(data.Renglon60.TotalSaldosContablesADiciembre31).toBe(800);
    expect(data.Renglon60.TotalSaldosFiscalesADiciembre31).toBeUndefined();
  });

  it('debería calcular solo el total fiscal si solo existe ese label', () => {
    const data: any = {
      Renglon70: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 500,
          SaldosFiscalesADiciembre31Parciales: 550,
        },
        Item2: {
          SaldosContablesADiciembre31Parciales: 300,
          SaldosFiscalesADiciembre31Parciales: 330,
        },
        // No hay TotalSaldosContablesADiciembre31
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon70');

    expect(data.Renglon70.TotalSaldosContablesADiciembre31).toBeUndefined();
    expect(data.Renglon70.TotalSaldosFiscalesADiciembre31).toBe(880);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      Renglon80: {
        Item1: {
          SaldosContablesADiciembre31Parciales: 1000,
          SaldosFiscalesADiciembre31Parciales: 1100,
        },
        Item2: {
          SaldosContablesADiciembre31Parciales: -500,
          SaldosFiscalesADiciembre31Parciales: -300,
        },
        TotalSaldosContablesADiciembre31: 0,
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon80');

    expect(data.Renglon80.TotalSaldosContablesADiciembre31).toBe(500);
    expect(data.Renglon80.TotalSaldosFiscalesADiciembre31).toBe(800);
  });

  it('debería calcular correctamente con múltiples niveles de anidamiento', () => {
    const data = {
      Renglon90: {
        Nivel1: {
          Nivel2: {
            Nivel3: {
              SaldosContablesADiciembre31Parciales: 100,
              SaldosFiscalesADiciembre31Parciales: 110,
            },
          },
          SaldosContablesADiciembre31Parciales: 200,
          SaldosFiscalesADiciembre31Parciales: 220,
        },
        Otro: {
          SaldosContablesADiciembre31Parciales: 300,
          SaldosFiscalesADiciembre31Parciales: 330,
        },
        TotalSaldosContablesADiciembre31: 0,
        TotalSaldosFiscalesADiciembre31: 0,
      },
    };

    calculateTotalSaldos(data, 'Renglon90');

    // 100 + 200 + 300 = 600
    expect(data.Renglon90.TotalSaldosContablesADiciembre31).toBe(600);
    // 110 + 220 + 330 = 660
    expect(data.Renglon90.TotalSaldosFiscalesADiciembre31).toBe(660);
  });
});
