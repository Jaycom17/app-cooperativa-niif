/**
 * ============================================================================
 * SUITE DE PRUEBAS: ESFPatrimonioForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/ESFPatrimonioForm.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de ESF Patrimonio,
 * que realiza cálculos iniciales, guarda automáticamente al cargar, y ejecuta
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

import ESFPatrimonio from "../../../src/forms/pages/ESFPatrimonioForm";

const mockData = {
  patrimonio: {
    capital: 1000,
    reservas: 500,
  },
};

const mockApiResponse = {
  data: {
    esfContent: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/esfPatrimonio.service", () => ({
  EsfPatrimonioService: {
    getEsfPatrimonioFormStudent: () => mockGetData(),
    updateAEsfPatrimonioFormStudent: (data: any) => mockUpdateData(data),
  },
}));

const mockCalculateAll = vi.fn();
const mockCalculatedValorFiscal = vi.fn();
const mockCalculateFirstValorFiscal = vi.fn();

vi.mock("@/forms/utils/esfPatrimonio", () => ({
  config: {},
  calculateAll: (...args: any[]) => mockCalculateAll(...args),
  calculatedValorFiscal: (element: any) => mockCalculatedValorFiscal(element),
  calculateFirstValorFiscal: (...args: any[]) => mockCalculateFirstValorFiscal(...args),
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange }: any) => (
    <div data-testid="form-render">
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, updated: true }, "patrimonio.capital")}
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

vi.mock("@/forms/models/EsfPatrimonioJson", () => ({
  ESFPatrimonioInput: {},
}));

describe("ESFPatrimonio component", () => {
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

  describe("Carga inicial con cálculos y guardado automático", () => {
    it("carga los datos y ejecuta cálculos iniciales", async () => {
      render(
        <MemoryRouter>
          <ESFPatrimonio />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1);
        expect(mockCalculateFirstValorFiscal).toHaveBeenCalled();
        expect(mockCalculateAll).toHaveBeenCalled();
      });
    });

    it("guarda automáticamente después de cargar y calcular", async () => {
      render(
        <MemoryRouter>
          <ESFPatrimonio />
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
          <ESFPatrimonio />
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

  describe("Manejo de cambios con cálculos", () => {
    it("ejecuta cálculos al hacer cambios", async () => {
      render(
        <MemoryRouter>
          <ESFPatrimonio />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockCalculatedValorFiscal.mockClear();
      mockCalculateAll.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockCalculatedValorFiscal).toHaveBeenCalled();
      expect(mockCalculateAll).toHaveBeenCalled();
    });

    it("cambia el estado a 'saving' después de un cambio", async () => {
      render(
        <MemoryRouter>
          <ESFPatrimonio />
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

  describe("Auto-guardado con debounce", () => {
    it("guarda los datos después de 5 segundos", async () => {
      render(
        <MemoryRouter>
          <ESFPatrimonio />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockUpdateData.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar 5 segundos + tiempo para guardado
      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalled();
      }, { timeout: 7000 });
    }, 8000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <ESFPatrimonio />
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
    it("mantiene el estado como 'idle' si falla el guardado", async () => {
      // Primer guardado exitoso (carga inicial)
      await waitFor(() => {
        mockUpdateData.mockClear();
      });

      mockUpdateData.mockRejectedValueOnce(new Error("Save error"));

      render(
        <MemoryRouter>
          <ESFPatrimonio />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que falle el guardado
      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      }, { timeout: 7000 });
    }, 8000);
  });
});
