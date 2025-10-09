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
    mockGetData.mockResolvedValue(mockApiResponse);
    mockUpdateData.mockResolvedValue({ success: true });
  });

  afterEach(() => {
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

      // Esperar a que el estado cambie a 'saving'
      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saving");
      });
    });
  });

  describe("Auto-guardado con debounce", () => {
    it("no guarda inmediatamente después de un cambio", async () => {
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

      // Verificar inmediatamente que no se ha guardado (aparte del guardado inicial)
      expect(mockUpdateData).not.toHaveBeenCalled();
    });

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

      // Esperar 5 segundos + tiempo para guardado
      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalled();
      }, { timeout: 7000 });
    }, 8000);

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

      // Esperar a que se guarde y cambie el estado
      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      }, { timeout: 7000 });
    }, 8000);

    it("cancela el guardado anterior si hay un nuevo cambio antes de 5 segundos", async () => {
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

      // Primer cambio
      triggerButton.click();
      
      // Esperar 2 segundos (menos de 5, para que no se guarde)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Verificar que aún no se ha guardado
      expect(mockUpdateData).not.toHaveBeenCalled();

      // Segundo cambio antes de que se complete el primero (reinicia el debounce)
      triggerButton.click();
      
      // Esperar 2 segundos más (total 4s desde primer click, 2s desde segundo)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aún no debería haberse guardado
      expect(mockUpdateData).not.toHaveBeenCalled();

      // Esperar 3.5 segundos más para completar los 5 segundos desde el segundo click
      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalledTimes(1);
      }, { timeout: 4000 });
    }, 12000);
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
      // Primer guardado exitoso (carga inicial), luego falla el siguiente
      mockUpdateData
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error("Save error"));

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

      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });
    }, 10000);

    it("permite reintentar el guardado después de un error", async () => {
      // Primer guardado exitoso (carga inicial), luego falla, luego éxito
      mockUpdateData
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error("Save error"))
        .mockResolvedValueOnce({ success: true });

      render(
        <MemoryRouter>
          <ImpuestoDiferidoForm />
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
