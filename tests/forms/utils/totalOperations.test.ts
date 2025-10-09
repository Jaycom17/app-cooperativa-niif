import { describe, it, expect } from 'vitest';
import {
  calculateTotals,
  calculateTotalsSources,
} from '../../../src/forms/utils/totalOperations';

describe('calculateTotals', () => {
  it('debería calcular totales con arrayPath de 2 niveles', () => {
    const data = {
      Nivel1: {
        Nivel2: {
          Item1: { valor: 100 },
          Item2: { valor: 200 },
          Total: { valor: 0 },
        },
      },
    };

    calculateTotals(['Nivel1', 'Nivel2'], data, 'Total', /^$/);

    expect(data.Nivel1.Nivel2.Total.valor).toBe(300);
  });

  it('debería calcular totales con arrayPath de 3 niveles', () => {
    const data = {
      Activos: {
        PropiedadesPlantaEquipo: {
          Terrenos: {
            Costo: { valor: 1000 },
            DepreciacionAcumulada: { valor: 200 },
            Total: { valor: 0 },
          },
        },
      },
    };

    calculateTotals(
      ['Activos', 'PropiedadesPlantaEquipo', 'Terrenos'],
      data,
      'Total',
      /^$/
    );

    expect(data.Activos.PropiedadesPlantaEquipo.Terrenos.Total.valor).toBe(1200);
  });

  it('debería restar valores que coinciden con regex (como DepreciacionAcumulada)', () => {
    const data = {
      Activos: {
        PropiedadesPlantaEquipo: {
          Terrenos: {
            Costo: { valor: 1000 },
            DepreciacionAcumulada: { valor: 200 },
            DeterioroAcumulado: { valor: 50 },
            Total: { valor: 0 },
          },
        },
      },
    };

    calculateTotals(
      ['Activos', 'PropiedadesPlantaEquipo', 'Terrenos'],
      data,
      'Total',
      /^(Depreciacion|Deterioro)/
    );

    // Costo no coincide -> suma: +1000
    // DepreciacionAcumulada coincide -> resta: -200
    // DeterioroAcumulado coincide -> resta: -50
    // Total: 1000 - 200 - 50 = 750
    expect(data.Activos.PropiedadesPlantaEquipo.Terrenos.Total.valor).toBe(750);
  });

  it('debería manejar objetos anidados en Total', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: {
            SubItem1: { valor: 100 },
            SubItem2: { valor: 50 },
          },
          Item2: {
            SubItem1: { valor: 200 },
            SubItem2: { valor: 75 },
          },
          Total: {
            SubItem1: { valor: 0 },
            SubItem2: { valor: 0 },
          },
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.SubItem1.valor).toBe(300);
    expect(data.Nivel1.Seccion.Total.SubItem2.valor).toBe(125);
  });

  it('debería buscar Total en niveles superiores si no existe en el path completo', () => {
    const data = {
      Nivel1: {
        Nivel2: {
          Nivel3: {
            Item1: { valor: 100 },
            Item2: { valor: 200 },
          },
        },
        Total: { valor: 0 },
      },
    };

    calculateTotals(['Nivel1', 'Nivel2', 'Nivel3'], data, 'Total', /^$/);

    // Debería encontrar Total en Nivel1 y sumar los items de Nivel3
    expect(data.Nivel1.Total.valor).toBe(300);
  });

  it('debería resetear valores existentes en Total antes de calcular', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Item2: { valor: 200 },
          Total: { valor: 999 },
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.valor).toBe(300);
  });

  it('debería manejar valores undefined y null como 0', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Item2: { valor: undefined },
          Item3: { valor: null },
          Total: { valor: 0 },
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.valor).toBe(100);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Item2: { valor: -30 },
          Item3: { valor: 50 },
          Total: { valor: 0 },
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.valor).toBe(120);
  });

  it('no debería hacer nada si no encuentra el totalLabel', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Item2: { valor: 200 },
        },
      },
    };

    expect(() =>
      calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/)
    ).not.toThrow();
  });

  it('no debería hacer nada si el total es null', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Total: null,
        },
      },
    };

    expect(() =>
      calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/)
    ).not.toThrow();
    expect(data.Nivel1.Seccion.Total).toBeNull();
  });

  it('no debería hacer nada si no existe el globalElement', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
        },
      },
    };

    expect(() =>
      calculateTotals(['Nivel1', 'SeccionInexistente'], data, 'Total', /^$/)
    ).not.toThrow();
  });

  it('debería manejar múltiples propiedades en los objetos', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor1: 100, valor2: 50 },
          Item2: { valor1: 200, valor2: 75 },
          Total: { valor1: 0, valor2: 0 },
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.valor1).toBe(300);
    expect(data.Nivel1.Seccion.Total.valor2).toBe(125);
  });

  it('debería aplicar regex correctamente con múltiples elementos que coinciden', () => {
    const data = {
      Nivel1: {
        Patrimonio: {
          Capital: { valor: 1000 },
          ReservasLegales: { valor: 200 },
          PerdidasAcumuladas: { valor: 150 },
          PerdidasORI: { valor: 50 },
          Total: { valor: 0 },
        },
      },
    };

    calculateTotals(['Nivel1', 'Patrimonio'], data, 'Total', /^Perdidas/);

    // Capital: +1000, ReservasLegales: +200, PerdidasAcumuladas: -150, PerdidasORI: -50
    // Total: 1000 + 200 - 150 - 50 = 1000
    expect(data.Nivel1.Patrimonio.Total.valor).toBe(1000);
  });

  it('debería manejar objetos profundamente anidados', () => {
    const data = {
      Nivel0: {
        Seccion: {
          Item1: {
            Nivel1: {
              Nivel2: {
                valor: 100,
              },
            },
          },
          Total: {
            Nivel1: {
              Nivel2: {
                valor: 0,
              },
            },
          },
        },
      },
    };

    calculateTotals(['Nivel0', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel0.Seccion.Total.Nivel1.Nivel2.valor).toBe(100);
  });

  it('debería ignorar propiedades no numéricas', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100, texto: 'test', bool: true },
          Item2: { valor: 200, texto: 'test2', bool: false },
          Total: { valor: 0, texto: '', bool: false },
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.valor).toBe(300);
    expect(data.Nivel1.Seccion.Total.texto).toBe('');
    expect(data.Nivel1.Seccion.Total.bool).toBe(false);
  });

  it('debería excluir el Total del cálculo (no sumarse a sí mismo)', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Item2: { valor: 200 },
          Total: { valor: 50 }, // Este valor debe ser reseteado y no sumarse
        },
      },
    };

    calculateTotals(['Nivel1', 'Seccion'], data, 'Total', /^$/);

    expect(data.Nivel1.Seccion.Total.valor).toBe(300); // No 350
  });

  it('debería funcionar con regex por defecto que resta todo', () => {
    const data = {
      Nivel1: {
        Seccion: {
          Item1: { valor: 100 },
          Item2: { valor: 200 },
          Total: { valor: 0 },
        },
      },
    };

    // Sin especificar regex, usa /./ por defecto que coincide con todo
    calculateTotals(['Nivel1', 'Seccion'], data, 'Total');

    // Con regex por defecto, todo coincide, entonces resta: 0 - 100 - 200 = -300
    expect(data.Nivel1.Seccion.Total.valor).toBe(-300);
  });

  it('caso real: Estados Financieros con DepreciacionAcumulada', () => {
    const data = {
      Activos: {
        PropiedadesPlantaEquipo: {
          Terrenos: {
            Costo: { ValorFiscal: 5000000 },
            AjustePorRevaluacion: { ValorFiscal: 500000 },
            DepreciacionAcumulada: { ValorFiscal: 1000000 },
            Total: { ValorFiscal: 0 },
          },
        },
      },
    };

    calculateTotals(
      ['Activos', 'PropiedadesPlantaEquipo', 'Terrenos'],
      data,
      'Total',
      /^DepreciacionAcumulada/
    );

    // Costo: +5000000, AjustePorRevaluacion: +500000, DepreciacionAcumulada: -1000000
    // Total: 5000000 + 500000 - 1000000 = 4500000
    expect(data.Activos.PropiedadesPlantaEquipo.Terrenos.Total.ValorFiscal).toBe(4500000);
  });
});

describe('calculateTotalsSources', () => {
  it('debería calcular totales desde múltiples fuentes', () => {
    const data = {
      Total: { valor: 0 },
    };

    const sources = [{ valor: 100 }, { valor: 200 }, { valor: 50 }];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(350);
  });

  it('debería calcular totales con objetos anidados en las fuentes', () => {
    const data = {
      Total: {
        SubItem1: { valor: 0 },
        SubItem2: { valor: 0 },
      },
    };

    const sources = [
      { SubItem1: { valor: 100 }, SubItem2: { valor: 50 } },
      { SubItem1: { valor: 200 }, SubItem2: { valor: 75 } },
    ];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.SubItem1.valor).toBe(300);
    expect(data.Total.SubItem2.valor).toBe(125);
  });

  it('debería resetear valores existentes en total antes de calcular', () => {
    const data = {
      Total: { valor: 999 },
    };

    const sources = [{ valor: 100 }, { valor: 200 }];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(300);
  });

  it('debería manejar valores undefined y null como 0', () => {
    const data = {
      Total: { valor: 0 },
    };

    const sources = [{ valor: 100 }, { valor: undefined }, { valor: null }];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(100);
  });

  it('debería manejar valores negativos correctamente', () => {
    const data = {
      Total: { valor: 0 },
    };

    const sources = [{ valor: 100 }, { valor: -30 }, { valor: 50 }];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(120);
  });

  it('no debería hacer nada si data es undefined o null', () => {
    expect(() => calculateTotalsSources(undefined, [], 'Total')).not.toThrow();
    expect(() => calculateTotalsSources(null, [], 'Total')).not.toThrow();
  });

  it('no debería hacer nada si sources no es un array', () => {
    const data = {
      Total: { valor: 0 },
    };

    expect(() =>
      calculateTotalsSources(data, null as any, 'Total')
    ).not.toThrow();
    expect(() =>
      calculateTotalsSources(data, undefined as any, 'Total')
    ).not.toThrow();
    expect(() =>
      calculateTotalsSources(data, {} as any, 'Total')
    ).not.toThrow();
  });

  it('no debería hacer nada si sources es un array vacío', () => {
    const data = {
      Total: { valor: 999 },
    };

    calculateTotalsSources(data, [], 'Total');

    expect(data.Total.valor).toBe(999);
  });

  it('no debería hacer nada si totalLabel no existe en data', () => {
    const data = {
      OtraCosa: { valor: 100 },
    };

    const sources = [{ valor: 100 }];

    expect(() =>
      calculateTotalsSources(data, sources, 'Total')
    ).not.toThrow();
  });

  it('debería ignorar fuentes que no sean objetos', () => {
    const data = {
      Total: { valor: 0 },
    };

    const sources = [{ valor: 100 }, null, undefined, 'string', 123, { valor: 200 }];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(300);
  });

  it('debería manejar múltiples propiedades en las fuentes', () => {
    const data = {
      Total: { valor1: 0, valor2: 0 },
    };

    const sources = [
      { valor1: 100, valor2: 50 },
      { valor1: 200, valor2: 75 },
    ];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor1).toBe(300);
    expect(data.Total.valor2).toBe(125);
  });

  it('debería manejar objetos profundamente anidados', () => {
    const data = {
      Total: {
        Nivel1: {
          Nivel2: {
            valor: 0,
          },
        },
      },
    };

    const sources = [
      { Nivel1: { Nivel2: { valor: 100 } } },
      { Nivel1: { Nivel2: { valor: 200 } } },
    ];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.Nivel1.Nivel2.valor).toBe(300);
  });

  it('debería ignorar propiedades no numéricas en las fuentes', () => {
    const data = {
      Total: { valor: 0, texto: '', bool: false },
    };

    const sources = [
      { valor: 100, texto: 'test', bool: true },
      { valor: 200, texto: 'test2', bool: false },
    ];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(300);
    expect(data.Total.texto).toBe('');
    expect(data.Total.bool).toBe(false);
  });

  it('debería manejar fuentes con estructuras parcialmente coincidentes', () => {
    const data = {
      Total: {
        valor1: 0,
        valor2: 0,
        valor3: 0,
      },
    };

    const sources = [
      { valor1: 100, valor2: 50 },
      { valor2: 75, valor3: 25 },
      { valor1: 200 },
    ];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor1).toBe(300);
    expect(data.Total.valor2).toBe(125);
    expect(data.Total.valor3).toBe(25);
  });

  it('debería sumar correctamente con un solo source', () => {
    const data = {
      Total: { valor: 0 },
    };

    const sources = [{ valor: 500 }];

    calculateTotalsSources(data, sources, 'Total');

    expect(data.Total.valor).toBe(500);
  });
});

describe('Integración calculateTotals y calculateTotalsSources', () => {
  it('debería funcionar correctamente cuando se usan ambas funciones en secuencia', () => {
    const data = {
      Nivel1: {
        Seccion1: {
          Item1: { valor: 100 },
          Item2: { valor: 200 },
          Total: { valor: 0 },
        },
        Seccion2: {
          Total: { valor: 0 },
        },
      },
      TotalGeneral: { valor: 0 },
    };

    // Primero calcular totales de Seccion1
    calculateTotals(['Nivel1', 'Seccion1'], data, 'Total', /^$/);

    // Luego usar los totales como fuentes para TotalGeneral
    calculateTotalsSources(
      data,
      [data.Nivel1.Seccion1.Total, { valor: 50 }],
      'TotalGeneral'
    );

    expect(data.Nivel1.Seccion1.Total.valor).toBe(300);
    expect(data.TotalGeneral.valor).toBe(350);
  });
});
