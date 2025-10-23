/**
 * ============================================================================
 * SUITE DE PRUEBAS: Form110 Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/Form110.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario 110,
 * que carga datos y los guarda automáticamente sin cálculos complejos.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial de datos desde la API
 * 2. Manejo de cambios simples
 * 3. Auto-guardado con debounce de 2 segundos
 * 4. Estados de guardado (idle/saving/saved)
 * 5. Manejo de errores
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Form110 from "../../../src/forms/pages/Form110";

const mockData = {
  formulario110: {
    ingresos: 1000,
    gastos: 500,
  },
};

const mockApiResponse = {
  data: {
    r110Content: mockData,
  },
};

const mockGetData = vi.fn();
const mockUpdateData = vi.fn();

vi.mock("@/forms/services/form110.service", () => ({
  Form110Service: {
    getForm110ForStudent: () => mockGetData(),
    updateForm110ForStudent: (data: any) => mockUpdateData(data),
  },
}));

vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange }: any) => (
    <div data-testid="form-render">
      <button
        data-testid="trigger-change"
        onClick={() => onChange({ ...value, formulario110: { ingresos: 2000, gastos: 500 } })}
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

vi.mock("@/forms/models/Form110Json", () => ({
  Form110Input: {},
}));

vi.mock("@/forms/utils/form110", () => ({
  config: {},
}));

describe("Form110 component", () => {
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
          <Form110 />
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
          <Form110 />
        </MemoryRouter>
      );

      expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
    });

    it("maneja errores al cargar datos", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockGetData.mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <Form110 />
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

  describe("Manejo de cambios", () => {
    it("actualiza el estado cuando se hacen cambios", async () => {
      render(
        <MemoryRouter>
          <Form110 />
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
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Verificar inmediatamente que no se ha guardado
      expect(mockUpdateData).not.toHaveBeenCalled();
    });

    it("guarda los datos después de 2 segundos", async () => {
      render(
        <MemoryRouter>
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar 2 segundos + tiempo para guardado
      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalled();
      }, { timeout: 5000 });
    }, 6000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <Form110 />
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
      }, { timeout: 5000 });
    }, 6000);

    it("cancela el guardado anterior si hay un nuevo cambio antes de 2 segundos", async () => {
      // Limpiar mocks antes de esta prueba específica
      mockUpdateData.mockClear();
      
      render(
        <MemoryRouter>
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer cambio
      triggerButton.click();
      
      // Esperar 1 segundo (menos de 2, para que no se guarde)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verificar que aún no se ha guardado
      expect(mockUpdateData).not.toHaveBeenCalled();

      // Segundo cambio antes de que se complete el primero (reinicia el debounce)
      triggerButton.click();
      
      // Esperar 1 segundo más (total 2s desde primer click, 1s desde segundo)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Aún no debería haberse guardado
      expect(mockUpdateData).not.toHaveBeenCalled();

      // Esperar 1.5 segundos más para completar los 2 segundos desde el segundo click
      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalledTimes(1);
      }, { timeout: 2000 });
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
      mockUpdateData.mockRejectedValueOnce(new Error("Save error"));

      render(
        <MemoryRouter>
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await vi.advanceTimersByTimeAsync(2000);

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
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer intento (falla)
      triggerButton.click();
      await vi.advanceTimersByTimeAsync(2000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });

      // Segundo intento (éxito)
      triggerButton.click();
      await vi.advanceTimersByTimeAsync(2000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      });
    }, 15000);
  });

  describe("Estructura del layout", () => {
    it("renderiza dentro de StudentLayout", async () => {
      render(
        <MemoryRouter>
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading", async () => {
      render(
        <MemoryRouter>
          <Form110 />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });
  });
});
