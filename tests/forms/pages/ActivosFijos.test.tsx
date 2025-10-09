/**
 * ============================================================================
 * SUITE DE PRUEBAS: ActivosFijosForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/pages/ActivosFijosForm.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas para la página de formulario de Activos Fijos,
 * que permite a los estudiantes cargar, editar y guardar automáticamente información
 * sobre activos fijos con cálculos complejos.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial de datos desde la API
 * 2. Integración con mergeDeepPreservingOrder
 * 3. Manejo de cambios con cálculos complejos automáticos
 * 4. Auto-guardado con debounce de 5 segundos
 * 5. Estados de guardado (idle/saving/saved)
 * 6. Manejo de errores en carga y guardado
 * 7. Limpieza de timeouts al desmontar
 * ============================================================================
 */

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import ActivosFijosForm from "../../../src/forms/pages/ActivosFijosForm";

/**
 * MOCK DATA: Datos de prueba para el formulario
 */
const mockActivosFijosData = {
  PropiedadesPlantasYEquipos: {
    TotalPropiedadesPlantasEquipo: 1000,
  },
  PropiedadesDeInversión: {
    TotalPorpiedadesDeInversion: 500,
  },
  ANCMV: 200,
  ActivosIntangibles: {
    TotalActivosIntangibles: 300,
  },
  TotalPPEPIANCMV: 0,
  TotalPPEPIANCMVYINTANGIBLES: 0,
};

const mockApiResponse = {
  data: {
    actContent: mockActivosFijosData,
  },
};

/**
 * MOCK: ActivosFijosService
 * PROPÓSITO: Simular las llamadas a la API para obtener y actualizar datos
 */
const mockGetActivosFijos = vi.fn();
const mockUpdateActivosFijos = vi.fn();

vi.mock("@/forms/services/activosFijos.service", () => ({
  ActivosFijosService: {
    getActivosFijosFormStudent: () => mockGetActivosFijos(),
    updateACtivosFijosFormStudent: (data: any) => mockUpdateActivosFijos(data),
  },
}));

/**
 * MOCK: FormRender
 * PROPÓSITO: Aislar las pruebas del componente FormRender
 */
vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, onChange, canEdit, config }: any) => (
    <div data-testid="form-render">
      <div data-testid="form-value">{JSON.stringify(value)}</div>
      <button
        data-testid="trigger-change"
        onClick={() =>
          onChange(
            {
              ...value,
              PropiedadesPlantasYEquipos: {
                TotalPropiedadesPlantasEquipo: 2000,
                DatosContables: { test: "data" },
              },
            },
            "PropiedadesPlantasYEquipos.TotalPropiedadesPlantasEquipo"
          )
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
 * PROPÓSITO: Simplificar el layout en las pruebas
 */
vi.mock("@/components/templates/StudentLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="student-layout">{children}</div>,
}));

/**
 * MOCK: Loading
 * PROPÓSITO: Verificar los estados de guardado
 */
vi.mock("@/forms/components/atoms/Loading", () => ({
  __esModule: true,
  default: ({ saveStatus }: any) => (
    <div data-testid="loading-status">{saveStatus}</div>
  ),
}));

/**
 * MOCK: Funciones de cálculo
 * PROPÓSITO: Verificar que se llaman correctamente
 */
const mockCalculateImporteNetoFinalPeriodoCosto = vi.fn();
const mockCalculateImporteNetoFinalPeriodoAjuste = vi.fn();
const mockCalculateSubtotalAlFinalDelPeriodo = vi.fn();
const mockCalculateTotalNetoFinanciero = vi.fn();
const mockCalculateTotalNetoInformativo = vi.fn();
const mockCalculateTotals = vi.fn();
const mockCalculateTotalsSources = vi.fn();

vi.mock("@/forms/utils/ActivosFijos", () => ({
  calculateImporteNetoFinalPeriodoCosto: (element: any) =>
    mockCalculateImporteNetoFinalPeriodoCosto(element),
  calculateImporteNetoFinalPeriodoAjustePorRevaluacion: (element: any) =>
    mockCalculateImporteNetoFinalPeriodoAjuste(element),
  calculateSubtotalAlFinalDelPeriodo: (element: any) =>
    mockCalculateSubtotalAlFinalDelPeriodo(element),
  calculateTotalNetoAlFinalDelPeriodoFinanciero: (element: any) =>
    mockCalculateTotalNetoFinanciero(element),
  calculateTotalNetoAlFinalDelPeriodoInformativo: (element: any) =>
    mockCalculateTotalNetoInformativo(element),
  config: {},
}));

vi.mock("@/forms/utils/totalOperations", () => ({
  calculateTotals: (...args: any[]) => mockCalculateTotals(...args),
  calculateTotalsSources: (...args: any[]) => mockCalculateTotalsSources(...args),
}));

vi.mock("@/forms/utils/mergeDeep", () => ({
  mergeDeepPreservingOrder: (base: any, data: any) => ({ ...base, ...data }),
}));

vi.mock("@/forms/models/ActivosFijosJson", () => ({
  ActivosFijosInput: {},
}));

describe("ActivosFijosForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetActivosFijos.mockResolvedValue(mockApiResponse);
    mockUpdateActivosFijos.mockResolvedValue({ success: true });
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
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalledTimes(1);
      });

      expect(screen.getByTestId("form-render")).toBeInTheDocument();
    });

    it("muestra el estado inicial como 'idle'", () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
    });

    it("maneja errores al cargar datos", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockGetActivosFijos.mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <ActivosFijosForm />
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
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const formValue = screen.getByTestId("form-value");
      expect(formValue).toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: Manejo de cambios y cálculos
   */
  describe("Manejo de cambios con cálculos automáticos", () => {
    it("actualiza el estado cuando se hacen cambios en el formulario", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar a que el estado se actualice
      await waitFor(() => {
        const formValue = screen.getByTestId("form-value");
        expect(formValue).toHaveTextContent("2000");
      });
    });

    it("ejecuta los cálculos necesarios al hacer cambios", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      expect(mockCalculateImporteNetoFinalPeriodoCosto).toHaveBeenCalled();
      expect(mockCalculateImporteNetoFinalPeriodoAjuste).toHaveBeenCalled();
      expect(mockCalculateSubtotalAlFinalDelPeriodo).toHaveBeenCalled();
      expect(mockCalculateTotalNetoFinanciero).toHaveBeenCalled();
      expect(mockCalculateTotalNetoInformativo).toHaveBeenCalled();
    });

    it("cambia el estado a 'saving' inmediatamente después de un cambio", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
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
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Verificar inmediatamente que no se ha guardado
      expect(mockUpdateActivosFijos).not.toHaveBeenCalled();
    });

    it("guarda los datos después de 5 segundos", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      // Esperar 5 segundos + tiempo para que se ejecuten los cálculos y el guardado
      await waitFor(
        () => {
          expect(mockCalculateTotals).toHaveBeenCalled();
          expect(mockCalculateTotalsSources).toHaveBeenCalled();
          expect(mockUpdateActivosFijos).toHaveBeenCalled();
        },
        { timeout: 7000 }
      );
    }, 8000);

    it("cancela el guardado anterior si hay un nuevo cambio antes de 5 segundos", async () => {
      // Limpiar mocks antes de esta prueba específica
      mockUpdateActivosFijos.mockClear();
      
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");

      // Primer cambio
      triggerButton.click();
      
      // Esperar 2 segundos (menos de 5, para que no se guarde)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Verificar que aún no se ha guardado
      expect(mockUpdateActivosFijos).not.toHaveBeenCalled();

      // Segundo cambio antes de que se complete el primero (reinicia el debounce)
      triggerButton.click();
      
      // Esperar 2 segundos más (total 4s desde primer click, 2s desde segundo)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aún no debería haberse guardado (han pasado 4s desde el primer click,
      // pero solo 2s desde el segundo click que reinició el contador)
      expect(mockUpdateActivosFijos).not.toHaveBeenCalled();

      // Esperar 3.5 segundos más para completar los 5 segundos desde el segundo click
      await waitFor(
        () => {
          expect(mockUpdateActivosFijos).toHaveBeenCalledTimes(1);
        },
        { timeout: 4000 }
      );
    }, 12000);

    it("cambia el estado a 'saved' después de guardar exitosamente", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
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
      mockUpdateActivosFijos.mockRejectedValueOnce(new Error("Save error"));

      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toHaveTextContent("idle");
      });
    }, 10000);

    it("permite reintentar el guardado después de un error", async () => {
      mockUpdateActivosFijos
        .mockRejectedValueOnce(new Error("Save error"))
        .mockResolvedValueOnce({ success: true });

      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
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
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("student-layout")).toBeInTheDocument();
      });
    });

    it("muestra el componente Loading con el estado correcto", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading-status")).toBeInTheDocument();
      });
    });

    it("muestra el FormRender como editable", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("can-edit")).toHaveTextContent("editable");
      });
    });
  });

  /**
   * GRUPO 6: Cálculos adicionales en el timeout
   */
  describe("Cálculos adicionales durante el auto-guardado", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it("ejecuta calculateTotals para todos los totales necesarios", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(mockCalculateTotals).toHaveBeenCalledWith(
          expect.any(Array),
          expect.any(Object),
          "TotalPropiedadesPlantasEquipo"
        );
        expect(mockCalculateTotals).toHaveBeenCalledWith(
          expect.any(Array),
          expect.any(Object),
          "TotalPorpiedadesDeInversion"
        );
        expect(mockCalculateTotals).toHaveBeenCalledWith(
          expect.any(Array),
          expect.any(Object),
          "TotalActivosIntangibles"
        );
      });
    }, 10000);

    it("ejecuta calculateTotalsSources para los totales combinados", async () => {
      render(
        <MemoryRouter>
          <ActivosFijosForm />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockGetActivosFijos).toHaveBeenCalled();
      });

      const triggerButton = screen.getByTestId("trigger-change");
      triggerButton.click();

      await vi.advanceTimersByTimeAsync(5000);

      await waitFor(() => {
        expect(mockCalculateTotalsSources).toHaveBeenCalledWith(
          expect.any(Object),
          expect.any(Array),
          "TotalPPEPIANCMV"
        );
        expect(mockCalculateTotalsSources).toHaveBeenCalledWith(
          expect.any(Object),
          expect.any(Array),
          "TotalPPEPIANCMVYINTANGIBLES"
        );
      });
    }, 10000);
  });
});
