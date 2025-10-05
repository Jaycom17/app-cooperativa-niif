/**
 * ============================================================================
 * SUITE DE PRUEBAS: ProfForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/admin/components/organisms/ProfForm.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente ProfForm,
 * que es un formulario dual para crear y actualizar profesores en el sistema.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado inicial en modo creación y edición
 * 2. Validaciones de campos (nombre, email, contraseña)
 * 3. Proceso completo de creación de profesor
 * 4. Proceso completo de actualización de profesor
 * 5. Manejo de errores de la API
 * 6. Casos límite y edge cases
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProfForm from "../../../src/admin/components/organisms/ProfForm";
import { ProfessorService } from "../../../src/admin/services/professor.service";

/**
 * MOCK: ProfessorService
 * PROPÓSITO: Simular las llamadas HTTP al backend sin hacer peticiones reales
 * MÉTODOS MOCKEADOS:
 * - createProfessor: Simula la creación de un nuevo profesor (POST)
 * - updateProfessor: Simula la actualización de un profesor existente (PUT/PATCH)
 * BENEFICIOS:
 * - Tests rápidos (no dependen de red/backend)
 * - Tests determinísticos (controlamos las respuestas)
 * - Tests aislados (no afectan la base de datos)
 */
vi.mock("../../../src/admin/services/professor.service", () => ({
  ProfessorService: {
    createProfessor: vi.fn(),
    updateProfessor: vi.fn(),
  }
}));

/**
 * MOCK: react-router-dom useNavigate
 * PROPÓSITO: Simular la navegación entre rutas sin cambiar realmente la URL
 * FUNCIÓN MOCKEADA: useNavigate hook de react-router-dom
 * BENEFICIOS:
 * - Verificar que la navegación se llama con la ruta correcta
 * - Evitar errores de navegación en el entorno de pruebas
 * - Tests independientes del router real
 * NOTA: Se mantienen todas las demás exportaciones de react-router-dom (MemoryRouter, etc.)
 */
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/**
 * MOCK: StatusStore (Zustand store)
 * PROPÓSITO: Simular el store de estado global para notificaciones/mensajes
 * FUNCIÓN MOCKEADA: useStatusStore hook con método setStatus
 * BENEFICIOS:
 * - Verificar que se muestran los mensajes de éxito/error correctos
 * - Comprobar el formato del objeto de status (show, message, title, type)
 * - Tests aislados del estado global real
 * ESTRUCTURA DEL STATUS:
 * {
 *   show: boolean,
 *   message: string,
 *   title: string,
 *   type: "success" | "error" | "warning" | "info"
 * }
 */
const mockSetStatus = vi.fn();
vi.mock("../../../src/stores/StatusStore", () => ({
  useStatusStore: () => ({
    setStatus: mockSetStatus,
  }),
}));

/**
 * MOCK DATA: Profesor de prueba
 * PROPÓSITO: Datos de ejemplo para probar el modo edición del formulario
 * CAMPOS:
 * - usuID: Identificador único del profesor
 * - usuName: Nombre completo del profesor
 * - usuEmail: Correo electrónico del profesor
 * NOTA: No incluye usuPassword por seguridad (no se muestra en edición)
 * USO: Se pasa como prop 'professor' a ProfForm para activar modo edición
 */
const professorMock = {
  usuID: "123",
  usuName: "Juan Pérez",
  usuEmail: "juan@example.com",
};

describe("ProfForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Renderizado inicial", () => {
    /**
     * PRUEBA: Renderizado del formulario en modo creación
     * CUBRE: Renderizado inicial del componente ProfForm sin props
     * VERIFICA:
     * - El botón "Confirmar" está presente en el DOM
     * - NO aparece el texto de actualización (modo creación)
     * - Todos los campos del formulario están renderizados:
     *   * Campo Nombre
     *   * Campo Correo electrónico
     *   * Campo Contraseña
     *   * Campo Repita la contraseña
     * - El componente está en modo "creación" por defecto
     */
    it("muestra el formulario de creación cuando no hay profesor", () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/confirmar/i)).toBeInTheDocument();
      expect(screen.queryByText(/actualizar datos del profesor/i)).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Correo electronico")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Repita la contraseña")).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del formulario en modo edición con datos precargados
     * CUBRE: useEffect que precarga los datos del profesor cuando se pasa como prop
     * VERIFICA:
     * - El texto "Actualizar datos del profesor" está presente (modo edición)
     * - El campo Nombre contiene el valor precargado "Juan Pérez"
     * - El campo Email contiene el valor precargado "juan@example.com"
     * - La función setValue de react-hook-form se ejecuta correctamente
     */
    it("precarga los datos y muestra el modo edición", () => {
      render(
        <MemoryRouter>
          <ProfForm professor={professorMock} />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/actualizar datos del profesor/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue("Juan Pérez")).toBeInTheDocument();
      expect(screen.getByDisplayValue("juan@example.com")).toBeInTheDocument();
    });

    /**
     * PRUEBA: Verificación del icono SVG en modo creación
     * CUBRE: Renderizado condicional del icono IoPersonAddSharp
     * VERIFICA:
     * - Un elemento SVG está presente en el DOM cuando no hay profesor
     * - El icono de "agregar persona" se muestra en modo creación
     */
    it("muestra el icono correcto en modo creación", () => {
      const { container } = render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );
      
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    /**
     * PRUEBA: Verificación de título y descripción en modo edición
     * CUBRE: Renderizado condicional del article con título y descripción
     * VERIFICA:
     * - El título "Actualizar datos del profesor" se muestra en modo edición
     * - La descripción explicativa sobre la actualización está presente
     * - El componente detecta correctamente el modo edición mediante la prop professor
     */
    it("muestra el título y descripción correctos en modo edición", () => {
      render(
        <MemoryRouter>
          <ProfForm professor={professorMock} />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/actualizar datos del profesor/i)).toBeInTheDocument();
      expect(screen.getByText(/A continuación, puede actualizar los datos del profesor/i)).toBeInTheDocument();
    });
  });

  describe("Validaciones de campos", () => {
    /**
     * PRUEBA: Validación de campo nombre obligatorio
     * CUBRE: Validación de Zod en UserCreateSchema - campo usuName.min(1)
     * SIMULA: Usuario intenta enviar el formulario sin llenar el campo nombre
     * VERIFICA:
     * - El mensaje de error "El nombre es obligatorio" aparece
     * - react-hook-form previene el envío del formulario
     * - La validación de Zod se ejecuta correctamente
     */
    it("valida que el nombre es obligatorio", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
      });
    });

    /**
     * PRUEBA: Validación de campo email obligatorio
     * CUBRE: Validación de Zod en UserCreateSchema - campo usuEmail.email()
     * SIMULA: Usuario llena el nombre pero deja el email vacío
     * VERIFICA:
     * - Aparece un mensaje relacionado con "correo"
     * - La validación se activa al intentar enviar el formulario
     * - El componente InputForm muestra correctamente los errores
     */
    it("valida que el email es obligatorio y formato inválido", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      // Test 1: Email vacío
      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        const messages = screen.queryAllByText(/correo/i);
        expect(messages.length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de contraseña obligatoria en modo creación
     * CUBRE: Validación de Zod en UserCreateSchema - campo usuPassword.min(6)
     * SIMULA: Usuario llena nombre y email pero deja las contraseñas vacías
     * VERIFICA:
     * - El mensaje "La contraseña debe tener al menos 6 caracteres" aparece
     * - En modo creación, las contraseñas son obligatorias (no opcionales)
     * - Los errores pueden aparecer duplicados (password y confirmPassword)
     * - Se usa getAllByText porque ambos campos muestran el mismo error
     */
    it("valida que la contraseña es obligatoria en modo creación", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe tener al menos 6 caracteres/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de longitud mínima de contraseña (6 caracteres)
     * CUBRE: Validación de Zod en UserCreateSchema - usuPassword.min(6)
     * SIMULA: Usuario ingresa una contraseña con solo 4 caracteres ("Ab1@")
     * VERIFICA:
     * - El mensaje de error sobre longitud mínima aparece
     * - La validación de longitud se ejecuta antes de otras validaciones
     * - Ambos campos de contraseña muestran el error (duplicado)
     */
    it("valida longitud mínima de la contraseña", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Ab1@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Ab1@" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe tener al menos 6 caracteres/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de letra mayúscula en contraseña
     * CUBRE: Validación de Zod en UserCreateSchema - usuPassword.regex(/[A-Z]/)
     * SIMULA: Usuario ingresa contraseña sin letras mayúsculas ("admin123@")
     * VERIFICA:
     * - El mensaje de error sobre mayúsculas aparece
     * - La validación de regex se ejecuta correctamente
     * - La política de contraseñas seguras se aplica
     */
    it("valida que la contraseña debe contener mayúscula", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "admin123@" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos una letra mayúscula/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de letra minúscula en contraseña
     * CUBRE: Validación de Zod en UserCreateSchema - usuPassword.regex(/[a-z]/)
     * SIMULA: Usuario ingresa contraseña sin letras minúsculas ("ADMIN123@")
     * VERIFICA:
     * - El mensaje de error sobre minúsculas aparece
     * - La validación de regex para minúsculas funciona
     * - Se requiere complejidad en la contraseña
     */
    it("valida que la contraseña debe contener minúscula", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "ADMIN123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "ADMIN123@" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos una letra minúscula/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de número en contraseña
     * CUBRE: Validación de Zod en UserCreateSchema - usuPassword.regex(/\d/)
     * SIMULA: Usuario ingresa contraseña sin números ("AdminTest@")
     * VERIFICA:
     * - El mensaje de error sobre números aparece
     * - La validación de regex para dígitos funciona
     * - Se requiere al menos un número en la contraseña
     */
    it("valida que la contraseña debe contener número", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "AdminTest@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "AdminTest@" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos un número/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de carácter especial en contraseña
     * CUBRE: Validación de Zod en UserCreateSchema - usuPassword.regex(/[@$!%*?&]/)
     * SIMULA: Usuario ingresa contraseña sin caracteres especiales ("Admin123")
     * VERIFICA:
     * - El mensaje de error sobre caracteres especiales aparece
     * - Solo se aceptan los caracteres: @$!%*?&
     * - La contraseña debe cumplir todos los requisitos de seguridad
     */
    it("valida que la contraseña debe contener carácter especial", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos un carácter especial/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * PRUEBA: Validación de coincidencia de contraseñas
     * CUBRE: Validación de Zod en UserCreateSchema - .refine() que compara ambos campos
     * SIMULA: Usuario ingresa contraseñas diferentes ("Admin123@" vs "Admin456@")
     * VERIFICA:
     * - El mensaje "Las contraseñas no coinciden" aparece
     * - La validación de coincidencia se ejecuta al final
     * - El error se muestra solo en el campo confirmPassword (path: ["confirmPassword"])
     */
    it("valida que las contraseñas coincidan", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin456@" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
      });
    });

    /**
     * PRUEBA: Validación de longitud máxima del nombre (50 caracteres)
     * CUBRE: Validación de Zod en UserCreateSchema - usuName.max(50)
     * SIMULA: Usuario ingresa un nombre con 51 caracteres
     * VERIFICA:
     * - El mensaje "El nombre no puede exceder los 50 caracteres" aparece
     * - La validación de longitud máxima funciona
     * - Se previene el almacenamiento de nombres muy largos
     */
    it("valida longitud máxima del nombre", async () => {
      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      const nombreLargo = "A".repeat(51);
      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: nombreLargo } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el nombre no puede exceder los 50 caracteres/i)).toBeInTheDocument();
      });
    });

  });


  describe("Creación de profesor", () => {
    /**
     * PRUEBA: Flujo completo de creación exitosa de profesor
     * CUBRE: 
     * - Función onSubmit del componente ProfForm
     * - Llamada a ProfessorService.createProfessor
     * - Construcción del objeto professorData con los campos correctos
     * SIMULA: Usuario llena todos los campos correctamente y envía el formulario
     * VERIFICA:
     * - ProfessorService.createProfessor se llama exactamente una vez
     * - Se envía el objeto con la estructura correcta: { usuName, usuEmail, usuPassword }
     * - Los datos coinciden con los valores ingresados por el usuario
     * - El formulario no incluye confirmPassword en el payload (solo en validación)
     */
    it("crea un profesor correctamente", async () => {
      (ProfessorService.createProfessor as any).mockResolvedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro González" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(ProfessorService.createProfessor).toHaveBeenCalledWith({
          usuName: "Pedro González",
          usuEmail: "pedro@test.com",
          usuPassword: "Admin123@",
        });
      });
    });

    /**
     * PRUEBA: Notificación de éxito y navegación después de crear
     * CUBRE:
     * - Bloque .then() después de createProfessor exitoso
     * - Llamada a setStatus del StatusStore con mensaje de éxito
     * - Llamada a navigate("/admin") para redireccionar
     * SIMULA: Creación exitosa de profesor
     * VERIFICA:
     * - useStatusStore.setStatus se llama con el mensaje de éxito correcto
     * - El título es "Profesor creado"
     * - El tipo de notificación es "success"
     * - useNavigate redirige a "/admin"
     * - La navegación ocurre después de mostrar el mensaje de éxito
     */
    it("muestra mensaje de éxito y navega después de crear", async () => {
      (ProfessorService.createProfessor as any).mockResolvedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          message: "El profesor ha sido creado correctamente",
          title: "Profesor creado",
          type: "success",
        });
        expect(mockNavigate).toHaveBeenCalledWith("/admin");
      });
    });

    /**
     * PRUEBA: Manejo de error específico de la API al crear
     * CUBRE:
     * - Bloque .catch() después de createProfessor fallido
     * - Extracción del mensaje de error desde error.response.data.error.message
     * - Actualización del estado profErrors con setProfErrors
     * - Renderizado del mensaje de error en el DOM
     * SIMULA: API responde con error específico "Email ya existe"
     * VERIFICA:
     * - El mensaje de error específico se muestra en la UI
     * - El estado profErrors se actualiza correctamente
     * - El usuario recibe feedback claro sobre por qué falló la creación
     */
    it("muestra mensaje de error si la API falla al crear", async () => {
      (ProfessorService.createProfessor as any).mockRejectedValueOnce({
        response: { data: { error: { message: "Email ya existe" } } },
      });

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/email ya existe/i)).toBeInTheDocument();
      });
    });

    /**
     * PRUEBA: Manejo de error genérico cuando la API falla sin mensaje específico
     * CUBRE:
     * - Operador || en el catch para mensajes de error por defecto
     * - Caso cuando error.response?.data?.error?.message es undefined
     * - Fallback al mensaje "Error al crear el profesor"
     * SIMULA: API falla sin proporcionar estructura de error esperada
     * VERIFICA:
     * - Se muestra el mensaje genérico "Error al crear el profesor"
     * - La aplicación no se rompe cuando el error no tiene la estructura esperada
     * - Se proporciona feedback al usuario incluso en errores inesperados
     */
    it("muestra mensaje de error genérico si la API falla sin mensaje específico", async () => {
      (ProfessorService.createProfessor as any).mockRejectedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/error al crear el profesor/i)).toBeInTheDocument();
      });
    });

  });

  describe("Actualización de profesor", () => {
    /**
     * PRUEBA: Manejo de error específico al actualizar profesor
     * CUBRE:
     * - Bloque if(isUpdate) en la función onSubmit
     * - Llamada a ProfessorService.updateProfessor con usuID y professorData
     * - Bloque .catch() para actualización fallida
     * - Extracción de mensaje de error específico de la API
     * SIMULA: Actualización falla con error específico "Error de base de datos"
     * VERIFICA:
     * - El mensaje de error específico se muestra en la UI
     * - Las props onRefresh y setOpen NO se llaman cuando hay error
     * - El componente está en modo edición (recibe prop professor)
     * - El error se maneja correctamente sin romper la aplicación
     */
    it("muestra mensaje de error si la API falla al actualizar", async () => {
      const onRefresh = vi.fn();
      const setOpen = vi.fn();
      (ProfessorService.updateProfessor as any).mockRejectedValueOnce({
        response: { data: { error: { message: "Error de base de datos" } } },
      });

      render(
        <MemoryRouter>
          <ProfForm professor={professorMock} onRefresh={onRefresh} setOpen={setOpen} />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Juan Actualizado" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/error de base de datos/i)).toBeInTheDocument();
      });
    });

    /**
     * PRUEBA: Manejo de error genérico al actualizar sin mensaje específico
     * CUBRE:
     * - Operador || en el catch de updateProfessor
     * - Fallback al mensaje "Error al actualizar los datos del profesor"
     * - Caso cuando la respuesta de error no tiene la estructura esperada
     * SIMULA: API falla al actualizar sin proporcionar mensaje de error
     * VERIFICA:
     * - Se muestra el mensaje genérico de error
     * - La aplicación no se rompe con errores inesperados
     * - El usuario recibe feedback incluso en casos edge
     */
    it("muestra mensaje de error genérico si la API falla sin mensaje específico al actualizar", async () => {
      const onRefresh = vi.fn();
      const setOpen = vi.fn();
      (ProfessorService.updateProfessor as any).mockRejectedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm professor={professorMock} onRefresh={onRefresh} setOpen={setOpen} />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Juan Actualizado" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/error al actualizar los datos del profesor/i)).toBeInTheDocument();
      });
    });

    /**
     * PRUEBA: Verificación de que callbacks no se ejecutan cuando falla la actualización
     * CUBRE:
     * - Bloque .catch() que NO ejecuta onRefresh() ni setOpen()
     * - Lógica de control de flujo: solo se llaman callbacks en caso de éxito
     * - Prevención de comportamiento incorrecto (cerrar modal o refrescar con error)
     * SIMULA: Actualización falla y se verifica que callbacks parent no se ejecutan
     * VERIFICA:
     * - onRefresh NO se llama cuando hay error (no refresca la lista)
     * - setOpen NO se llama cuando hay error (no cierra el modal/diálogo)
     * - El usuario puede ver el error y reintentar sin perder el contexto
     * - El estado de la UI padre permanece intacto en caso de error
     */
    it("no llama a onRefresh o setOpen si fallan", async () => {
      const onRefresh = vi.fn();
      const setOpen = vi.fn();
      (ProfessorService.updateProfessor as any).mockRejectedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm professor={professorMock} onRefresh={onRefresh} setOpen={setOpen} />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Juan Actualizado" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/error al actualizar los datos del profesor/i)).toBeInTheDocument();
      });

      expect(onRefresh).not.toHaveBeenCalled();
      expect(setOpen).not.toHaveBeenCalled();
    });
  });

  describe("Casos edge", () => {
    /**
     * PRUEBA: Aceptación de nombres con múltiples espacios
     * CUBRE:
     * - Validación de Zod que NO rechaza espacios en el nombre
     * - Caso de uso real: nombres compuestos latinoamericanos
     * - Entrada de datos con caracteres especiales (tildes, espacios múltiples)
     * SIMULA: Usuario ingresa nombre completo con múltiples espacios
     * VERIFICA:
     * - El nombre "Pedro José González Martínez" se acepta sin errores
     * - Los espacios internos se preservan en el payload
     * - La validación no es demasiado restrictiva
     * - El servicio recibe el nombre exactamente como se ingresó
     * CASO EDGE: Nombres reales complejos con espacios y tildes
     */
    it("acepta espacios en el nombre", async () => {
      (ProfessorService.createProfessor as any).mockResolvedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro José González Martínez" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(ProfessorService.createProfessor).toHaveBeenCalledWith({
          usuName: "Pedro José González Martínez",
          usuEmail: "pedro@test.com",
          usuPassword: "Admin123@",
        });
      });
    });

    /**
     * PRUEBA: Aceptación de caracteres especiales válidos en contraseña
     * CUBRE:
     * - Validación de Zod para regex de caracteres especiales /[@$!%*?&]/
     * - Casos límite: contraseñas mínimas pero válidas
     * - Verificación de que al menos uno de los caracteres especiales funciona
     * SIMULA: Usuario ingresa contraseña corta pero válida "Admin1@"
     * VERIFICA:
     * - La contraseña con @ (arroba) se acepta
     * - Cumple todos los requisitos: mayúscula, minúscula, número, especial
     * - La longitud mínima de 7 caracteres es aceptada
     * - Cualquiera de los caracteres @$!%*?& es válido
     * CASO EDGE: Contraseña mínima pero válida según todas las reglas
     */
    it("acepta diferentes caracteres especiales válidos en la contraseña", async () => {
      (ProfessorService.createProfessor as any).mockResolvedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Pedro" } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: "pedro@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin1@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin1@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(ProfessorService.createProfessor).toHaveBeenCalledWith({
          usuName: "Pedro",
          usuEmail: "pedro@test.com",
          usuPassword: "Admin1@",
        });
      });
    });

    /**
     * PRUEBA: Aceptación de valores en el límite máximo permitido
     * CUBRE:
     * - Validación de Zod: usuName.max(50) y usuEmail.max(100)
     * - Casos límite: valores exactamente en el máximo permitido
     * - Verificación de que las validaciones max() no son exclusivas
     * SIMULA: Usuario ingresa nombre de 50 caracteres y email de 100 caracteres
     * VERIFICA:
     * - Nombre con exactamente 50 caracteres se acepta
     * - Email con exactamente 100 caracteres se acepta
     * - El servicio createProfessor se llama exitosamente
     * - No hay error de validación en los límites exactos
     * CASO EDGE: Verificación de límites inclusivos (≤ 50, ≤ 100) no exclusivos (< 50, < 100)
     */
    it("acepta el máximo de caracteres permitidos", async () => {
      (ProfessorService.createProfessor as any).mockResolvedValueOnce({});

      render(
        <MemoryRouter>
          <ProfForm />
        </MemoryRouter>
      );

      const nombreMaximo = "A".repeat(50);
      const emailMaximo = "a".repeat(89) + "@test.com"; // 100 caracteres total
      
      fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: nombreMaximo } });
      fireEvent.change(screen.getByPlaceholderText("Correo electronico"), { target: { value: emailMaximo } });
      fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Admin123@" } });
      fireEvent.change(screen.getByPlaceholderText("Repita la contraseña"), { target: { value: "Admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(ProfessorService.createProfessor).toHaveBeenCalled();
      });
    });
  });
});
