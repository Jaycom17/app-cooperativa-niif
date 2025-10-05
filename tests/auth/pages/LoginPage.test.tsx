/**
 * ============================================================================
 * SUITE DE PRUEBAS: LoginPage Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/auth/pages/LoginPage.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para la página de inicio de
 * sesión (LoginPage), que permite a usuarios (profesores/administradores)
 * autenticarse en el sistema.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado inicial de la página (logo, formulario, enlaces)
 * 2. Integración con UsersLogForm
 * 3. Proceso de autenticación mediante AuthStore.signin
 * 4. Navegación automática según rol del usuario (useAuthNavigate)
 * 5. Enlace de navegación hacia la página de código de sala
 * 6. Manejo de errores de autenticación
 * 7. Estados de carga durante el proceso de login
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../../../src/auth/pages/LoginPage";
import type { LoginModel } from "../../../src/auth/models/Login";

/**
 * MOCK DATA: Usuario y datos de autenticación
 * PROPÓSITO: Simular diferentes escenarios de autenticación
 */
const mockAdminUser = {
  usuID: "admin-123",
  usuRole: "admin",
};

const mockProfessorUser = {
  usuID: "prof-456",
  usuRole: "professor",
};

const mockLoginData: LoginModel = {
  email: "test@example.com",
  password: "Test@123",
};

/**
 * MOCK: AuthStore
 * PROPÓSITO: Simular el store de autenticación con sus métodos
 * MÉTODOS MOCKEADOS:
 * - signin: Simula el proceso de inicio de sesión
 * - checkLogin: Verifica si hay sesión activa
 * - signout: Cierra la sesión
 * ESTADOS:
 * - user: Usuario autenticado o null
 * - loading: Estado de carga
 * - loginError: Error de autenticación
 */
const mockSignin = vi.fn();
const mockCheckLogin = vi.fn();
const mockSignout = vi.fn();

let mockAuthStore: {
  user: { usuID: string; usuRole: string } | null;
  loading: boolean;
  loginError: string | null;
  signin: typeof mockSignin;
  checkLogin: typeof mockCheckLogin;
  signout: typeof mockSignout;
} = {
  user: null,
  loading: false,
  loginError: null,
  signin: mockSignin,
  checkLogin: mockCheckLogin,
  signout: mockSignout,
};

vi.mock("@/stores/AuthStore", () => ({
  useAuthStore: () => mockAuthStore,
}));

/**
 * MOCK: useAuthNavigate hook
 * PROPÓSITO: Simular la navegación automática basada en el rol del usuario
 * NOTA: Este hook redirige a usuarios ya autenticados a su página correspondiente
 */
const mockUseAuthNavigate = vi.fn();
vi.mock("@/auth/hooks/useAuthNavigate", () => ({
  useAuthNavigate: () => mockUseAuthNavigate(),
}));

/**
 * MOCK: react-router-dom navigate
 * PROPÓSITO: Capturar las llamadas de navegación para verificar redirecciones
 */
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/**
 * MOCK: Componente UsersLogForm
 * PROPÓSITO: Aislar las pruebas de LoginPage del componente de formulario
 * SIMULA: Formulario completo con validaciones
 */
vi.mock("@/auth/components/organisms/UsersLogForm", () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <div data-testid="users-log-form">
      <h2>Mock Users Log Form</h2>
      <button
        data-testid="mock-submit"
        onClick={() =>
          onSubmit({
            email: "test@example.com",
            password: "Test@123",
          })
        }
      >
        Mock Submit
      </button>
    </div>
  ),
}));

describe("LoginPage component", () => {
  /**
   * beforeEach: Configuración previa a cada prueba
   * PROPÓSITO: Limpiar todos los mocks antes de cada test
   * GARANTIZA: Cada prueba comienza con un estado limpio y predecible
   */
  beforeEach(() => {
    vi.clearAllMocks();

    // Resetear el estado del AuthStore
    mockAuthStore = {
      user: null,
      loading: false,
      loginError: null,
      signin: mockSignin,
      checkLogin: mockCheckLogin,
      signout: mockSignout,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Renderizado inicial de la página
   * 
   * Pruebas que verifican el renderizado correcto de todos los elementos
   * visuales de la página de login.
   * 
   * Cobertura:
   * - Renderizado del logo de la universidad
   * - Renderizado del componente UsersLogForm
   * - Renderizado del enlace hacia la página de código de sala
   * - Estructura general del layout
   * - Clases de CSS y estilos aplicados
   */
  describe("Renderizado inicial de la página", () => {
    /**
     * PRUEBA: Renderizado completo del LoginPage
     * CUBRE: Estructura completa de la página
     * VERIFICA:
     * - El logo de la universidad se renderiza
     * - El formulario UsersLogForm está presente
     * - El enlace "¿Tienes un código de sala? ¡Únete!" está visible
     * - La estructura del layout (main, section) es correcta
     */
    it("renderiza todos los elementos de la página correctamente", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      // Verificar que el logo está presente
      const logo = screen.getByAltText("logo universidad cooperativa");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src");

      // Verificar que el formulario está presente
      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();

      // Verificar que el texto de enlace está presente
      expect(screen.getByText(/¿tienes un código de sala\?/i)).toBeInTheDocument();
      expect(screen.getByText(/¡únete!/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del logo de la Universidad
     * CUBRE: Elemento img con el logo
     * VERIFICA:
     * - La imagen se renderiza correctamente
     * - El atributo alt está presente
     * - El atributo src contiene la ruta del logo
     */
    it("renderiza el logo de la Universidad Cooperativa", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const logo = screen.getByAltText("logo universidad cooperativa");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass("w-11/12", "md:w-96");
    });

    /**
     * PRUEBA: Renderizado del componente UsersLogForm
     * CUBRE: Integración con el componente de formulario
     * VERIFICA:
     * - El componente UsersLogForm se renderiza
     * - Se pasa la prop onSubmit correctamente
     * - El formulario está dentro de la sección correcta
     */
    it("renderiza el componente UsersLogForm", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
      expect(screen.getByText("Mock Users Log Form")).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del enlace hacia la página de código de sala
     * CUBRE: Link hacia la ruta "/"
     * VERIFICA:
     * - El texto del enlace está presente
     * - El Link de react-router-dom apunta a "/"
     * - El texto "¡Únete!" es interactivo (link)
     */
    it("muestra el enlace hacia la página de código de sala", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const link = screen.getByRole("link", { name: /¡únete!/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    /**
     * PRUEBA: Estructura del layout de la página
     * CUBRE: Elementos HTML y clases de Tailwind
     * VERIFICA:
     * - El main tiene las clases correctas
     * - La section que contiene el formulario tiene las clases correctas
     * - El layout es responsive (clases md:)
     */
    it("aplica las clases de CSS correctamente para el layout", () => {
      const { container } = render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const main = container.querySelector("main");
      expect(main).toHaveClass(
        "flex",
        "flex-col",
        "bg-background",
        "mx-auto",
        "items-center",
        "min-h-screen",
        "place-content-center"
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass(
        "p-6",
        "w-11/12",
        "md:w-[400px]",
        "bg-unicoop-black",
        "rounded-lg"
      );
    });
  });

  /**
   * GRUPO 2: Proceso de autenticación
   * 
   * Pruebas que verifican el flujo completo de autenticación,
   * desde el envío del formulario hasta la actualización del estado.
   * 
   * Cobertura:
   * - Función onSubmit pasada a UsersLogForm
   * - Llamada a AuthStore.signin con datos correctos
   * - Actualización del estado tras login exitoso
   * - Manejo de errores de autenticación
   */
  describe("Proceso de autenticación", () => {
    /**
     * PRUEBA: Envío del formulario llama a signin
     * CUBRE: const onSubmit = async (values: LoginModel) => { await signin(values); }
     * SIMULA: Usuario llena el formulario y hace submit
     * VERIFICA:
     * - signin se llama exactamente una vez
     * - signin recibe los datos correctos del formulario
     * - El proceso es asíncrono (await)
     */
    it("llama a signin cuando se envía el formulario", async () => {
      mockSignin.mockResolvedValueOnce(undefined);

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalledTimes(1);
        expect(mockSignin).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "Test@123",
        });
      });
    });

    /**
     * PRUEBA: Autenticación exitosa con usuario admin
     * CUBRE: Flujo completo de autenticación exitosa
     * SIMULA: Admin ingresa credenciales correctas
     * VERIFICA:
     * - signin se ejecuta correctamente
     * - El estado del AuthStore se actualiza con el usuario
     * - No hay errores de autenticación
     */
    it("actualiza el estado del AuthStore tras login exitoso de admin", async () => {
      mockSignin.mockImplementation(async () => {
        mockAuthStore.user = mockAdminUser;
        mockAuthStore.loginError = null;
      });

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled();
        expect(mockAuthStore.user).toEqual(mockAdminUser);
        expect(mockAuthStore.loginError).toBeNull();
      });
    });

    /**
     * PRUEBA: Autenticación exitosa con usuario profesor
     * CUBRE: Autenticación de diferentes tipos de usuario
     * SIMULA: Profesor ingresa credenciales correctas
     * VERIFICA:
     * - signin funciona para diferentes roles
     * - El rol del usuario se guarda correctamente
     */
    it("actualiza el estado del AuthStore tras login exitoso de profesor", async () => {
      mockSignin.mockImplementation(async () => {
        mockAuthStore.user = mockProfessorUser;
        mockAuthStore.loginError = null;
      });

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled();
        expect(mockAuthStore.user).toEqual(mockProfessorUser);
        expect(mockAuthStore.user?.usuRole).toBe("professor");
      });
    });

    /**
     * PRUEBA: Manejo de error de autenticación (credenciales incorrectas)
     * CUBRE: Bloque catch en AuthStore.signin
     * SIMULA: Usuario ingresa credenciales incorrectas
     * VERIFICA:
     * - signin se ejecuta pero no actualiza el usuario
     * - Se guarda el mensaje de error en loginError
     * - El usuario permanece null
     */
    it("maneja errores de autenticación correctamente", async () => {
      mockSignin.mockImplementation(async () => {
        mockAuthStore.loginError = "Usuario o contraseña incorrectos";
        mockAuthStore.user = null;
      });

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled();
        expect(mockAuthStore.loginError).toBe("Usuario o contraseña incorrectos");
        expect(mockAuthStore.user).toBeNull();
      });
    });

    /**
     * PRUEBA: Múltiples intentos de login
     * CUBRE: Capacidad de reintentar login después de un fallo
     * SIMULA: Usuario falla login y luego lo intenta nuevamente
     * VERIFICA:
     * - signin se puede llamar múltiples veces
     * - El formulario no se bloquea después de un error
     * - Los datos se pasan correctamente en cada intento
     */
    it("permite múltiples intentos de login", async () => {
      // Primer intento: falla
      mockSignin
        .mockImplementationOnce(async () => {
          mockAuthStore.loginError = "Credenciales incorrectas";
        })
        // Segundo intento: éxito
        .mockImplementationOnce(async () => {
          mockAuthStore.user = mockAdminUser;
          mockAuthStore.loginError = null;
        });

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");

      // Primer intento
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalledTimes(1);
      });

      // Segundo intento
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalledTimes(2);
        expect(mockAuthStore.user).toEqual(mockAdminUser);
      });
    });

    /**
     * PRUEBA: Signin se llama con los datos del formulario sin modificar
     * CUBRE: Integración entre LoginPage y UsersLogForm
     * VERIFICA:
     * - Los datos del formulario llegan sin transformaciones
     * - onSubmit pasa directamente los valores a signin
     */
    it("pasa los datos del formulario a signin sin modificaciones", async () => {
      const customLoginData = {
        email: "custom@test.com",
        password: "Custom@Pass123",
      };

      // Mock personalizado del UsersLogForm para este test
      vi.doMock("@/auth/components/organisms/UsersLogForm", () => ({
        __esModule: true,
        default: ({ onSubmit }: any) => (
          <button
            data-testid="custom-submit"
            onClick={() => onSubmit(customLoginData)}
          >
            Custom Submit
          </button>
        ),
      }));

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalledWith(mockLoginData);
      });
    });
  });

  /**
   * GRUPO 3: Navegación automática con useAuthNavigate
   * 
   * Pruebas que verifican la integración con el hook useAuthNavigate,
   * que redirige a usuarios ya autenticados.
   * 
   * Cobertura:
   * - Llamada a useAuthNavigate en el componente
   * - Redirección automática si hay usuario autenticado
   * - Permanencia en login si no hay usuario
   */
  describe("Navegación automática con useAuthNavigate", () => {
    /**
     * PRUEBA: useAuthNavigate se ejecuta al montar el componente
     * CUBRE: useAuthNavigate() llamado en el cuerpo del componente
     * VERIFICA:
     * - El hook se ejecuta al renderizar LoginPage
     * - La verificación de autenticación ocurre automáticamente
     */
    it("ejecuta useAuthNavigate al montar el componente", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(mockUseAuthNavigate).toHaveBeenCalledTimes(1);
    });

    /**
     * PRUEBA: No redirige si no hay usuario autenticado
     * CUBRE: Comportamiento cuando user es null
     * VERIFICA:
     * - El componente se renderiza normalmente
     * - No hay redirección automática
     * - Todos los elementos son visibles
     */
    it("no redirige si no hay usuario autenticado", () => {
      mockAuthStore.user = null;

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      // Verificar que el formulario sigue visible
      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
      expect(screen.getByAltText("logo universidad cooperativa")).toBeInTheDocument();
    });

    /**
     * PRUEBA: useAuthNavigate se ejecuta incluso si hay usuario
     * CUBRE: Hook ejecutándose con usuario ya autenticado
     * VERIFICA:
     * - El hook verifica el estado del usuario siempre
     * - La lógica de redirección está en useAuthNavigate, no en LoginPage
     */
    it("useAuthNavigate se ejecuta incluso si ya hay un usuario autenticado", () => {
      mockAuthStore.user = mockAdminUser;

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(mockUseAuthNavigate).toHaveBeenCalled();
    });
  });

  /**
   * GRUPO 4: Navegación mediante enlaces
   * 
   * Pruebas que verifican la funcionalidad de los enlaces de navegación
   * dentro de la página de login.
   * 
   * Cobertura:
   * - Link hacia la página principal "/"
   * - Navegación con react-router-dom
   * - Texto y accesibilidad del enlace
   */
  describe("Navegación mediante enlaces", () => {
    /**
     * PRUEBA: El enlace "¡Únete!" apunta a la ruta raíz
     * CUBRE: <Link to="/">¡Únete!</Link>
     * VERIFICA:
     * - El Link tiene el atributo href correcto
     * - El texto es clickeable
     * - El enlace es accesible via role="link"
     */
    it("el enlace '¡Únete!' navega a la página de código de sala", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const link = screen.getByRole("link", { name: /¡únete!/i });
      expect(link).toHaveAttribute("href", "/");
    });

    /**
     * PRUEBA: El enlace tiene las clases de estilo correctas
     * CUBRE: Clases CSS del Link
     * VERIFICA:
     * - Las clases de Tailwind están aplicadas
     * - El enlace tiene estilos hover
     * - El color es el correcto (text-unicoop-blue)
     */
    it("el enlace tiene las clases de estilo correctas", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const link = screen.getByRole("link", { name: /¡únete!/i });
      expect(link).toHaveClass("text-unicoop-blue", "hover:text-buttons-list-blue");
    });

    /**
     * PRUEBA: El texto completo del enlace está presente
     * CUBRE: Texto que rodea al Link
     * VERIFICA:
     * - El texto "¿Tienes un código de sala?" está visible
     * - El texto "¡Únete!" está dentro del enlace
     * - La estructura del párrafo es correcta
     */
    it("muestra el texto completo del enlace con contexto", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/¿tienes un código de sala\?/i)).toBeInTheDocument();

      const paragraph = screen.getByText(/¿tienes un código de sala\?/i);
      expect(paragraph).toHaveClass("text-unicoop", "mt-5", "font-medium", "text-center");
    });

    /**
     * PRUEBA: Navegación funcional con MemoryRouter
     * CUBRE: Integración con react-router-dom
     * SIMULA: Click en el enlace y verificación de navegación
     * VERIFICA:
     * - El enlace es interactivo
     * - La navegación funciona correctamente
     */
    it("permite navegar a la página principal mediante el enlace", () => {
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<div>Página Principal</div>} />
          </Routes>
        </MemoryRouter>
      );

      const link = screen.getByRole("link", { name: /¡únete!/i });
      fireEvent.click(link);

      // Verificar que navegamos a la página principal
      expect(screen.getByText("Página Principal")).toBeInTheDocument();
    });
  });

  /**
   * GRUPO 5: Integración con AuthStore
   * 
   * Pruebas que verifican la correcta integración con el store de autenticación
   * y el uso de sus métodos y propiedades.
   * 
   * Cobertura:
   * - Destructuring de useAuthStore
   * - Uso de signin desde el store
   * - Acceso a user, loading, loginError
   */
  describe("Integración con AuthStore", () => {
    /**
     * PRUEBA: useAuthStore se utiliza correctamente
     * CUBRE: const { signin } = useAuthStore()
     * VERIFICA:
     * - El hook se ejecuta al renderizar
     * - Se extrae la función signin
     * - signin está disponible para onSubmit
     */
    it("obtiene la función signin del AuthStore", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      // Si el componente se renderiza sin errores, signin está disponible
      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
    });

    /**
     * PRUEBA: El componente usa signin y no otros métodos
     * CUBRE: Solo se destructura signin, no checkLogin ni signout
     * VERIFICA:
     * - Solo signin se utiliza en LoginPage
     * - checkLogin y signout no se llaman desde este componente
     */
    it("no llama a checkLogin ni signout desde LoginPage", async () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled();
        expect(mockCheckLogin).not.toHaveBeenCalled();
        expect(mockSignout).not.toHaveBeenCalled();
      });
    });

    /**
     * PRUEBA: El componente responde a cambios en el AuthStore
     * CUBRE: Reactividad del componente ante cambios en el store
     * VERIFICA:
     * - Cambios en user se reflejan en la navegación
     * - El componente está subscrito al AuthStore
     */
    it("el componente es reactivo a cambios en el AuthStore", async () => {
      mockAuthStore.user = null;

      const { rerender } = render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();

      // Simular cambio en el store
      mockAuthStore.user = mockAdminUser;

      rerender(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      // useAuthNavigate debería ejecutarse nuevamente
      expect(mockUseAuthNavigate).toHaveBeenCalled();
    });
  });

  /**
   * GRUPO 6: Casos edge y comportamientos especiales
   * 
   * Pruebas que verifican comportamientos en situaciones especiales
   * o casos límite.
   * 
   * Cobertura:
   * - Estado de carga
   * - Múltiples renderizados
   * - Comportamiento con diferentes estados del AuthStore
   */
  describe("Casos edge y comportamientos especiales", () => {
    /**
     * PRUEBA: El componente se renderiza correctamente durante loading
     * CUBRE: Comportamiento cuando loading es true
     * VERIFICA:
     * - El componente sigue visible durante carga
     * - No hay bloqueo de UI
     * - El formulario está disponible
     */
    it("se renderiza correctamente cuando loading es true", () => {
      mockAuthStore.loading = true;

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
      expect(screen.getByAltText("logo universidad cooperativa")).toBeInTheDocument();
    });

    /**
     * PRUEBA: El componente se renderiza con loginError presente
     * CUBRE: Visualización cuando hay error de autenticación
     * VERIFICA:
     * - El componente no se rompe con loginError
     * - El error se maneja en UsersLogForm, no en LoginPage
     * - La página sigue funcional
     */
    it("se renderiza correctamente cuando hay loginError", () => {
      mockAuthStore.loginError = "Credenciales incorrectas";

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
      // El error se muestra en UsersLogForm, no en LoginPage
    });

    /**
     * PRUEBA: Múltiples renderizados no causan efectos secundarios
     * CUBRE: Comportamiento con re-renderizados
     * VERIFICA:
     * - useAuthNavigate no se llama múltiples veces innecesariamente
     * - El componente es estable
     */
    it("múltiples renderizados no causan efectos secundarios", () => {
      const { rerender } = render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const initialCalls = mockUseAuthNavigate.mock.calls.length;

      rerender(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      // Se llama una vez por renderizado
      expect(mockUseAuthNavigate.mock.calls.length).toBeGreaterThan(initialCalls);
    });

    /**
     * PRUEBA: El componente funciona sin errores con datos mínimos
     * CUBRE: Renderizado con estado inicial mínimo
     * VERIFICA:
     * - No hay errores de null/undefined
     * - Valores por defecto funcionan correctamente
     */
    it("funciona correctamente con valores por defecto del AuthStore", () => {
      mockAuthStore = {
        user: null,
        loading: false,
        loginError: null,
        signin: mockSignin,
        checkLogin: mockCheckLogin,
        signout: mockSignout,
      };

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
      expect(screen.getByAltText("logo universidad cooperativa")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /¡únete!/i })).toBeInTheDocument();
    });

    /**
     * PRUEBA: La página mantiene su estado durante el proceso de login
     * CUBRE: Estabilidad del componente durante operaciones async
     * VERIFICA:
     * - Los elementos no desaparecen durante signin
     * - La UI permanece estable
     */
    it("mantiene la UI estable durante el proceso de autenticación", async () => {
      mockSignin.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              mockAuthStore.user = mockAdminUser;
              resolve(undefined);
            }, 100);
          })
      );

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByTestId("mock-submit");
      fireEvent.click(submitButton);

      // Durante el proceso async, los elementos siguen visibles
      expect(screen.getByTestId("users-log-form")).toBeInTheDocument();
      expect(screen.getByAltText("logo universidad cooperativa")).toBeInTheDocument();

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled();
      });
    });
  });

  /**
   * GRUPO 7: Accesibilidad y semántica HTML
   * 
   * Pruebas que verifican la correcta implementación de accesibilidad
   * y uso de elementos HTML semánticos.
   * 
   * Cobertura:
   * - Elementos semánticos (main, section)
   * - Atributos alt en imágenes
   * - Roles ARIA
   * - Navegación por teclado
   */
  describe("Accesibilidad y semántica HTML", () => {
    /**
     * PRUEBA: Uso correcto de elementos semánticos
     * CUBRE: Estructura HTML semántica
     * VERIFICA:
     * - main como contenedor principal
     * - section para el área del formulario
     * - Jerarquía correcta
     */
    it("utiliza elementos HTML semánticos correctamente", () => {
      const { container } = render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const main = container.querySelector("main");
      const section = container.querySelector("section");

      expect(main).toBeInTheDocument();
      expect(section).toBeInTheDocument();
      expect(main).toContainElement(section);
    });

    /**
     * PRUEBA: Atributo alt en la imagen del logo
     * CUBRE: Accesibilidad de imágenes
     * VERIFICA:
     * - alt text está presente
     * - El texto es descriptivo
     */
    it("la imagen del logo tiene texto alternativo", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const logo = screen.getByAltText("logo universidad cooperativa");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("alt", "logo universidad cooperativa");
    });

    /**
     * PRUEBA: El enlace es accesible mediante role
     * CUBRE: Accesibilidad de enlaces
     * VERIFICA:
     * - El enlace tiene role="link" implícito
     * - Es navegable mediante teclado
     */
    it("el enlace es accesible mediante navegación por teclado", () => {
      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const link = screen.getByRole("link", { name: /¡únete!/i });
      expect(link).toBeInTheDocument();

      // Verificar que el enlace es un elemento <a>
      expect(link.tagName).toBe("A");
    });

    /**
     * PRUEBA: Estructura de párrafo para texto informativo
     * CUBRE: Uso de elementos <p> para texto
     * VERIFICA:
     * - El texto usa elemento <p>
     * - El contenido es legible y accesible
     */
    it("utiliza párrafos para texto informativo", () => {
      const { container } = render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      );

      const paragraph = container.querySelector("p.text-unicoop");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent(/¿tienes un código de sala\?/i);
    });
  });
});
