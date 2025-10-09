/**
 * ============================================================================
 * SUITE DE PRUEBAS: RentaLiquidaForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/RentaLiquida.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Renta Líquida,
 * que realiza cálculos iniciales, guarda automáticamente y ejecuta múltiples
 * cálculos encadenados al hacer cambios.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial con cálculos previos y guardado
 * 2. Múltiples cálculos encadenados en handleChange
 * 3. Auto-guardado con debounce
 * 4. Estados de guardado
 * 5. Manejo de errores
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import RentaLiquidaForm from "../../../src/forms/pages/RentaLiquida";

const mockData = {
  Ingresos: {
    TotalIngresos: {
      MayorValorFiscalPorReconocimientoExencionesLimitaciones: 0,
      ValorFiscal: 0,
      TarifaDel9Porciento: 0,
    },
    MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional: {
      MayorValorFiscalPorReconocimientoExencionesLimitaciones: 0,
      ValorFiscal: 0,
      TarifaDel9Porciento: 0,
    },
    IngresosPorRendimientosFinancieros: {},
    DividendosYParticipaciones: {},
    OtrosIngresos: {},
    GananciasNetasEnOperacionesDiscontinuas: 0,
  },
  InventarioFinal: {
    Total: 200,
  },
  DiferenciasTemporalesDeducibles: {},
  DiferenciasTemporalesImponibles: {},
  OtrasDiferenciasTemporales: {},
  Autorretenciones: {},
  OtrasRetenciones: {},
  IngresoImpuestoDiferido: {},
};

const mockApiResponse = {
  data: {
    renContent: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/rentaLiquida.service", () => ({
  RentaLiquidaService: {
    getRentaLiquidaForStudent: () => mockGetData(),
    updateRentaLiquidaForStudent: (data: any) => mockUpdateData(data),
  },
}));

const mockCalculateOtras = vi.fn();
const mockCalculateValorFiscalSolicitado = vi.fn();
const mockCalculatedValorFiscal = vi.fn();
const mockCalculateAllPartOne = vi.fn();
const mockCalculateAllPartTwo = vi.fn();
const mockCalculateFirstValorFiscal = vi.fn();
const mockCalculateTotals = vi.fn();

vi.mock("@/forms/utils/RentaLiquida", () => ({
  config: {},
  calculateOtras: (element: any) => {
    mockCalculateOtras(element);
    return element;
  },
  calculateValorFiscalSolicitado: (element: any) => {
    mockCalculateValorFiscalSolicitado(element);
    return element;
  },
  calculatedValorFiscal: (element: any) => {
    mockCalculatedValorFiscal(element);
    return element;
  },
  calculateAllPartOne: (data: any) => {
    mockCalculateAllPartOne(data);
    return data;
  },
  calculateAllPartTwo: (data: any) => {
    mockCalculateAllPartTwo(data);
    return data;
  },
  calculateFirstValorFiscal: (...args: any[]) => {
    mockCalculateFirstValorFiscal(...args);
    return args[0]; // Return the data object
  },
}));

const mockCalculateTotalsSources = vi.fn();

vi.mock("@/forms/utils/totalOperations", () => ({
  calculateTotals: (...args: any[]) => mockCalculateTotals(...args),
  calculateTotalsSources: (...args: any[]) => mockCalculateTotalsSources(...args),
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange }: any) => (
    <div data-testid="form-render">
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, updated: true }, "rentaLiquida.ingresos")}
      >
        Trigger Change
      </button>
    </div>
  ),
}));

vi.mock("@/components/templates/StudentLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="student-layout">{children}</div>,
}));

vi.mock("@/forms/components/atoms/Loading", () => ({
  __esModule: true,
  default: ({ saveStatus }: any) => <div data-testid="loading-status">{saveStatus}</div>,
}));

vi.mock("@/forms/utils/mergeDeep", () => ({
  mergeDeepPreservingOrder: (base: any, data: any) => ({ ...base, ...data }),
}));

vi.mock("@/forms/models/RentaLiquidaJson", () => ({
  RentaLiquidaInput: {},
}));

describe("RentaLiquidaForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetData.mockResolvedValue(mockApiResponse);
    mockUpdateData.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Carga inicial con cálculos previos y guardado", () => {
    it("carga los datos y ejecuta cálculos iniciales", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1);
        expect(mockCalculateFirstValorFiscal).toHaveBeenCalled();
      });
    });

    it("guarda automáticamente después de cargar y calcular", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
        expect(mockUpdateData).toHaveBeenCalledTimes(1);
      });
    });

    it("maneja errores al cargar datos", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockGetData.mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Error en la llamada a la API",
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Manejo de cambios con múltiples cálculos encadenados", () => {
    it("ejecuta todos los cálculos necesarios al hacer cambios", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockCalculatedValorFiscal.mockClear();
      mockCalculateValorFiscalSolicitado.mockClear();
      mockCalculateOtras.mockClear();
      mockCalculateTotals.mockClear();
      mockCalculateAllPartOne.mockClear();
      mockCalculateAllPartTwo.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockCalculatedValorFiscal).toHaveBeenCalled();
      expect(mockCalculateValorFiscalSolicitado).toHaveBeenCalled();
      expect(mockCalculateOtras).toHaveBeenCalled();
      expect(mockCalculateTotals).toHaveBeenCalled();
      expect(mockCalculateAllPartOne).toHaveBeenCalled();
      expect(mockCalculateAllPartTwo).toHaveBeenCalled();
    });

    it("ejecuta múltiples calculateTotals para diferentes totales", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockCalculateTotals.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Verifica que calculateTotals se llame múltiples veces para diferentes totales
      expect(mockCalculateTotals).toHaveBeenCalled();
      expect(mockCalculateTotals.mock.calls.length).toBeGreaterThan(1);
    });

    it("cambia el estado a 'saving' después de un cambio", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saving");
      });
    });
  });

  describe("Auto-guardado con debounce", () => {
    it("no guarda inmediatamente después de un cambio", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockUpdateData.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockUpdateData).not.toHaveBeenCalled();
    });

    it("guarda los datos después de 5 segundos", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockUpdateData.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await waitFor(
        () => {
          expect(mockUpdateData).toHaveBeenCalled();
        },
        { timeout: 7000 }
      );
    }, 8000);

    it("cancela el guardado anterior si hay un nuevo cambio antes de 5 segundos", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      // Esperar a que termine el guardado inicial (si existe)
      await new Promise((resolve) => setTimeout(resolve, 6000));

      // Limpiar el mock después del guardado inicial
      mockUpdateData.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer cambio
      triggerButton.click();

      // Esperar 3 segundos (menos que los 5 del debounce)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Verificar que no se ha guardado aún
      expect(mockUpdateData).not.toHaveBeenCalled();

      // Segundo cambio (reinicia el debounce)
      triggerButton.click();

      // Esperar 3 segundos más (total 6s desde el primer click, pero solo 3s desde el segundo)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Aún no debe haber guardado
      expect(mockUpdateData).not.toHaveBeenCalled();

      // Esperar 3 segundos más para completar los 5s desde el segundo click
      await waitFor(
        () => {
          expect(mockUpdateData).toHaveBeenCalledTimes(1);
        },
        { timeout: 3500 }
      );
    }, 16000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await waitFor(
        () => {
          expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
        },
        { timeout: 7000 }
      );
    }, 8000);
  });

  describe("Manejo de errores en guardado", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it("mantiene el estado como 'idle' si falla el guardado", async () => {
      mockUpdateData.mockClear();
      mockUpdateData.mockRejectedValue(new Error("Save error"));

      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });
    }, 10000);

    it("permite reintentar el guardado después de un error", async () => {
      mockUpdateData.mockClear();
      
      // Configurar para que el guardado inicial también falle
      mockUpdateData.mockRejectedValue(new Error("Save error"));

      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      // Avanzar el tiempo para que el guardado inicial falle
      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });

      mockUpdateData.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer intento (falla)
      triggerButton.click();
      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });

      // Segundo intento (éxito)
      mockUpdateData.mockClear();
      mockUpdateData.mockResolvedValue({ data: { success: true } });
      triggerButton.click();
      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      });
    }, 15000);
  });

  describe("Estructura del layout", () => {
    it("renderiza dentro de StudentLayout", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading", async () => {
      render(
        <MemoryRouter>
          <RentaLiquidaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });
  });
});
