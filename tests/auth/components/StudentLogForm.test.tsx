/**
 * ============================================================================
 * SUITE DE PRUEBAS: StudentLogForm Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/auth/components/organisms/StudentLogForm.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente StudentLogForm,
 * que permite a los estudiantes ingresar a una sala mediante un código.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado inicial del formulario
 * 2. Validaciones del campo de código (longitud mínima y máxima)
 * 3. Proceso completo de envío del formulario
 * 4. Manejo de errores de la sala
 * 5. Precarga de código de sala desde props
 * 6. Estados de loading y deshabilitado del botón
 * 7. Casos límite y edge cases
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import StudentLogForm from "../../../src/auth/components/organisms/StudentLogForm";

/**
 * MOCK DATA: Funciones de prueba
 * PROPÓSITO: Simular las funciones que se pasan como props al componente
 * FUNCIONES MOCKEADAS:
 * - onSubmit: Simula el handler que procesa el envío del formulario
 * USO: Se pasan como props a StudentLogForm para verificar que se llaman correctamente
 */
const mockOnSubmit = vi.fn();

describe("StudentLogForm", () => {
  /**
   * beforeEach: Configuración previa a cada prueba
   * PROPÓSITO: Limpiar todos los mocks antes de cada test
   * GARANTIZA: Cada prueba comienza con un estado limpio y predecible
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Renderizado inicial", () => {
    /**
     * PRUEBA: Renderizado básico del formulario
     * CUBRE: Renderizado inicial del componente StudentLogForm sin props opcionales
     * VERIFICA:
     * - El título "Ingresa a una sala con el código" está presente
     * - El icono de login (IoMdLogIn) se renderiza
     * - El campo de código está presente con el placeholder correcto
     * - El botón "Ingresar" está visible y habilitado
     * - NO hay mensaje de error visible inicialmente
     */
    it("renderiza el formulario correctamente", () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      expect(screen.getByText(/ingresa a una sala con el código/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/código de la sala/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del icono de login
     * CUBRE: Renderizado del componente IoMdLogIn de react-icons
     * VERIFICA:
     * - Un elemento SVG está presente en el DOM (el icono)
     * - El icono se muestra correctamente en la interfaz
     */
    it("muestra el icono de login", () => {
      const { container } = render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado del mensaje de error
     * CUBRE: Renderizado condicional del mensaje roomError
     * VERIFICA:
     * - Cuando roomError no es null, se muestra el mensaje
     * - El mensaje de error se renderiza con el texto correcto
     * - El componente muestra feedback visual al usuario
     */
    it("muestra el mensaje de error cuando roomError no es null", () => {
      render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError="Código de sala inválido" 
          />
        </MemoryRouter>
      );

      expect(screen.getByText(/código de sala inválido/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Precarga del código de sala
     * CUBRE: useEffect que ejecuta setValue cuando roomCode está presente
     * VERIFICA:
     * - El campo de código se precarga con el valor de roomCode
     * - El efecto se ejecuta correctamente al montar el componente
     * - El usuario ve el código automáticamente en el campo
     */
    it("precarga el código de sala cuando se proporciona roomCode", () => {
      render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError={null}
            roomCode="ABC123"
          />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i) as HTMLInputElement;
      expect(input.value).toBe("ABC123");
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
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const button = screen.getByRole("button", { name: /ingresar/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe("Validaciones de campos", () => {
    /**
     * PRUEBA: Validación de código vacío
     * CUBRE: Validación de Zod en CodeSchema - roomPassword.min(6)
     * SIMULA: Usuario intenta enviar el formulario sin código
     * VERIFICA:
     * - El mensaje de error aparece indicando el mínimo de caracteres
     * - react-hook-form previene el envío del formulario
     * - onSubmit NO se ejecuta con datos inválidos
     */
    it("valida que el código es obligatorio", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el código de la sala debe tener al menos 6 caracteres/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de longitud mínima del código (6 caracteres)
     * CUBRE: Validación de Zod en CodeSchema - roomPassword.min(6)
     * SIMULA: Usuario ingresa un código con menos de 6 caracteres
     * VERIFICA:
     * - El mensaje de error específico aparece
     * - El formulario no se envía con códigos demasiado cortos
     * - La validación de longitud mínima funciona correctamente
     */
    it("valida longitud mínima del código (6 caracteres)", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "ABC12" } }); // 5 caracteres

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el código de la sala debe tener al menos 6 caracteres/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Validación de longitud máxima del código (100 caracteres)
     * CUBRE: Validación de Zod en CodeSchema - roomPassword.max(100)
     * SIMULA: Usuario ingresa un código con más de 100 caracteres
     * VERIFICA:
     * - El mensaje de error sobre longitud máxima aparece
     * - El formulario no se envía con códigos demasiado largos
     * - La validación de longitud máxima funciona correctamente
     */
    it("valida longitud máxima del código (100 caracteres)", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const codigoLargo = "A".repeat(101); // 101 caracteres
      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: codigoLargo } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el código de la sala no puede tener más de 100 caracteres/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    /**
     * PRUEBA: Aceptación de código con exactamente 6 caracteres
     * CUBRE: Validación de Zod - límite mínimo inclusivo
     * SIMULA: Usuario ingresa código con exactamente 6 caracteres
     * VERIFICA:
     * - El código con 6 caracteres se acepta sin errores
     * - onSubmit se ejecuta con el código correcto
     * - El límite mínimo es inclusivo (≥ 6)
     */
    it("acepta código con exactamente 6 caracteres", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "ABC123" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "ABC123" });
      });
    });

    /**
     * PRUEBA: Aceptación de código con exactamente 100 caracteres
     * CUBRE: Validación de Zod - límite máximo inclusivo
     * SIMULA: Usuario ingresa código con exactamente 100 caracteres
     * VERIFICA:
     * - El código con 100 caracteres se acepta sin errores
     * - onSubmit se ejecuta con el código correcto
     * - El límite máximo es inclusivo (≤ 100)
     */
    it("acepta código con exactamente 100 caracteres", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const codigoMaximo = "A".repeat(100);
      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: codigoMaximo } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: codigoMaximo });
      });
    });
  });

  describe("Envío del formulario", () => {
    /**
     * PRUEBA: Envío exitoso con código válido
     * CUBRE: Función handleSubmit de react-hook-form y onSubmit del componente
     * SIMULA: Usuario llena el código correctamente y envía el formulario
     * VERIFICA:
     * - onSubmit se llama exactamente una vez
     * - Se envía el objeto con la estructura correcta: { roomPassword: string }
     * - El valor enviado coincide con el ingresado por el usuario
     */
    it("envía el formulario correctamente con código válido", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "SALA2024" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "SALA2024" });
      });
    });

    /**
     * PRUEBA: Envío con código alfanumérico
     * CUBRE: Aceptación de códigos con letras y números
     * SIMULA: Usuario ingresa código alfanumérico "ROOM123XYZ"
     * VERIFICA:
     * - El código alfanumérico se acepta sin problemas
     * - onSubmit recibe el código exactamente como se ingresó
     */
    it("acepta códigos alfanuméricos", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "ROOM123XYZ" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "ROOM123XYZ" });
      });
    });

    /**
     * PRUEBA: Envío con código que contiene caracteres especiales
     * CUBRE: Aceptación de códigos con guiones y guiones bajos
     * SIMULA: Usuario ingresa código "SALA-2024_A"
     * VERIFICA:
     * - Los caracteres especiales se aceptan en el código
     * - No hay restricciones innecesarias en el formato del código
     */
    it("acepta códigos con caracteres especiales", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "SALA-2024_A" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "SALA-2024_A" });
      });
    });

    /**
     * PRUEBA: Envío con código precargado
     * CUBRE: Flujo de envío cuando el código se precarga mediante roomCode prop
     * SIMULA: Código se precarga y usuario envía el formulario directamente
     * VERIFICA:
     * - El formulario se puede enviar con el código precargado
     * - onSubmit recibe el código precargado correctamente
     * - No es necesario modificar el campo para enviarlo
     */
    it("envía el formulario con código precargado", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError={null}
            roomCode="PRELOADED123"
          />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "PRELOADED123" });
      });
    });
  });

  describe("Manejo de errores", () => {
    /**
     * PRUEBA: Visualización de error de sala inválida
     * CUBRE: Renderizado condicional del mensaje roomError
     * VERIFICA:
     * - El mensaje de error se muestra correctamente en rojo
     * - El usuario recibe feedback visual sobre el error
     * - El mensaje es específico y útil
     */
    it("muestra mensaje de error cuando la sala no existe", () => {
      render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError="La sala no existe o no está disponible" 
          />
        </MemoryRouter>
      );

      expect(screen.getByText(/la sala no existe o no está disponible/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Visualización de error de código incorrecto
     * CUBRE: Manejo de diferentes tipos de errores de sala
     * VERIFICA:
     * - Diferentes mensajes de error se muestran correctamente
     * - El componente es flexible con los tipos de error
     */
    it("muestra mensaje de error cuando el código es incorrecto", () => {
      render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError="Código de sala incorrecto" 
          />
        </MemoryRouter>
      );

      expect(screen.getByText(/código de sala incorrecto/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Sin mensaje de error cuando roomError es null
     * CUBRE: Renderizado condicional cuando no hay errores
     * VERIFICA:
     * - No se muestra ningún mensaje de error cuando roomError es null
     * - La interfaz está limpia sin errores innecesarios
     */
    it("no muestra mensaje de error cuando roomError es null", () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const errorElement = screen.queryByText(/error/i);
      expect(errorElement).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: El formulario se puede reenviar después de un error
     * CUBRE: Capacidad de reintentar después de recibir un error
     * SIMULA: Usuario ve error, corrige el código y vuelve a enviar
     * VERIFICA:
     * - El formulario sigue siendo funcional después de un error
     * - onSubmit se puede llamar nuevamente
     * - El componente no se bloquea después de un error
     */
    it("permite reenviar el formulario después de un error", async () => {
      const { rerender } = render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError="Código incorrecto" 
          />
        </MemoryRouter>
      );

      expect(screen.getByText(/código incorrecto/i)).toBeInTheDocument();

      // Simulamos que el error se limpia
      rerender(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "CORRECT123" } });
      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "CORRECT123" });
      });
    });
  });

  describe("Estados del formulario", () => {
    /**
     * PRUEBA: Input recibe y actualiza valores correctamente
     * CUBRE: Binding bidireccional del input con react-hook-form
     * VERIFICA:
     * - El input refleja el valor ingresado por el usuario
     * - El estado del formulario se actualiza correctamente
     */
    it("actualiza el valor del input correctamente", () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i) as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: "TEST123" } });
      
      expect(input.value).toBe("TEST123");
    });

    /**
     * PRUEBA: El tipo de input es text
     * CUBRE: Atributo type del InputForm
     * VERIFICA:
     * - El campo se renderiza como input de tipo texto
     * - Permite entrada de cualquier carácter
     */
    it("el campo de código es de tipo text", () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      expect(input).toHaveAttribute("type", "text");
    });

    /**
     * PRUEBA: El formulario tiene el submit handler correcto
     * CUBRE: Atributo onSubmit del formulario
     * VERIFICA:
     * - El formulario se puede enviar presionando Enter
     * - El handler handleSubmit está correctamente vinculado
     */
    it("puede enviar el formulario presionando Enter", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "ENTER123" } });
      
      fireEvent.submit(input.closest('form')!);

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "ENTER123" });
      });
    });
  });

  describe("Casos edge", () => {
    /**
     * PRUEBA: Manejo de espacios en blanco al inicio y final
     * CUBRE: Comportamiento con espacios en el código
     * SIMULA: Usuario ingresa código con espacios " CODE123 "
     * VERIFICA:
     * - El código se envía con los espacios tal como se ingresó
     * - No hay trim automático (puede ser intencional del backend)
     */
    it("maneja espacios en blanco en el código", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: " CODE123 " } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: " CODE123 " });
      });
    });

    /**
     * PRUEBA: Manejo de código con solo números
     * CUBRE: Aceptación de códigos numéricos
     * SIMULA: Usuario ingresa código "123456"
     * VERIFICA:
     * - Los códigos numéricos se aceptan
     * - No hay restricción de solo letras
     */
    it("acepta código con solo números", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "123456" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "123456" });
      });
    });

    /**
     * PRUEBA: Manejo de código con solo letras
     * CUBRE: Aceptación de códigos alfabéticos
     * SIMULA: Usuario ingresa código "ABCDEF"
     * VERIFICA:
     * - Los códigos alfabéticos se aceptan
     * - No hay restricción de formato específico
     */
    it("acepta código con solo letras", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      fireEvent.change(input, { target: { value: "ABCDEF" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "ABCDEF" });
      });
    });

    /**
     * PRUEBA: Actualización del código precargado
     * CUBRE: Capacidad de modificar un código precargado
     * SIMULA: Usuario modifica el código que viene precargado
     * VERIFICA:
     * - El usuario puede sobrescribir el código precargado
     * - setValue no bloquea cambios posteriores
     */
    it("permite modificar el código precargado", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm 
            onSubmit={mockOnSubmit} 
            roomError={null}
            roomCode="ORIGINAL"
          />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i) as HTMLInputElement;
      expect(input.value).toBe("ORIGINAL");

      fireEvent.change(input, { target: { value: "MODIFIED" } });
      expect(input.value).toBe("MODIFIED");

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({ roomPassword: "MODIFIED" });
      });
    });

    /**
     * PRUEBA: Comportamiento con código vacío después de tener valor
     * CUBRE: Validación cuando se borra el código
     * SIMULA: Usuario ingresa código y luego lo borra
     * VERIFICA:
     * - La validación se ejecuta al intentar enviar con campo vacío
     * - El mensaje de error aparece correctamente
     */
    it("valida cuando se borra el código después de haberlo ingresado", async () => {
      render(
        <MemoryRouter>
          <StudentLogForm onSubmit={mockOnSubmit} roomError={null} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(/código de la sala/i);
      
      fireEvent.change(input, { target: { value: "ABC123" } });
      fireEvent.change(input, { target: { value: "" } });

      fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

      await waitFor(() => {
        expect(screen.getByText(/el código de la sala debe tener al menos 6 caracteres/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});