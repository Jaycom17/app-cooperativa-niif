/**
 * ============================================================================
 * SUITE DE PRUEBAS: UpdateInfoAdminPage Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/admin/pages/UpdateInfoAdminPage.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para la página de actualización
 * de información del administrador (UpdateInfoAdminPage), que permite al admin
 * modificar su nombre, email y contraseña.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Carga y precarga de datos del administrador desde el servicio
 * 2. Validaciones de formulario (nombre, email, contraseña)
 * 3. Proceso completo de actualización de información
 * 4. Manejo de errores del servidor (401, errores generales)
 * 5. Integración con stores (StatusStore)
 * 6. Visualización de mensajes emergentes (PopUpMessage)
 * 7. Limpieza de campos de contraseña después de actualización exitosa
 * 8. Manejo de estados de carga (useEffect)
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import UpdateInfoAdminPage from "../../../src/admin/pages/UpdateInfoAdminPage";
import { AdminService } from "../../../src/admin/services/admin.service";
import type { UserModel } from "../../../src/admin/models/User";

// Mock de datos para las pruebas
const mockAdminProfile = {
  data: {
    usuID: "admin-123",
  },
};

const mockAdminData: UserModel = {
  usuID: "admin-123",
  usuName: "Carlos Admin",
  usuEmail: "carlos@admin.com",
};

/**
 * MOCK: AdminService
 * PROPÓSITO: Simular las llamadas HTTP al backend sin hacer peticiones reales
 * MÉTODOS MOCKEADOS:
 * - profile: Obtiene el ID del usuario autenticado desde el token JWT
 * - getAdminById: Obtiene los datos completos del administrador por ID
 * - updateAdmin: Actualiza la información del administrador
 */
vi.mock("@/admin/services/admin.service");

/**
 * MOCK: StatusStore (Zustand store)
 * PROPÓSITO: Simular el store de estado global para notificaciones/mensajes
 * FUNCIÓN MOCKEADA: useStatusStore hook con setStatus y estados
 */
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

/**
 * MOCK: AdminLayout
 * PROPÓSITO: Simplificar el wrapper del layout para enfocarnos en la lógica de la página
 */
vi.mock("@/admin/components/templates/AdminLayout", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="admin-layout">{children}</div>,
}));

/**
 * MOCK: PopUpMessage
 * PROPÓSITO: Simular el componente de mensajes emergentes para verificar su uso
 */
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

describe("UpdateInfoAdminPage component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
    
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
   * GRUPO 1: Carga inicial y renderizado
   * 
   * Pruebas que verifican la carga de datos del administrador desde el servicio,
   * el precargado del formulario y el renderizado inicial de la página.
   * 
   * Cobertura:
   * - useEffect(() => { AdminService.profile() }, [setValue])
   * - AdminService.profile() -> AdminService.getAdminById()
   * - setValue para precargar campos del formulario
   * - Renderizado de componentes del formulario
   */
  describe("Carga inicial y renderizado", () => {
    /**
     * Verifica que se cargue y renderice la página correctamente
     * 
     * Cubre:
     * - Renderizado del AdminLayout
     * - Renderizado del logo de la universidad
     * - Renderizado del título "Actualiza tus datos"
     * - Renderizado del formulario con todos los campos
     */
    it("renderiza la página con todos sus elementos", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      // Verificar estructura principal
      expect(screen.getByTestId("admin-layout")).toBeInTheDocument();
      
      // Verificar título y descripción
      await waitFor(() => {
        expect(screen.getByText("Actualiza tus datos")).toBeInTheDocument();
        expect(screen.getByText(/puede actualizar sus datos de administrador/i)).toBeInTheDocument();
      });

      // Verificar campos del formulario
      expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Repita la contraseña")).toBeInTheDocument();
      
      // Verificar botón de confirmar
      expect(screen.getByRole("button", { name: /confirmar/i })).toBeInTheDocument();
    });

    /**
     * Verifica que se carguen los datos del administrador al montar el componente
     * 
     * Cubre:
     * - useEffect con dependencia [setValue]
     * - Llamada a AdminService.profile()
     * - Llamada a AdminService.getAdminById() con el ID obtenido
     * - Secuencia de llamadas encadenadas (profile -> getAdminById)
     */
    it("carga los datos del administrador al montar el componente", async () => {
      const profileSpy = vi.spyOn(AdminService, "profile" as any)
        .mockResolvedValueOnce(mockAdminProfile);
      const getAdminSpy = vi.spyOn(AdminService, "getAdminById" as any)
        .mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      // Verificar que se llamó a profile
      await waitFor(() => {
        expect(profileSpy).toHaveBeenCalledTimes(1);
      });

      // Verificar que se llamó a getAdminById con el ID correcto
      await waitFor(() => {
        expect(getAdminSpy).toHaveBeenCalledWith("admin-123");
      });
    });

    /**
     * Verifica que los campos del formulario se precargan con los datos del admin
     * 
     * Cubre:
     * - setValue("usuName", user.usuName) en el .then()
     * - setValue("usuEmail", user.usuEmail) en el .then()
     * - Precarga de valores en el formulario
     * - Los campos password quedan vacíos (no se precargan por seguridad)
     */
    it("precarga los datos del administrador en el formulario", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      // Verificar que los campos se precargan con los datos correctos
      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
        expect(screen.getByDisplayValue("carlos@admin.com")).toBeInTheDocument();
      });

      // Verificar que los campos de contraseña están vacíos
      const passwordInputs = screen.getAllByPlaceholderText(/contraseña/i);
      passwordInputs.forEach(input => {
        expect(input).toHaveValue("");
      });
    });

    /**
     * Verifica el renderizado del icono en el formulario
     * 
     * Cubre:
     * - Renderizado del icono MdCreate
     * - Estructura visual del formulario
     */
    it("muestra el icono de actualización en el formulario", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      const { container } = render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 2: Manejo de errores en la carga de datos
   * 
   * Pruebas que verifican el comportamiento del componente cuando
   * ocurren errores al cargar los datos del administrador.
   * 
   * Cobertura:
   * - Bloque .catch() de profile()
   * - Bloque .catch() de getAdminById()
   * - setStatus con tipo "error"
   * - Mensajes de error apropiados
   */
  describe("Manejo de errores en la carga de datos", () => {
    /**
     * Verifica el manejo de error al obtener el perfil
     * 
     * Cubre:
     * - .catch() después de AdminService.profile()
     * - setStatus con mensaje de error
     * - Tipo de notificación "error"
     */
    it("muestra mensaje de error cuando falla AdminService.profile()", async () => {
      vi.spyOn(AdminService, "profile").mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "Error al cargar la información del usuario",
          type: "error",
        });
      });
    });

    /**
     * Verifica el manejo de error al obtener datos del admin por ID
     * 
     * Cubre:
     * - .catch() después de AdminService.getAdminById()
     * - Secuencia: profile() exitoso pero getAdminById() falla
     * - setStatus con mensaje de error
     */
    it("muestra mensaje de error cuando falla AdminService.getAdminById()", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockRejectedValueOnce(new Error("User not found"));

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "Error al cargar la información del usuario",
          type: "error",
        });
      });
    });

    /**
     * Verifica que no se precargan datos cuando hay error
     * 
     * Cubre:
     * - Campos del formulario permanecen vacíos cuando falla la carga
     * - setValue no se ejecuta cuando hay error
     */
    it("no precarga datos en el formulario cuando hay error", async () => {
      vi.spyOn(AdminService, "profile").mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalled();
      });

      // Los campos no deben tener valores precargados
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      const emailInput = screen.getByPlaceholderText("Correo electrónico");
      
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });

  /**
   * GRUPO 3: Validaciones de formulario
   * 
   * Pruebas que verifican las validaciones de campos mediante Zod schema
   * (UserEditSchema).
   * 
   * Cobertura:
   * - Validación de nombre obligatorio
   * - Validación de email válido
   * - Validaciones de contraseña (opcionales pero con requisitos)
   * - Validación de coincidencia de contraseñas
   */
  describe("Validaciones de formulario", () => {
    /**
     * Verifica que el nombre es obligatorio
     * 
     * Cubre:
     * - UserEditSchema: usuName.min(1, "El nombre es obligatorio")
     * - react-hook-form errors.usuName
     */
    it("valida que el nombre es obligatorio", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Limpiar el nombre
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "" } });

      // Intentar enviar
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica la validación de formato de email
     * 
     * Cubre:
     * - UserEditSchema: usuEmail.email("El correo electrónico no es válido")
     * - Validación de formato de email
     */
    it("valida que el email tenga formato válido", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      const updateSpy = vi.spyOn(AdminService, "updateAdmin").mockResolvedValueOnce();

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("carlos@admin.com")).toBeInTheDocument();
      });

      // Ingresar email inválido pero mantener nombre válido
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      const emailInput = screen.getByPlaceholderText("Correo electrónico");
      
      // Asegurar que el nombre esté lleno
      expect(nameInput).toHaveValue("Carlos Admin");
      
      // Cambiar a email inválido
      fireEvent.change(emailInput, { target: { value: "email-invalido" } });

      // Intentar enviar
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      // Debe fallar la validación y NO llamar al servicio
      await waitFor(() => {
        // El servicio updateAdmin NO debe ser llamado porque hay error de validación
        expect(updateSpy).not.toHaveBeenCalled();
      }, { timeout: 3000 });
      
      // Verificar que el email sigue con el valor inválido (no se envió el formulario)
      expect(emailInput).toHaveValue("email-invalido");
    });

    /**
     * Verifica validación de longitud máxima del nombre
     * 
     * Cubre:
     * - UserEditSchema: usuName.max(50)
     * - Límite de caracteres en el nombre
     */
    it("valida la longitud máxima del nombre (50 caracteres)", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Ingresar nombre muy largo (51 caracteres)
      const nombreLargo = "A".repeat(51);
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: nombreLargo } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el nombre no puede exceder los 50 caracteres/i)).toBeInTheDocument();
      });
    });

    /**
     * Verifica que la contraseña sea opcional pero con requisitos si se ingresa
     * 
     * Cubre:
     * - UserEditSchema: usuPassword.optional() con .refine()
     * - Contraseña opcional en modo edición
     * - Si se ingresa, debe cumplir requisitos
     */
    it("permite dejar las contraseñas vacías (opcionales)", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockResolvedValueOnce();

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Cambiar solo el nombre, dejar contraseñas vacías
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "Carlos Admin Actualizado" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      // No debe haber errores de validación
      await waitFor(() => {
        expect(AdminService.updateAdmin).toHaveBeenCalled();
      });
    });

    /**
     * Verifica validación de longitud mínima de contraseña si se ingresa
     * 
     * Cubre:
     * - UserEditSchema: usuPassword.refine() con validación de longitud
     * - Mensaje: "La contraseña debe tener entre 6 y 20 caracteres"
     */
    it("valida longitud mínima de contraseña si se ingresa (6 caracteres)", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Ingresar contraseña muy corta en ambos campos
      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "Ab1@" } });
      fireEvent.change(confirmInput, { target: { value: "Ab1@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        // En modo edición, las contraseñas son opcionales pero si se ingresa debe cumplir requisitos
        // Buscar error relacionado con contraseña
        const errorMessages = screen.queryAllByText(/contraseña/i);
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    /**
     * Verifica que la contraseña requiera mayúscula si se ingresa
     * 
     * Cubre:
     * - UserEditSchema: usuPassword.refine() con /[A-Z]/
     */
    it("valida que la contraseña contenga mayúscula si se ingresa", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "admin123@" } });
      fireEvent.change(confirmInput, { target: { value: "admin123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos una letra mayúscula/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * Verifica que la contraseña requiera minúscula si se ingresa
     * 
     * Cubre:
     * - UserEditSchema: usuPassword.refine() con /[a-z]/
     */
    it("valida que la contraseña contenga minúscula si se ingresa", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "ADMIN123@" } });
      fireEvent.change(confirmInput, { target: { value: "ADMIN123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos una letra minúscula/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * Verifica que la contraseña requiera número si se ingresa
     * 
     * Cubre:
     * - UserEditSchema: usuPassword.refine() con /\d/
     */
    it("valida que la contraseña contenga número si se ingresa", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "AdminTest@" } });
      fireEvent.change(confirmInput, { target: { value: "AdminTest@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos un número/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * Verifica que la contraseña requiera carácter especial si se ingresa
     * 
     * Cubre:
     * - UserEditSchema: usuPassword.refine() con /[@$!%*?&]/
     */
    it("valida que la contraseña contenga carácter especial si se ingresa", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "Admin123" } });
      fireEvent.change(confirmInput, { target: { value: "Admin123" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getAllByText(/la contraseña debe contener al menos un carácter especial/i).length).toBeGreaterThan(0);
      });
    });

    /**
     * Verifica que las contraseñas coincidan si se ingresan
     * 
     * Cubre:
     * - UserEditSchema: .refine() comparando password y confirmPassword
     * - Mensaje: "Las contraseñas no coinciden"
     */
    it("valida que las contraseñas coincidan si se ingresan", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "Admin123@" } });
      fireEvent.change(confirmInput, { target: { value: "Admin456@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 4: Actualización exitosa de datos
   * 
   * Pruebas que verifican el flujo completo de actualización de datos
   * del administrador.
   * 
   * Cobertura:
   * - Función onSubmit con datos válidos
   * - AdminService.updateAdmin()
   * - setStatus con mensaje de éxito
   * - Limpieza de campos de contraseña después de actualización
   * - setValue para actualizar campos del formulario
   */
  describe("Actualización exitosa de datos", () => {
    /**
     * Verifica la actualización exitosa solo del nombre y email
     * 
     * Cubre:
     * - onSubmit con data válida
     * - Construcción del objeto userData
     * - AdminService.updateAdmin(userData, id)
     * - setStatus con tipo "success"
     */
    it("actualiza correctamente nombre y email sin cambiar contraseña", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      const updateSpy = vi.spyOn(AdminService, "updateAdmin" as any)
        .mockResolvedValueOnce(undefined);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Cambiar nombre y email
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      const emailInput = screen.getByPlaceholderText("Correo electrónico");
      
      fireEvent.change(nameInput, { target: { value: "Carlos Actualizado" } });
      fireEvent.change(emailInput, { target: { value: "nuevo@admin.com" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalledWith(
          {
            usuName: "Carlos Actualizado",
            usuEmail: "nuevo@admin.com",
            usuPassword: "",
          },
          "admin-123"
        );
      });
    });

    /**
     * Verifica la actualización con cambio de contraseña
     * 
     * Cubre:
     * - onSubmit con contraseña nueva
     * - usuPassword incluido en userData cuando se ingresa
     */
    it("actualiza correctamente incluyendo nueva contraseña", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      const updateSpy = vi.spyOn(AdminService, "updateAdmin" as any)
        .mockResolvedValueOnce(undefined);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "NewPass123@" } });
      fireEvent.change(confirmInput, { target: { value: "NewPass123@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            usuPassword: "NewPass123@",
          }),
          "admin-123"
        );
      });
    });

    /**
     * Verifica el mensaje de éxito después de actualización
     * 
     * Cubre:
     * - .then() después de updateAdmin exitoso
     * - setStatus con show: true, type: "success"
     * - Título: "Datos actualizados"
     * - Mensaje: "Se han actualizado los datos del usuario"
     */
    it("muestra mensaje de éxito después de actualizar", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockResolvedValueOnce();

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "Nuevo Nombre" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Datos actualizados",
          message: "Se han actualizado los datos del usuario",
          type: "success",
        });
      });
    });

    /**
     * Verifica que se limpien los campos de contraseña después de actualización exitosa
     * 
     * Cubre:
     * - setValue("usuPassword", "") en el .then()
     * - setValue("confirmPassword", "") en el .then()
     * - Limpieza de campos sensibles
     */
    it("limpia los campos de contraseña después de actualización exitosa", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockResolvedValueOnce();

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");
      
      fireEvent.change(passwordInput, { target: { value: "NewPass123@" } });
      fireEvent.change(confirmInput, { target: { value: "NewPass123@" } });

      // Verificar que las contraseñas tienen valor antes de enviar
      expect(passwordInput).toHaveValue("NewPass123@");
      expect(confirmInput).toHaveValue("NewPass123@");

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      // Después de la actualización exitosa, los campos deben estar vacíos
      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({ type: "success" })
        );
      });

      // Los campos de contraseña deben estar limpios
      await waitFor(() => {
        expect(passwordInput).toHaveValue("");
        expect(confirmInput).toHaveValue("");
      });
    });

    /**
     * Verifica que se actualicen los campos nombre y email en el formulario
     * 
     * Cubre:
     * - setValue("usuName", userData.usuName) en el .then()
     * - setValue("usuEmail", userData.usuEmail) en el .then()
     * - Sincronización del formulario con los datos actualizados
     */
    it("actualiza los campos del formulario con los nuevos valores", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockResolvedValueOnce();

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const nameInput = screen.getByPlaceholderText("Nombre completo");
      const emailInput = screen.getByPlaceholderText("Correo electrónico");
      
      fireEvent.change(nameInput, { target: { value: "Nombre Actualizado" } });
      fireEvent.change(emailInput, { target: { value: "actualizado@admin.com" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(AdminService.updateAdmin).toHaveBeenCalled();
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({ type: "success" })
        );
      });

      // Los valores deben permanecer en el formulario
      expect(nameInput).toHaveValue("Nombre Actualizado");
      expect(emailInput).toHaveValue("actualizado@admin.com");
    });
  });

  /**
   * GRUPO 5: Manejo de errores en la actualización
   * 
   * Pruebas que verifican el comportamiento cuando falla la actualización
   * de datos.
   * 
   * Cobertura:
   * - Bloque .catch() de updateAdmin
   * - Extracción de mensaje de error de la respuesta
   * - setStatus con tipo "error"
   * - Manejo de diferentes estructuras de error
   */
  describe("Manejo de errores en la actualización", () => {
    /**
     * Verifica el manejo de error con mensaje específico de la API
     * 
     * Cubre:
     * - .catch((err: unknown) => {...})
     * - error.response?.data?.error?.message || fallback
     * - setStatus con mensaje de error específico
     */
    it("muestra mensaje de error específico de la API al actualizar", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockRejectedValueOnce({
        response: { 
          data: { 
            error: { 
              message: "El email ya está en uso" 
            } 
          } 
        },
      });

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "Nuevo Nombre" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "El email ya está en uso",
          type: "error",
        });
      });
    });

    /**
     * Verifica el mensaje de error genérico cuando no hay mensaje específico
     * 
     * Cubre:
     * - Operador || para fallback
     * - Mensaje: "Error al actualizar los datos del usuario"
     * - Manejo de errores sin estructura de respuesta
     */
    it("muestra mensaje de error genérico cuando no hay mensaje específico", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockRejectedValueOnce(new Error("Network error"));

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "Nuevo Nombre" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "Error al actualizar los datos del usuario",
          type: "error",
        });
      });
    });

    /**
     * Verifica que los datos del formulario se mantengan cuando hay error
     * 
     * Cubre:
     * - Los valores ingresados permanecen en el formulario después del error
     * - El usuario puede corregir y reintentar
     */
    it("mantiene los datos ingresados en el formulario cuando hay error", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockRejectedValueOnce(new Error("Error"));

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      const nameInput = screen.getByPlaceholderText("Nombre completo");
      const emailInput = screen.getByPlaceholderText("Correo electrónico");
      
      fireEvent.change(nameInput, { target: { value: "Nombre Con Error" } });
      fireEvent.change(emailInput, { target: { value: "error@test.com" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({ type: "error" })
        );
      });

      // Los valores deben mantenerse para que el usuario pueda corregir
      expect(nameInput).toHaveValue("Nombre Con Error");
      expect(emailInput).toHaveValue("error@test.com");
    });
  });

  /**
   * GRUPO 6: Integración con PopUpMessage
   * 
   * Pruebas que verifican la integración con el sistema de mensajes
   * emergentes.
   * 
   * Cobertura:
   * - Renderizado condicional de PopUpMessage
   * - Props del PopUpMessage
   * - Función onClose
   */
  describe("Integración con PopUpMessage", () => {
    /**
     * Verifica que no se muestre el popup inicialmente
     * 
     * Cubre:
     * - Estado inicial de show (false)
     * - Renderizado condicional: {show && <PopUpMessage>}
     */
    it("no muestra el popup inicialmente", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      expect(screen.queryByTestId("popup-message")).not.toBeInTheDocument();
    });

    /**
     * Verifica que se muestre el popup cuando show es true
     * 
     * Cubre:
     * - Renderizado condicional cuando show === true
     * - Props: message, title, type, onClose
     */
    it("muestra el popup cuando show es true en el StatusStore", async () => {
      mockStatusStore = {
        setStatus: mockSetStatus,
        message: "Mensaje de prueba",
        show: true,
        title: "Título de prueba",
        type: "info",
      };

      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("popup-message")).toBeInTheDocument();
        expect(screen.getByTestId("popup-title")).toHaveTextContent("Título de prueba");
        expect(screen.getByTestId("popup-message-text")).toHaveTextContent("Mensaje de prueba");
        expect(screen.getByTestId("popup-type")).toHaveTextContent("info");
      });
    });

    /**
     * Verifica que el botón de cerrar resetee el estado del popup
     * 
     * Cubre:
     * - onClose={() => setStatus({ show: false, message: "", title: "", type: "info" })}
     * - Reseteo completo del estado
     */
    it("cierra el popup correctamente cuando se hace click en cerrar", async () => {
      mockStatusStore = {
        setStatus: mockSetStatus,
        message: "Mensaje de prueba",
        show: true,
        title: "Título de prueba",
        type: "success",
      };

      vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
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

    /**
     * Verifica que el popup muestre el tipo correcto de mensaje
     * 
     * Cubre:
     * - Tipos: "success", "error", "warning", "info"
     * - Prop type en PopUpMessage
     */
    it("muestra el popup con diferentes tipos de mensaje", async () => {
      const tipos: Array<"success" | "error" | "warning" | "info"> = [
        "success",
        "error",
        "warning",
        "info",
      ];

      for (const tipo of tipos) {
        mockStatusStore = {
          setStatus: mockSetStatus,
          message: `Mensaje ${tipo}`,
          show: true,
          title: `Título ${tipo}`,
          type: tipo,
        };

        vi.spyOn(AdminService, "profile").mockResolvedValueOnce(mockAdminProfile);
        vi.spyOn(AdminService, "getAdminById").mockResolvedValueOnce(mockAdminData);

        const { unmount } = render(
          <MemoryRouter>
            <UpdateInfoAdminPage />
          </MemoryRouter>
        );

        await waitFor(() => {
          expect(screen.getByTestId("popup-type")).toHaveTextContent(tipo);
        });

        unmount();
      }
    });
  });

  /**
   * GRUPO 7: Flujos completos de usuario
   * 
   * Pruebas de integración que verifican flujos completos de usuario
   * desde el inicio hasta el fin.
   * 
   * Cobertura:
   * - Flujo completo: cargar -> editar -> actualizar
   * - Flujo con error -> corrección -> actualización exitosa
   * - Múltiples actualizaciones consecutivas
   */
  describe("Flujos completos de usuario", () => {
    /**
     * Verifica el flujo completo: cargar datos, editar y actualizar exitosamente
     * 
     * Cubre:
     * - useEffect inicial con carga de datos
     * - Edición de campos
     * - onSubmit exitoso
     * - Mensajes de éxito
     * - Limpieza de contraseñas
     */
    it("flujo completo: carga, edición y actualización exitosa", async () => {
      const profileSpy = vi.spyOn(AdminService, "profile" as any)
        .mockResolvedValue(mockAdminProfile);
      const getAdminSpy = vi.spyOn(AdminService, "getAdminById" as any)
        .mockResolvedValue(mockAdminData);
      const updateSpy = vi.spyOn(AdminService, "updateAdmin" as any)
        .mockResolvedValue(undefined);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      // 1. Verificar carga inicial
      await waitFor(() => {
        expect(profileSpy).toHaveBeenCalledTimes(1);
        expect(getAdminSpy).toHaveBeenCalledWith("admin-123");
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
        expect(screen.getByDisplayValue("carlos@admin.com")).toBeInTheDocument();
      });

      // 2. Editar campos
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      const emailInput = screen.getByPlaceholderText("Correo electrónico");
      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");

      fireEvent.change(nameInput, { target: { value: "Carlos Modificado" } });
      fireEvent.change(emailInput, { target: { value: "modificado@admin.com" } });
      fireEvent.change(passwordInput, { target: { value: "NewPass123@" } });
      fireEvent.change(confirmInput, { target: { value: "NewPass123@" } });

      // 3. Enviar formulario
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      // 4. Verificar actualización exitosa
      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalledWith(
          {
            usuName: "Carlos Modificado",
            usuEmail: "modificado@admin.com",
            usuPassword: "NewPass123@",
          },
          "admin-123"
        );

        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Datos actualizados",
          message: "Se han actualizado los datos del usuario",
          type: "success",
        });
      });

      // 5. Verificar limpieza de contraseñas
      await waitFor(() => {
        expect(passwordInput).toHaveValue("");
        expect(confirmInput).toHaveValue("");
      });
    });

    /**
     * Verifica el flujo: error de validación -> corrección -> actualización exitosa
     * 
     * Cubre:
     * - Errores de validación en el primer intento
     * - Corrección de datos
     * - Segundo intento exitoso
     */
    it("flujo de error de validación y corrección", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValue(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValue(mockAdminData);
      vi.spyOn(AdminService, "updateAdmin").mockResolvedValue();

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // 1. Intentar enviar con contraseñas que no coinciden
      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const confirmInput = screen.getByPlaceholderText("Repita la contraseña");

      fireEvent.change(passwordInput, { target: { value: "Pass123@" } });
      fireEvent.change(confirmInput, { target: { value: "Pass456@" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      // 2. Verificar error de validación
      await waitFor(() => {
        expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
      });

      // 3. Corregir las contraseñas
      fireEvent.change(confirmInput, { target: { value: "Pass123@" } });

      // 4. Reenviar formulario
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      // 5. Verificar actualización exitosa
      await waitFor(() => {
        expect(AdminService.updateAdmin).toHaveBeenCalled();
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({ type: "success" })
        );
      });
    });

    /**
     * Verifica múltiples actualizaciones consecutivas
     * 
     * Cubre:
     * - Actualización exitosa
     * - Edición posterior
     * - Segunda actualización exitosa
     * - Estado del formulario entre actualizaciones
     */
    it("permite múltiples actualizaciones consecutivas", async () => {
      let adminData = { ...mockAdminData };
      
      vi.spyOn(AdminService, "profile").mockResolvedValue(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockImplementation(() => 
        Promise.resolve(adminData)
      );
      vi.spyOn(AdminService, "updateAdmin").mockImplementation((data: any) => {
        adminData = { ...adminData, ...data };
        return Promise.resolve(undefined);
      });

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Primera actualización
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "Primera Actualización" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({ type: "success" })
        );
      });

      // Segunda actualización
      vi.clearAllMocks();
      fireEvent.change(nameInput, { target: { value: "Segunda Actualización" } });
      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(AdminService.updateAdmin).toHaveBeenCalledWith(
          expect.objectContaining({
            usuName: "Segunda Actualización",
          }),
          "admin-123"
        );
      });
    });

    /**
     * Verifica el flujo de actualización solo de nombre (sin email ni contraseña)
     * 
     * Cubre:
     * - Actualización parcial de datos
     * - Email se mantiene sin cambios
     * - Contraseñas permanecen vacías
     */
    it("permite actualizar solo el nombre", async () => {
      vi.spyOn(AdminService, "profile").mockResolvedValue(mockAdminProfile);
      vi.spyOn(AdminService, "getAdminById").mockResolvedValue(mockAdminData);
      const updateSpy = vi.spyOn(AdminService, "updateAdmin" as any)
        .mockResolvedValue(undefined);

      render(
        <MemoryRouter>
          <UpdateInfoAdminPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("Carlos Admin")).toBeInTheDocument();
      });

      // Cambiar solo el nombre
      const nameInput = screen.getByPlaceholderText("Nombre completo");
      fireEvent.change(nameInput, { target: { value: "Solo Nombre Cambiado" } });

      fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

      await waitFor(() => {
        expect(updateSpy).toHaveBeenCalledWith(
          {
            usuName: "Solo Nombre Cambiado",
            usuEmail: "carlos@admin.com", // Email original sin cambios
            usuPassword: "",
          },
          "admin-123"
        );
      });
    });
  });
});