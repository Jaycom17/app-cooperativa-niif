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
 * 3. Auto-guardado con debounce de 5 segundos
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
    vi.useFakeTimers();
    mockGetData.mockResolvedValue(mockApiResponse);
    mockUpdateData.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
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

      expect(screen.getByTestId("loading-status")).toHaveTextContent("saving");
    });
  });

  describe("Auto-guardado con debounce", () => {
    it("guarda los datos después de 5 segundos", async () => {
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

      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(mockUpdateData).toHaveBeenCalled();
      });
    });

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

      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
      });
    });

    it("cancela el guardado anterior si hay un nuevo cambio", async () => {
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
