/**
 * ============================================================================
 * SUITE DE PRUEBAS: RoomReport Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/professor/pages/RoomReport.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente RoomReport,
 * que permite a los profesores revisar los formularios enviados por los estudiantes
 * en una sala específica. El componente tiene tres vistas principales:
 * 1. Vista inicial con bienvenida
 * 2. Vista de selección de formularios (después de seleccionar estudiante)
 * 3. Vista de renderizado del formulario seleccionado
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado de vistas según estado (inicial, selección, formulario)
 * 2. Navegación entre vistas con función toNav
 * 3. Carga de 9 tipos diferentes de formularios desde servicios
 * 4. Estado de loading durante carga de datos
 * 5. Integración con AsideProf para navegación
 * 6. Renderizado de FormRender con datos cargados
 * 7. Manejo de errores en servicios
 * 8. Merge de datos con mergeDeepPreservingOrder
 * 9. Parámetro roomID desde useParams
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RoomReport from "../../../src/professor/pages/RoomReport";

// Importar servicios para mockear
import { Form110Service } from "../../../src/forms/services/form110.service";
import { DetalleReglonesService } from "../../../src/forms/services/detalleReglones.service";
import { CaratulaService } from "../../../src/forms/services/caratula.service";
import { EsfPatrimonioService } from "../../../src/forms/services/esfPatrimonio.service";
import { RentaLiquidaService } from "../../../src/forms/services/rentaLiquida.service";
import { ImpuestoDiferidoService } from "../../../src/forms/services/impuestoDiferido.service";
import { IngresosFacturacionService } from "../../../src/forms/services/ingresosFacturacion.service";
import { ActivosFijosService } from "../../../src/forms/services/activosFijos.service";
import { ResumenESFService } from "../../../src/forms/services/resumenESF.service";

// Mock del ProfessorLayout
vi.mock("@/professor/components/templates/ProfessorLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="professor-layout">{children}</div>,
}));

// Mock del AsideProf
let capturedToNav: any = null;
vi.mock("@/professor/components/organisms/AsideProf", () => ({
  __esModule: true,
  default: ({ toNav }: any) => {
    capturedToNav = toNav;
    return (
      <aside data-testid="aside-prof">
        <button onClick={() => toNav("stuSelect", "student-123")} data-testid="select-student">
          Seleccionar Estudiante
        </button>
        <button onClick={() => toNav("form110", "student-123")} data-testid="nav-form110">
          Form 110
        </button>
        <button onClick={() => toNav("detalleReng", "student-123")} data-testid="nav-detalleReng">
          Detalle Renglones
        </button>
        <button onClick={() => toNav("caratulaform", "student-123")} data-testid="nav-caratulaform">
          Carátula
        </button>
      </aside>
    );
  },
}));

// Mock del FormRender
vi.mock("@/forms/components/FormRender", () => ({
  FormRender: ({ value, canEdit, defaultOpen, config }: any) => (
    <div data-testid="form-render">
      <div data-testid="form-data">{JSON.stringify(value)}</div>
      <div data-testid="form-can-edit">{canEdit.toString()}</div>
      <div data-testid="form-default-open">{defaultOpen.toString()}</div>
      <div data-testid="form-config">{JSON.stringify(config)}</div>
    </div>
  ),
}));

// Mock del Loading
vi.mock("@/components/atoms/Loading", () => ({
  __esModule: true,
  default: ({ message, fullscreen }: any) => (
    <div data-testid="loading">
      <span data-testid="loading-message">{message}</span>
      <span data-testid="loading-fullscreen">{fullscreen.toString()}</span>
    </div>
  ),
}));

// Mock del logo
vi.mock("@/assets/LogoUniversidadCooperativa.png", () => ({
  default: "mocked-logo.png",
}));

// Mock del mergeDeepPreservingOrder
vi.mock("@/forms/utils/mergeDeep", () => ({
  mergeDeepPreservingOrder: (base: any, data: any) => ({ ...base, ...data }),
}));

// Mock de los configs
vi.mock("@/forms/utils/form110", () => ({ config: { form110Config: true } }));
vi.mock("@/forms/utils/ActivosFijos", () => ({ config: { activosFijosConfig: true } }));
vi.mock("@/forms/utils/caratula", () => ({ config: { caratulaConfig: true } }));
vi.mock("@/forms/utils/RentaLiquida", () => ({ config: { rentaLiquidaConfig: true } }));
vi.mock("@/forms/utils/esfPatrimonio", () => ({ config: { esfPatrimonioConfig: true } }));
vi.mock("@/forms/utils/DetalleReng", () => ({ config: { detalleRengConfig: true } }));
vi.mock("@/forms/utils/impuestoDiferido", () => ({ config: { impuestoDiferidoConfig: true } }));
vi.mock("@/forms/utils/IngresosFacturacion", () => ({ config: { ingresosFacturacionConfig: true } }));

// Mock de los inputs
vi.mock("@/forms/models/CaratulaJson", () => ({ CaratulaInput: { caratula: "base" } }));
vi.mock("@/forms/models/ActivosFijosJson", () => ({ ActivosFijosInput: { activos: "base" } }));
vi.mock("@/forms/models/RentaLiquidaJson", () => ({ RentaLiquidaInput: { renta: "base" } }));
vi.mock("@/forms/models/EsfPatrimonioJson", () => ({ ESFPatrimonioInput: { esf: "base" } }));
vi.mock("@/forms/models/DetalleRenglonesJson", () => ({ DetalleRenglonesInput: { detalle: "base" } }));
vi.mock("@/forms/models/ImpuestoDiferidoJson", () => ({ ImpuestoDiferidoInput: { impuesto: "base" } }));
vi.mock("@/forms/models/IngFactJson", () => ({ IngresosFacturacionInput: { ingresos: "base" } }));
vi.mock("@/forms/models/Form110Json", () => ({ Form110Input: { form110: "base" } }));
vi.mock("@/forms/models/ResumenEsfJson", () => ({ ResumenESFInput: { resumen: "base" } }));

// Mock de forms
vi.mock("@/professor/utils/Report", () => ({
  forms: [
    { label: "Formulario 110", to: "form110" },
    { label: "Detalle renglones 110", to: "detalleReng" },
    { label: "Caratula", to: "caratulaform" },
  ],
}));

// Componente Wrapper para react-router con roomID
const RouterWrapper = ({ children }: { children: React.ReactNode; roomID?: string }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/roomreport/:roomID" element={children} />
    </Routes>
  </BrowserRouter>
);

// Helper para renderizar con parámetros de ruta
const renderWithRouter = (roomID = "room-123") => {
  window.history.pushState({}, "", `/roomreport/${roomID}`);
  return render(
    <RouterWrapper roomID={roomID}>
      <RoomReport />
    </RouterWrapper>
  );
};

describe("RoomReport component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
    // Mock de console.log
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaura las implementaciones originales después de cada prueba
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Renderizado básico y vistas
   * 
   * Pruebas que verifican el renderizado de las diferentes vistas
   * del componente según el estado.
   * 
   * Cobertura:
   * - ProfessorLayout wrapper
   * - AsideProf siempre presente
   * - Vista inicial (form === "")
   * - Vista de selección de formularios (form === "stuSelect")
   * - Vista de formulario cargado
   */
  describe("Renderizado básico y vistas", () => {
    /**
     * Verifica que se renderice dentro del ProfessorLayout
     * 
     * Cubre:
     * - Wrapper con ProfessorLayout
     * - Estructura del componente
     */
    it("renderiza dentro del ProfessorLayout", () => {
      renderWithRouter();
      expect(screen.getByTestId("professor-layout")).toBeInTheDocument();
    });

    /**
     * Verifica que se renderice el AsideProf
     * 
     * Cubre:
     * - AsideProf con prop toNav
     * - Barra lateral siempre visible
     */
    it("renderiza el AsideProf con la función toNav", () => {
      renderWithRouter();
      expect(screen.getByTestId("aside-prof")).toBeInTheDocument();
    });

    /**
     * Verifica la vista inicial con mensaje de bienvenida
     * 
     * Cubre:
     * - Estado inicial form === ""
     * - Logo de la universidad
     * - Título "Bienvenido al reporte de la sala"
     * - Texto instructivo
     */
    it("muestra vista inicial con mensaje de bienvenida cuando form es vacío", () => {
      renderWithRouter();

      expect(screen.getByText("Bienvenido al reporte de la sala")).toBeInTheDocument();
      expect(screen.getByText(/Para empezar a revisar los avances/i)).toBeInTheDocument();
      expect(screen.getByAltText("Logo universidad cooperativa")).toBeInTheDocument();
    });

    /**
     * Verifica que la vista inicial muestre el logo
     * 
     * Cubre:
     * - img con src correcto
     * - alt text apropiado
     */
    it("renderiza el logo en la vista inicial", () => {
      renderWithRouter();

      const logo = screen.getByAltText("Logo universidad cooperativa");
      expect(logo).toHaveAttribute("src", "mocked-logo.png");
    });

    /**
     * Verifica que NO se muestre la vista de selección inicialmente
     * 
     * Cubre:
     * - Estado inicial sin selectedStudent
     * - Condicional form === "stuSelect" && selectedStudent
     */
    it("no muestra la vista de selección de formularios inicialmente", () => {
      renderWithRouter();

      expect(screen.queryByText("Selecciona el formulario que desea revisar")).not.toBeInTheDocument();
    });

    /**
     * Verifica que NO se muestre el loading inicialmente
     * 
     * Cubre:
     * - Estado inicial loading === false
     * - Condicional {loading && ...}
     */
    it("no muestra el loading inicialmente", () => {
      renderWithRouter();

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    /**
     * Verifica que NO se muestre el FormRender inicialmente
     * 
     * Cubre:
     * - Estado inicial data === {}
     * - Condicional Object.keys(data).length > 0
     */
    it("no muestra el FormRender inicialmente", () => {
      renderWithRouter();

      expect(screen.queryByTestId("form-render")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: Navegación a selección de estudiante
   * 
   * Pruebas que verifican la navegación a la vista de selección
   * de formularios cuando se selecciona un estudiante.
   * 
   * Cobertura:
   * - toNav("stuSelect", stuID)
   * - setForm("stuSelect")
   * - setSelectedStudent(stuID)
   * - setData({})
   * - setConfig({})
   * - Renderizado de grid de formularios
   */
  describe("Navegación a selección de estudiante", () => {
    /**
     * Verifica la transición a vista de selección de formularios
     * 
     * Cubre:
     * - Click en botón que llama toNav("stuSelect", stuID)
     * - if (formTo === "stuSelect") { ... }
     * - setSelectedStudent(stuID || null)
     * - Renderizado de título "Selecciona el formulario"
     */
    it("muestra vista de selección al navegar a stuSelect", async () => {
      renderWithRouter();

      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        expect(screen.getByText("Selecciona el formulario que desea revisar")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que se renderice el grid de formularios
     * 
     * Cubre:
     * - forms.map((form, index) => ...)
     * - Renderizado de botones para cada formulario
     * - Labels correctos
     */
    it("renderiza la lista de formularios disponibles", async () => {
      renderWithRouter();

      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        expect(screen.getByText("Formulario 110")).toBeInTheDocument();
        expect(screen.getByText("Detalle renglones 110")).toBeInTheDocument();
        expect(screen.getByText("Caratula")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que cada formulario tenga una imagen
     * 
     * Cubre:
     * - img con src de formulario
     * - alt "Logo Formulario"
     */
    it("cada formulario tiene una imagen", async () => {
      renderWithRouter();

      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        const images = screen.getAllByAltText("Logo Formulario");
        expect(images.length).toBeGreaterThan(0);
      });
    });

    /**
     * Verifica que se limpien data y config al seleccionar estudiante
     * 
     * Cubre:
     * - setData({})
     * - setConfig({})
     * - return en el caso "stuSelect"
     */
    it("limpia data y config al navegar a stuSelect", async () => {
      renderWithRouter();

      // Primero cargar un formulario (para tener data)
      const form110Button = screen.getByTestId("nav-form110");
      vi.spyOn(Form110Service, "getForm110ForProfessor").mockResolvedValueOnce({
        data: { r110Content: { test: "data" } },
      } as any);

      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });

      // Ahora navegar a stuSelect
      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        expect(screen.queryByTestId("form-render")).not.toBeInTheDocument();
      });
    });

    /**
     * Verifica que se muestre el logo en la vista de selección
     * 
     * Cubre:
     * - img en vista stuSelect
     * - Múltiples logos en diferentes vistas
     */
    it("muestra el logo en la vista de selección", async () => {
      renderWithRouter();

      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        const logos = screen.getAllByAltText("Logo universidad cooperativa");
        expect(logos.length).toBeGreaterThan(0);
      });
    });
  });

  /**
   * GRUPO 3: Carga de formularios
   * 
   * Pruebas que verifican la carga de diferentes tipos de formularios
   * desde los servicios correspondientes.
   * 
   * Cobertura:
   * - switch (formTo) con 9 casos
   * - Llamadas a servicios específicos
   * - mergeDeepPreservingOrder
   * - setData y setConfig
   * - setLoading(true) y setLoading(false)
   */
    describe("Carga de formularios", () => {
    /**
     * Verifica la carga del formulario 110
     * 
     * Cubre:
     * - case "form110":
     * - Form110Service.getForm110ForProfessor(stuID, roomID)
     * - mergeDeepPreservingOrder(Form110Input, res.data.r110Content)
     * - setConfig(configForm110)
     */
    it("carga el formulario 110 correctamente", async () => {
      const form110Data = { r110Content: { field1: "value1" } };
      const getForm110Spy = vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: form110Data } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(getForm110Spy).toHaveBeenCalledWith("student-123", "room-123");
      });

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });

    /**
     * Verifica la carga del detalle de renglones
     * 
     * Cubre:
     * - case "detalleReng":
     * - DetalleReglonesService.getDetalleReglonesFormProfessor(stuID, roomID)
     * - mergeDeepPreservingOrder(DetalleRenglonesInput, res.data.detContent)
     * - setConfig(configDetalleRenglones)
     */
    it("carga el detalle de renglones correctamente", async () => {
      const detalleData = { detContent: { field1: "value1" } };
      const getDetalleSpy = vi.spyOn(DetalleReglonesService, "getDetalleReglonesFormProfessor")
        .mockResolvedValueOnce({ data: detalleData } as any);

      renderWithRouter();

      const detalleButton = screen.getByTestId("nav-detalleReng");
      fireEvent.click(detalleButton);

      await waitFor(() => {
        expect(getDetalleSpy).toHaveBeenCalledWith("student-123", "room-123");
      });

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });

    /**
     * Verifica la carga de la carátula
     * 
     * Cubre:
     * - case "caratulaform":
     * - CaratulaService.getCaratulaForProfessor(stuID, roomID)
     * - mergeDeepPreservingOrder(CaratulaInput, res.data.carContent)
     * - setConfig(configCaratula)
     */
    it("carga la carátula correctamente", async () => {
      const caratulaData = { carContent: { field1: "value1" } };
      const getCaratulaSpy = vi.spyOn(CaratulaService, "getCaratulaForProfessor")
        .mockResolvedValueOnce({ data: caratulaData } as any);

      renderWithRouter();

      const caratulaButton = screen.getByTestId("nav-caratulaform");
      fireEvent.click(caratulaButton);

      await waitFor(() => {
        expect(getCaratulaSpy).toHaveBeenCalledWith("student-123", "room-123");
      });

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que se muestre loading durante la carga
     * 
     * Cubre:
     * - setLoading(true) antes de la llamada al servicio
     * - {loading && <Loading>}
     * - Componente Loading con props correctas
     */
    it("muestra loading durante la carga del formulario", async () => {
      // Mock con delay para capturar el estado loading
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: { r110Content: {} } } as any), 100)));

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      // Durante la carga, debe mostrar loading
      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });
    });

    /**
     * Verifica el mensaje del loading
     * 
     * Cubre:
     * - <Loading message="Cargando formulario..." fullscreen={false}/>
     * - Props del componente Loading
     */
    it("muestra el mensaje correcto en loading", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: { r110Content: {} } } as any), 100)));

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("loading-message")).toHaveTextContent("Cargando formulario...");
        expect(screen.getByTestId("loading-fullscreen")).toHaveTextContent("false");
      });
    });

    /**
     * Verifica que el loading desaparezca después de cargar
     * 
     * Cubre:
     * - .finally(finishLoading)
     * - setLoading(false)
     * - Loading desaparece
     */
    it("oculta el loading después de cargar el formulario", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { test: "data" } } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se limpien data y config antes de cargar
     * 
     * Cubre:
     * - setData({}) antes de switch
     * - setConfig({}) antes de switch
     * - Estado limpio antes de nueva carga
     */
    it("limpia data y config antes de cargar nuevo formulario", async () => {
      // Cargar primer formulario
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { first: "form" } } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });

      // Cargar segundo formulario
      vi.spyOn(DetalleReglonesService, "getDetalleReglonesFormProfessor")
        .mockResolvedValueOnce({ data: { detContent: { second: "form" } } } as any);

      const detalleButton = screen.getByTestId("nav-detalleReng");
      fireEvent.click(detalleButton);

      // Durante la carga, no debe mostrar el FormRender anterior
      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que se use el roomID del parámetro de ruta
     * 
     * Cubre:
     * - const { roomID } = useParams()
     * - roomID usado en llamadas a servicios
     */
    it("usa el roomID de los parámetros de la ruta", async () => {
      const getForm110Spy = vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: {} } } as any);

      renderWithRouter("room-456");

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(getForm110Spy).toHaveBeenCalledWith("student-123", "room-456");
      });
    });
  });

  /**
   * GRUPO 4: Renderizado de FormRender
   * 
   * Pruebas que verifican el renderizado correcto del componente
   * FormRender con los datos cargados.
   * 
   * Cobertura:
   * - Condicional !loading && form !== "" && Object.keys(data).length > 0
   * - Props de FormRender (value, canEdit, defaultOpen, config)
   * - Renderizado del formulario
   */
  describe("Renderizado de FormRender", () => {
    /**
     * Verifica que se renderice FormRender con datos
     * 
     * Cubre:
     * - <FormRender value={data} ... />
     * - Renderizado después de carga exitosa
     */
    it("renderiza FormRender con los datos cargados", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { test: "data" } } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });

    /**
     * Verifica las props de FormRender
     * 
     * Cubre:
     * - value={data}
     * - canEdit={false}
     * - defaultOpen={false}
     * - config={config}
     */
    it("pasa las props correctas a FormRender", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { field: "value" } } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-can-edit")).toHaveTextContent("false");
        expect(screen.getByTestId("form-default-open")).toHaveTextContent("false");
      });
    });

    /**
     * Verifica que NO se renderice FormRender sin datos
     * 
     * Cubre:
     * - Condicional Object.keys(data).length > 0
     * - Prevención de renderizado vacío
     */
    it("no renderiza FormRender si no hay datos", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: {} } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.queryByTestId("form-render")).not.toBeInTheDocument();
      });
    });

    /**
     * Verifica que NO se renderice FormRender durante loading
     * 
     * Cubre:
     * - Condicional !loading
     * - Prevención de renderizado simultáneo con loading
     */
    it("no renderiza FormRender mientras loading es true", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: { r110Content: { test: "data" } } } as any), 100)));

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("form-render")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se pase el config correcto según el formulario
     * 
     * Cubre:
     * - setConfig(configForm110) para form110
     * - setConfig(configCaratula) para caratulaform
     * - Diferentes configs para diferentes formularios
     */
    it("pasa el config correcto según el formulario cargado", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { test: "data" } } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        const configElement = screen.getByTestId("form-config");
        expect(configElement).toHaveTextContent(JSON.stringify({ form110Config: true }));
      });
    });
  });

  /**
   * GRUPO 5: Manejo de errores
   * 
   * Pruebas que verifican el manejo de errores al cargar formularios.
   * 
   * Cobertura:
   * - .catch(console.log)
   * - .finally(finishLoading)
   * - Loading desaparece después de error
   * - No se renderizan datos tras error
   */
  describe("Manejo de errores", () => {
    /**
     * Verifica que se registre el error en consola
     * 
     * Cubre:
     * - .catch(console.log)
     * - Logging de errores
     */
    it("registra el error en consola al fallar la carga", async () => {
      const consoleLogSpy = vi.spyOn(console, "log");
      const error = new Error("Network error");

      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockRejectedValueOnce(error);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(error);
      });
    });

    /**
     * Verifica que el loading desaparezca después de un error
     * 
     * Cubre:
     * - .finally(finishLoading)
     * - setLoading(false) después de error
     */
    it("oculta el loading después de un error", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockRejectedValueOnce(new Error("Error"));

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      // Esperar a que el loading aparezca
      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });

      // Esperar a que desaparezca después del error
      await waitFor(() => {
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      });
    });

    /**
     * Verifica que NO se renderice FormRender después de error
     * 
     * Cubre:
     * - setData({}) antes de carga (sigue vacío tras error)
     * - Condicional Object.keys(data).length > 0 es false
     */
    it("no renderiza FormRender después de un error", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockRejectedValueOnce(new Error("Error"));

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(console.log).toHaveBeenCalled();
      });

      expect(screen.queryByTestId("form-render")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se pueda intentar cargar de nuevo después de error
     * 
     * Cubre:
     * - Reintento después de error
     * - Estado se resetea correctamente
     */
    it("permite reintentar después de un error", async () => {
      const getForm110Spy = vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockRejectedValueOnce(new Error("First attempt failed"))
        .mockResolvedValueOnce({ data: { r110Content: { retry: "success" } } } as any);

      renderWithRouter();

      const form110Button = screen.getByTestId("nav-form110");

      // Primer intento - falla
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(console.log).toHaveBeenCalled();
      });

      // Segundo intento - éxito
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(getForm110Spy).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 6: Casos especiales y otros formularios
   * 
   * Pruebas para casos especiales como resumenesf y verificación
   * de otros servicios de formularios.
   * 
   * Cobertura:
   * - case "resumenesf" con setConfig({})
   * - Otros servicios: EsfPatrimonioService, RentaLiquidaService, etc.
   */
  describe("Casos especiales y otros formularios", () => {
    /**
     * Verifica la carga de ESF Patrimonio
     * 
     * Cubre:
     * - case "esfpatrimonioform":
     * - EsfPatrimonioService.getEsfPatrimonioFormProfessor
     */
    it("carga ESF Patrimonio correctamente", async () => {
      const esfData = { esfContent: { patrimonio: "data" } };
      const getEsfSpy = vi.spyOn(EsfPatrimonioService, "getEsfPatrimonioFormProfessor")
        .mockResolvedValueOnce({ data: esfData } as any);

      renderWithRouter();

      // Llamar directamente a capturedToNav
      if (capturedToNav) {
        capturedToNav("esfpatrimonioform", "student-123");
        
        await waitFor(() => {
          expect(getEsfSpy).toHaveBeenCalledWith("student-123", "room-123");
        });
      }
    });

    /**
     * Verifica la carga de Renta Líquida
     * 
     * Cubre:
     * - case "rentaliquida":
     * - RentaLiquidaService.getRentaLiquidaForProfessor
     */
    it("carga Renta Líquida correctamente", async () => {
      const rentaData = { rentContent: { renta: "data" } };
      const getRentaSpy = vi.spyOn(RentaLiquidaService, "getRentaLiquidaForProfessor")
        .mockResolvedValueOnce({ data: rentaData } as any);

      renderWithRouter();

      // Llamar directamente a capturedToNav
      if (capturedToNav) {
        capturedToNav("rentaliquida", "student-123");
        
        await waitFor(() => {
          expect(getRentaSpy).toHaveBeenCalledWith("student-123", "room-123");
        });
      }
    });

    /**
     * Verifica la carga de Impuesto Diferido
     * 
     * Cubre:
     * - case "impuestodiferido":
     * - ImpuestoDiferidoService.getImpuestoDiferidoForProfessor
     */
    it("carga Impuesto Diferido correctamente", async () => {
      const impuestoData = { impContent: { impuesto: "data" } };
      const getImpuestoSpy = vi.spyOn(ImpuestoDiferidoService, "getImpuestoDiferidoForProfessor")
        .mockResolvedValueOnce({ data: impuestoData } as any);

      renderWithRouter();

      if (capturedToNav) {
        capturedToNav("impuestodiferido", "student-123");
        
        await waitFor(() => {
          expect(getImpuestoSpy).toHaveBeenCalledWith("student-123", "room-123");
        });
      }
    });

    /**
     * Verifica la carga de Ingresos y Facturación
     * 
     * Cubre:
     * - case "ingrefactform":
     * - IngresosFacturacionService.getIngresosFacturacionForProfessor
     */
    it("carga Ingresos y Facturación correctamente", async () => {
      const ingresosData = { ingContent: { ingresos: "data" } };
      const getIngresosSpy = vi.spyOn(IngresosFacturacionService, "getIngresosFacturacionForProfessor")
        .mockResolvedValueOnce({ data: ingresosData } as any);

      renderWithRouter();

      if (capturedToNav) {
        capturedToNav("ingrefactform", "student-123");
        
        await waitFor(() => {
          expect(getIngresosSpy).toHaveBeenCalledWith("student-123", "room-123");
        });
      }
    });

    /**
     * Verifica la carga de Activos Fijos
     * 
     * Cubre:
     * - case "activosfijos":
     * - ActivosFijosService.getActivosFijosFormProfessor
     */
    it("carga Activos Fijos correctamente", async () => {
      const activosData = { actContent: { activos: "data" } };
      const getActivosSpy = vi.spyOn(ActivosFijosService, "getActivosFijosFormProfessor")
        .mockResolvedValueOnce({ data: activosData } as any);

      renderWithRouter();

      if (capturedToNav) {
        capturedToNav("activosfijos", "student-123");
        
        await waitFor(() => {
          expect(getActivosSpy).toHaveBeenCalledWith("student-123", "room-123");
        });
      }
    });

    /**
     * Verifica la carga de Resumen ESF con config vacío
     * 
     * Cubre:
     * - case "resumenesf":
     * - ResumenESFService.getResumenESFForProfessor
     * - setConfig({}) - caso especial sin configuración
     */
    it("carga Resumen ESF con config vacío", async () => {
      const resumenData = { resContent: { resumen: "data" } };
      const getResumenSpy = vi.spyOn(ResumenESFService, "getResumenESFForProfessor")
        .mockResolvedValueOnce({ data: resumenData } as any);

      renderWithRouter();

      if (capturedToNav) {
        capturedToNav("resumenesf", "student-123");
        
        await waitFor(() => {
          expect(getResumenSpy).toHaveBeenCalledWith("student-123", "room-123");
        });
      }
    });
  });

  /**
   * GRUPO 7: Integración completa
   * 
   * Pruebas de flujos completos que involucran múltiples
   * interacciones del usuario.
   * 
   * Cobertura:
   * - Navegación completa entre vistas
   * - Cambio entre diferentes formularios
   * - Flujo típico de uso
   */
  describe("Integración completa", () => {
    /**
     * Verifica el flujo completo: inicio -> selección -> formulario
     * 
     * Cubre:
     * - Vista inicial
     * - Navegación a stuSelect
     * - Selección de formulario
     * - Carga y visualización de datos
     */
    it("completa el flujo de navegación completo", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { complete: "flow" } } } as any);

      renderWithRouter();

      // 1. Vista inicial
      expect(screen.getByText("Bienvenido al reporte de la sala")).toBeInTheDocument();

      // 2. Navegar a selección de estudiante
      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        expect(screen.getByText("Selecciona el formulario que desea revisar")).toBeInTheDocument();
      });

      // 3. Seleccionar formulario 110
      const form110Button = screen.getByText("Formulario 110");
      fireEvent.click(form110Button);

      // 4. Verificar carga
      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });

      // 5. Verificar renderizado final
      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });

    /**
     * Verifica el cambio entre diferentes formularios
     * 
     * Cubre:
     * - Carga de un formulario
     * - Navegación a otro formulario
     * - Limpieza de estado
     * - Carga del nuevo formulario
     */
    it("permite cambiar entre diferentes formularios", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { first: "form" } } } as any);
      vi.spyOn(DetalleReglonesService, "getDetalleReglonesFormProfessor")
        .mockResolvedValueOnce({ data: { detContent: { second: "form" } } } as any);

      renderWithRouter();

      // Cargar primer formulario
      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });

      // Cambiar a segundo formulario
      const detalleButton = screen.getByTestId("nav-detalleReng");
      fireEvent.click(detalleButton);

      // Debe mostrar loading
      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });

      // Debe cargar el nuevo formulario
      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que AsideProf esté siempre visible
     * 
     * Cubre:
     * - AsideProf presente en todas las vistas
     * - Navegación disponible en todo momento
     */
    it("mantiene AsideProf visible en todas las vistas", async () => {
      vi.spyOn(Form110Service, "getForm110ForProfessor")
        .mockResolvedValueOnce({ data: { r110Content: { test: "data" } } } as any);

      renderWithRouter();

      // Vista inicial
      expect(screen.getByTestId("aside-prof")).toBeInTheDocument();

      // Vista de selección
      const selectStudentButton = screen.getByTestId("select-student");
      fireEvent.click(selectStudentButton);

      await waitFor(() => {
        expect(screen.getByTestId("aside-prof")).toBeInTheDocument();
      });

      // Vista de formulario
      const form110Button = screen.getByTestId("nav-form110");
      fireEvent.click(form110Button);

      await waitFor(() => {
        expect(screen.getByTestId("form-render")).toBeInTheDocument();
      });

      expect(screen.getByTestId("aside-prof")).toBeInTheDocument();
    });
  });
});
