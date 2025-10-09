/**
 * ============================================================================
 * SUITE DE PRUEBAS: CaratulaForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/Caratula.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Carátula,
 * que permite a los estudiantes cargar, editar y guardar automáticamente
 * información básica sin cálculos complejos.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial de datos desde la API
 * 2. Integración con mergeDeepPreservingOrder
 * 3. Manejo de cambios simples sin cálculos
 * 4. Auto-guardado con debounce de 5 segundos
 * 5. Estados de guardado (idle/saving/saved)
 * 6. Manejo de errores en carga y guardado
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import CaratulaForm from "../../../src/forms/pages/Caratula";

/**
 * MOCK DATA: Datos de prueba para el formulario
 */
const mockCaratulaData = {
  informacionBasica: {
    nit: "123456789",
    razonSocial: "Empresa Test",
    direccion: "Calle 123",
  },
};

const mockApiResponse = {
  data: {
    carContent: mockCaratulaData,
  },
};

/**
 * MOCK: CaratulaService
 */
const mockGetCaratula = vi.fn();
const mockUpdateCaratula = vi.fn();

vi.mock("@/forms/services/caratula.service", () => ({
  CaratulaService: {
    getCaratulaForStudent: () => mockGetCaratula(),
    updateCaratulaForStudent: (data: any) => mockUpdateCaratula(data),
  },
}));

/**
 * MOCK: FormRender
 */
vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange, canEdit }: any) => (
    <div data-testid="form-render">
      <div data-testid="form-value">{JSON.stringify(value)}</div>
      <button
        data-testid="trigger-change"
        onClick={() =>
          onChange({
            ...value,
            informacionBasica: {
              ...value.informacionBasica,
              nit: "987654321",
            },
          })
        }
      >
        Trigger Change
      </button>
      <div data-testid="can-edit">{canEdit ? "editable" : "readonly"}</div>
    </div>
  ),
}));

/**
 * MOCK: StudentLayout
 */
vi.mock("@/components/templates/StudentLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="student-layout">{children}</div>,
}));

/**
 * MOCK: Loading
 */
vi.mock("@/forms/components/atoms/Loading", () => ({
  __esModule: true,
  default: ({ saveStatus }: any) => (
    <div data-testid="loading-status">{saveStatus}</div>
  ),
}));

vi.mock("@/forms/utils/mergeDeep", () => ({
  mergeDeepPreservingOrder: (base: any, data: any) => ({ ...base, ...data }),
}));

vi.mock("@/forms/models/CaratulaJson", () => ({
  CaratulaInput: {},
}));

vi.mock("@/forms/utils/caratula", () => ({
  config: {},
}));

describe("CaratulaForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCaratula.mockResolvedValue(mockApiResponse);
    mockUpdateCaratula.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Carga inicial de datos
   */
  describe("Carga inicial de datos desde la API", () => {
    it("carga los datos correctamente al montar el componente", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalledTimes(1);
      });

      expect(screen.getByTestId("form-render")).toBeInTheDocument();
    });

    it("muestra el estado inicial como 'idle'", () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
    });

    it("maneja errores al cargar datos", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockGetCaratula.mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <CaratulaForm />
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
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const formValue = screen.getByTestId("form-value");
      expect(formValue).toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: Manejo de cambios simples
   */
  describe("Manejo de cambios sin cálculos", () => {
    it("actualiza el estado cuando se hacen cambios en el formulario", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que el estado se actualice
      await waitFor(() => {
        const formValue = screen.getByTestId("form-value");
        expect(formValue).toHaveTextContent("987654321");
      });
    });

    it("cambia el estado a 'saving' inmediatamente después de un cambio", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que el estado cambie a 'saving'
      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("saving");
      });
    });
  });

  /**
   * GRUPO 3: Auto-guardado con debounce
   */
  describe("Auto-guardado con debounce de 5 segundos", () => {
    it("no guarda inmediatamente después de un cambio", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Verificar inmediatamente que no se ha guardado
      expect(mockUpdateCaratula).not.toHaveBeenCalled();
    });

    it("guarda los datos después de 5 segundos", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar 5 segundos + tiempo para que se ejecute el guardado
      await waitFor(
        () => {
          expect(mockUpdateCaratula).toHaveBeenCalled();
        },
        { timeout: 7000 }
      );
    }, 8000);

    it("cancela el guardado anterior si hay un nuevo cambio antes de 5 segundos", async () => {
      // Limpiar mocks antes de esta prueba específica
      mockUpdateCaratula.mockClear();
      
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer cambio
      triggerButton.click();
      
      // Esperar 2 segundos (menos de 5, para que no se guarde)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Verificar que aún no se ha guardado
      expect(mockUpdateCaratula).not.toHaveBeenCalled();

      // Segundo cambio antes de que se complete el primero (reinicia el debounce)
      triggerButton.click();
      
      // Esperar 2 segundos más (total 4s desde primer click, 2s desde segundo)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aún no debería haberse guardado
      expect(mockUpdateCaratula).not.toHaveBeenCalled();

      // Esperar 3.5 segundos más para completar los 5 segundos desde el segundo click
      await waitFor(
        () => {
          expect(mockUpdateCaratula).toHaveBeenCalledTimes(1);
        },
        { timeout: 4000 }
      );
    }, 12000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que se guarde y cambie el estado
      await waitFor(
        () => {
          expect(screen.getByTestId("loading-status")).toHaveTextContent("saved");
        },
        { timeout: 7000 }
      );
    }, 8000);
  });

  /**
   * GRUPO 4: Manejo de errores en guardado
   */
  describe("Manejo de errores en el guardado", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it("mantiene el estado como 'idle' si falla el guardado", async () => {
      mockUpdateCaratula.mockRejectedValueOnce(new Error("Save error"));

      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });
    }, 10000);

    it("permite reintentar el guardado después de un error", async () => {
      mockUpdateCaratula
        .mockRejectedValueOnce(new Error("Save error"))
        .mockResolvedValueOnce({ success: true });

      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetCaratula).toHaveBeenCalled();
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

  /**
   * GRUPO 5: Estructura y layout
   */
  describe("Estructura y componentes del layout", () => {
    it("renderiza dentro de StudentLayout", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading con el estado correcto", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });

    it("muestra el FormRender como editable", async () => {
      render(
        <MemoryRouter>
          <CaratulaForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("can-edit")).toHaveTextContent("editable");
      });
    });
  });

});
