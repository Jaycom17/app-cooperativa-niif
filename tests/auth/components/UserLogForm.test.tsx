/**
 * ============================================================================
 * SUITE DE PRUEBAS: UsersLogForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/auth/components/organisms/UsersLogForm.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente UsersLogForm,
 * que permite a usuarios (profesores/administradores) iniciar sesión mediante
 * email y contraseña con validaciones robustas.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado inicial del formulario
 * 2. Validaciones del campo email (formato, obligatorio)
 * 3. Validaciones del campo contraseña (longitud, mayúsculas, minúsculas, números, caracteres especiales)
 * 4. Proceso completo de envío del formulario
 * 5. Manejo de errores de autenticación desde AuthStore
 * 6. Estados de loading y deshabilitado del botón
 * 7. Integración con react-hook-form y Zod
 * 8. Casos límite y edge cases
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import UsersLogForm from "../../../src/auth/components/organisms/UsersLogForm";

/**
 * MOCK DATA: Funciones de prueba
 * PROPÓSITO: Simular las funciones que se pasan como props al componente
 * FUNCIONES MOCKEADAS:
 * - onSubmit: Simula el handler que procesa el envío del formulario
 * USO: Se pasan como props a UsersLogForm para verificar que se llaman correctamente
 */
const mockOnSubmit = vi.fn();

/**
 * MOCK: AuthStore
 * PROPÓSITO: Simular el store de autenticación
 * ESTADO MOCKEADO:
 * - loginError: Error de inicio de sesión para mostrar feedback al usuario
 */
let mockAuthStore = {
  loginError: null as string | null,
};

vi.mock("@/stores/AuthStore", () => ({
  useAuthStore: () => mockAuthStore,
}));

describe("UsersLogForm", () => {
  /**
   * beforeEach: Configuración previa a cada prueba
   * PROPÓSITO: Limpiar todos los mocks antes de cada test
   * GARANTIZA: Cada prueba comienza con un estado limpio y predecible
   */
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthStore = {
      loginError: null,
    };
  });

  describe("Renderizado inicial", () => {
    /**
     * PRUEBA: Renderizado básico del formulario
     * CUBRE: Renderizado inicial del componente UsersLogForm
     * VERIFICA:
     * - El título "Inicia sesión con tus credenciales" está presente
     * - El icono de login (IoLogInOutline) se renderiza
     * - El campo de email está presente con el placeholder correcto
     * - El campo de contraseña está presente con el placeholder correcto
     * - El botón "Ingresar" está visible y habilitado
     * - NO hay mensaje de error visible inicialmente
     */
    it("renderiza el formulario correctamente", () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.getByText(/inicia sesión con tus credenciales/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
      expect(screen.queryByText(/credenciales incorrectas/i)).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del icono de login
     * CUBRE: Renderizado del componente IoLogInOutline de react-icons
     * VERIFICA:
     * - Un elemento SVG está presente en el DOM (el icono)
     * - El icono se muestra correctamente en la interfaz
     */
    it("muestra el icono de login", () => {
      const { container } = render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del mensaje de error cuando loginError existe
     * CUBRE: Renderizado condicional del mensaje loginError
     * VERIFICA:
     * - Cuando loginError no es null, se muestra el mensaje
     * - El mensaje de error se renderiza con el texto "Credenciales incorrectas"
     * - El componente muestra feedback visual al usuario
     */
    it("muestra el mensaje de error cuando loginError no es null", () => {
      mockAuthStore.loginError = "Usuario o contraseña incorrectos";

      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: No muestra mensaje de error cuando loginError es null
     * CUBRE: Renderizado condicional cuando no hay error
     * VERIFICA:
     * - El mensaje de error NO se muestra cuando loginError es null
     * - La interfaz está limpia sin mensajes de error
     */
    it("no muestra el mensaje de error cuando loginError es null", () => {
      mockAuthStore.loginError = null;

      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.queryByText(/credenciales incorrectas/i)).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Botón habilitado por defecto
     * CUBRE: Estado inicial del botón cuando isSubmitting es false
     * VERIFICA:
     * - El botón "Ingresar" no está deshabilitado inicialmente
     * - El usuario puede enviar el formulario desde el inicio
     */
    it("el botón está habilitado por defecto", () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const button = screen.getByRole("button", { name: /ingresar/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe("Validaciones del campo email", () => {
    /**
     * PRUEBA: Validación de email vacío
     * CUBRE: Validación de Zod en LoginSchema - email.nonempty()
     * SIMULA: Usuario intenta enviar el formulario sin email
     * VERIFICA:
     * - El mensaje de error aparece indicando que el email es requerido
     * - react-hook-form previene el envío del formulario
     * - onSubmit NO se ejecuta con datos inválidos
     */
    it("valida que el email es obligatorio", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/se requiere un email/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de formato de email inválido
     * CUBRE: Validación de Zod en LoginSchema - email.email()
     * SIMULA: Usuario ingresa un email con formato inválido
     * VERIFICA:
     * - El mensaje de error "Email inválido" aparece
     * - El formulario no se envía con emails mal formateados
     */
    it("valida el formato del email", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      fireEvent.change(emailInput, { target: { value: "correo-invalido" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Acepta emails con formato válido
     * CUBRE: Validación positiva del email
     * SIMULA: Usuario ingresa email válido
     * VERIFICA:
     * - No aparece error de email
     * - El campo pasa la validación
     */
    it("acepta emails con formato válido", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "usuario@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@123" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * PRUEBA: Acepta diferentes formatos de email válidos
     * CUBRE: Variedad de formatos de email aceptados
     * VERIFICA:
     * - Emails con subdominios funcionan
     * - Emails con números funcionan
     * - Emails con guiones y puntos funcionan
     */
    it("acepta diferentes formatos válidos de email", async () => {
      const validEmails = [
        "user@domain.com",
        "user.name@domain.com",
        "user+tag@sub.domain.com",
        "user123@example.co.uk",
      ];

      for (const email of validEmails) {
        mockOnSubmit.mockClear();

        const { unmount } = render(
          <MemoryRouter>
            <UsersLogForm onSubmit={mockOnSubmit} />
          </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        const passwordInput = screen.getByPlaceholderText(/contraseña/i);

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: "Test@123" } });

        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ email }),
            expect.anything()
          );
        });

        unmount();
      }
    });
  });

  describe("Validaciones del campo contraseña", () => {
    /**
     * PRUEBA: Validación de contraseña vacía
     * CUBRE: Validación de Zod - password requerido
     * SIMULA: Usuario intenta enviar sin contraseña
     * VERIFICA:
     * - El mensaje de error aparece (minimo 6 caracteres cuando está vacío)
     * - El formulario no se envía
     */
    it("valida que la contraseña es obligatoria", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de longitud mínima (6 caracteres)
     * CUBRE: Validación de Zod - password.min(6)
     * SIMULA: Usuario ingresa contraseña muy corta
     * VERIFICA:
     * - El mensaje de error específico aparece
     * - El formulario no se envía con contraseñas cortas
     */
    it("valida longitud mínima de la contraseña (6 caracteres)", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Te@1" } }); // 4 caracteres

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de longitud máxima (20 caracteres)
     * CUBRE: Validación de Zod - password.max(20)
     * SIMULA: Usuario ingresa contraseña muy larga
     * VERIFICA:
     * - El mensaje de error sobre longitud máxima aparece
     * - El formulario no se envía con contraseñas largas
     */
    it("valida longitud máxima de la contraseña (20 caracteres)", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      // 21 caracteres válidos pero excede el máximo
      fireEvent.change(passwordInput, { target: { value: "Test@12345678901234567" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/la contraseña no debe exceder 20 caracteres/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de letra mayúscula requerida
     * CUBRE: Validación de Zod - password.regex(/[A-Z]/)
     * SIMULA: Usuario ingresa contraseña sin mayúsculas
     * VERIFICA:
     * - El mensaje de error específico aparece
     * - El formulario requiere al menos una mayúscula
     */
    it("valida que la contraseña contenga al menos una letra mayúscula", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "test@123" } }); // sin mayúscula

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/la contraseña debe contener al menos una letra mayúscula/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de letra minúscula requerida
     * CUBRE: Validación de Zod - password.regex(/[a-z]/)
     * SIMULA: Usuario ingresa contraseña sin minúsculas
     * VERIFICA:
     * - El mensaje de error específico aparece
     * - El formulario requiere al menos una minúscula
     */
    it("valida que la contraseña contenga al menos una letra minúscula", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "TEST@123" } }); // sin minúscula

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/la contraseña debe contener al menos una letra minúscula/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de número requerido
     * CUBRE: Validación de Zod - password.regex(/\d/)
     * SIMULA: Usuario ingresa contraseña sin números
     * VERIFICA:
     * - El mensaje de error específico aparece
     * - El formulario requiere al menos un número
     */
    it("valida que la contraseña contenga al menos un número", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@abcd" } }); // sin número

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/la contraseña debe contener al menos un número/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de carácter especial requerido
     * CUBRE: Validación de Zod - password.regex(/[@$!%*?&]/)
     * SIMULA: Usuario ingresa contraseña sin caracteres especiales
     * VERIFICA:
     * - El mensaje de error específico aparece
     * - El formulario requiere al menos un carácter especial
     */
    it("valida que la contraseña contenga al menos un carácter especial", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test1234" } }); // sin carácter especial

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/la contraseña debe contener al menos un carácter especial/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Acepta contraseña que cumple todos los requisitos
     * CUBRE: Validación completa exitosa
     * SIMULA: Usuario ingresa contraseña válida
     * VERIFICA:
     * - La contraseña pasa todas las validaciones
     * - onSubmit se ejecuta correctamente
     */
    it("acepta contraseña que cumple todos los requisitos", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@123" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            email: "user@example.com",
            password: "Test@123",
          },
          expect.anything()
        );
      });
    });

    /**
     * PRUEBA: Acepta diferentes caracteres especiales válidos
     * CUBRE: Variedad de caracteres especiales (@$!%*?&)
     * VERIFICA:
     * - Todos los caracteres especiales permitidos funcionan
     */
    it("acepta todos los caracteres especiales válidos", async () => {
      const specialChars = ["@", "$", "!", "%", "*", "?", "&"];

      for (const char of specialChars) {
        mockOnSubmit.mockClear();

        const { unmount } = render(
          <MemoryRouter>
            <UsersLogForm onSubmit={mockOnSubmit} />
          </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        const passwordInput = screen.getByPlaceholderText(/contraseña/i);

        fireEvent.change(emailInput, { target: { value: "user@example.com" } });
        fireEvent.change(passwordInput, { target: { value: `Test${char}123` } });

        fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        });

        unmount();
      }
    });
  });

  describe("Envío del formulario", () => {
    /**
     * PRUEBA: Envío exitoso con credenciales válidas
     * CUBRE: Función handleSubmit de react-hook-form y onSubmit del componente
     * SIMULA: Usuario llena el formulario correctamente y envía
     * VERIFICA:
     * - onSubmit se llama exactamente una vez
     * - Se envía el objeto con la estructura correcta: { email, password }
     * - Los valores enviados coinciden con los ingresados
     */
    it("envía el formulario correctamente con credenciales válidas", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "admin@university.com" } });
      fireEvent.change(passwordInput, { target: { value: "Admin@2024" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            email: "admin@university.com",
            password: "Admin@2024",
          },
          expect.anything()
        );
      });
    });

    /**
     * PRUEBA: Envío con contraseña en longitud mínima (6 caracteres)
     * CUBRE: Límite mínimo de contraseña
     * VERIFICA:
     * - Contraseña de exactamente 6 caracteres se acepta
     * - El límite mínimo es inclusivo
     */
    it("acepta contraseña con exactamente 6 caracteres válidos", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Aa@1bc" } }); // exactamente 6

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * PRUEBA: Envío con contraseña en longitud máxima (20 caracteres)
     * CUBRE: Límite máximo de contraseña
     * VERIFICA:
     * - Contraseña de exactamente 20 caracteres se acepta
     * - El límite máximo es inclusivo
     */
    it("acepta contraseña con exactamente 20 caracteres válidos", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@12345678901234" } }); // exactamente 20

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * PRUEBA: Envío con Enter en el formulario
     * CUBRE: Submit mediante tecla Enter
     * VERIFICA:
     * - El formulario se puede enviar presionando Enter
     * - El evento submit se maneja correctamente
     */
    it("puede enviar el formulario presionando Enter", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@123" } });

      const form = emailInput.closest("form")!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Manejo de errores de autenticación", () => {
    /**
     * PRUEBA: Visualización de error cuando loginError existe
     * CUBRE: Renderizado condicional del mensaje de error desde AuthStore
     * VERIFICA:
     * - El mensaje "Credenciales incorrectas" se muestra
     * - El usuario recibe feedback visual sobre el error
     */
    it("muestra mensaje de error cuando hay loginError en el AuthStore", () => {
      mockAuthStore.loginError = "Usuario o contraseña incorrectos";

      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Ocultación de error cuando loginError es null
     * CUBRE: Renderizado condicional sin error
     * VERIFICA:
     * - No se muestra mensaje de error cuando loginError es null
     * - La interfaz está limpia
     */
    it("no muestra mensaje de error cuando loginError es null", () => {
      mockAuthStore.loginError = null;

      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.queryByText(/credenciales incorrectas/i)).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: El formulario se puede reenviar después de un error
     * CUBRE: Capacidad de reintentar después de recibir un error
     * SIMULA: Usuario ve error, corrige datos y vuelve a enviar
     * VERIFICA:
     * - El formulario sigue siendo funcional después de un error
     * - onSubmit se puede llamar nuevamente
     */
    it("permite reenviar el formulario después de un error", async () => {
      mockAuthStore.loginError = "Credenciales incorrectas";

      const { rerender } = render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();

      // Simulamos que el error se limpia
      mockAuthStore.loginError = null;

      rerender(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "correct@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Correct@123" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * PRUEBA: Actualiza la visualización cuando loginError cambia
     * CUBRE: Reactividad del componente ante cambios en AuthStore
     * VERIFICA:
     * - Los cambios en loginError se reflejan en la UI
     * - El componente está subscrito al AuthStore
     */
    it("actualiza la visualización del error cuando loginError cambia", () => {
      mockAuthStore.loginError = null;

      const { rerender } = render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.queryByText(/credenciales incorrectas/i)).not.toBeInTheDocument();

      mockAuthStore.loginError = "Error de autenticación";

      rerender(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
    });
  });

  describe("Estados del formulario", () => {
    /**
     * PRUEBA: Los inputs reciben y actualizan valores correctamente
     * CUBRE: Binding bidireccional de inputs con react-hook-form
     * VERIFICA:
     * - Los inputs reflejan los valores ingresados
     * - El estado del formulario se actualiza correctamente
     */
    it("actualiza los valores de los inputs correctamente", () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i) as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@123" } });

      expect(emailInput.value).toBe("test@example.com");
      expect(passwordInput.value).toBe("Test@123");
    });

    /**
     * PRUEBA: El campo de email es de tipo text
     * CUBRE: Atributo type del InputForm
     * VERIFICA:
     * - El campo se renderiza como input de tipo texto
     */
    it("el campo de email es de tipo text", () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      expect(emailInput).toHaveAttribute("type", "text");
    });

    /**
     * PRUEBA: El campo de contraseña es de tipo password
     * CUBRE: Atributo type del PasswordInput
     * VERIFICA:
     * - El campo se renderiza como input de tipo password
     * - La contraseña está oculta por defecto
     */
    it("el campo de contraseña es de tipo password", () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Casos edge y comportamientos especiales", () => {
    /**
     * PRUEBA: Maneja espacios en blanco en el email
     * CUBRE: Comportamiento con espacios
     * SIMULA: Usuario ingresa email con espacios
     * VERIFICA:
     * - El email con espacios es marcado como inválido
     * - El formulario no se envía
     */
    it("maneja espacios en blanco en el email", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: " user@test.com " } });
      fireEvent.change(passwordInput, { target: { value: "Test@123" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validaciones múltiples simultáneas
     * CUBRE: Múltiples errores de validación al mismo tiempo
     * SIMULA: Email y contraseña inválidos simultáneamente
     * VERIFICA:
     * - Se muestran los errores de validación
     * - react-hook-form maneja múltiples errores
     */
    it("muestra múltiples errores de validación simultáneamente", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "email-invalido" } });
      fireEvent.change(passwordInput, { target: { value: "123" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
        expect(
          screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Contraseña con múltiples caracteres especiales
     * CUBRE: Contraseñas complejas con varios caracteres especiales
     * VERIFICA:
     * - Contraseñas con múltiples caracteres especiales se aceptan
     */
    it("acepta contraseña con múltiples caracteres especiales", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(emailInput, { target: { value: "user@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "T@st!2023$" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * PRUEBA: Comportamiento con datos borrados después de ingresarlos
     * CUBRE: Validación cuando se borran datos
     * SIMULA: Usuario ingresa datos y luego los borra
     * VERIFICA:
     * - La validación se ejecuta correctamente
     * - Los mensajes de error aparecen
     */
    it("valida correctamente cuando se borran los datos después de ingresarlos", async () => {
      render(
        <MemoryRouter>
          <UsersLogForm onSubmit={mockOnSubmit} />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      // Ingresar datos
      fireEvent.change(emailInput, { target: { value: "user@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test@123" } });

      // Borrar datos
      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/se requiere un email/i)).toBeInTheDocument();
        expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});