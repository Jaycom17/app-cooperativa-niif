/**
 * ============================================================================
 * SUITE DE PRUEBAS: IngresosFacturacionForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/IngresosFacturacion.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Ingresos y Facturación,
 * que realiza múltiples cálculos previos al cargar, guarda automáticamente y ejecuta
 * cálculos complejos al hacer cambios.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial con múltiples cálculos
 * 2. Guardado automático después de la carga inicial
 * 3. Cálculos complejos en handleChange
 * 4. Auto-guardado con debounce
 * 5. Manejo de errores
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import IngresosFacturacionForm from "../../../src/forms/pages/IngresosFacturacion";

const mockData = {
  VentaDeBienes: {
    facturacion: 1000,
    ingresoContable: 900,
  },
  PrestacionDeServicios: {
    facturacion: 500,
    ingresoContable: 450,
  },
};

const mockApiResponse = {
  data: {
    ingContent: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/ingresosFacturacion.service", () => ({
  IngresosFacturacionService: {
    getIngresosFacturacionForStudent: () => mockGetData(),
    updateIngresosFacturacionForStudent: (data: any) => mockUpdateData(data),
  },
}));

const mockCalculateSaldofinalPeriodo = vi.fn();
const mockCalculateValorTotalFacturacion = vi.fn();
const mockCalculateValorTotalIngresoContable = vi.fn();
const mockCalculateTotals = vi.fn();

vi.mock("@/forms/utils/IngresosFacturacion", () => ({
  config: {},
  calculateSaldofinalPeriodo: (element: any) => mockCalculateSaldofinalPeriodo(element),
  calculateValorTotalFacturacion: (element: any) => mockCalculateValorTotalFacturacion(element),
  calculateValorTotalIngresoContable: (element: any) => mockCalculateValorTotalIngresoContable(element),
}));

vi.mock("@/forms/utils/totalOperations", () => ({
  calculateTotals: (...args: any[]) => mockCalculateTotals(...args),
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange }: any) => (
    <div data-testid="form-render">
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, updated: true }, "VentaDeBienes.facturacion")}
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

vi.mock("@/forms/models/IngFactJson", () => ({
  IngresosFacturacionInput: {},
}));

describe("IngresosFacturacionForm component", () => {
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

  describe("Carga inicial con múltiples cálculos y guardado automático", () => {
    it("carga los datos y ejecuta múltiples cálculos iniciales", async () => {
      render(
        <MemoryRouter>
          <IngresosFacturacionForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1);
        // Verifica que se calculen valores para ambas secciones
        expect(mockCalculateValorTotalFacturacion).toHaveBeenCalled();
        expect(mockCalculateValorTotalIngresoContable).toHaveBeenCalled();
        expect(mockCalculateTotals).toHaveBeenCalled();
      });
    });

    it("guarda automáticamente después de cargar y calcular", async () => {
      render(
        <MemoryRouter>
          <IngresosFacturacionForm />
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
          <IngresosFacturacionForm />
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

  describe("Manejo de cambios con cálculos complejos", () => {
    it("ejecuta múltiples cálculos al hacer cambios", async () => {
      render(
        <MemoryRouter>
          <IngresosFacturacionForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockCalculateSaldofinalPeriodo.mockClear();
      mockCalculateValorTotalFacturacion.mockClear();
      mockCalculateValorTotalIngresoContable.mockClear();
      mockCalculateTotals.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockCalculateSaldofinalPeriodo).toHaveBeenCalled();
      expect(mockCalculateValorTotalFacturacion).toHaveBeenCalled();
      expect(mockCalculateValorTotalIngresoContable).toHaveBeenCalled();
      expect(mockCalculateTotals).toHaveBeenCalled();
    });

    it("cambia el estado a 'saving' después de un cambio", async () => {
      render(
        <MemoryRouter>
          <IngresosFacturacionForm />
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
          <IngresosFacturacionForm />
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
          <IngresosFacturacionForm />
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

    it("cancela el guardado anterior si hay un nuevo cambio", async () => {
      render(
        <MemoryRouter>
          <IngresosFacturacionForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockUpdateData.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");

      triggerButton.click();
      vi.advanceTimersByTime(3000);
      triggerButton.click();
      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalledTimes(1);
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
          <IngresosFacturacionForm />
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
          <IngresosFacturacionForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading", async () => {
      render(
        <MemoryRouter>
          <IngresosFacturacionForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });
  });
});
