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
  rentaLiquida: {
    ingresos: 1000,
    deducciones: 500,
  },
  InventarioFinal: {
    total: 200,
  },
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

vi.mock("../utils/RentaLiquida", () => ({
  config: {},
  calculateOtras: (element: any) => mockCalculateOtras(element),
  calculateValorFiscalSolicitado: (element: any) => mockCalculateValorFiscalSolicitado(element),
  calculatedValorFiscal: (element: any) => mockCalculatedValorFiscal(element),
  calculateAllPartOne: (data: any) => mockCalculateAllPartOne(data),
  calculateAllPartTwo: (data: any) => mockCalculateAllPartTwo(data),
  calculateFirstValorFiscal: (...args: any[]) => mockCalculateFirstValorFiscal(...args),
}));

vi.mock("@/forms/utils/totalOperations", () => ({
  calculateTotals: (...args: any[]) => mockCalculateTotals(...args),
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
    vi.useFakeTimers();
    mockGetData.mockResolvedValue(mockApiResponse);
    mockUpdateData.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
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

      expect(screen.getByTestId("loading-status")).toHaveTextContent("saving");
    });
  });

  describe("Auto-guardado con debounce", () => {
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

      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalled();
      });
    });

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

      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      });
    });
  });

  describe("Manejo de errores en guardado", () => {
    it("mantiene el estado como 'idle' si falla el guardado", async () => {
      await waitFor(() => {
        mockUpdateData.mockClear();
      });

      mockUpdateData.mockRejectedValueOnce(new Error("Save error"));

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

      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });
    });
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
