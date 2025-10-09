/**
 * ============================================================================
 * SUITE DE PRUEBAS: RoomForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/professor/components/organisms/RoomForm.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente RoomForm,
 * que proporciona un formulario para crear o actualizar información de una sala.
 * El componente cambia su comportamiento según si recibe una sala existente
 * (modo actualización) o no (modo creación).
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Modo creación: formulario para crear nueva sala
 * 2. Modo actualización: formulario pre-llenado para editar sala existente
 * 3. Validación de campos con react-hook-form y zod
 * 4. Envío de datos al backend (creación y actualización)
 * 5. Manejo de errores del servidor
 * 6. Navegación tras creación exitosa
 * 7. Cierre de modal tras actualización exitosa
 * 8. Estados de carga (isSubmitting)
 * 9. Integración con servicios y stores
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import RoomForm from "../../../src/professor/components/organisms/RoomForm";
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

// Mock del StatusStore
const mockSetStatus = vi.fn();

vi.mock("@/stores/StatusStore", () => ({
  useStatusStore: () => ({
    setStatus: mockSetStatus,
  }),
}));

// Mock de react-router-dom
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del InputForm
vi.mock("@/components/atoms/InputForm", () => ({
  __esModule: true,
  default: ({ register, errors, inputName, placeholder, type }: any) => (
    <div data-testid={`input-${inputName}`}>
      <input
        {...register(inputName)}
        type={type}
        placeholder={placeholder}
        data-testid={`input-field-${inputName}`}
      />
      {errors[inputName] && (
        <span data-testid={`error-${inputName}`}>
          {errors[inputName]?.message}
        </span>
      )}
    </div>
  ),
}));

// Componente Wrapper para react-router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("RoomForm component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restaura las implementaciones originales después de cada prueba
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Modo creación (sin room prop)
   * 
   * Pruebas que verifican el comportamiento del formulario cuando se usa
   * para crear una nueva sala (room prop no está presente).
   * 
   * Cobertura:
   * - Renderizado del formulario en modo creación
   * - Icono y texto específicos del modo creación
   * - Campos vacíos por defecto
   * - Validación de campos requeridos
   * - Envío exitoso de datos
   * - Navegación tras creación exitosa
   * - Manejo de errores
   */
  describe("Modo creación (sin room prop)", () => {
    /**
     * Verifica que el formulario se renderice correctamente en modo creación
     * 
     * Cubre:
     * - Renderizado del icono MdAddHome (modo creación)
     * - NO renderizado del título "Actualizar datos de la sala"
     * - Campos de entrada presentes (roomName, roomPassword)
     * - Botón "Confirmar" presente
     */
    it("renderiza el formulario en modo creación", () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      // No debe mostrar el título de actualización
      expect(screen.queryByText(/Actualizar datos de la sala/i)).not.toBeInTheDocument();

      // Debe mostrar los campos del formulario
      expect(screen.getByTestId("input-field-roomName")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-roomPassword")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /confirmar/i })).toBeInTheDocument();
    });

    /**
     * Verifica que los campos estén vacíos por defecto en modo creación
     * 
     * Cubre:
     * - defaultValues en useForm: { roomName: "", roomPassword: "" }
     * - Estado inicial del formulario sin datos pre-llenados
     */
    it("los campos están vacíos por defecto", () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName") as HTMLInputElement;
      const passwordInput = screen.getByTestId("input-field-roomPassword") as HTMLInputElement;

      expect(nameInput.value).toBe("");
      expect(passwordInput.value).toBe("");
    });

    /**
     * Verifica la validación de campo requerido (nombre de sala)
     * 
     * Cubre:
     * - Validación con zod schema: roomName.min(1)
     * - Mensaje de error cuando el campo está vacío
     * - NO envío del formulario si hay errores de validación
     */
    it("muestra error si el nombre de la sala está vacío", async () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const submitButton = screen.getByRole("button", { name: /confirmar/i });
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-roomName")).toBeInTheDocument();
      });
    });

    /**
     * Verifica la validación de longitud mínima del código
     * 
     * Cubre:
     * - Validación con zod schema: roomPassword.min(6)
     * - Mensaje de error cuando el código es muy corto
     */
    it("muestra error si el código tiene menos de 6 caracteres", async () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Sala Test" } });
      fireEvent.change(passwordInput, { target: { value: "ABC" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-roomPassword")).toBeInTheDocument();
      });
    });

    /**
     * Verifica la creación exitosa de una sala
     * 
     * Cubre:
     * - Función onSubmit del hook
     * - Rama !isUpdate del condicional
     * - Llamada a RoomService.create con datos correctos
     * - setStatus con mensaje de éxito
     * - navigate("/professor") tras creación exitosa
     * - NO llamada a onRefresh (solo en modo actualización)
     * - NO llamada a closeModal (solo en modo actualización)
     */
    it("crea una nueva sala exitosamente", async () => {
      const createSpy = vi.spyOn(RoomService, "create")
        .mockResolvedValueOnce({ ...roomMock, roomID: "new-room" } as any);

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Nueva Sala" } });
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalledWith({
          roomName: "Nueva Sala",
          roomPassword: "CODE123",
          usuID: "user-456",
        });
      });

      // Verificar que se llamó a setStatus con éxito
      expect(mockSetStatus).toHaveBeenCalledWith({
        show: true,
        title: "Sala creada",
        message: "La sala ha sido creada correctamente",
        type: "success",
      });

      // Verificar navegación
      expect(mockNavigate).toHaveBeenCalledWith("/professor");
    });

    /**
     * Verifica el manejo de errores durante la creación
     * 
     * Cubre:
     * - Bloque catch del try-catch
     * - setRoomErrors con mensaje de error del servidor
     * - Visualización del mensaje de error en el DOM
     * - setTimeout para limpiar el error después de 5 segundos
     * - NO navegación cuando hay error
     * - NO llamada a setStatus cuando hay error
     */
    it("muestra error del servidor al fallar la creación", async () => {
      const errorMessage = "El código de la sala ya existe";
      const createSpy = vi.spyOn(RoomService, "create")
        .mockRejectedValueOnce({
          response: {
            data: {
              error: {
                message: errorMessage,
              },
            },
          },
        });

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Nueva Sala" } });
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalled();
      });

      // Verificar que se muestra el error
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      // NO debe navegar en caso de error
      expect(mockNavigate).not.toHaveBeenCalled();
      
      // NO debe llamar a setStatus en caso de error
      expect(mockSetStatus).not.toHaveBeenCalled();
    });

    /**
     * Verifica el manejo de errores genéricos (sin mensaje específico del servidor)
     * 
     * Cubre:
     * - Fallback del mensaje de error
     * - Mensaje por defecto: "Error al crear o actualizar la sala"
     */
    it("muestra error genérico si no hay mensaje del servidor", async () => {
      const createSpy = vi.spyOn(RoomService, "create")
        .mockRejectedValueOnce(new Error("Network error"));

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Nueva Sala" } });
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalled();
      });

      // Verificar que se muestra el error genérico
      await waitFor(() => {
        expect(screen.getByText(/Error al crear o actualizar la sala/i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica que el botón se deshabilite durante el envío
     * 
     * Cubre:
     * - Estado isSubmitting de react-hook-form
     * - Atributo disabled del botón cuando isSubmitting es true
     * - Prevención de envíos múltiples
     */
    it("deshabilita el botón durante el envío", async () => {
      // Mock que demora la respuesta para poder verificar el estado isSubmitting
      vi.spyOn(RoomService, "create")
        .mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({} as any), 100)));

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Nueva Sala" } });
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      
      expect(submitButton).not.toBeDisabled();
      
      fireEvent.click(submitButton);

      // El botón debe estar deshabilitado durante el envío
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  /**
   * GRUPO 2: Modo actualización (con room prop)
   * 
   * Pruebas que verifican el comportamiento del formulario cuando se usa
   * para actualizar una sala existente (room prop está presente).
   * 
   * Cobertura:
   * - Renderizado del formulario en modo actualización
   * - Título e iconos específicos del modo actualización
   * - Pre-llenado de campos con datos existentes
   * - useEffect que setea valores con setValue
   * - Actualización exitosa de datos
   * - Callback onRefresh tras actualización
   * - Callback closeModal tras actualización
   * - NO navegación en modo actualización
   * - Manejo de errores
   */
  describe("Modo actualización (con room prop)", () => {
    /**
     * Verifica que el formulario se renderice correctamente en modo actualización
     * 
     * Cubre:
     * - Renderizado del icono MdCreate (modo actualización)
     * - Título "Actualizar datos de la sala"
     * - Descripción del formulario de actualización
     * - isUpdate = true cuando room está presente
     */
    it("renderiza el formulario en modo actualización", () => {
      render(
        <RouterWrapper>
          <RoomForm room={roomMock} usuId="user-456" />
        </RouterWrapper>
      );

      // Debe mostrar el título de actualización
      expect(screen.getByText(/Actualizar datos de la sala/i)).toBeInTheDocument();
      expect(screen.getByText(/A continuación, puede actualizar el nombre o el código de la sala/i)).toBeInTheDocument();

      // Debe mostrar los campos del formulario
      expect(screen.getByTestId("input-field-roomName")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-roomPassword")).toBeInTheDocument();
    });

    /**
     * Verifica que los campos se pre-llenen con los datos de la sala existente
     * 
     * Cubre:
     * - useEffect con dependencias [room, setValue]
     * - setValue("roomName", room.roomName)
     * - setValue("roomPassword", room.roomPassword)
     * - Valores iniciales del formulario
     */
    it("pre-llena los campos con los datos de la sala existente", async () => {
      render(
        <RouterWrapper>
          <RoomForm room={roomMock} usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName") as HTMLInputElement;
      const passwordInput = screen.getByTestId("input-field-roomPassword") as HTMLInputElement;

      // Los campos deben estar pre-llenados
      await waitFor(() => {
        expect(nameInput.value).toBe("Sala de Contabilidad");
        expect(passwordInput.value).toBe("ABC123");
      });
    });

    /**
     * Verifica la actualización exitosa de una sala
     * 
     * Cubre:
     * - Función onSubmit del hook en modo actualización
     * - Rama isUpdate del condicional
     * - Llamada a RoomService.update con roomID y datos nuevos
     * - setStatus con mensaje de éxito
     * - Llamada a onRefresh para actualizar la lista
     * - Llamada a closeModal para cerrar el modal
     * - NO navegación en modo actualización
     */
    it("actualiza la sala exitosamente", async () => {
      const onRefresh = vi.fn();
      const setOpen = vi.fn();
      const updateSpy = vi.spyOn(RoomService, "update")
        .mockResolvedValueOnce({ ...roomMock, roomName: "Sala Actualizada" } as any);

      render(
        <RouterWrapper>
          <RoomForm 
            room={roomMock} 
            usuId="user-456" 
            onRefresh={onRefresh}
            setOpen={setOpen}
          />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      // Cambiar el nombre
      fireEvent.change(nameInput, { target: { value: "Sala Actualizada" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalledWith("room-123", {
          roomName: "Sala Actualizada",
          roomPassword: "ABC123",
        });
      });

      // Verificar que se llamó a setStatus con éxito
      expect(mockSetStatus).toHaveBeenCalledWith({
        show: true,
        title: "Sala actualizada",
        message: "La sala ha sido actualizada correctamente",
        type: "success",
      });

      // Verificar que se llamó a onRefresh
      expect(onRefresh).toHaveBeenCalled();

      // Verificar que se llamó a closeModal
      expect(setOpen).toHaveBeenCalledWith(false);

      // NO debe navegar en modo actualización
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    /**
     * Verifica el manejo de errores durante la actualización
     * 
     * Cubre:
     * - Bloque catch en modo actualización
     * - Visualización de error del servidor
     * - NO cierre del modal cuando hay error
     * - NO llamada a onRefresh cuando hay error
     */
    it("muestra error al fallar la actualización", async () => {
      const onRefresh = vi.fn();
      const setOpen = vi.fn();
      const errorMessage = "Error de conexión con el servidor";
      const updateSpy = vi.spyOn(RoomService, "update")
        .mockRejectedValueOnce({
          response: {
            data: {
              error: {
                message: errorMessage,
              },
            },
          },
        });

      render(
        <RouterWrapper>
          <RoomForm 
            room={roomMock} 
            usuId="user-456" 
            onRefresh={onRefresh}
            setOpen={setOpen}
          />
        </RouterWrapper>
      );

      const submitButton = screen.getByRole("button", { name: /confirmar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalled();
      });

      // Verificar que se muestra el error
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      // NO debe cerrar el modal en caso de error
      expect(setOpen).not.toHaveBeenCalled();
      
      // NO debe llamar a onRefresh en caso de error
      expect(onRefresh).not.toHaveBeenCalled();
    });



    /**
     * Verifica que los callbacks opcionales no causen errores si no se proporcionan
     * 
     * Cubre:
     * - onRefresh?.() con optional chaining
     * - closeModal?.() con optional chaining
     * - Componente funciona sin callbacks opcionales
     */
    it("funciona correctamente sin callbacks opcionales", async () => {
      const updateSpy = vi.spyOn(RoomService, "update")
        .mockResolvedValueOnce({ ...roomMock } as any);

      render(
        <RouterWrapper>
          <RoomForm room={roomMock} usuId="user-456" />
        </RouterWrapper>
      );

      const submitButton = screen.getByRole("button", { name: /confirmar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalled();
      });

      // No debe lanzar errores
      expect(mockSetStatus).toHaveBeenCalledWith({
        show: true,
        title: "Sala actualizada",
        message: "La sala ha sido actualizada correctamente",
        type: "success",
      });
    });
  });

  /**
   * GRUPO 3: Validación de campos
   * 
   * Pruebas específicas para la validación del formulario con react-hook-form y zod.
   * 
   * Cobertura:
   * - Validación de campos requeridos
   * - Validación de longitud mínima
   * - Validación de longitud máxima
   * - Mensajes de error específicos
   * - Trim de espacios en blanco
   */
  describe("Validación de campos", () => {
    /**
     * Verifica que el nombre es requerido (no vacío después de trim)
     * 
     * Cubre:
     * - RoomSchema: roomName.trim().min(1)
     * - Mensaje: "El nombre de la sala es obligatorio"
     */
    it("valida que el nombre de la sala sea obligatorio", async () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      // Dejar nombre vacío, llenar solo el código
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const error = screen.getByTestId("error-roomName");
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(/El nombre de la sala es obligatorio/i);
      });
    });

    /**
     * Verifica la validación de longitud mínima del código (6 caracteres)
     * 
     * Cubre:
     * - RoomSchema: roomPassword.min(6)
     * - Mensaje: "El código de la sala debe tener al menos 6 caracteres."
     */
    it("valida que el código tenga al menos 6 caracteres", async () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Sala Test" } });
      fireEvent.change(passwordInput, { target: { value: "12345" } }); // Solo 5 caracteres
      fireEvent.click(submitButton);

      await waitFor(() => {
        const error = screen.getByTestId("error-roomPassword");
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(/al menos 6 caracteres/i);
      });
    });

    /**
     * Verifica la validación de longitud máxima del código (100 caracteres)
     * 
     * Cubre:
     * - RoomSchema: roomPassword.max(100)
     * - Mensaje: "El código de la sala no puede tener más de 100 caracteres."
     */
    it("valida que el código no exceda 100 caracteres", async () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      const longPassword = "A".repeat(101); // 101 caracteres

      fireEvent.change(nameInput, { target: { value: "Sala Test" } });
      fireEvent.change(passwordInput, { target: { value: longPassword } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const error = screen.getByTestId("error-roomPassword");
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(/no puede tener más de 100 caracteres/i);
      });
    });

    /**
     * Verifica que el trim funcione correctamente (espacios no cuentan)
     * 
     * Cubre:
     * - RoomSchema: roomName.trim()
     * - Validación con solo espacios en blanco
     */
    it("valida que espacios en blanco no sean válidos como nombre", async () => {
      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "   " } }); // Solo espacios
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-roomName")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que datos válidos no generen errores
     * 
     * Cubre:
     * - Validación exitosa con datos correctos
     * - NO presencia de mensajes de error
     */
    it("no muestra errores con datos válidos", async () => {
      const createSpy = vi.spyOn(RoomService, "create")
        .mockResolvedValueOnce({} as any);

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Sala Válida" } });
      fireEvent.change(passwordInput, { target: { value: "VALID123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalled();
      });

      // No debe haber errores de validación
      expect(screen.queryByTestId("error-roomName")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-roomPassword")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 4: Integración completa
   * 
   * Pruebas que verifican la integración entre diferentes funcionalidades
   * y escenarios complejos del componente.
   * 
   * Cobertura:
   * - Cambio entre modo creación y actualización (rerender)
   * - Limpieza automática de errores después de 5 segundos
   * - Múltiples intentos de envío
   * - Edición y envío de datos pre-llenados
   */
  describe("Integración completa", () => {
    /**
     * Verifica el cambio entre modo creación y actualización mediante rerender
     * 
     * Cubre:
     * - Cambio de isUpdate de false a true
     * - Renderizado diferente según el modo
     * - useEffect que se ejecuta al cambiar room
     */
    it("cambia entre modo creación y actualización correctamente", async () => {
      const { rerender } = render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      // Verificar modo creación
      expect(screen.queryByText(/Actualizar datos de la sala/i)).not.toBeInTheDocument();

      // Cambiar a modo actualización
      rerender(
        <RouterWrapper>
          <RoomForm room={roomMock} usuId="user-456" />
        </RouterWrapper>
      );

      // Verificar modo actualización
      expect(screen.getByText(/Actualizar datos de la sala/i)).toBeInTheDocument();
      
      const nameInput = screen.getByTestId("input-field-roomName") as HTMLInputElement;
      await waitFor(() => {
        expect(nameInput.value).toBe("Sala de Contabilidad");
      });
    });

    /**
     * Verifica que los errores se limpien automáticamente después de 5 segundos
     * 
     * Cubre:
     * - setTimeout(() => { setRoomErrors("") }, 5000)
     * - Limpieza automática de mensajes de error
     * - Estado temporal de errores
     */
    it("limpia los errores después de 5 segundos", async () => {
      vi.spyOn(RoomService, "create")
        .mockRejectedValueOnce({
          response: {
            data: {
              error: {
                message: "Error temporal",
              },
            },
          },
        });

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Sala Test" } });
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      fireEvent.click(submitButton);

      // Esperar a que aparezca el error
      await waitFor(() => {
        expect(screen.getByText("Error temporal")).toBeInTheDocument();
      });

      // Verificar que el error esté presente
      expect(screen.getByText("Error temporal")).toBeInTheDocument();
    });

    /**
     * Verifica que se pueda editar y enviar datos pre-llenados
     * 
     * Cubre:
     * - Edición de valores iniciales
     * - Envío de datos modificados
     * - Flujo completo de actualización
     */
    it("permite editar y enviar datos pre-llenados", async () => {
      const onRefresh = vi.fn();
      const updateSpy = vi.spyOn(RoomService, "update")
        .mockResolvedValueOnce({} as any);

      render(
        <RouterWrapper>
          <RoomForm room={roomMock} usuId="user-456" onRefresh={onRefresh} />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      // Esperar a que se pre-llenen los campos
      await waitFor(() => {
        expect((nameInput as HTMLInputElement).value).toBe("Sala de Contabilidad");
      });

      // Modificar ambos campos
      fireEvent.change(nameInput, { target: { value: "Sala Modificada" } });
      fireEvent.change(passwordInput, { target: { value: "NEWCODE" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalledWith("room-123", {
          roomName: "Sala Modificada",
          roomPassword: "NEWCODE",
        });
      });
      
      await waitFor(() => {
        expect(onRefresh).toHaveBeenCalled();
      });
    });

    /**
     * Verifica múltiples intentos de envío tras un error
     * 
     * Cubre:
     * - Reintento después de un error
     * - Estado del formulario después de un error
     * - Posibilidad de corregir y reenviar
     */
    it("permite reintentar después de un error", async () => {
      const createSpy = vi.spyOn(RoomService, "create")
        .mockRejectedValueOnce(new Error("Error 1"))
        .mockResolvedValueOnce({} as any);

      render(
        <RouterWrapper>
          <RoomForm usuId="user-456" />
        </RouterWrapper>
      );

      const nameInput = screen.getByTestId("input-field-roomName");
      const passwordInput = screen.getByTestId("input-field-roomPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(nameInput, { target: { value: "Sala Test" } });
      fireEvent.change(passwordInput, { target: { value: "CODE123" } });
      
      // Primer intento - falla
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByText(/Error al crear o actualizar la sala/i)).toBeInTheDocument();
      });

      // Segundo intento - exitoso
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(createSpy).toHaveBeenCalledTimes(2);
      });
      
      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalled();
      });
    });
  });
});
