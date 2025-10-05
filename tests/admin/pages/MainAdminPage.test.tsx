/**
 * ============================================================================
 * SUITE DE PRUEBAS: MainAdminPage Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/admin/pages/MainAdminPage.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para la página principal de
 * administración (MainAdminPage), que muestra la lista completa de profesores
 * del sistema con funcionalidad de búsqueda en tiempo real.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga y visualización de lista de profesores desde el servicio
 * 2. Ordenamiento alfabético automático de profesores
 * 3. Búsqueda/filtrado en tiempo real por nombre de profesor
 * 4. Manejo de estados de carga (useEffect)
 * 5. Manejo de errores del servidor (401, errores generales)
 * 6. Integración con stores (AuthStore, StatusStore)
 * 7. Visualización de mensajes emergentes (PopUpMessage)
 * 8. Integración con componente Professor
 * 9. Callback de actualización (loadProfessors/onRefresh)
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import MainAdminPage from "../../../src/admin/pages/MainAdminPage";
import { ProfessorService } from "../../../src/admin/services/professor.service";
import type { UserModel } from "../../../src/admin/models/User";

// Mock de datos para las pruebas
const mockProfessors: UserModel[] = [
  {
    usuID: "1",
    usuName: "Carlos Pérez",
    usuEmail: "carlos@example.com",
  },
  {
    usuID: "2",
    usuName: "Ana García",
    usuEmail: "ana@example.com",
  },
  {
    usuID: "3",
    usuName: "Bruno López",
    usuEmail: "bruno@example.com",
  },
];

// Mock del AuthStore
const mockUser = {
  usuID: "admin-1",
  usuRole: "admin",
};

let mockAuthStore: {
  user: { usuID: string; usuRole: string } | null;
} = {
  user: mockUser,
};

vi.mock("@/stores/AuthStore", () => ({
  useAuthStore: () => mockAuthStore,
}));

// Mock del StatusStore
const mockSetStatus = vi.fn();
let mockStatusStore: {
  setStatus: typeof mockSetStatus;
  message: string;
  show: boolean;
  title: string;
  type: "info" | "success" | "warning" | "error";
} = {
  setStatus: mockSetStatus,
  message: "",
  show: false,
  title: "",
  type: "info",
};

vi.mock("@/stores/StatusStore", () => ({
  useStatusStore: () => mockStatusStore,
}));

// Mock del componente AdminLayout
vi.mock("@/admin/components/templates/AdminLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="admin-layout">{children}</div>,
}));

// Mock del componente Professor
vi.mock("@/admin/components/organisms/Professor", () => ({
  __esModule: true,
  default: ({ professor, onRefresh }: any) => (
    <div data-testid={`professor-${professor.usuID}`}>
      <h2>{professor.usuName}</h2>
      <p>{professor.usuEmail}</p>
      <button onClick={onRefresh} data-testid={`refresh-${professor.usuID}`}>
        Refresh
      </button>
    </div>
  ),
}));

// Mock del componente PopUpMessage
vi.mock("@/components/molecules/PopUpMessage", () => ({
  __esModule: true,
  default: ({ message, title, onClose, type }: any) => (
    <div data-testid="popup-message">
      <h3 data-testid="popup-title">{title}</h3>
      <p data-testid="popup-message-text">{message}</p>
      <span data-testid="popup-type">{type}</span>
      <button onClick={onClose} data-testid="popup-close">
        Cerrar
      </button>
    </div>
  ),
}));

// Mock de window.alert
const mockAlert = vi.fn();
global.alert = mockAlert;

describe("MainAdminPage component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
    
    // Resetear el estado del AuthStore
    mockAuthStore = {
      user: mockUser,
    };
    
    // Resetear el estado del StatusStore
    mockStatusStore = {
      setStatus: mockSetStatus,
      message: "",
      show: false,
      title: "",
      type: "info",
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Carga inicial y renderizado de profesores
   * 
   * Pruebas que verifican la carga de datos desde el servicio,
   * el renderizado de la lista de profesores y el ordenamiento alfabético.
   * 
   * Cobertura:
   * - useEffect(() => { loadProfessors(); }, [])
   * - ProfessorService.getProfessors()
   * - Ordenamiento con .sort() y localeCompare
   * - setProfessors con datos ordenados
   * - Renderizado del componente Professor por cada profesor
   * - Prop key={professor.usuID}
   * - Props professor y onRefresh
   */
  describe("Carga inicial y renderizado de profesores", () => {
    /**
     * Verifica que se carguen los profesores al montar el componente
     * 
     * Cubre:
     * - useEffect con dependencias vacías []
     * - Llamada a loadProfessors()
     * - ProfessorService.getProfessors() dentro de loadProfessors
     * - setState con setProfessors
     * - Renderizado de cada profesor en el DOM
     */
    it("carga y muestra la lista de profesores al montar el componente", async () => {
      const getProfessorsSpy = vi
        .spyOn(ProfessorService, "getProfessors")
        .mockResolvedValueOnce(mockProfessors);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      // Verificar que se llamó al servicio
      await waitFor(() => {
        expect(getProfessorsSpy).toHaveBeenCalledTimes(1);
      });

      // Verificar que todos los profesores se renderizan
      await waitFor(() => {
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
        expect(screen.getByText("Ana García")).toBeInTheDocument();
        expect(screen.getByText("Bruno López")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que los profesores se ordenen alfabéticamente
     * 
     * Cubre:
     * - Línea: data.sort((a, b) => a.usuName.localeCompare(b.usuName))
     * - Transformación de datos antes de setProfessors
     * - Orden correcto en el renderizado
     */
    it("ordena los profesores alfabéticamente por nombre", async () => {
      const unorderedProfessors: UserModel[] = [
        { usuID: "1", usuName: "Zebra", usuEmail: "z@example.com" },
        { usuID: "2", usuName: "Alpha", usuEmail: "a@example.com" },
        { usuID: "3", usuName: "Mike", usuEmail: "m@example.com" },
      ];

      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce(
        unorderedProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        const professorCards = screen.getAllByTestId(/^professor-/);
        // Verificar que el orden sea: Alpha, Mike, Zebra
        expect(professorCards[0]).toHaveAttribute("data-testid", "professor-2");
        expect(professorCards[1]).toHaveAttribute("data-testid", "professor-3");
        expect(professorCards[2]).toHaveAttribute("data-testid", "professor-1");
      });
    });

    /**
     * Verifica que se renderice el AdminLayout
     * 
     * Cubre:
     * - Uso del componente AdminLayout como wrapper
     * - Estructura general de la página
     */
    it("renderiza dentro del AdminLayout", () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce([]);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      expect(screen.getByTestId("admin-layout")).toBeInTheDocument();
    });

    /**
     * Verifica que cada profesor reciba la prop onRefresh
     * 
     * Cubre:
     * - Prop onRefresh={loadProfessors} pasada a Professor
     * - Función loadProfessors disponible para cada instancia
     */
    it("pasa la función onRefresh a cada componente Professor", async () => {
      const getProfessorsSpy = vi
        .spyOn(ProfessorService, "getProfessors")
        .mockResolvedValueOnce(mockProfessors);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("professor-1")).toBeInTheDocument();
      });

      // Simular click en refresh del primer profesor
      const refreshButton = screen.getByTestId("refresh-1");
      fireEvent.click(refreshButton);

      // Debe llamar nuevamente a getProfessors
      await waitFor(() => {
        expect(getProfessorsSpy).toHaveBeenCalledTimes(2);
      });
    });
  });

  /**
   * GRUPO 2: Funcionalidad de búsqueda
   * 
   * Pruebas que verifican el filtrado en tiempo real de profesores
   * mediante el campo de búsqueda.
   * 
   * Cobertura:
   * - Estado searchTerm (useState)
   * - handleInputChange con setSearchTerm
   * - Filtrado con .filter() y .includes()
   * - toLowerCase() para búsqueda case-insensitive
   * - Renderizado condicional basado en filteredProfessors
   * - Input con value={searchTerm} y onChange
   */
  describe("Funcionalidad de búsqueda", () => {
    /**
     * Verifica que se renderice el campo de búsqueda
     * 
     * Cubre:
     * - Input con placeholder="Buscar"
     * - Icono FaSearch
     * - value={searchTerm} en el input
     */
    it("renderiza el campo de búsqueda con placeholder", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce([]);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText("Buscar");
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveValue("");
    });

    /**
     * Verifica que el input actualice el estado searchTerm
     * 
     * Cubre:
     * - onChange={handleInputChange}
     * - e.target.value en handleInputChange
     * - setSearchTerm(e.target.value)
     * - Re-renderizado con nuevo valor
     */
    it("actualiza el searchTerm cuando el usuario escribe", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce(
        mockProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText("Buscar");

      fireEvent.change(searchInput, { target: { value: "Carlos" } });

      expect(searchInput).toHaveValue("Carlos");
    });

    /**
     * Verifica que se filtren los profesores según el término de búsqueda
     * 
     * Cubre:
     * - const filteredProfessors = professors.filter(...)
     * - professor.usuName.toLowerCase().includes(searchTerm.toLowerCase())
     * - Renderizado solo de profesores que coinciden con la búsqueda
     * - Ocultamiento de profesores que no coinciden
     */
    it("filtra profesores por nombre al escribir en el buscador", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce(
        mockProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      // Esperar a que carguen los profesores
      await waitFor(() => {
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Buscar");

      // Filtrar por "Carlos"
      fireEvent.change(searchInput, { target: { value: "Carlos" } });

      await waitFor(() => {
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
        expect(screen.queryByText("Ana García")).not.toBeInTheDocument();
        expect(screen.queryByText("Bruno López")).not.toBeInTheDocument();
      });
    });

    /**
     * Verifica que la búsqueda sea case-insensitive
     * 
     * Cubre:
     * - .toLowerCase() en ambos lados de includes()
     * - Búsqueda funciona con mayúsculas, minúsculas o mezcla
     */
    it("la búsqueda es case-insensitive", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce(
        mockProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Ana García")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Buscar");

      // Buscar con minúsculas
      fireEvent.change(searchInput, { target: { value: "ana" } });

      await waitFor(() => {
        expect(screen.getByText("Ana García")).toBeInTheDocument();
        expect(screen.queryByText("Carlos Pérez")).not.toBeInTheDocument();
      });

      // Buscar con mayúsculas
      fireEvent.change(searchInput, { target: { value: "ANA" } });

      await waitFor(() => {
        expect(screen.getByText("Ana García")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que se muestren todos los profesores cuando la búsqueda está vacía
     * 
     * Cubre:
     * - Búsqueda con string vacío muestra todos los profesores
     * - Reinicio del filtro
     */
    it("muestra todos los profesores cuando el campo de búsqueda está vacío", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce(
        mockProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Buscar");

      // Filtrar
      fireEvent.change(searchInput, { target: { value: "Carlos" } });
      expect(screen.queryByText("Ana García")).not.toBeInTheDocument();

      // Limpiar búsqueda
      fireEvent.change(searchInput, { target: { value: "" } });

      await waitFor(() => {
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
        expect(screen.getByText("Ana García")).toBeInTheDocument();
        expect(screen.getByText("Bruno López")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que no se muestren profesores cuando no hay coincidencias
     * 
     * Cubre:
     * - filteredProfessors vacío cuando no hay coincidencias
     * - .map() sobre array vacío no renderiza nada
     */
    it("no muestra profesores cuando no hay coincidencias en la búsqueda", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce(
        mockProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Buscar");

      fireEvent.change(searchInput, { target: { value: "XYZ123" } });

      await waitFor(() => {
        expect(screen.queryByText("Carlos Pérez")).not.toBeInTheDocument();
        expect(screen.queryByText("Ana García")).not.toBeInTheDocument();
        expect(screen.queryByText("Bruno López")).not.toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 3: Manejo de errores
   * 
   * Pruebas que verifican el comportamiento del componente cuando
   * ocurren errores al cargar los profesores.
   * 
   * Cobertura:
   * - Bloque .catch() de loadProfessors
   * - Manejo de error 401 (no autorizado)
   * - setProfessors([]) cuando error 401
   * - alert() cuando error general y user existe
   * - No mostrar alert cuando no hay usuario autenticado
   */
  describe("Manejo de errores", () => {
    /**
     * Verifica el manejo del error 401 (no autorizado)
     * 
     * Cubre:
     * - if (err?.response?.status === 401)
     * - setProfessors([]) para limpiar la lista
     * - return para salir sin mostrar alert
     */
    it("maneja el error 401 limpiando la lista de profesores", async () => {
      const error401 = {
        response: {
          status: 401,
        },
      };

      vi.spyOn(ProfessorService, "getProfessors").mockRejectedValueOnce(
        error401
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        // No debe mostrar profesores
        expect(screen.queryByText("Carlos Pérez")).not.toBeInTheDocument();
        // No debe mostrar alert
        expect(mockAlert).not.toHaveBeenCalled();
      });
    });

    /**
     * Verifica que se muestre un alert cuando hay error general
     * 
     * Cubre:
     * - Bloque catch para errores que no son 401
     * - if (user) para verificar que hay usuario autenticado
     * - alert("Error al cargar los profesores")
     */
    it("muestra un alert cuando hay un error general y el usuario está autenticado", async () => {
      const generalError = new Error("Network error");

      vi.spyOn(ProfessorService, "getProfessors").mockRejectedValueOnce(
        generalError
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Error al cargar los profesores");
      });
    });

    /**
     * Verifica que no se muestre alert si no hay usuario autenticado
     * 
     * Cubre:
     * - Condición if (user) en el catch
     * - No ejecutar alert cuando user es null
     * - Evitar alertas cuando el usuario no está logueado
     */
    it("no muestra alert cuando hay error pero no hay usuario autenticado", async () => {
      // Modificar el mock para que no haya usuario
      mockAuthStore = {
        user: null,
      };

      const generalError = new Error("Network error");

      vi.spyOn(ProfessorService, "getProfessors").mockRejectedValueOnce(
        generalError
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockAlert).not.toHaveBeenCalled();
      });
    });

    /**
     * Verifica que errores sin respuesta HTTP se manejen correctamente
     * 
     * Cubre:
     * - err?.response?.status con encadenamiento opcional
     * - Errores que no tienen estructura de respuesta HTTP
     */
    it("maneja errores sin estructura de respuesta HTTP", async () => {
      const errorWithoutResponse = new Error("Unknown error");

      vi.spyOn(ProfessorService, "getProfessors").mockRejectedValueOnce(
        errorWithoutResponse
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Error al cargar los profesores");
      });
    });
  });

  /**
   * GRUPO 4: Integración con PopUpMessage
   * 
   * Pruebas que verifican la integración con el sistema de mensajes
   * emergentes a través del StatusStore.
   * 
   * Cobertura:
   * - useStatusStore hook
   * - Destructuring de show, message, title, type, setStatus
   * - Renderizado condicional: {show && <PopUpMessage>}
   * - Props de PopUpMessage
   * - onClose que llama a setStatus
   */
  describe("Integración con PopUpMessage", () => {
    /**
     * Verifica que no se muestre el popup inicialmente
     * 
     * Cubre:
     * - Estado inicial de show (false)
     * - Renderizado condicional que oculta el popup
     */
    it("no muestra el popup inicialmente", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce([]);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      expect(screen.queryByTestId("popup-message")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se muestre el popup cuando show es true
     * 
     * Cubre:
     * - Renderizado condicional: {show && <PopUpMessage>}
     * - Props: message, title, type, onClose
     */
    it("muestra el popup cuando show es true en el StatusStore", async () => {
      // Modificar el mock del StatusStore
      mockStatusStore = {
        setStatus: mockSetStatus,
        message: "Operación exitosa",
        show: true,
        title: "Éxito",
        type: "success" as const,
      };

      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce([]);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("popup-message")).toBeInTheDocument();
        expect(screen.getByTestId("popup-title")).toHaveTextContent("Éxito");
        expect(screen.getByTestId("popup-message-text")).toHaveTextContent(
          "Operación exitosa"
        );
        expect(screen.getByTestId("popup-type")).toHaveTextContent("success");
      });
    });

    /**
     * Verifica que el botón de cerrar llame a setStatus correctamente
     * 
     * Cubre:
     * - onClose={() => setStatus({ show: false, message: "", title: "", type: "info" })}
     * - Reseteo del estado del popup
     */
    it("cierra el popup correctamente cuando se hace click en cerrar", async () => {
      mockStatusStore = {
        setStatus: mockSetStatus,
        message: "Test message",
        show: true,
        title: "Test title",
        type: "info",
      };

      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce([]);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      const closeButton = screen.getByTestId("popup-close");
      fireEvent.click(closeButton);

      expect(mockSetStatus).toHaveBeenCalledWith({
        show: false,
        message: "",
        title: "",
        type: "info",
      });
    });
  });

  /**
   * GRUPO 5: Integración completa y flujos de usuario
   * 
   * Pruebas que verifican el flujo completo de interacción del usuario
   * y la integración de múltiples funcionalidades.
   * 
   * Cobertura:
   * - Flujo completo: cargar -> buscar -> refrescar
   * - Integración entre componentes
   * - Estados múltiples actuando en conjunto
   */
  describe("Integración completa y flujos de usuario", () => {
    /**
     * Verifica el flujo completo: cargar, buscar, refrescar
     * 
     * Cubre:
     * - useEffect inicial
     * - Búsqueda con filtrado
     * - onRefresh desde componente Professor
     * - Recarga de datos completa
     * - Limpieza de filtro tras recarga
     */
    it("flujo completo: carga inicial, búsqueda y refresh", async () => {
      const getProfessorsSpy = vi
        .spyOn(ProfessorService, "getProfessors")
        .mockResolvedValue(mockProfessors);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      // 1. Carga inicial
      await waitFor(() => {
        expect(getProfessorsSpy).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
        expect(screen.getByText("Ana García")).toBeInTheDocument();
        expect(screen.getByText("Bruno López")).toBeInTheDocument();
      });

      // 2. Buscar un profesor
      const searchInput = screen.getByPlaceholderText("Buscar");
      fireEvent.change(searchInput, { target: { value: "Ana" } });

      await waitFor(() => {
        expect(screen.getByText("Ana García")).toBeInTheDocument();
        expect(screen.queryByText("Carlos Pérez")).not.toBeInTheDocument();
      });

      // 3. Refrescar desde un componente Professor
      const refreshButton = screen.getByTestId("refresh-2");
      fireEvent.click(refreshButton);

      await waitFor(() => {
        expect(getProfessorsSpy).toHaveBeenCalledTimes(2);
      });

      // La búsqueda sigue activa, solo se ve Ana
      expect(screen.getByText("Ana García")).toBeInTheDocument();
    });

    /**
     * Verifica que el componente maneje una lista vacía correctamente
     * 
     * Cubre:
     * - professors.length === 0
     * - .map() sobre array vacío
     * - No renderizado de componentes Professor
     */
    it("maneja correctamente una lista vacía de profesores", async () => {
      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValueOnce([]);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId(/^professor-/)).not.toBeInTheDocument();
      });

      // El campo de búsqueda sigue visible
      expect(screen.getByPlaceholderText("Buscar")).toBeInTheDocument();
    });

    /**
     * Verifica la recarga de profesores cuando se agrega uno nuevo
     * 
     * Cubre:
     * - Cambio en la lista de profesores tras refresh
     * - setState con nuevos datos
     * - Re-renderizado con lista actualizada
     */
    it("actualiza la lista cuando se agrega un nuevo profesor", async () => {
      const initialProfessor: UserModel = {
        usuID: "100",
        usuName: "David Martínez",
        usuEmail: "david@example.com",
      };

      const updatedProfessors: UserModel[] = [
        initialProfessor,
        { usuID: "101", usuName: "Elena Rodríguez", usuEmail: "elena@example.com" },
      ];

      const getProfessorsSpy = vi
        .spyOn(ProfessorService, "getProfessors")
        .mockResolvedValueOnce([initialProfessor])
        .mockResolvedValueOnce(updatedProfessors);

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      // Carga inicial: solo 1 profesor
      await waitFor(() => {
        expect(screen.getByText("David Martínez")).toBeInTheDocument();
        expect(screen.queryByText("Elena Rodríguez")).not.toBeInTheDocument();
      });

      // Verificar que solo hay un profesor
      expect(screen.getAllByTestId(/^professor-/).length).toBe(1);

      // Simular refresh
      const refreshButton = screen.getByTestId("refresh-100");
      fireEvent.click(refreshButton);

      // Después del refresh: 2 profesores
      await waitFor(() => {
        expect(getProfessorsSpy).toHaveBeenCalledTimes(2);
        expect(screen.getByText("David Martínez")).toBeInTheDocument();
        expect(screen.getByText("Elena Rodríguez")).toBeInTheDocument();
      });

      // Verificar que ahora hay dos profesores
      expect(screen.getAllByTestId(/^professor-/).length).toBe(2);
    });

    /**
     * Verifica que el ordenamiento se mantenga después de refresh
     * 
     * Cubre:
     * - Aplicación de .sort() en cada llamada a loadProfessors
     * - Consistencia del ordenamiento
     */
    it("mantiene el ordenamiento alfabético después de refresh", async () => {
      const unorderedProfessors: UserModel[] = [
        { usuID: "3", usuName: "Zebra", usuEmail: "z@example.com" },
        { usuID: "1", usuName: "Alpha", usuEmail: "a@example.com" },
        { usuID: "2", usuName: "Mike", usuEmail: "m@example.com" },
      ];

      vi.spyOn(ProfessorService, "getProfessors").mockResolvedValue(
        unorderedProfessors
      );

      render(
        <MemoryRouter>
          <MainAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        const professorCards = screen.getAllByTestId(/^professor-/);
        expect(professorCards[0]).toHaveAttribute("data-testid", "professor-1");
        expect(professorCards[1]).toHaveAttribute("data-testid", "professor-2");
        expect(professorCards[2]).toHaveAttribute("data-testid", "professor-3");
      });

      // Hacer refresh
      const refreshButton = screen.getByTestId("refresh-1");
      fireEvent.click(refreshButton);

      // Verificar que sigue ordenado
      await waitFor(() => {
        const professorCards = screen.getAllByTestId(/^professor-/);
        expect(professorCards[0]).toHaveAttribute("data-testid", "professor-1");
        expect(professorCards[1]).toHaveAttribute("data-testid", "professor-2");
        expect(professorCards[2]).toHaveAttribute("data-testid", "professor-3");
      });
    });
  });
});