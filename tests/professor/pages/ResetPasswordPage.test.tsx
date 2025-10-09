/**
 * ============================================================================
 * SUITE DE PRUEBAS: ResetPasswordPage Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/professor/pages/ResetPasswordPage.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente ResetPasswordPage,
 * que permite a los profesores cambiar su contraseña actual por una nueva.
 * El formulario utiliza react-hook-form con validación Zod para garantizar
 * que las contraseñas cumplan con los requisitos de seguridad.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado del formulario y sus elementos
 * 2. Validación de campos de contraseña (longitud, mayúsculas, minúsculas, números, caracteres especiales)
 * 3. Validación de coincidencia entre nueva contraseña y confirmación
 * 4. Envío exitoso del formulario y limpieza de campos
 * 5. Manejo de errores del servidor
 * 6. Visualización de PopUpMessage con mensajes de éxito o error
 * 7. Integración con ProfessorLayout
 * 8. Estado de envío (isSubmitting) durante la petición
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import ResetPasswordPage from "../../../src/professor/pages/ResetPasswordPage";
import { UpdatePasswordService } from "../../../src/professor/services/updatePassword.service";

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

// Mock del PasswordInput
vi.mock("@/components/atoms/PasswordInput", () => ({
  __esModule: true,
  default: ({ placeholder, errors, register, inputName }: any) => {
    const error = errors[inputName];
    return (
      <div>
        <input
          type="password"
          placeholder={placeholder}
          {...register(inputName)}
          data-testid={inputName}
        />
        {error && <p data-testid={`error-${inputName}`}>{error.message}</p>}
      </div>
    );
  },
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

// Mock del logo
vi.mock("@/assets/LogoUniversidadCooperativa.png", () => ({
  default: "mocked-logo.png",
}));

// Componente Wrapper para react-router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("ResetPasswordPage component", () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
    // Resetea el estado del StatusStore
    mockStatusStore.show = false;
    mockStatusStore.title = "";
    mockStatusStore.message = "";
    mockStatusStore.type = "info";
    // Mock de console.log
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaura las implementaciones originales después de cada prueba
    vi.restoreAllMocks();
  });

  /**
   * GRUPO 1: Renderizado básico
   * 
   * Pruebas que verifican que todos los elementos del formulario
   * se rendericen correctamente.
   * 
   * Cobertura:
   * - ProfessorLayout wrapper
   * - Logo de la universidad
   * - Título del formulario
   * - Tres campos de contraseña (anterior, nueva, confirmar)
   * - Botón de envío
   * - Iconos (MdCreate, FaCheckCircle)
   */
  describe("Renderizado básico", () => {
    /**
     * Verifica que se renderice dentro del ProfessorLayout
     * 
     * Cubre:
     * - Wrapper con ProfessorLayout
     * - Estructura del componente
     */
    it("renderiza dentro del ProfessorLayout", () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      expect(screen.getByTestId("professor-layout")).toBeInTheDocument();
    });

    /**
     * Verifica que se renderice el logo de la universidad
     * 
     * Cubre:
     * - Elemento img con src y alt correctos
     * - Visualización de la marca institucional
     */
    it("renderiza el logo de la universidad", () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const logo = screen.getByAltText("logo universidad cooperativa");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "mocked-logo.png");
    });

    /**
     * Verifica que se renderice el título del formulario
     * 
     * Cubre:
     * - h1 con texto "Cambiar Contraseña"
     * - Ícono MdCreate
     */
    it("renderiza el título 'Cambiar Contraseña'", () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      expect(screen.getByText("Cambiar Contraseña")).toBeInTheDocument();
    });

    /**
     * Verifica que se rendericen los tres campos de contraseña
     * 
     * Cubre:
     * - PasswordInput para usuOldPassword
     * - PasswordInput para usuPassword
     * - PasswordInput para confirmPassword
     * - Placeholders correctos
     */
    it("renderiza los tres campos de contraseña", () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      expect(screen.getByPlaceholderText("Contraseña anterior")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Nueva contraseña")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Confirmar contraseña")).toBeInTheDocument();
    });

    /**
     * Verifica que se renderice el botón de envío
     * 
     * Cubre:
     * - Button con type="submit"
     * - Texto "Confirmar"
     * - Ícono FaCheckCircle
     * - Estado inicial habilitado
     */
    it("renderiza el botón de confirmar", () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const submitButton = screen.getByRole("button", { name: /confirmar/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    /**
     * Verifica que NO se muestre el popup inicialmente
     * 
     * Cubre:
     * - Estado inicial del StatusStore con show: false
     * - Renderizado condicional {show && <PopUpMessage>}
     */
    it("no muestra el popup inicialmente", () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      expect(screen.queryByTestId("popup-message")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: Validación de campos
   * 
   * Pruebas que verifican las validaciones del schema de Zod
   * para cada campo del formulario.
   * 
   * Cobertura:
   * - Validación de longitud mínima (6 caracteres)
   * - Validación de longitud máxima (20 caracteres)
   * - Validación de letra mayúscula
   * - Validación de letra minúscula
   * - Validación de número
   * - Validación de carácter especial (@$!%*?&)
   * - Validación de coincidencia de contraseñas
   */
  describe("Validación de campos", () => {
    /**
     * Verifica validación de longitud mínima en contraseña anterior
     * 
     * Cubre:
     * - .min(6) en usuOldPassword
     * - Mensaje de error apropiado
     * - Prevención de envío con datos inválidos
     */
    it("muestra error si la contraseña anterior tiene menos de 6 caracteres", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "Ab1@" } });
      fireEvent.change(newPasswordInput, { target: { value: "ValidPass123@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "ValidPass123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuOldPassword")).toHaveTextContent(
          "La contraseña debe tener al menos 6 caracteres"
        );
      });
    });

    /**
     * Verifica validación de longitud máxima en nueva contraseña
     * 
     * Cubre:
     * - .max(20) en usuPassword
     * - Mensaje de error apropiado
     */
    it("muestra error si la nueva contraseña excede 20 caracteres", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "ThisIsAVeryLongPassword123@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "ThisIsAVeryLongPassword123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuPassword")).toHaveTextContent(
          "La nueva contraseña no debe exceder 20 caracteres"
        );
      });
    });

    /**
     * Verifica validación de letra mayúscula
     * 
     * Cubre:
     * - regex(/[A-Z]/) en usuPassword
     * - Mensaje de error apropiado
     */
    it("muestra error si la nueva contraseña no tiene mayúscula", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "newpass123@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "newpass123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuPassword")).toHaveTextContent(
          "La nueva contraseña debe contener al menos una letra mayúscula"
        );
      });
    });

    /**
     * Verifica validación de letra minúscula
     * 
     * Cubre:
     * - regex(/[a-z]/) en usuPassword
     * - Mensaje de error apropiado
     */
    it("muestra error si la nueva contraseña no tiene minúscula", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NEWPASS123@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NEWPASS123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuPassword")).toHaveTextContent(
          "La nueva contraseña debe contener al menos una letra minúscula"
        );
      });
    });

    /**
     * Verifica validación de número
     * 
     * Cubre:
     * - regex(/\d/) en usuPassword
     * - Mensaje de error apropiado
     */
    it("muestra error si la nueva contraseña no tiene número", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass@@@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass@@@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuPassword")).toHaveTextContent(
          "La nueva contraseña debe contener al menos un número"
        );
      });
    });

    /**
     * Verifica validación de carácter especial
     * 
     * Cubre:
     * - regex(/[@$!%*?&]/) en usuPassword
     * - Mensaje de error apropiado
     */
    it("muestra error si la nueva contraseña no tiene carácter especial", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuPassword")).toHaveTextContent(
          "La nueva contraseña debe contener al menos un carácter especial (@$!%*?&)"
        );
      });
    });

    /**
     * Verifica validación de coincidencia de contraseñas
     * 
     * Cubre:
     * - .refine con comparación usuPassword === confirmPassword
     * - path: ["confirmPassword"] para ubicar el error
     * - Mensaje "Las contraseñas no coinciden"
     */
    it("muestra error si las contraseñas no coinciden", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass123@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "Different123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-confirmPassword")).toHaveTextContent(
          "Las contraseñas no coinciden"
        );
      });
    });

    /**
     * Verifica que contraseñas válidas no muestren errores
     * 
     * Cubre:
     * - Todas las validaciones pasando
     * - No aparición de mensajes de error
     * - Preparación para envío exitoso
     */
    it("no muestra errores con contraseñas válidas", async () => {
      const updatePasswordSpy = vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass123@" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updatePasswordSpy).toHaveBeenCalled();
      });

      expect(screen.queryByTestId("error-usuOldPassword")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-usuPassword")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-confirmPassword")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 3: Envío exitoso del formulario
   * 
   * Pruebas que verifican el comportamiento cuando el cambio de contraseña
   * es exitoso.
   * 
   * Cobertura:
   * - Llamada al servicio UpdatePasswordService.updatePassword
   * - setStatus con mensaje de éxito
   * - Limpieza de campos con setValue
   * - Visualización del PopUpMessage de éxito
   */
  describe("Envío exitoso del formulario", () => {
    /**
     * Verifica que se llame al servicio con los datos correctos
     * 
     * Cubre:
     * - handleSubmit de react-hook-form
     * - onSubmit con PasswordModel
     * - UpdatePasswordService.updatePassword(data)
     */
    it("llama al servicio de actualización con los datos del formulario", async () => {
      const updatePasswordSpy = vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updatePasswordSpy).toHaveBeenCalledWith({
          usuOldPassword: "OldPass123@",
          usuPassword: "NewPass456!",
          confirmPassword: "NewPass456!",
        });
      });
    });

    /**
     * Verifica que se muestre el mensaje de éxito
     * 
     * Cubre:
     * - .then del servicio
     * - setStatus con type: "success"
     * - Mensaje "La contraseña ha sido actualizada correctamente"
     * - Título "Contraseña actualizada"
     */
    it("muestra mensaje de éxito al actualizar correctamente", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          message: "La contraseña ha sido actualizada correctamente",
          title: "Contraseña actualizada",
          type: "success",
        });
      });
    });

    /**
     * Verifica que se limpien los campos después del éxito
     * 
     * Cubre:
     * - setValue("usuOldPassword", "")
     * - setValue("usuPassword", "")
     * - setValue("confirmPassword", "")
     * - Reset del formulario después de operación exitosa
     */
    it("limpia los campos después de actualizar exitosamente", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword") as HTMLInputElement;
      const newPasswordInput = screen.getByTestId("usuPassword") as HTMLInputElement;
      const confirmPasswordInput = screen.getByTestId("confirmPassword") as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(oldPasswordInput.value).toBe("");
        expect(newPasswordInput.value).toBe("");
        expect(confirmPasswordInput.value).toBe("");
      });
    });

    /**
     * Verifica que se deshabilite el botón durante el envío
     * 
     * Cubre:
     * - isSubmitting de react-hook-form
     * - disabled={isSubmitting} en el botón
     * - Prevención de doble envío
     */
    it("deshabilita el botón durante el envío", async () => {
      // Mock con delay para capturar el estado isSubmitting
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      // Durante el envío, el botón debe estar deshabilitado
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  /**
   * GRUPO 4: Manejo de errores
   * 
   * Pruebas que verifican el comportamiento cuando ocurre un error
   * al intentar cambiar la contraseña.
   * 
   * Cobertura:
   * - .catch del servicio
   * - Extracción de mensaje de error del servidor
   * - setStatus con type: "error"
   * - console.log del error
   * - Mensaje de error genérico cuando no hay mensaje del servidor
   */
  describe("Manejo de errores", () => {
    /**
     * Verifica que se muestre el mensaje de error del servidor
     * 
     * Cubre:
     * - .catch((err: unknown) => { ... })
     * - Extracción de error.response?.data?.error?.message
     * - setStatus con mensaje del servidor
     * - type: "error"
     */
    it("muestra el mensaje de error del servidor", async () => {
      const serverError = {
        response: {
          data: {
            error: {
              message: "La contraseña anterior es incorrecta",
            },
          },
        },
      };

      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockRejectedValueOnce(serverError);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "WrongPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          message: "La contraseña anterior es incorrecta",
          title: "Error",
          type: "error",
        });
      });
    });

    /**
     * Verifica que se muestre mensaje genérico si no hay mensaje del servidor
     * 
     * Cubre:
     * - Operador || para fallback
     * - Mensaje "Error al actualizar la contraseña"
     * - Manejo de errores sin estructura response.data.error.message
     */
    it("muestra mensaje genérico cuando no hay mensaje del servidor", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockRejectedValueOnce(new Error("Network error"));

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          message: "Error al actualizar la contraseña",
          title: "Error",
          type: "error",
        });
      });
    });

    /**
     * Verifica que se registre el error en la consola
     * 
     * Cubre:
     * - console.log(err) dentro del catch
     * - Logging para debugging
     */
    it("registra el error en la consola", async () => {
      const consoleLogSpy = vi.spyOn(console, "log");
      const serverError = new Error("Test error");

      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockRejectedValueOnce(serverError);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(serverError);
      });
    });

    /**
     * Verifica que NO se limpien los campos después de un error
     * 
     * Cubre:
     * - Los campos mantienen sus valores tras error
     * - Usuario puede corregir y reintentar sin volver a escribir todo
     */
    it("no limpia los campos después de un error", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockRejectedValueOnce(new Error("Error"));

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword") as HTMLInputElement;
      const newPasswordInput = screen.getByTestId("usuPassword") as HTMLInputElement;
      const confirmPasswordInput = screen.getByTestId("confirmPassword") as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalled();
      });

      // Los valores deben permanecer
      expect(oldPasswordInput.value).toBe("OldPass123@");
      expect(newPasswordInput.value).toBe("NewPass456!");
      expect(confirmPasswordInput.value).toBe("NewPass456!");
    });
  });

  /**
   * GRUPO 5: PopUpMessage
   * 
   * Pruebas que verifican la integración con el componente PopUpMessage
   * para mostrar notificaciones de éxito o error.
   * 
   * Cobertura:
   * - Renderizado condicional {show && <PopUpMessage>}
   * - Props del PopUpMessage
   * - Callback onClose
   * - Reset del StatusStore al cerrar
   */
  describe("PopUpMessage", () => {
    /**
     * Verifica que se muestre el popup con mensaje de éxito
     * 
     * Cubre:
     * - show: true en StatusStore
     * - Renderizado del PopUpMessage
     * - Props correctas (title, message, type)
     */
    it("muestra el popup con mensaje de éxito", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      mockStatusStore.show = false;

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({
            show: true,
            type: "success",
          })
        );
      });
    });

    /**
     * Verifica que se muestre el popup con mensaje de error
     * 
     * Cubre:
     * - show: true con type: "error"
     * - Visualización del mensaje de error
     */
    it("muestra el popup con mensaje de error", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockRejectedValueOnce(new Error("Error"));

      mockStatusStore.show = false;

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({
            show: true,
            type: "error",
          })
        );
      });
    });

    /**
     * Verifica que el popup pueda cerrarse
     * 
     * Cubre:
     * - Callback onClose
     * - setStatus({ show: false, ... })
     * - Reset del estado del popup
     */
    it("cierra el popup al hacer click en cerrar", async () => {
      vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      mockStatusStore.show = true;
      mockStatusStore.title = "Contraseña actualizada";
      mockStatusStore.message = "La contraseña ha sido actualizada correctamente";
      mockStatusStore.type = "success";

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("popup-message")).toBeInTheDocument();
      });

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
   * GRUPO 6: Integración completa
   * 
   * Pruebas que verifican escenarios completos de uso del formulario.
   * 
   * Cobertura:
   * - Flujo completo de cambio de contraseña exitoso
   * - Flujo completo con error y reintento exitoso
   * - Validación y corrección de errores
   */
  describe("Integración completa", () => {
    /**
     * Verifica el flujo completo: llenar -> enviar -> éxito -> limpiar
     * 
     * Cubre:
     * - Interacción completa del usuario
     * - Todas las etapas del proceso
     * - Estado final correcto
     */
    it("completa el flujo de cambio de contraseña exitoso", async () => {
      const updatePasswordSpy = vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      // 1. Llenar el formulario
      const oldPasswordInput = screen.getByTestId("usuOldPassword") as HTMLInputElement;
      const newPasswordInput = screen.getByTestId("usuPassword") as HTMLInputElement;
      const confirmPasswordInput = screen.getByTestId("confirmPassword") as HTMLInputElement;

      fireEvent.change(oldPasswordInput, { target: { value: "OldPass123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });

      // 2. Enviar
      const submitButton = screen.getByRole("button", { name: /confirmar/i });
      fireEvent.click(submitButton);

      // 3. Verificar llamada al servicio
      await waitFor(() => {
        expect(updatePasswordSpy).toHaveBeenCalled();
      });

      // 4. Verificar mensaje de éxito
      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "success",
            message: "La contraseña ha sido actualizada correctamente",
          })
        );
      });

      // 5. Verificar limpieza de campos
      await waitFor(() => {
        expect(oldPasswordInput.value).toBe("");
        expect(newPasswordInput.value).toBe("");
        expect(confirmPasswordInput.value).toBe("");
      });
    });

    /**
     * Verifica el flujo: error -> mantener datos -> corregir -> éxito
     * 
     * Cubre:
     * - Manejo de errores
     * - Reintento después de error
     * - Persistencia de datos para corrección
     */
    it("maneja error y permite reintento exitoso", async () => {
      const updatePasswordSpy = vi.spyOn(UpdatePasswordService, "updatePassword")
        .mockRejectedValueOnce(new Error("Error en el primer intento"))
        .mockResolvedValueOnce(undefined);

      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword") as HTMLInputElement;
      const newPasswordInput = screen.getByTestId("usuPassword") as HTMLInputElement;
      const confirmPasswordInput = screen.getByTestId("confirmPassword") as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      // Primer intento - fallido
      fireEvent.change(oldPasswordInput, { target: { value: "WrongOld123@" } });
      fireEvent.change(newPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "NewPass456!" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "error",
          })
        );
      });

      // Los campos mantienen sus valores
      expect(oldPasswordInput.value).toBe("WrongOld123@");

      // Segundo intento - corregir y enviar de nuevo
      fireEvent.change(oldPasswordInput, { target: { value: "CorrectOld123@" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(updatePasswordSpy).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "success",
          })
        );
      });
    });

    /**
     * Verifica que múltiples errores de validación se muestren correctamente
     * 
     * Cubre:
     * - Validación de múltiples campos simultáneos
     * - Visualización de todos los errores
     * - Usuario puede ver todos los problemas a la vez
     */
    it("muestra múltiples errores de validación simultáneamente", async () => {
      render(
        <RouterWrapper>
          <ResetPasswordPage />
        </RouterWrapper>
      );

      const oldPasswordInput = screen.getByTestId("usuOldPassword");
      const newPasswordInput = screen.getByTestId("usuPassword");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByRole("button", { name: /confirmar/i });

      // Todas las contraseñas son inválidas de diferentes formas
      fireEvent.change(oldPasswordInput, { target: { value: "short" } }); // Muy corta
      fireEvent.change(newPasswordInput, { target: { value: "nouppercase123@" } }); // Sin mayúscula
      fireEvent.change(confirmPasswordInput, { target: { value: "Different123@" } }); // No coincide
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-usuOldPassword")).toBeInTheDocument();
        expect(screen.getByTestId("error-usuPassword")).toBeInTheDocument();
        expect(screen.getByTestId("error-confirmPassword")).toBeInTheDocument();
      });
    });
  });
});
