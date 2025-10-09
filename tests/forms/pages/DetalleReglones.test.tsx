/**
 * ============================================================================
 * SUITE DE PRUEBAS: DetalleRenglones Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/DetalleReglones.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Detalle de Renglones,
 * que realiza cálculos iniciales al cargar y múltiples cálculos al hacer cambios.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial con cálculos automáticos
 * 2. Múltiples cálculos condicionales en handleChange
 * 3. Auto-guardado con debounce de 5 segundos
 * 4. Estados de guardado (idle/saving/saved)
 * 5. Manejo de errores
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import DetalleRenglones from "../../../src/forms/pages/DetalleReglones";

const mockData = {
  Renglon42: {
    "1779PropiedadesDeInversionTerrenos": {
      ValorDelCosto: { test: "data" },
    },
  },
};

const mockApiResponse = {
  data: {
    detContent: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/detalleReglones.service", () => ({
  DetalleReglonesService: {
    getDetalleReglonesFormStudent: () => mockGetData(),
    updateADetalleReglonesFormStudent: (data: any) => mockUpdateData(data),
  },
}));

const mockCalculateSaldosFiscalesParciales = vi.fn();
const mockCalculateTotalSaldos = vi.fn();
const mockCalculateNonTotalData = vi.fn();
const mockCalculateTotalData = vi.fn();

vi.mock("@/forms/utils/DetalleReng", () => ({
  config: {},
  calculateTotalSaldos: (...args: any[]) => mockCalculateTotalSaldos(...args),
  calculateSaldosFiscalesParciales: (element: any) => mockCalculateSaldosFiscalesParciales(element),
  calculateNonTotalData: (data: any) => mockCalculateNonTotalData(data),
  calculateTotalData: (data: any) => mockCalculateTotalData(data),
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange }: any) => (
    <div data-testid="form-render">
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, updated: true }, "Renglon42.test.field")}
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

vi.mock("@/forms/models/DetalleRenglonesJson", () => ({
  DetalleRenglonesInput: {},
}));

describe("DetalleRenglones component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetData.mockResolvedValue(mockApiResponse);
    mockUpdateData.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Carga inicial con cálculos automáticos", () => {
    it("carga los datos y ejecuta cálculos iniciales", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1);
        expect(mockCalculateSaldosFiscalesParciales).toHaveBeenCalled();
      });
    });

    it("maneja errores al cargar datos", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockGetData.mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <DetalleRenglones />
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

  describe("Manejo de cambios con cálculos múltiples", () => {
    it("ejecuta los cálculos necesarios al hacer cambios", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockCalculateSaldosFiscalesParciales).toHaveBeenCalled();
      expect(mockCalculateTotalSaldos).toHaveBeenCalled();
      expect(mockCalculateNonTotalData).toHaveBeenCalled();
    });

    it("cambia el estado a 'saving' después de un cambio", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que el estado cambie a 'saving'
      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saving");
      });
    });
  });

  describe("Auto-guardado con cálculos adicionales", () => {
    it("ejecuta cálculos adicionales en el timeout antes de guardar", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar 5 segundos + tiempo para cálculos y guardado
      await waitFor(() => {
        expect(mockCalculateTotalData).toHaveBeenCalled();
        expect(mockUpdateData).toHaveBeenCalled();
      }, { timeout: 7000 });
    }, 8000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que se guarde y cambie el estado
      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      }, { timeout: 7000 });
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
      mockUpdateData.mockRejectedValueOnce(new Error("Save error"));

      render(
        <MemoryRouter>
          <DetalleRenglones />
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
      mockUpdateData
        .mockRejectedValueOnce(new Error("Save error"))
        .mockResolvedValueOnce({ success: true });

      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer intento (falla)
      triggerButton.click();
      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });

      // Segundo intento (éxito)
      triggerButton.click();
      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      });
    }, 15000);
  });

  describe("Estructura y componentes del layout", () => {
    it("renderiza dentro de StudentLayout", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading con el estado correcto", async () => {
      render(
        <MemoryRouter>
          <DetalleRenglones />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });
  });
});
