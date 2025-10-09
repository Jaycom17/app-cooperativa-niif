/**
 * ============================================================================
 * SUITE DE PRUEBAS: ImpuestoDiferidoForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/ImpuestoDiferido.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Impuesto Diferido,
 * que realiza cálculos iniciales, guarda automáticamente al cargar y ejecuta
 * cálculos al hacer cambios.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial con cálculos
 * 2. Guardado automático después de la carga inicial
 * 3. Cálculos en handleChange
 * 4. Auto-guardado con debounce
 * 5. Manejo de errores
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import ImpuestoDiferidoForm from "../../../src/forms/pages/ImpuestoDiferido";

const mockData = {
  impuestoDiferido: {
    activo: 1000,
    pasivo: 500,
  },
};

const mockApiResponse = {
  data: {
    impContent: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/impuestoDiferido.service", () => ({
  ImpuestoDiferidoService: {
    getImpuestoDiferidoForStudent: () => mockGetData(),
    updateImpuestoDiferidoForStudent: (data: any) => mockUpdateData(data),
  },
}));

const mockCalculateAll = vi.fn();
const mockCalculateFirstValues = vi.fn();

vi.mock("@/forms/utils/impuestoDiferido", () => ({
  config: {},
  calculateAll: (...args: any[]) => mockCalculateAll(...args),
  calculateFirstValues: (...args: any[]) => mockCalculateFirstValues(...args),
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange }: any) => (
    <div data-testid="form-render">
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, updated: true }, "impuestoDiferido.activo")}
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

vi.mock("@/forms/models/ImpuestoDiferidoJson", () => ({
  ImpuestoDiferidoInput: {},
}));

describe("ImpuestoDiferidoForm component", () => {
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
          <ImpuestoDiferidoForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1);
        expect(mockCalculateFirstValues).toHaveBeenCalled();
      });
    });

    it("guarda automáticamente después de cargar y calcular", async () => {
      render(
        <MemoryRouter>
          <ImpuestoDiferidoForm />
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
          <ImpuestoDiferidoForm />
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
          <ImpuestoDiferidoForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      mockCalculateAll.mockClear();

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockCalculateAll).toHaveBeenCalled();
    });

    it("cambia el estado a 'saving' después de un cambio", async () => {
      render(
        <MemoryRouter>
          <ImpuestoDiferidoForm />
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
          <ImpuestoDiferidoForm />
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
          <ImpuestoDiferidoForm />
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
          <ImpuestoDiferidoForm />
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
          <ImpuestoDiferidoForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading", async () => {
      render(
        <MemoryRouter>
          <ImpuestoDiferidoForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });
  });
});
