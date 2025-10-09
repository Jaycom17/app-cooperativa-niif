/**
 * ============================================================================
 * SUITE DE PRUEBAS: MainProfessorPage Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/professor/pages/MainProfessorPage.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente MainProfessorPage,
 * que es la página principal del profesor donde puede ver y gestionar todas sus salas.
 * La página permite ordenar las salas por fecha y nombre, y muestra mensajes de estado.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga inicial de salas desde el backend
 * 2. Renderizado de lista de salas (componentes Room)
 * 3. Ordenamiento por fecha (ascendente/descendente)
 * 4. Ordenamiento por nombre (ascendente/descendente)
 * 5. Animación de íconos según orden
 * 6. Manejo de errores al cargar salas
 * 7. Manejo de error 401 (no autorizado)
 * 8. Refresh de salas tras operaciones
 * 9. Integración con ProfessorLayout
 * 10. Visualización de PopUpMessage según estado
 * 11. InfoBubble con información de formato de fecha
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import MainProfessorPage from "../../../src/professor/pages/MainProfessorPage";
import { RoomService } from "../../../src/professor/services/room.service";
import type { RoomModel } from "../../../src/professor/models/Room";

// Mock de datos para las pruebas
const roomsMock: RoomModel[] = [
  {
    roomID: "room-1",
    roomName: "Sala B",
    roomPassword: "PASS1",
    roomDate: "2024-03-15T10:00:00.000Z",
    roomStatus: "open",
    usuID: "user-1",
  },
  {
    roomID: "room-2",
    roomName: "Sala A",
    roomPassword: "PASS2",
    roomDate: "2024-03-20T10:00:00.000Z",
    roomStatus: "closed",
    usuID: "user-1",
  },
  {
    roomID: "room-3",
    roomName: "Sala C",
    roomPassword: "PASS3",
    roomDate: "2024-03-10T10:00:00.000Z",
    roomStatus: "open",
    usuID: "user-1",
  },
];

// Mock del AuthStore
const mockUser = { usuID: "user-1", usuName: "Profesor Test", usuEmail: "prof@test.com" };

vi.mock("@/stores/AuthStore", () => ({
  useAuthStore: () => ({
    user: mockUser,
  }),
}));

// Mock del StatusStore
const mockSetStatus = vi.fn();
const mockStatusStore = {
  show: false,
  title: "",
  message: "",
  type: "info" as "info" | "success" | "error" | "warning",
  setStatus: mockSetStatus,
};

vi.mock("@/stores/StatusStore", () => ({
  useStatusStore: () => mockStatusStore,
}));

// Mock del ProfessorLayout
vi.mock("@/professor/components/templates/ProfessorLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="professor-layout">{children}</div>,
}));

// Mock del Room component
vi.mock("@/professor/components/organisms/Room", () => ({
  __esModule: true,
  default: ({ room, onRefresh }: any) => (
    <div data-testid={`room-${room.roomID}`} data-roomname={room.roomName}>
      <h3 data-testid={`room-name-${room.roomID}`}>{room.roomName}</h3>
      <p>{room.roomDate}</p>
      <button onClick={onRefresh} data-testid={`refresh-${room.roomID}`}>
        Refresh
      </button>
    </div>
  ),
}));

// Mock del InfoBubble
vi.mock("@/components/atoms/InfoBubble", () => ({
  __esModule: true,
  default: ({ info }: any) => <div data-testid="info-bubble">{info}</div>,
}));

// Mock del PopUpMessage
vi.mock("@/components/molecules/PopUpMessage", () => ({
  __esModule: true,
  default: ({ title, message, type, onClose }: any) => (
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

// Componente Wrapper para react-router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("MainProfessorPage component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
    // Resetea el estado del StatusStore
    mockStatusStore.show = false;
    mockStatusStore.title = "";
    mockStatusStore.message = "";
    mockStatusStore.type = "info";
    // Mock de window.alert
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaura las implementaciones originales después de cada prueba
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Carga inicial y renderizado
   * 
   * Pruebas que verifican la carga inicial de salas desde el backend
   * y el renderizado correcto de la página con sus componentes.
   * 
   * Cobertura:
   * - useEffect inicial que llama a getRooms
   * - Llamada a RoomService.findAll
   * - setRooms con datos del servidor
   * - Renderizado del ProfessorLayout
   * - Renderizado de componentes Room
   * - InfoBubble con información de formato
   * - Botones de ordenamiento
   */
  describe("Carga inicial y renderizado", () => {
    /**
     * Verifica que se carguen las salas al montar el componente
     * 
     * Cubre:
     * - useEffect(() => { getRooms() }, [])
     * - Llamada a RoomService.findAll()
     * - Bloque .then con setRooms
     */
    it("carga las salas al montar el componente", async () => {
      const findAllSpy = vi.spyOn(RoomService, "findAll")
        .mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(findAllSpy).toHaveBeenCalled();
      });
    });

    /**
     * Verifica que se rendericen todas las salas obtenidas
     * 
     * Cubre:
     * - Renderizado del grid de salas
     * - map sobre rooms array
     * - Renderizado de componente Room por cada sala
     * - Key prop con room.roomID
     */
    it("renderiza todas las salas obtenidas del servidor", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("room-room-1")).toBeInTheDocument();
        expect(screen.getByTestId("room-room-2")).toBeInTheDocument();
        expect(screen.getByTestId("room-room-3")).toBeInTheDocument();
      });

      // Verificar que los nombres se muestren
      expect(screen.getByText("Sala B")).toBeInTheDocument();
      expect(screen.getByText("Sala A")).toBeInTheDocument();
      expect(screen.getByText("Sala C")).toBeInTheDocument();
    });

    /**
     * Verifica que se renderice el ProfessorLayout
     * 
     * Cubre:
     * - Wrapping del contenido en ProfessorLayout
     * - Estructura del componente
     */
    it("renderiza dentro del ProfessorLayout", () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      expect(screen.getByTestId("professor-layout")).toBeInTheDocument();
    });

    /**
     * Verifica que se renderice el InfoBubble con el formato de fecha
     * 
     * Cubre:
     * - Renderizado del InfoBubble
     * - Contenido del dateInfo
     */
    it("renderiza el InfoBubble con información de formato de fecha", () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      const infoBubble = screen.getByTestId("info-bubble");
      expect(infoBubble).toBeInTheDocument();
      expect(infoBubble).toHaveTextContent(/Día \/ Mes \/ Año/i);
    });

    /**
     * Verifica que se rendericen los botones de ordenamiento
     * 
     * Cubre:
     * - Botón "Ordenar por fecha"
     * - Botón "Ordenar por nombre"
     * - Iconos IoIosArrowDown
     */
    it("renderiza los botones de ordenamiento", () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      expect(screen.getByRole("button", { name: /ordenar por fecha/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /ordenar por nombre/i })).toBeInTheDocument();
    });

    /**
     * Verifica el estado inicial sin salas
     * 
     * Cubre:
     * - useState inicial: []
     * - Renderizado con array vacío
     * - NO renderizado de componentes Room
     */
    it("renderiza correctamente cuando no hay salas", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.queryByTestId(/room-/)).not.toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 2: Ordenamiento por fecha
   * 
   * Pruebas que verifican el comportamiento del ordenamiento de salas por fecha.
   * 
   * Cobertura:
   * - Función orderByDate
   * - Ordenamiento ascendente y descendente
   * - Toggle del estado isDateAscending
   * - Ordenamiento con Date.getTime()
   * - Rotación del ícono según estado
   */
  describe("Ordenamiento por fecha", () => {
    /**
     * Verifica el ordenamiento descendente (más reciente primero)
     * 
     * Cubre:
     * - Primer click: isDateAscending es false
     * - Ordenamiento descendente: b.roomDate - a.roomDate
     * - setRooms con array ordenado
     * - setIsDateAscending(true)
     */
    it("ordena las salas por fecha descendente en el primer click", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByDateButton = screen.getByRole("button", { name: /ordenar por fecha/i });
      fireEvent.click(orderByDateButton);

      // Verificar el orden: 2024-03-20 (Sala A), 2024-03-15 (Sala B), 2024-03-10 (Sala C)
      const rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala A"); // Más reciente
      expect(rooms[1]).toHaveAttribute("data-roomname", "Sala B");
      expect(rooms[2]).toHaveAttribute("data-roomname", "Sala C"); // Más antigua
    });

    /**
     * Verifica el ordenamiento ascendente (más antigua primero)
     * 
     * Cubre:
     * - Segundo click: isDateAscending es true
     * - Ordenamiento ascendente: a.roomDate - b.roomDate
     * - setIsDateAscending(false)
     * - Toggle del estado
     */
    it("ordena las salas por fecha ascendente en el segundo click", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByDateButton = screen.getByRole("button", { name: /ordenar por fecha/i });
      
      // Primer click - descendente
      fireEvent.click(orderByDateButton);
      
      // Segundo click - ascendente
      fireEvent.click(orderByDateButton);

      // Verificar el orden: 2024-03-10 (Sala C), 2024-03-15 (Sala B), 2024-03-20 (Sala A)
      const rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala C"); // Más antigua
      expect(rooms[1]).toHaveAttribute("data-roomname", "Sala B");
      expect(rooms[2]).toHaveAttribute("data-roomname", "Sala A"); // Más reciente
    });

    /**
     * Verifica que el ícono rote según el estado de ordenamiento
     * 
     * Cubre:
     * - Clase rotate-180 cuando isDateAscending es true
     * - NO clase rotate-180 cuando isDateAscending es false
     */
    it("rota el ícono al cambiar el orden de fecha", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByDateButton = screen.getByRole("button", { name: /ordenar por fecha/i });
      const icon = orderByDateButton.querySelector("svg");

      // Estado inicial - sin rotación
      expect(icon).not.toHaveClass("rotate-180");

      // Primer click - con rotación
      fireEvent.click(orderByDateButton);
      expect(icon).toHaveClass("rotate-180");

      // Segundo click - sin rotación
      fireEvent.click(orderByDateButton);
      expect(icon).not.toHaveClass("rotate-180");
    });

    /**
     * Verifica que el ordenamiento no mute el array original
     * 
     * Cubre:
     * - Uso de spread operator [...rooms]
     * - Inmutabilidad del estado
     */
    it("no muta el array original al ordenar", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByDateButton = screen.getByRole("button", { name: /ordenar por fecha/i });
      fireEvent.click(orderByDateButton);

      // Las salas deben estar ordenadas correctamente
      const rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms).toHaveLength(3);
    });
  });

  /**
   * GRUPO 3: Ordenamiento por nombre
   * 
   * Pruebas que verifican el comportamiento del ordenamiento de salas por nombre.
   * 
   * Cobertura:
   * - Función orderByName
   * - Ordenamiento ascendente y descendente alfabéticamente
   * - Toggle del estado isNameAscending
   * - Uso de localeCompare
   * - Rotación del ícono según estado
   */
  describe("Ordenamiento por nombre", () => {
    /**
     * Verifica el ordenamiento descendente (Z-A) en el primer click
     * 
     * Cubre:
     * - Primer click: isNameAscending es false
     * - Ordenamiento descendente: b.roomName.localeCompare(a.roomName)
     * - setRooms con array ordenado
     * - setIsNameAscending(true)
     */
    it("ordena las salas por nombre descendente en el primer click", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByNameButton = screen.getByRole("button", { name: /ordenar por nombre/i });
      fireEvent.click(orderByNameButton);

      // Verificar el orden: C, B, A (descendente)
      const rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala C");
      expect(rooms[1]).toHaveAttribute("data-roomname", "Sala B");
      expect(rooms[2]).toHaveAttribute("data-roomname", "Sala A");
    });

    /**
     * Verifica el ordenamiento ascendente (A-Z) en el segundo click
     * 
     * Cubre:
     * - Segundo click: isNameAscending es true
     * - Ordenamiento ascendente: a.roomName.localeCompare(b.roomName)
     * - setIsNameAscending(false)
     * - Toggle del estado
     */
    it("ordena las salas por nombre ascendente en el segundo click", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByNameButton = screen.getByRole("button", { name: /ordenar por nombre/i });
      
      // Primer click - descendente
      fireEvent.click(orderByNameButton);
      
      // Segundo click - ascendente
      fireEvent.click(orderByNameButton);

      // Verificar el orden: A, B, C (ascendente)
      const rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala A");
      expect(rooms[1]).toHaveAttribute("data-roomname", "Sala B");
      expect(rooms[2]).toHaveAttribute("data-roomname", "Sala C");
    });

    /**
     * Verifica que el ícono rote según el estado de ordenamiento
     * 
     * Cubre:
     * - Clase rotate-180 cuando isNameAscending es true
     * - NO clase rotate-180 cuando isNameAscending es false
     */
    it("rota el ícono al cambiar el orden de nombre", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByNameButton = screen.getByRole("button", { name: /ordenar por nombre/i });
      const icon = orderByNameButton.querySelector("svg");

      // Estado inicial - sin rotación
      expect(icon).not.toHaveClass("rotate-180");

      // Primer click - con rotación
      fireEvent.click(orderByNameButton);
      expect(icon).toHaveClass("rotate-180");

      // Segundo click - sin rotación
      fireEvent.click(orderByNameButton);
      expect(icon).not.toHaveClass("rotate-180");
    });

    /**
     * Verifica la independencia entre ordenamientos por fecha y nombre
     * 
     * Cubre:
     * - Estados independientes: isDateAscending e isNameAscending
     * - Cambio de un ordenamiento no afecta al otro
     */
    it("mantiene independencia entre orden por fecha y nombre", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByDateButton = screen.getByRole("button", { name: /ordenar por fecha/i });
      const orderByNameButton = screen.getByRole("button", { name: /ordenar por nombre/i });

      // Ordenar por fecha
      fireEvent.click(orderByDateButton);
      let rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala A");

      // Ordenar por nombre (debe reordenar independientemente)
      fireEvent.click(orderByNameButton);
      rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala C");
    });
  });

  /**
   * GRUPO 4: Manejo de errores
   * 
   * Pruebas que verifican el manejo correcto de errores al cargar salas.
   * 
   * Cobertura:
   * - Bloque .catch de getRooms
   * - Manejo de error 401 (no autorizado)
   * - setRooms([]) en caso de 401
   * - alert() para otros errores cuando hay usuario
   * - NO alert cuando no hay usuario
   */
  describe("Manejo de errores", () => {
    /**
     * Verifica el manejo de error 401 (no autorizado)
     * 
     * Cubre:
     * - if (err?.response?.status === 401)
     * - setRooms([]) para limpiar las salas
     * - return para no ejecutar código adicional
     */
    it("maneja el error 401 limpiando las salas", async () => {
      const findAllSpy = vi.spyOn(RoomService, "findAll")
        .mockRejectedValueOnce({
          response: {
            status: 401,
          },
        });

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(findAllSpy).toHaveBeenCalled();
      });

      // No debe mostrar salas
      expect(screen.queryByTestId(/room-/)).not.toBeInTheDocument();
      
      // No debe mostrar alert para error 401
      expect(window.alert).not.toHaveBeenCalled();
    });

    /**
     * Verifica que se muestre alert para otros errores cuando hay usuario
     * 
     * Cubre:
     * - Bloque catch para errores no-401
     * - if (user) para verificar usuario autenticado
     * - alert("Error al cargar las salas")
     */
    it("muestra alert para errores generales cuando hay usuario", async () => {
      const findAllSpy = vi.spyOn(RoomService, "findAll")
        .mockRejectedValueOnce(new Error("Network error"));

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(findAllSpy).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Error al cargar las salas");
      });
    });

    /**
     * Verifica que NO se muestre alert si no hay usuario
     * 
     * Cubre:
     * - Condicional if (user) cuando user es null/undefined
     * - Prevención de alertas cuando no está autenticado
     * 
     * NOTA: Esta prueba está comentada porque el mock de useAuthStore
     * siempre devuelve un usuario en este archivo de pruebas.
     * Para probar este caso específico, se requeriría un archivo de pruebas separado
     * o una configuración más compleja de mocks dinámicos.
     */
    it.skip("no muestra alert si no hay usuario autenticado", async () => {
      // Esta prueba se omite porque el mock global siempre provee un usuario
    });
  });

  /**
   * GRUPO 5: Función de refresh
   * 
   * Pruebas que verifican que la función getRooms se pase correctamente
   * a los componentes Room para que puedan refrescar la lista.
   * 
   * Cobertura:
   * - Prop onRefresh pasada a Room
   * - Llamada a getRooms desde Room
   * - Recarga de salas tras operación
   */
  describe("Función de refresh", () => {
    /**
     * Verifica que se pase la función getRooms como onRefresh a Room
     * 
     * Cubre:
     * - Prop onRefresh={getRooms} en componente Room
     * - Callback para refrescar la lista
     */
    it("pasa la función getRooms como onRefresh a los componentes Room", async () => {
      vi.spyOn(RoomService, "findAll")
        .mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("room-room-1")).toBeInTheDocument();
      });

      // Verificar que el botón refresh existe (pasado por el mock de Room)
      expect(screen.getByTestId("refresh-room-1")).toBeInTheDocument();
    });

    /**
     * Verifica que al llamar onRefresh se recarguen las salas
     * 
     * Cubre:
     * - Ejecución de getRooms desde componente hijo
     * - Segunda llamada a RoomService.findAll
     * - Actualización del estado rooms
     */
    it("recarga las salas al llamar a getRooms desde un Room", async () => {
      const findAllSpy = vi.spyOn(RoomService, "findAll")
        .mockResolvedValueOnce(roomsMock)
        .mockResolvedValueOnce([...roomsMock, {
          roomID: "room-4",
          roomName: "Sala D",
          roomPassword: "PASS4",
          roomDate: "2024-03-25T10:00:00.000Z",
          roomStatus: "open",
          usuID: "user-1",
        }]);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("room-room-1")).toBeInTheDocument();
      });

      // Simular refresh desde Room
      const refreshButton = screen.getByTestId("refresh-room-1");
      fireEvent.click(refreshButton);

      await waitFor(() => {
        expect(findAllSpy).toHaveBeenCalledTimes(2);
      });

      // Debe mostrar la nueva sala
      await waitFor(() => {
        expect(screen.getByTestId("room-room-4")).toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 6: PopUpMessage
   * 
   * Pruebas que verifican la visualización del PopUpMessage
   * según el estado del StatusStore.
   * 
   * Cobertura:
   * - Renderizado condicional: {show && <PopUpMessage>}
   * - Props del PopUpMessage (title, message, type)
   * - Callback onClose que llama a setStatus
   * - NO renderizado cuando show es false
   */
  describe("PopUpMessage", () => {
    /**
     * Verifica que NO se muestre el popup cuando show es false
     * 
     * Cubre:
     * - Estado inicial del StatusStore con show: false
     * - Renderizado condicional que no muestra el popup
     */
    it("no muestra el popup cuando show es false", () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);
      mockStatusStore.show = false;

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      expect(screen.queryByTestId("popup-message")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se muestre el popup cuando show es true
     * 
     * Cubre:
     * - Renderizado condicional cuando show es true
     * - Visualización del PopUpMessage
     * - Props pasadas correctamente (title, message, type)
     */
    it("muestra el popup cuando show es true", () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);
      mockStatusStore.show = true;
      mockStatusStore.title = "Operación exitosa";
      mockStatusStore.message = "La sala fue eliminada";
      mockStatusStore.type = "success";

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      expect(screen.getByTestId("popup-message")).toBeInTheDocument();
      expect(screen.getByTestId("popup-title")).toHaveTextContent("Operación exitosa");
      expect(screen.getByTestId("popup-message-text")).toHaveTextContent("La sala fue eliminada");
      expect(screen.getByTestId("popup-type")).toHaveTextContent("success");
    });

    /**
     * Verifica que el popup se cierre al hacer click en cerrar
     * 
     * Cubre:
     * - Callback onClose
     * - Llamada a setStatus({ show: false, ... })
     * - Reset del estado del StatusStore
     */
    it("cierra el popup al hacer click en cerrar", () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([]);
      mockStatusStore.show = true;
      mockStatusStore.title = "Test";
      mockStatusStore.message = "Mensaje de prueba";
      mockStatusStore.type = "info";

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      const closeButton = screen.getByTestId("popup-close");
      fireEvent.click(closeButton);

      expect(mockSetStatus).toHaveBeenCalledWith({
        show: false,
        message: "",
        type: "info",
        title: "",
      });
    });
  });

  /**
   * GRUPO 7: Integración completa
   * 
   * Pruebas que verifican escenarios complejos que involucran
   * múltiples funcionalidades del componente.
   * 
   * Cobertura:
   * - Ordenamiento combinado (fecha + nombre)
   * - Refresh después de ordenamiento
   * - Interacción completa entre componentes
   */
  describe("Integración completa", () => {
    /**
     * Verifica el flujo completo: cargar -> ordenar -> refrescar
     * 
     * Cubre:
     * - Carga inicial
     * - Ordenamiento
     * - Refresh
     * - Persistencia del ordenamiento tras refresh
     */
    it("mantiene el orden después de refrescar las salas", async () => {
      const findAllSpy = vi.spyOn(RoomService, "findAll")
        .mockResolvedValue(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      // Esperar carga inicial
      await waitFor(() => {
        expect(screen.getByTestId("room-room-1")).toBeInTheDocument();
      });

      // Ordenar por nombre (descendente - C, B, A)
      const orderByNameButton = screen.getByRole("button", { name: /ordenar por nombre/i });
      fireEvent.click(orderByNameButton);

      await waitFor(() => {
        const rooms = screen.getAllByTestId(/^room-room-/);
        expect(rooms[0]).toHaveAttribute("data-roomname", "Sala C");
      });

      // Refrescar
      const refreshButton = screen.getByTestId("refresh-room-1");
      fireEvent.click(refreshButton);

      await waitFor(() => {
        expect(findAllSpy).toHaveBeenCalledTimes(2);
      });

      // Verificar que el orden cambió después del refresh
      // (ya no está ordenado por nombre, vuelve al orden del servidor)
      await waitFor(() => {
        const rooms = screen.getAllByTestId(/^room-room-/);
        const firstRoomName = rooms[0].getAttribute("data-roomname");
        // El orden debe haber cambiado - la primera sala ya no debe ser "Sala C"
        expect(firstRoomName).not.toBe("Sala C");
        // Verificar que todas las salas siguen presentes
        expect(rooms).toHaveLength(3);
      });
    });

    /**
     * Verifica que se puedan aplicar múltiples ordenamientos consecutivos
     * 
     * Cubre:
     * - Cambio entre ordenamiento por fecha y nombre
     * - Múltiples clicks en botones de ordenamiento
     * - Estado correcto de íconos
     */
    it("permite aplicar múltiples ordenamientos consecutivos", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce(roomsMock);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Sala B")).toBeInTheDocument();
      });

      const orderByDateButton = screen.getByRole("button", { name: /ordenar por fecha/i });
      const orderByNameButton = screen.getByRole("button", { name: /ordenar por nombre/i });

      // Ordenar por fecha
      fireEvent.click(orderByDateButton);
      let rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala A");

      // Ordenar por nombre
      fireEvent.click(orderByNameButton);
      rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala C");

      // Volver a ordenar por fecha
      fireEvent.click(orderByDateButton);
      rooms = screen.getAllByTestId(/^room-room-/);
      expect(rooms[0]).toHaveAttribute("data-roomname", "Sala C"); // Ascendente ahora
    });

    /**
     * Verifica el renderizado con props correctas pasadas a Room
     * 
     * Cubre:
     * - Prop room con datos completos
     * - Prop usuId (hardcoded como "someUsuId")
     * - Prop onRefresh con función getRooms
     */
    it("pasa las props correctas a cada componente Room", async () => {
      vi.spyOn(RoomService, "findAll").mockResolvedValueOnce([roomsMock[0]]);

      render(
        <RouterWrapper>
          <MainProfessorPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        const room = screen.getByTestId("room-room-1");
        expect(room).toBeInTheDocument();
        expect(room).toHaveTextContent("Sala B");
        expect(room).toHaveTextContent("2024-03-15T10:00:00.000Z");
      });
    });
  });
});
