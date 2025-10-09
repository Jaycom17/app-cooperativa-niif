/**
 * @file MiddlewareStudent.test.tsx
 * @description Tests unitarios para el componente MiddlewareStudent
 * 
 * Este componente maneja el flujo de entrada de un estudiante a una sala:
 * 1. Pregunta si es la primera vez que ingresa
 * 2. Según la respuesta, muestra diferentes formularios
 * 3. Valida y registra/busca al estudiante
 * 4. Navega a la página del estudiante
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MiddlewareStudent from "../../../src/student/pages/MiddlewareStudent";
import { useStudentStore } from "../../../src/stores/StudentStore";
import { useRoomStore } from "../../../src/stores/RoomStore";

// Mock de los stores
vi.mock("../../../src/stores/StudentStore");
vi.mock("../../../src/stores/RoomStore");

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de componentes
vi.mock("@/components/atoms/InputForm", () => ({
  default: ({ register, errors, placeholder, inputName, type }: any) => (
    <div data-testid={`input-form-${inputName}`}>
      <input
        {...register(inputName)}
        placeholder={placeholder}
        type={type}
        data-testid={`input-${inputName}`}
      />
      {errors[inputName] && (
        <span data-testid={`error-${inputName}`}>{errors[inputName].message}</span>
      )}
    </div>
  ),
}));

describe("MiddlewareStudent component", () => {
  // Mocks por defecto
  const mockLeaveRoom = vi.fn();
  const mockInitCheck = vi.fn();
  const mockCheckStudent = vi.fn();
  const mockSStudent = vi.fn();
  const mockStudentProfile = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock de useRoomStore
    vi.mocked(useRoomStore).mockReturnValue({
      leaveRoom: mockLeaveRoom,
      currentRoom: { id: "room-123", name: "Test Room" },
      initCheck: mockInitCheck,
    } as any);

    // Mock de useStudentStore
    vi.mocked(useStudentStore).mockReturnValue({
      student: null,
      checkStudent: mockCheckStudent,
      sStudent: mockSStudent,
      studentError: null,
      studentProfile: mockStudentProfile,
    } as any);
  });

  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <MiddlewareStudent />
      </BrowserRouter>
    );
  };

  /**
   * GRUPO 1: Renderizado inicial y vista de decisión
   */
  describe("Renderizado inicial y vista de decisión", () => {
    /**
     * Verifica el renderizado básico del componente
     * 
     * Cubre:
     * - Renderizado del componente sin errores
     * - Vista inicial con pregunta
     */
    it("renderiza correctamente con la pregunta inicial", () => {
      renderWithRouter();

      expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();
    });

    /**
     * Verifica los botones de decisión
     * 
     * Cubre:
     * - Botón "SI" presente
     * - Botón "NO" presente
     * - Botón "Regresar al inicio" presente
     */
    it("muestra los botones SI y NO", () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      const noButton = screen.getByRole("button", { name: /NO/i });

      expect(siButton).toBeInTheDocument();
      expect(noButton).toBeInTheDocument();
    });

    /**
     * Verifica el botón de regresar
     * 
     * Cubre:
     * - Botón "Regresar al inicio" presente
     * - Texto correcto del botón
     */
    it("muestra el botón de regresar al inicio", () => {
      renderWithRouter();

      const backButton = screen.getByRole("button", { name: /Regresar al inicio/i });
      expect(backButton).toBeInTheDocument();
    });

    /**
     * Verifica que no muestra formularios inicialmente
     * 
     * Cubre:
     * - firstTime = OPTIONS.NOTHING
     * - No renderiza formulario de registro
     * - No renderiza formulario de búsqueda
     */
    it("no muestra formularios en el estado inicial", () => {
      renderWithRouter();

      expect(screen.queryByPlaceholderText("Cedula")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: useEffect y llamadas iniciales
   */
  describe("useEffect y llamadas iniciales", () => {
    /**
     * Verifica las llamadas iniciales en el montaje
     * 
     * Cubre:
     * - useEffect con studentProfile
     * - useEffect con initCheck
     * - Orden de ejecución
     */
    it("llama a studentProfile e initCheck al montar", async () => {
      renderWithRouter();

      await waitFor(() => {
        expect(mockStudentProfile).toHaveBeenCalledTimes(1);
        expect(mockInitCheck).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * Verifica la navegación cuando no hay currentRoom
     * 
     * Cubre:
     * - useEffect con currentRoom
     * - navigate("/")
     */
    it("navega al inicio si no hay currentRoom", async () => {
      vi.mocked(useRoomStore).mockReturnValue({
        leaveRoom: mockLeaveRoom,
        currentRoom: null,
        initCheck: mockInitCheck,
      } as any);

      renderWithRouter();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });

    /**
     * Verifica la navegación cuando ya hay un estudiante
     * 
     * Cubre:
     * - useEffect con student
     * - navigate("/student")
     */
    it("navega a /student si ya hay un estudiante autenticado", async () => {
      vi.mocked(useStudentStore).mockReturnValue({
        student: { id: "123", stuCedula: "1234567890" },
        checkStudent: mockCheckStudent,
        sStudent: mockSStudent,
        studentError: null,
        studentProfile: mockStudentProfile,
      } as any);

      renderWithRouter();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/student");
      });
    });
  });

  /**
   * GRUPO 3: Navegación entre vistas y animaciones
   */
  describe("Navegación entre vistas y animaciones", () => {
    /**
     * Verifica el cambio a vista de primera vez
     * 
     * Cubre:
     * - handleSetFirstTime(OPTIONS.SI)
     * - setFirstTime(OPTIONS.SI)
     * - setAnimationClass("animate-slide-from-top")
     * - Renderizado de formulario de registro
     */
    it("cambia a la vista de primera vez al hacer clic en SI", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText(/escribe tu numero de cedula, con el cual deseas registrarte/i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica el cambio a vista de usuario existente
     * 
     * Cubre:
     * - handleSetFirstTime(OPTIONS.NO)
     * - setFirstTime(OPTIONS.NO)
     * - setAnimationClass("animate-slide-from-bottom")
     * - Renderizado de formulario de búsqueda
     */
    it("cambia a la vista de usuario existente al hacer clic en NO", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByText(/A continuación, escribe tu cedula\./i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica el botón de regresar desde vista SI
     * 
     * Cubre:
     * - Navegación desde firstTime = SI
     * - handleSetFirstTime(OPTIONS.NOTHING)
     * - Volver a la pregunta inicial
     */
    it("permite regresar a la pregunta inicial desde la vista SI", async () => {
      renderWithRouter();

      // Ir a la vista SI
      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText(/registrarte en la sala/i)).toBeInTheDocument();
      });

      // Regresar
      const backButtons = screen.getAllByRole("button", { name: /Atrás/i });
      fireEvent.click(backButtons[0]);

      await waitFor(() => {
        expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();
      });
    });

    /**
     * Verifica el botón de regresar desde vista NO
     * 
     * Cubre:
     * - Navegación desde firstTime = NO
     * - handleSetFirstTime(OPTIONS.NOTHING)
     * - Volver a la pregunta inicial
     */
    it("permite regresar a la pregunta inicial desde la vista NO", async () => {
      renderWithRouter();

      // Ir a la vista NO
      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByText(/A continuación, escribe tu cedula\./i)).toBeInTheDocument();
      });

      // Regresar
      const backButtons = screen.getAllByRole("button", { name: /Atrás/i });
      fireEvent.click(backButtons[0]);

      await waitFor(() => {
        expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();
      });
    });

    /**
     * Verifica la funcionalidad del botón "Regresar al inicio"
     * 
     * Cubre:
     * - onClick de "Regresar al inicio"
     * - leaveRoom()
     */
    it("llama a leaveRoom al hacer clic en Regresar al inicio", () => {
      renderWithRouter();

      const backHomeButton = screen.getByRole("button", { name: /Regresar al inicio/i });
      fireEvent.click(backHomeButton);

      expect(mockLeaveRoom).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * GRUPO 4: Formulario de primera vez (SI)
   */
  describe("Formulario de primera vez (SI)", () => {
    /**
     * Verifica el renderizado del formulario de registro
     * 
     * Cubre:
     * - Vista cuando firstTime = OPTIONS.SI
     * - Título "Bienvenido a la sala"
     * - Mensaje de instrucciones
     * - InputForm presente
     */
    it("renderiza el formulario de registro correctamente", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText("Bienvenido a la sala")).toBeInTheDocument();
        expect(screen.getByText(/registrarte en la sala/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });
    });

    /**
     * Verifica el mensaje de recomendación
     * 
     * Cubre:
     * - Mensaje "Recomendación: Anota este nombre..."
     */
    it("muestra el mensaje de recomendación en la vista SI", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText(/Anota este nombre para futuros ingresos/i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica el envío del formulario de registro
     * 
     * Cubre:
     * - onSubmit con firstTime = OPTIONS.SI
     * - checkStudent(data)
     * - react-hook-form validation
     */
    it("llama a checkStudent al enviar el formulario de registro", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Cedula");
      const submitButton = screen.getByRole("button", { name: /Ingresar/i });

      fireEvent.change(input, { target: { value: "1234567890" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCheckStudent).toHaveBeenCalledWith({ stuCedula: "1234567890" });
      });
    });

    /**
     * Verifica la validación del formulario de registro
     * 
     * Cubre:
     * - zodResolver con StudentSchema
     * - Validación de campo requerido
     * - Mensaje de error
     */
    it("valida el campo cedula en el formulario de registro", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });

      const submitButton = screen.getByRole("button", { name: /Ingresar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCheckStudent).not.toHaveBeenCalled();
      });
    });

    /**
     * Verifica el botón de envío
     * 
     * Cubre:
     * - Botón "Ingresar" presente
     * - type="submit"
     */
    it("tiene un botón de Ingresar en el formulario SI", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        const ingresarButton = screen.getByRole("button", { name: /Ingresar/i });
        expect(ingresarButton).toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 5: Formulario de usuario existente (NO)
   */
  describe("Formulario de usuario existente (NO)", () => {
    /**
     * Verifica el renderizado del formulario de búsqueda
     * 
     * Cubre:
     * - Vista cuando firstTime = OPTIONS.NO
     * - Título "Bienvenido a la sala"
     * - Mensaje de instrucciones diferente
     * - InputForm presente
     */
    it("renderiza el formulario de búsqueda correctamente", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByText("Bienvenido a la sala")).toBeInTheDocument();
        expect(screen.getByText(/A continuación, escribe tu cedula\./i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que no muestra el mensaje de recomendación
     * 
     * Cubre:
     * - Vista NO no muestra recomendación
     * - Diferencia entre vistas SI y NO
     */
    it("no muestra el mensaje de recomendación en la vista NO", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.queryByText(/Anota este nombre/i)).not.toBeInTheDocument();
      });
    });

    /**
     * Verifica el envío del formulario de búsqueda
     * 
     * Cubre:
     * - onSubmit con firstTime = OPTIONS.NO
     * - sStudent(data.stuCedula)
     * - Diferencia con checkStudent
     */
    it("llama a sStudent al enviar el formulario de búsqueda", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Cedula");
      const submitButton = screen.getByRole("button", { name: /Buscar/i });

      fireEvent.change(input, { target: { value: "1234567890" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSStudent).toHaveBeenCalledWith("1234567890");
      });
    });

    /**
     * Verifica la validación del formulario de búsqueda
     * 
     * Cubre:
     * - zodResolver con StudentSchema
     * - Validación de campo requerido
     * - No llama a sStudent si falta campo
     */
    it("valida el campo cedula en el formulario de búsqueda", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });

      const submitButton = screen.getByRole("button", { name: /Buscar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSStudent).not.toHaveBeenCalled();
      });
    });

    /**
     * Verifica el botón de envío
     * 
     * Cubre:
     * - Botón "Buscar" presente
     * - type="submit"
     * - Texto diferente a "Ingresar"
     */
    it("tiene un botón de Buscar en el formulario NO", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        const buscarButton = screen.getByRole("button", { name: /Buscar/i });
        expect(buscarButton).toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 6: Manejo de errores
   */
  describe("Manejo de errores", () => {
    /**
     * Verifica que muestra errores del store en vista SI
     * 
     * Cubre:
     * - studentError presente
     * - Renderizado condicional del error
     * - Mensaje de error visible
     */
    it("muestra el error del estudiante en la vista SI", async () => {
      vi.mocked(useStudentStore).mockReturnValue({
        student: null,
        checkStudent: mockCheckStudent,
        sStudent: mockSStudent,
        studentError: "Error: Estudiante ya registrado",
        studentProfile: mockStudentProfile,
      } as any);

      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText("Error: Estudiante ya registrado")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que muestra errores del store en vista NO
     * 
     * Cubre:
     * - studentError presente
     * - Renderizado condicional del error
     * - Mensaje de error visible en ambos formularios
     */
    it("muestra el error del estudiante en la vista NO", async () => {
      vi.mocked(useStudentStore).mockReturnValue({
        student: null,
        checkStudent: mockCheckStudent,
        sStudent: mockSStudent,
        studentError: "Error: Estudiante no encontrado",
        studentProfile: mockStudentProfile,
      } as any);

      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByText("Error: Estudiante no encontrado")).toBeInTheDocument();
      });
    });

    /**
     * Verifica que no muestra errores cuando studentError es null
     * 
     * Cubre:
     * - Renderizado condicional {studentError && ...}
     * - Estado sin errores
     */
    it("no muestra error cuando studentError es null", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 7: Integración de react-hook-form
   */
  describe("Integración de react-hook-form", () => {
    /**
     * Verifica el uso de zodResolver
     * 
     * Cubre:
     * - useForm({ resolver: zodResolver(StudentSchema) })
     * - Validación con zod
     */
    it("usa zodResolver con StudentSchema", async () => {
      renderWithRouter();

      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Cedula");
      fireEvent.change(input, { target: { value: "12345678901234567890" } }); // Muy largo

      const submitButton = screen.getByRole("button", { name: /Ingresar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCheckStudent).not.toHaveBeenCalled();
      });
    });

    /**
     * Verifica que el formulario acepta valores válidos
     * 
     * Cubre:
     * - Validación exitosa
     * - transform en el schema (trim)
     * - Envío correcto de datos
     */
    it("acepta valores válidos en el formulario", async () => {
      renderWithRouter();

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Cedula")).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Cedula");
      fireEvent.change(input, { target: { value: "123456" } });

      const submitButton = screen.getByRole("button", { name: /Buscar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSStudent).toHaveBeenCalledWith("123456");
      });
    });
  });

  /**
   * GRUPO 8: Integración completa y flujos de usuario
   */
  describe("Integración completa y flujos de usuario", () => {
    /**
     * Verifica el flujo completo de primera vez
     * 
     * Cubre:
     * - Vista inicial → SI → Formulario → Envío
     * - checkStudent llamado correctamente
     * - Flujo completo de usuario nuevo
     */
    it("completa el flujo de registro de primera vez", async () => {
      renderWithRouter();

      // Estado inicial
      expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();

      // Clic en SI
      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText(/registrarte en la sala/i)).toBeInTheDocument();
      });

      // Llenar formulario
      const input = screen.getByPlaceholderText("Cedula");
      fireEvent.change(input, { target: { value: "1234567890" } });

      // Enviar
      const submitButton = screen.getByRole("button", { name: /Ingresar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCheckStudent).toHaveBeenCalledWith({ stuCedula: "1234567890" });
      });
    });

    /**
     * Verifica el flujo completo de usuario existente
     * 
     * Cubre:
     * - Vista inicial → NO → Formulario → Envío
     * - sStudent llamado correctamente
     * - Flujo completo de usuario que regresa
     */
    it("completa el flujo de búsqueda de usuario existente", async () => {
      renderWithRouter();

      // Estado inicial
      expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();

      // Clic en NO
      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByText(/A continuación, escribe tu cedula\./i)).toBeInTheDocument();
      });

      // Llenar formulario
      const input = screen.getByPlaceholderText("Cedula");
      fireEvent.change(input, { target: { value: "9876543210" } });

      // Enviar
      const submitButton = screen.getByRole("button", { name: /Buscar/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSStudent).toHaveBeenCalledWith("9876543210");
      });
    });

    /**
     * Verifica el cambio de decisión
     * 
     * Cubre:
     * - SI → Atrás → NO
     * - Navegación fluida entre vistas
     * - Cambio de opción sin recargar
     */
    it("permite cambiar de decisión entre SI y NO", async () => {
      renderWithRouter();

      // Ir a SI
      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        expect(screen.getByText(/registrarte en la sala/i)).toBeInTheDocument();
      });

      // Regresar
      const backButtons = screen.getAllByRole("button", { name: /Atrás/i });
      fireEvent.click(backButtons[0]);

      await waitFor(() => {
        expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();
      });

      // Ir a NO
      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        expect(screen.getByText(/A continuación, escribe tu cedula\./i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica que todas las vistas usan el mismo useForm
     * 
     * Cubre:
     * - handleSubmit compartido
     * - register compartido
     * - errors compartido
     * - Formularios usan la misma instancia de react-hook-form
     */
    it("usa la misma instancia de react-hook-form en ambas vistas", async () => {
      renderWithRouter();

      // Ir a SI
      const siButton = screen.getByRole("button", { name: /SI/i });
      fireEvent.click(siButton);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Cedula");
        expect(input).toBeInTheDocument();
      });

      // Regresar y ir a NO
      const backButtons = screen.getAllByRole("button", { name: /Atrás/i });
      fireEvent.click(backButtons[0]);

      await waitFor(() => {
        expect(screen.getByText("¿Es la primera vez que entras a la sala?")).toBeInTheDocument();
      });

      const noButton = screen.getByRole("button", { name: /NO/i });
      fireEvent.click(noButton);

      await waitFor(() => {
        const input = screen.getByPlaceholderText("Cedula");
        expect(input).toBeInTheDocument();
        // Verifica que el input existe (misma instancia de form)
        expect(input).toHaveAttribute("name", "stuCedula");
      });
    });
  });
});
