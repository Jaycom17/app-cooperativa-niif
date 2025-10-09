/**
 * ============================================================================
 * SUITE DE PRUEBAS: ResumenESFForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/ResumenESF.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Resumen ESF,
 * que es un formulario de solo lectura (canEdit=false) con funcionalidades
 * básicas de carga y guardado.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial de datos desde la API
 * 2. Manejo de cambios simples
 * 3. Auto-guardado con debounce
 * 4. Estados de guardado
 * 5. Manejo de errores
 * 6. Formulario en modo solo lectura
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import ResumenESFForm from "../../../src/forms/pages/ResumenESF";

const mockData = {
  resumen: {
    activos: 10000,
    pasivos: 5000,
    patrimonio: 5000,
  },
};

const mockApiResponse = {
  data: {
    resContent: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/resumenESF.service", () => ({
  ResumenESFService: {
    getResumenESFForStudent: () => mockGetData(),
    updateResumenESFForStudent: (data: any) => mockUpdateData(data),
  },
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange, canEdit }: any) => (
    <div data-testid="form-render">
      <div data-testid="form-value">{JSON.stringify(value)}</div>
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, updated: true })}
      >
        Trigger Change
      </button>
      <div data-testid="can-edit">{canEdit ? "editable" : "readonly"}</div>
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

vi.mock("@/forms/models/ResumenEsfJson", () => ({
  ResumenESFInput: {},
}));

describe("ResumenESFForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetData.mockResolvedValue(mockApiResponse);
    mockUpdateData.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Carga inicial de datos", () => {
    it("carga los datos correctamente al montar el componente", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledTimes(1);
      });

      expect(screen.getByTestId("form-render")).toBeInTheDocument();
    });

    it("muestra el estado inicial como 'idle'", () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
    });

    it("maneja errores al cargar datos", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockGetData.mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <ResumenESFForm />
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

    it("integra los datos cargados con mergeDeepPreservingOrder", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const formValue = screen.getByTestId("form-value");
      expect(formValue).toBeInTheDocument();
    });
  });

  describe("Modo solo lectura", () => {
    it("muestra el FormRender como no editable", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      expect(screen.getByTestId("can-edit")).toHaveTextContent("readonly");
    });
  });

  describe("Manejo de cambios simples", () => {
    it("actualiza el estado cuando se hacen cambios", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await waitFor(() => {
        const formValue = screen.getByTestId("form-value");
        expect(formValue).toHaveTextContent("updated");
      });
    });

    it("cambia el estado a 'saving' inmediatamente después de un cambio", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
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
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockUpdateData).not.toHaveBeenCalled();
    });

    it("guarda los datos después de 5 segundos", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

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
      vi.useFakeTimers({ shouldAdvanceTime: true });
      
      mockUpdateData.mockClear();

      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer cambio
      triggerButton.click();

      // Avanzar 2 segundos
      await vi.advanceTimersByTimeAsync(2000);

      // Verificar que aún no se ha guardado
      expect(mockUpdateData).toHaveBeenCalledTimes(0);

      // Segundo cambio (reinicia el debounce)
      triggerButton.click();

      // Avanzar 2 segundos más
      await vi.advanceTimersByTimeAsync(2000);

      // Aún no debería haberse guardado
      expect(mockUpdateData).toHaveBeenCalledTimes(0);

      // Avanzar 3.5 segundos más para completar los 5s desde el segundo click
      await vi.advanceTimersByTimeAsync(3500);

      // Debe haberse guardado exactamente 1 vez
      expect(mockUpdateData).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    }, 12000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
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
      mockUpdateData.mockRejectedValueOnce(new Error("Save error"));

      render(
        <MemoryRouter>
          <ResumenESFForm />
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
          <ResumenESFForm />
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

  describe("Estructura y layout", () => {
    it("renderiza dentro de StudentLayout", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading con el estado correcto", async () => {
      render(
        <MemoryRouter>
          <ResumenESFForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });
  });
});
