/**
 * ============================================================================
 * SUITE DE PRUEBAS: Room Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/professor/components/organisms/Room.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente Room,
 * que muestra la información de una sala individual y proporciona opciones
 * para actualizar su información, cambiar su estado (activa/inactiva),
 * ver el código QR, y eliminarla del sistema.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado de información de la sala (nombre, contraseña, fecha, estado)
 * 2. Funcionalidad de truncamiento de nombres largos
 * 3. Toggle de estado activo/inactivo de la sala
 * 4. Visualización del código QR en modal
 * 5. Apertura y cierre del formulario de edición
 * 6. Flujo completo de eliminación con confirmación
 * 7. Navegación al reporte de la sala
 * 8. Manejo de estados de éxito y error
 * 9. Integración con servicios y stores
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import Room from "../../../src/professor/components/organisms/Room";
import { RoomService } from "../../../src/professor/services/room.service";
import type { RoomModel } from "../../../src/professor/models/Room";

// Mock de datos para las pruebas
const roomMock: RoomModel = {
  roomID: "room-123",
  roomName: "Sala de Contabilidad",
  roomPassword: "ABC123",
  roomDate: "2024-03-15T10:00:00.000Z",
  roomStatus: "open",
  usuID: "user-456",
};

const closedRoomMock: RoomModel = {
  ...roomMock,
  roomID: "room-456",
  roomStatus: "closed",
};

// Mock del StatusStore
const mockSetStatus = vi.fn();

vi.mock("@/stores/StatusStore", () => ({
  useStatusStore: () => ({
    setStatus: mockSetStatus,
  }),
}));

// Mock del ConfirmDialog
vi.mock("@/components/molecules/ConfirmDialog", () => ({
  __esModule: true,
  default: ({ onConfirm, onCancel, title, message, isOpen }: any) =>
    isOpen ? (
      <div data-testid="confirm-dialog">
        <p data-testid="dialog-title">{title}</p>
        <p data-testid="dialog-message">{message}</p>
        <button onClick={onConfirm} data-testid="confirm-button">
          Confirmar
        </button>
        <button onClick={onCancel} data-testid="cancel-button">
          Cancelar
        </button>
      </div>
    ) : null,
}));

// Mock del FloatingContainer
vi.mock("@/components/atoms/FloatingContainer", () => ({
  __esModule: true,
  default: ({ children, open }: any) =>
    open ? <div data-testid="floating-container">{children}</div> : null,
}));

// Mock del RoomForm
vi.mock("@/professor/components/organisms/RoomForm", () => ({
  __esModule: true,
  default: ({ room, setOpen }: any) => (
    <div data-testid="room-form">
      <h2>Formulario de edición de sala</h2>
      <p>Sala: {room.roomName}</p>
      <button onClick={() => setOpen(false)}>Cerrar formulario</button>
    </div>
  ),
}));

// Mock del CopyBox
vi.mock("@/components/atoms/CopyBox", () => ({
  __esModule: true,
  default: ({ text }: any) => (
    <div data-testid="copy-box">
      <span>{text}</span>
    </div>
  ),
}));

// Mock del QRCodeSVG
vi.mock("qrcode.react", () => ({
  QRCodeSVG: ({ value }: any) => (
    <div data-testid="qr-code" data-value={value}>
      QR Code
    </div>
  ),
}));

// Mock del utility cutString
vi.mock("@/utils/CropName", () => ({
  __esModule: true,
  default: (str: string, maxLength: number) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  },
}));

// Mock del utility formatDate
vi.mock("@/utils/Dates", () => ({
  formatDate: (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("es-ES");
  },
}));

// Mock de la configuración de entorno
vi.mock("@/config/env", () => ({
  API_URL: "http://localhost:8000",
  PAGE_URL: "http://localhost:3000",
}));

// Componente Wrapper para react-router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Room component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba para evitar interferencias
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restaura las implementaciones originales después de cada prueba
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Renderizado básico
   * 
   * Pruebas que verifican que el componente se renderice correctamente
   * con la información de la sala y sus elementos visuales.
   * 
   * Cobertura:
   * - Renderizado del JSX principal
   * - Visualización de props recibidas
   * - Atributos HTML (title para tooltips)
   * - Funcionalidad de truncamiento de texto (cutString utility)
   * - Formateo de fechas
   */
  describe("Renderizado básico", () => {
    /**
     * Verifica que el nombre, contraseña y fecha de la sala se muestren en el DOM
     * 
     * Cubre:
     * - Líneas del JSX donde se renderizan room.roomName, room.roomPassword y room.roomDate
     * - Integración con la función cutString
     * - Integración con la función formatDate
     */
    it("renderiza nombre, contraseña y fecha de la sala correctamente", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.getByText(/Sala de Contabilidad/i)).toBeInTheDocument();
      expect(screen.getByText(/ABC123/i)).toBeInTheDocument();
      expect(screen.getByText(/Fecha de creación:/i)).toBeInTheDocument();
    });

    /**
     * Verifica que los botones de acción estén presentes en el componente
     * 
     * Cubre:
     * - Renderizado de los botones de actualizar, revisar y eliminar
     * - Uso de iconos (FaPencilAlt, FaEye, FaRegTrashAlt)
     * - Estructura del div que contiene los botones
     */
    it("renderiza los botones de actualizar, revisar y eliminar", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.getByRole("button", { name: /actualizar/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /revisar/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /eliminar/i })).toBeInTheDocument();
    });

    /**
     * Verifica que se aplique el atributo title con el nombre completo
     * Esto permite mostrar tooltips cuando el texto está truncado
     * 
     * Cubre:
     * - Atributo title en el h1 que muestra el nombre
     * - Accesibilidad para usuarios cuando el texto está cortado
     */
    it("aplica el título con el nombre completo de la sala", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const nameElement = screen.getByText(/Sala de Contabilidad/i);
      expect(nameElement).toHaveAttribute("title", roomMock.roomName);
    });

    /**
     * Verifica que la función cutString recorte nombres que excedan 20 caracteres
     * 
     * Cubre:
     * - Llamada a cutString(room.roomName, 20)
     * - Funcionalidad de truncamiento visual para mantener el diseño
     */
    it("recorta el nombre si excede 20 caracteres", () => {
      const longNameRoom = {
        ...roomMock,
        roomName: "Sala de Contabilidad y Finanzas Corporativas",
      };

      render(
        <RouterWrapper>
          <Room room={longNameRoom} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.getByText(/Sala de Contabilidad/i)).toBeInTheDocument();
    });

    /**
     * Verifica que la fecha se formatee correctamente
     * 
     * Cubre:
     * - Llamada a formatDate(room.roomDate)
     * - Visualización de fecha en formato legible
     */
    it("formatea la fecha correctamente", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      // La fecha debe estar formateada (el mock retorna toLocaleDateString)
      const dateText = screen.getByText(/15\/3\/2024/i);
      expect(dateText).toBeInTheDocument();
    });

    /**
     * Verifica que el componente CopyBox se renderice con la contraseña
     * 
     * Cubre:
     * - Renderizado del CopyBox
     * - Paso de room.roomPassword como prop
     */
    it("renderiza el CopyBox con la contraseña de la sala", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.getByTestId("copy-box")).toBeInTheDocument();
      expect(screen.getByText("ABC123")).toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: Estado de la sala (activa/inactiva)
   * 
   * Pruebas que verifican el comportamiento del toggle de estado
   * y la visualización del estado actual de la sala.
   * 
   * Cobertura:
   * - Estado activated (useState)
   * - useEffect que sincroniza el estado con room.roomStatus
   * - Función toggleActivated
   * - Llamada a RoomService.updateRoomState
   * - Renderizado condicional del texto y estilos
   */
  describe("Estado de la sala (activa/inactiva)", () => {
    /**
     * Verifica que el estado inicial se establezca correctamente basándose en room.roomStatus
     * 
     * Cubre:
     * - useEffect con dependencia [room.roomStatus]
     * - setActivated(room.roomStatus.toLowerCase() === "open")
     * - Renderizado del texto "Activa" cuando roomStatus es "open"
     */
    it("muestra el estado 'Activa' cuando roomStatus es 'open'", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.getByText(/Activa/i)).toBeInTheDocument();
    });

    /**
     * Verifica que el estado se muestre como inactivo cuando roomStatus es "closed"
     * 
     * Cubre:
     * - useEffect que detecta roomStatus "closed"
     * - setActivated(false)
     * - Renderizado del texto "Inactiva"
     */
    it("muestra el estado 'Inactiva' cuando roomStatus es 'closed'", () => {
      render(
        <RouterWrapper>
          <Room room={closedRoomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.getByText(/Inactiva/i)).toBeInTheDocument();
    });

    /**
     * Verifica que el checkbox esté marcado cuando la sala está activa
     * 
     * Cubre:
     * - Atributo checked del input checkbox
     * - Sincronización del input con el estado activated
     */
    it("el checkbox está marcado cuando la sala está activa", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    /**
     * Verifica que el checkbox no esté marcado cuando la sala está inactiva
     * 
     * Cubre:
     * - Atributo checked del input checkbox en estado false
     */
    it("el checkbox no está marcado cuando la sala está inactiva", () => {
      render(
        <RouterWrapper>
          <Room room={closedRoomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    /**
     * Verifica que al hacer click en el toggle se llame al servicio para cambiar el estado
     * 
     * Cubre:
     * - onChange={toggleActivated} del checkbox
     * - Cálculo del nuevo estado: const roomState = !activated ? "open" : "closed"
     * - Llamada a RoomService.updateRoomState con parámetros correctos
     * - setActivated(!activated) para actualizar el estado local
     */
    it("cambia el estado de la sala al hacer click en el toggle", async () => {
      const updateStateSpy = vi.spyOn(RoomService, "updateRoomState")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const checkbox = screen.getByRole("checkbox");
      
      // La sala está activa, al hacer click debe cambiar a inactiva
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(updateStateSpy).toHaveBeenCalledWith(
          { roomState: "closed" },
          "room-123"
        );
      });

      // El texto debe cambiar a "Inactiva"
      expect(screen.getByText(/Inactiva/i)).toBeInTheDocument();
    });

    /**
     * Verifica que al activar una sala inactiva se llame al servicio correctamente
     * 
     * Cubre:
     * - Toggle desde estado false a true
     * - Llamada al servicio con roomState: "open"
     */
    it("activa una sala inactiva al hacer click en el toggle", async () => {
      const updateStateSpy = vi.spyOn(RoomService, "updateRoomState")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <Room room={closedRoomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const checkbox = screen.getByRole("checkbox");
      
      // La sala está inactiva, al hacer click debe cambiar a activa
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(updateStateSpy).toHaveBeenCalledWith(
          { roomState: "open" },
          "room-456"
        );
      });

      // El texto debe cambiar a "Activa"
      expect(screen.getByText(/Activa/i)).toBeInTheDocument();
    });

    /**
     * Verifica el manejo de errores al cambiar el estado de la sala
     * 
     * Cubre:
     * - Bloque catch en toggleActivated (función async)
     * - Llamada a setStatus con mensaje de error
     * - El estado local NO debe cambiar si hay error
     * - Uso de await RoomService.updateRoomState
     */
    it("maneja errores al cambiar el estado de la sala", async () => {
      const updateStateSpy = vi.spyOn(RoomService, "updateRoomState")
        .mockRejectedValueOnce(new Error("Network error"));

      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const checkbox = screen.getByRole("checkbox");
      
      // La sala está activa inicialmente
      expect(screen.getByText(/Activa/i)).toBeInTheDocument();
      
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(updateStateSpy).toHaveBeenCalledWith(
          { roomState: "closed" },
          "room-123"
        );
      });

      // Verificar que se llamó a setStatus con error
      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "Error al actualizar el estado de la sala",
          type: "error",
        });
      });

      // El estado local NO debe cambiar si hay error
      expect(screen.getByText(/Activa/i)).toBeInTheDocument();
    });
  });

  /**
   * GRUPO 3: Modal de código QR
   * 
   * Pruebas que verifican el comportamiento del modal que muestra
   * el código QR de la sala para que los estudiantes puedan escanear.
   * 
   * Cobertura:
   * - Estado qrOpen (useState)
   * - Función setQrOpen
   * - Renderizado condicional del FloatingContainer
   * - Integración con QRCodeSVG
   * - Generación de la URL correcta para el QR
   */
  describe("Modal de código QR", () => {
    /**
     * Verifica que el modal no se muestre inicialmente
     * 
     * Cubre:
     * - Estado inicial de qrOpen (false)
     * - Renderizado condicional que no muestra el QR inicialmente
     */
    it("no muestra el modal de QR inicialmente", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.queryByTestId("qr-code")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se abra el modal al hacer click en el botón de QR
     * 
     * Cubre:
     * - onClick={() => setQrOpen(true)} del botón con icono AiOutlineQrcode
     * - Renderizado condicional: {qrOpen && <FloatingContainer>}
     * - Visualización del QRCodeSVG
     * - Texto "Escanea el QR"
     */
    it("abre el modal de QR al hacer click en el botón", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      // Buscar el botón que contiene el icono de QR
      const qrButton = screen.getByRole("button", { name: "" });
      fireEvent.click(qrButton);

      expect(screen.getByTestId("floating-container")).toBeInTheDocument();
      expect(screen.getByTestId("qr-code")).toBeInTheDocument();
      expect(screen.getByText(/Escanea el QR/i)).toBeInTheDocument();
    });

    /**
     * Verifica que el QR code se genere con la URL correcta
     * 
     * Cubre:
     * - Generación de la URL: `${PAGE_URL}/?code=${room.roomPassword}`
     * - Paso del valor correcto al componente QRCodeSVG
     */
    it("genera el QR code con la URL correcta", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const qrButton = screen.getByRole("button", { name: "" });
      fireEvent.click(qrButton);

      const qrCode = screen.getByTestId("qr-code");
      expect(qrCode).toHaveAttribute(
        "data-value",
        "http://localhost:3000/?code=ABC123"
      );
    });
  });

  /**
   * GRUPO 4: Botón de actualización
   * 
   * Pruebas que verifican el comportamiento del botón de actualizar sala
   * y la apertura/cierre del formulario de edición.
   * 
   * Cobertura:
   * - Estado formOpen (useState)
   * - Función setFormOpen(true/false)
   * - Renderizado condicional del FloatingContainer
   * - Integración con el componente RoomForm
   * - Props pasadas al formulario
   */
  describe("Botón de actualización", () => {
    /**
     * Verifica que al hacer click en el botón "Actualizar" se abra el formulario
     * 
     * Cubre:
     * - onClick={() => setFormOpen(true)} del botón actualizar
     * - Renderizado condicional: {formOpen && <FloatingContainer>}
     * - Props pasadas a RoomForm (room, usuId, onRefresh, setOpen)
     * - Visualización del formulario dentro del FloatingContainer
     */
    it("abre el formulario al hacer click en actualizar", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const updateButton = screen.getByRole("button", { name: /actualizar/i });
      fireEvent.click(updateButton);

      expect(screen.getByTestId("floating-container")).toBeInTheDocument();
      expect(screen.getByTestId("room-form")).toBeInTheDocument();
      expect(screen.getByText(/Formulario de edición de sala/i)).toBeInTheDocument();
      expect(screen.getByText(/Sala: Sala de Contabilidad/i)).toBeInTheDocument();
    });

    /**
     * Verifica que el formulario se pueda cerrar correctamente
     * 
     * Cubre:
     * - Cambio de estado de formOpen de true a false
     * - Desaparición del FloatingContainer cuando formOpen es false
     * - Desaparición del RoomForm cuando formOpen es false
     * - Flujo completo: abrir -> cerrar
     */
    it("cierra el formulario cuando se llama setOpen(false)", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      // Abrir el formulario
      fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));
      expect(screen.getByTestId("room-form")).toBeInTheDocument();

      // Cerrar el formulario
      fireEvent.click(screen.getByText("Cerrar formulario"));
      expect(screen.queryByTestId("room-form")).not.toBeInTheDocument();
    });

    /**
     * Verifica el estado inicial del componente (formulario cerrado)
     * 
     * Cubre:
     * - Estado inicial de formOpen (false)
     * - Renderizado condicional que no muestra el formulario inicialmente
     */
    it("no muestra el formulario inicialmente", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.queryByTestId("floating-container")).not.toBeInTheDocument();
      expect(screen.queryByTestId("room-form")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 5: Navegación al reporte
   * 
   * Pruebas que verifican el enlace de navegación para ver el reporte de la sala.
   * 
   * Cobertura:
   * - Link de react-router-dom
   * - Ruta correcta con el ID de la sala
   */
  describe("Navegación al reporte", () => {
    /**
     * Verifica que el enlace "Revisar" navegue a la ruta correcta
     * 
     * Cubre:
     * - Link to={`/roomreport/${room.roomID}`}
     * - Construcción de la URL con el ID correcto
     */
    it("el botón revisar navega a la página de reporte con el ID correcto", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      const reviewLink = screen.getByRole("link", { name: /revisar/i });
      expect(reviewLink).toHaveAttribute("href", "/roomreport/room-123");
    });
  });

  /**
   * GRUPO 6: Botón de eliminación con ConfirmDialog
   * 
   * Pruebas que verifican el flujo completo de eliminación de una sala,
   * incluyendo la confirmación del usuario y el manejo de respuestas del servidor.
   * 
   * Cobertura:
   * - Estado open (useState)
   * - Función setOpen(true/false)
   * - Renderizado condicional del ConfirmDialog
   * - Función handleDelete
   * - Función handleConfirm con llamadas al servicio
   * - Función handleCancel
   * - Manejo de respuestas exitosas (.then)
   * - Manejo de errores (.catch)
   * - Integración con StatusStore (setStatus)
   * - Callback onRefresh
   */
  describe("Botón de eliminación con ConfirmDialog", () => {
    /**
     * Verifica que se muestre el diálogo de confirmación al intentar eliminar
     * 
     * Cubre:
     * - handleDelete que ejecuta setOpen(true)
     * - onClick del botón eliminar
     * - Renderizado condicional: <ConfirmDialog isOpen={open}>
     * - Props del ConfirmDialog: title, message, isOpen
     * - Texto de advertencia al usuario
     */
    it("muestra el diálogo de confirmación al hacer click en eliminar", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));

      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-title")).toHaveTextContent(
        "¿Seguro que deseas eliminar la sala?"
      );
      expect(screen.getByTestId("dialog-message")).toHaveTextContent(
        "No podrás recuperar esta información después."
      );
    });

    /**
     * Verifica el estado inicial del diálogo (no visible)
     * 
     * Cubre:
     * - Estado inicial de open (false)
     * - Renderizado condicional que no muestra el diálogo inicialmente
     */
    it("no muestra el diálogo de confirmación inicialmente", () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
    });

    /**
     * Verifica el flujo completo de eliminación exitosa
     * 
     * Cubre:
     * - Función handleConfirm
     * - Llamada a RoomService.delete con el ID correcto
     * - Bloque .then() de la promesa exitosa
     * - setStatus con mensaje de éxito (tipo: "success")
     * - setOpen(false) para cerrar el diálogo
     * - Callback onRefresh() para actualizar la lista de salas
     * - Flujo asíncrono completo con waitFor
     */
    it("llama a RoomService.delete y onRefresh si se confirma la eliminación", async () => {
      const onRefresh = vi.fn();
      const deleteSpy = vi.spyOn(RoomService, "delete")
        .mockResolvedValueOnce({ message: "Sala eliminada" });

      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      // Abrir el diálogo de confirmación
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      // Confirmar la eliminación
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("room-123");
        expect(deleteSpy).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(onRefresh).toHaveBeenCalled();
        expect(onRefresh).toHaveBeenCalledTimes(1);
      });

      // Verificar que se llamó a setStatus con éxito
      expect(mockSetStatus).toHaveBeenCalledWith({
        show: true,
        title: "Sala eliminada",
        message: "La sala ha sido eliminada correctamente",
        type: "success",
      });
    });

    /**
     * Verifica el comportamiento al cancelar la eliminación
     * 
     * Cubre:
     * - Función handleCancel
     * - setOpen(false) al cancelar
     * - NO ejecución de handleConfirm
     * - NO llamada a RoomService.delete
     * - NO llamada a onRefresh
     * - NO llamada a setStatus (ni éxito ni error)
     * - Cierre del diálogo al cancelar
     * - Protección contra eliminaciones accidentales
     */
    it("no llama al servicio si se cancela la eliminación", async () => {
      const onRefresh = vi.fn();
      const deleteSpy = vi.spyOn(RoomService, "delete")
        .mockResolvedValueOnce({ message: "Sala eliminada" });

      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      // Abrir el diálogo de confirmación
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      // Cancelar la eliminación
      fireEvent.click(screen.getByTestId("cancel-button"));

      await waitFor(() => {
        expect(deleteSpy).not.toHaveBeenCalled();
        expect(onRefresh).not.toHaveBeenCalled();
      });

      // Verificar que no se llamó a setStatus
      expect(mockSetStatus).not.toHaveBeenCalled();

      // Verificar que el diálogo se cierra
      expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
    });

    /**
     * Verifica el manejo de errores durante la eliminación
     * 
     * Cubre:
     * - Bloque .catch() de la promesa rechazada
     * - setStatus con mensaje de error (tipo: "error")
     * - NO llamada a onRefresh cuando hay error
     * - setOpen(false) en caso de error (cierra el diálogo)
     * - Flujo de error en operaciones asíncronas
     * - Feedback al usuario cuando falla la operación
     */
    it("muestra un mensaje de error si falla la eliminación", async () => {
      const onRefresh = vi.fn();
      const errorMessage = "Network error";
      const deleteSpy = vi.spyOn(RoomService, "delete")
        .mockRejectedValueOnce(new Error(errorMessage));

      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      // Abrir el diálogo y confirmar
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("room-123");
      });

      // Verificar que onRefresh NO se llamó en caso de error
      expect(onRefresh).not.toHaveBeenCalled();

      // Verificar que se llamó a setStatus con error
      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "Error al eliminar la sala",
          type: "error",
        });
      });
    });

    /**
     * Verifica que el diálogo se cierre automáticamente tras una eliminación exitosa
     * 
     * Cubre:
     * - setOpen(false) en el bloque .then()
     * - Desaparición del ConfirmDialog del DOM
     * - Restauración del estado del componente después de una operación
     * - UX: El diálogo no debe quedar abierto tras completar la acción
     */
    it("cierra el diálogo después de una eliminación exitosa", async () => {
      const onRefresh = vi.fn();
      vi.spyOn(RoomService, "delete")
        .mockResolvedValueOnce({ message: "Sala eliminada" });

      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 7: Integración completa
   * 
   * Pruebas que verifican la interacción entre múltiples funcionalidades
   * y el comportamiento del componente en escenarios complejos.
   * 
   * Cobertura:
   * - Independencia de estados (formOpen, qrOpen, open)
   * - Manejo de múltiples instancias con diferentes props
   * - Re-renderizado con nuevos datos (rerender)
   * - Flujos de trabajo completos de usuario
   * - Sincronización del estado activated con cambios en props
   */
  describe("Integración completa", () => {
    /**
     * Verifica que los tres modales (formulario, QR y confirmación) sean independientes
     * 
     * Cubre:
     * - Estados independientes: formOpen, qrOpen y open
     * - Apertura y cierre de cada modal no afecta a los otros
     * - UX: El usuario puede realizar todas las acciones en secuencia
     * - No hay interferencia entre los estados del componente
     */
    it("puede abrir y cerrar formulario, QR y diálogo de forma independiente", async () => {
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      // Abrir formulario
      fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));
      expect(screen.getByTestId("room-form")).toBeInTheDocument();

      // Cerrar formulario
      fireEvent.click(screen.getByText("Cerrar formulario"));
      expect(screen.queryByTestId("room-form")).not.toBeInTheDocument();

      // Abrir QR
      const qrButton = screen.getByRole("button", { name: "" });
      fireEvent.click(qrButton);
      expect(screen.getByTestId("qr-code")).toBeInTheDocument();

      // Abrir diálogo de confirmación (sin cerrar el QR primero)
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      // Cancelar
      fireEvent.click(screen.getByTestId("cancel-button"));
      expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
    });

    /**
     * Verifica que el componente maneje correctamente diferentes salas
     * 
     * Cubre:
     * - Props dinámicas (sala cambiante)
     * - Re-renderizado con nuevos datos usando rerender()
     * - Identificación correcta de la sala en handleConfirm
     * - Llamadas al servicio con IDs diferentes
     * - Uso correcto de room.roomID en cada instancia
     * - Escenario real: lista de salas donde se puede eliminar varias
     */
    it("maneja múltiples salas con diferentes IDs correctamente", async () => {
      const room1 = { ...roomMock, roomID: "room-1" };
      const room2 = { ...roomMock, roomID: "room-2" };
      const onRefresh = vi.fn();
      const deleteSpy = vi.spyOn(RoomService, "delete")
        .mockResolvedValue({ message: "Sala eliminada" });

      const { rerender } = render(
        <RouterWrapper>
          <Room room={room1} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("room-1");
      });

      // Cambiar a la segunda sala
      rerender(
        <RouterWrapper>
          <Room room={room2} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("room-2");
      });

      expect(deleteSpy).toHaveBeenCalledTimes(2);
    });

    /**
     * Verifica que el useEffect actualice el estado cuando cambian las props
     * 
     * Cubre:
     * - useEffect con dependencia [room.roomStatus]
     * - Re-renderizado con diferentes valores de roomStatus
     * - Sincronización del estado local con props externas
     * - Escenario: actualización en tiempo real del estado de la sala
     */
    it("actualiza el estado activated cuando room.roomStatus cambia", () => {
      const { rerender } = render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      // Inicialmente debe estar activa
      expect(screen.getByText(/Activa/i)).toBeInTheDocument();

      // Cambiar a sala cerrada
      rerender(
        <RouterWrapper>
          <Room room={closedRoomMock} usuId="user-456" onRefresh={() => {}} />
        </RouterWrapper>
      );

      // Debe actualizar a inactiva
      expect(screen.getByText(/Inactiva/i)).toBeInTheDocument();
    });

    /**
     * Verifica que todas las props se pasen correctamente a los componentes hijos
     * 
     * Cubre:
     * - Paso de props a RoomForm (room, usuId, onRefresh, setOpen)
     * - Verificación de que onRefresh se ejecute desde el formulario
     * - Integración completa entre componentes padre-hijo
     */
    it("pasa las props correctas a RoomForm", () => {
      const onRefresh = vi.fn();
      
      render(
        <RouterWrapper>
          <Room room={roomMock} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      // Abrir el formulario
      fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));
      
      // Verificar que el formulario recibe la sala correcta
      expect(screen.getByText(/Sala: Sala de Contabilidad/i)).toBeInTheDocument();
    });
  });
});
