/**
 * ============================================================================
 * SUITE DE PRUEBAS: Professor Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/admin/components/organisms/Professor.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente Professor,
 * que muestra la información de un profesor individual y proporciona opciones
 * para actualizar o eliminar su registro del sistema.
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado de información del profesor (nombre, email)
 * 2. Funcionalidad de truncamiento de texto (nombres y emails largos)
 * 3. Apertura y cierre del formulario de edición
 * 4. Flujo completo de eliminación con confirmación
 * 5. Manejo de estados de éxito y error
 * 6. Integración con servicios y stores
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Professor from "../../../src/admin/components/organisms/Professor";
import { ProfessorService } from "../../../src/admin/services/professor.service";

// Mock de datos para las pruebas
const professorMock = {
  usuID: "123",
  usuName: "Juan Perez",
  usuEmail: "juan@example.com",
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

// Mock del ProfForm
vi.mock("@/admin/components/organisms/ProfForm", () => ({
  __esModule: true,
  default: ({ professor, onRefresh, setOpen }: any) => (
    <div data-testid="prof-form">
      <h2>Formulario de edición</h2>
      <p>E-mail: {professor.usuEmail}</p>
      <button onClick={() => setOpen(false)}>Cerrar</button>
    </div>
  ),
}));

// Mock del utility cutString
vi.mock("@/utils/CropName", () => ({
  __esModule: true,
  default: (str: string, maxLength?: number) => {
    const max = maxLength || 20;
    return str.length > max ? str.substring(0, max) + "..." : str;
  },
}));

describe("Professor component", () => {
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
   * con la información del profesor y sus elementos visuales.
   * 
   * Cobertura:
   * - Renderizado del JSX principal
   * - Visualización de props recibidas
   * - Atributos HTML (title para tooltips)
   * - Funcionalidad de truncamiento de texto (cutString utility)
   */
  describe("Renderizado básico", () => {
    /**
     * Verifica que el nombre y correo del profesor se muestren en el DOM
     * 
     * Cubre:
     * - Líneas del JSX donde se renderizan professor.usuName y professor.usuEmail
     * - Integración con la función cutString
     */
    it("renderiza nombre y correo del profesor correctamente", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      expect(screen.getByText(/Juan Perez/i)).toBeInTheDocument();
      expect(screen.getByText(/juan@example.com/i)).toBeInTheDocument();
    });

    /**
     * Verifica que los botones de acción estén presentes en el componente
     * 
     * Cubre:
     * - Renderizado de los botones de actualizar y eliminar
     * - Uso de iconos FaPencilAlt y FaRegTrashAlt
     * - Estructura del div que contiene los botones
     */
    it("renderiza los botones de actualizar y eliminar", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      expect(screen.getByRole("button", { name: /actualizar/i })).toBeInTheDocument();
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
    it("aplica el título con el nombre completo del profesor", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      const nameElement = screen.getByText(/Juan Perez/i);
      expect(nameElement).toHaveAttribute("title", professorMock.usuName);
    });

    /**
     * Verifica que la función cutString recorte nombres que excedan 20 caracteres
     * 
     * Cubre:
     * - Llamada a cutString(professor.usuName) sin parámetro de longitud
     * - Funcionalidad de truncamiento visual para mantener el diseño
     * - Longitud predeterminada de 20 caracteres
     */
    it("recorta el nombre si es muy largo", () => {
      const longNameProfessor = {
        ...professorMock,
        usuName: "Nombre Muy Largo Que Excede Los Veinte Caracteres",
      };
      
      render(<Professor professor={longNameProfessor} onRefresh={() => {}} />);
      
      expect(screen.getByText(/Nombre Muy Largo Que/i)).toBeInTheDocument();
    });

    /**
     * Verifica que la función cutString recorte emails que excedan 30 caracteres
     * 
     * Cubre:
     * - Llamada a cutString(professor.usuEmail, 30) con parámetro personalizado
     * - Prevención de desbordamiento del layout con emails largos
     */
    it("recorta el email si excede 30 caracteres", () => {
      const longEmailProfessor = {
        ...professorMock,
        usuEmail: "correo.electronico.muy.largo@universidad.example.com",
      };
      
      render(<Professor professor={longEmailProfessor} onRefresh={() => {}} />);
      
      // El email debe estar recortado
      const emailText = screen.getByText(/correo.electronico.muy.largo@u/i);
      expect(emailText).toBeInTheDocument();
    });
  });

  /**
   * GRUPO 2: Botón de actualización
   * 
   * Pruebas que verifican el comportamiento del botón de actualizar profesor
   * y la apertura/cierre del formulario de edición.
   * 
   * Cobertura:
   * - Estado formOpen (useState)
   * - Función setFormOpen(true) al hacer click en "Actualizar"
   * - Renderizado condicional del FloatingContainer
   * - Integración con el componente ProfForm
   * - Cierre del formulario mediante setOpen(false)
   */
  describe("Botón de actualización", () => {
    /**
     * Verifica que al hacer click en el botón "Actualizar" se abra el formulario
     * 
     * Cubre:
     * - onClick={() => setFormOpen(true)} del botón actualizar
     * - Renderizado condicional: {formOpen && <FloatingContainer>}
     * - Props pasadas a ProfForm (professor, onRefresh, setOpen)
     * - Visualización del formulario dentro del FloatingContainer
     */
    it("abre el formulario al hacer click en actualizar", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      const updateButton = screen.getByRole("button", { name: /actualizar/i });
      fireEvent.click(updateButton);
      
      expect(screen.getByTestId("floating-container")).toBeInTheDocument();
      expect(screen.getByTestId("prof-form")).toBeInTheDocument();
      expect(screen.getByText(/Formulario de edición/i)).toBeInTheDocument();
      expect(screen.getByText(/E-mail: juan@example.com/i)).toBeInTheDocument();
    });

    /**
     * Verifica que el formulario se pueda cerrar correctamente
     * 
     * Cubre:
     * - Cambio de estado de formOpen de true a false
     * - Desaparición del FloatingContainer cuando formOpen es false
     * - Desaparición del ProfForm cuando formOpen es false
     * - Flujo completo: abrir -> cerrar
     */
    it("cierra el formulario cuando se llama setOpen(false)", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      // Abrir el formulario
      fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));
      expect(screen.getByTestId("prof-form")).toBeInTheDocument();
      
      // Cerrar el formulario
      fireEvent.click(screen.getByText("Cerrar"));
      expect(screen.queryByTestId("prof-form")).not.toBeInTheDocument();
    });

    /**
     * Verifica el estado inicial del componente (formulario cerrado)
     * 
     * Cubre:
     * - Estado inicial de formOpen (false)
     * - Renderizado condicional que no muestra el formulario inicialmente
     */
    it("no muestra el formulario inicialmente", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      expect(screen.queryByTestId("floating-container")).not.toBeInTheDocument();
      expect(screen.queryByTestId("prof-form")).not.toBeInTheDocument();
    });
  });

  /**
   * GRUPO 3: Botón de eliminación con ConfirmDialog
   * 
   * Pruebas que verifican el flujo completo de eliminación de un profesor,
   * incluyendo la confirmación del usuario y el manejo de respuestas del servidor.
   * 
   * Cobertura:
   * - Estado confirmDeleteOpen (useState)
   * - Función setConfirmDeleteOpen(true/false)
   * - Renderizado condicional del ConfirmDialog
   * - Función handleDelete con llamadas al servicio
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
     * - onClick={() => setConfirmDeleteOpen(true)} del botón eliminar
     * - Renderizado condicional: {confirmDeleteOpen && <ConfirmDialog>}
     * - Props del ConfirmDialog: title, message, isOpen
     * - Texto de advertencia al usuario
     */
    it("muestra el diálogo de confirmación al hacer click en eliminar", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-title")).toHaveTextContent(
        "¿Seguro que deseas eliminar al profesor?"
      );
      expect(screen.getByTestId("dialog-message")).toHaveTextContent(
        "No podrás recuperar esta información después."
      );
    });

    /**
     * Verifica el estado inicial del diálogo (no visible)
     * 
     * Cubre:
     * - Estado inicial de confirmDeleteOpen (false)
     * - Renderizado condicional que no muestra el diálogo inicialmente
     */
    it("no muestra el diálogo de confirmación inicialmente", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      
      expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
    });

    /**
     * Verifica el flujo completo de eliminación exitosa
     * 
     * Cubre:
     * - Función handleDelete(professor.usuID)
     * - Llamada a ProfessorService.deleteProfessor con el ID correcto
     * - Bloque .then() de la promesa exitosa
     * - setStatus con mensaje de éxito (tipo: "success")
     * - setConfirmDeleteOpen(false) para cerrar el diálogo
     * - Callback onRefresh() para actualizar la lista de profesores
     * - Flujo asíncrono completo con waitFor
     */
    it("llama a deleteProfessor y onRefresh si se confirma la eliminación", async () => {
      const onRefresh = vi.fn();
      const deleteSpy = vi.spyOn(ProfessorService, "deleteProfessor")
        .mockResolvedValueOnce();

      render(<Professor professor={professorMock} onRefresh={onRefresh} />);

      // Abrir el diálogo de confirmación
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      // Confirmar la eliminación
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("123");
        expect(deleteSpy).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(onRefresh).toHaveBeenCalled();
        expect(onRefresh).toHaveBeenCalledTimes(1);
      });

      // Verificar que se llamó a setStatus con éxito
      expect(mockSetStatus).toHaveBeenCalledWith({
        show: true,
        title: "Profesor eliminado",
        message: "El profesor ha sido eliminado correctamente",
        type: "success",
      });
    });

    /**
     * Verifica el comportamiento al cancelar la eliminación
     * 
     * Cubre:
     * - onCancel={() => setConfirmDeleteOpen(false)} del ConfirmDialog
     * - NO ejecución de handleDelete
     * - NO llamada a ProfessorService.deleteProfessor
     * - NO llamada a onRefresh
     * - NO llamada a setStatus (ni éxito ni error)
     * - Cierre del diálogo al cancelar
     * - Protección contra eliminaciones accidentales
     */
    it("no llama al servicio si se cancela la eliminación", async () => {
      const onRefresh = vi.fn();
      const deleteSpy = vi.spyOn(ProfessorService, "deleteProfessor")
        .mockResolvedValueOnce();

      render(<Professor professor={professorMock} onRefresh={onRefresh} />);

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
     * - NO llamada a setConfirmDeleteOpen(false) en caso de error
     * - Flujo de error en operaciones asíncronas
     * - Feedback al usuario cuando falla la operación
     */
    it("muestra un mensaje de error si falla la eliminación", async () => {
      const onRefresh = vi.fn();
      const errorMessage = "Network error";
      const deleteSpy = vi.spyOn(ProfessorService, "deleteProfessor")
        .mockRejectedValueOnce(new Error(errorMessage));

      render(<Professor professor={professorMock} onRefresh={onRefresh} />);

      // Abrir el diálogo y confirmar
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("123");
      });

      // Verificar que onRefresh NO se llamó en caso de error
      expect(onRefresh).not.toHaveBeenCalled();

      // Verificar que se llamó a setStatus con error
      await waitFor(() => {
        expect(mockSetStatus).toHaveBeenCalledWith({
          show: true,
          title: "Error",
          message: "Error al eliminar al profesor",
          type: "error",
        });
      });
    });

    /**
     * Verifica que el diálogo se cierre automáticamente tras una eliminación exitosa
     * 
     * Cubre:
     * - setConfirmDeleteOpen(false) en el bloque .then()
     * - Desaparición del ConfirmDialog del DOM
     * - Restauración del estado del componente después de una operación
     * - UX: El diálogo no debe quedar abierto tras completar la acción
     */
    it("cierra el diálogo después de una eliminación exitosa", async () => {
      const onRefresh = vi.fn();
      vi.spyOn(ProfessorService, "deleteProfessor").mockResolvedValueOnce();

      render(<Professor professor={professorMock} onRefresh={onRefresh} />);

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
      });
    });
  });

  /**
   * GRUPO 4: Integración completa
   * 
   * Pruebas que verifican la interacción entre múltiples funcionalidades
   * y el comportamiento del componente en escenarios complejos.
   * 
   * Cobertura:
   * - Independencia de estados (formOpen vs confirmDeleteOpen)
   * - Manejo de múltiples instancias con diferentes props
   * - Re-renderizado con nuevos datos (rerender)
   * - Flujos de trabajo completos de usuario
   */
  describe("Integración completa", () => {
    /**
     * Verifica que los dos modales (formulario y confirmación) sean independientes
     * 
     * Cubre:
     * - Estados independientes: formOpen y confirmDeleteOpen
     * - Apertura y cierre del formulario no afecta al diálogo de confirmación
     * - Apertura y cierre del diálogo no afecta al formulario
     * - UX: El usuario puede realizar ambas acciones en secuencia
     * - No hay interferencia entre los estados del componente
     */
    it("puede abrir el formulario y el diálogo de confirmación de manera independiente", async () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);

      // Abrir formulario
      fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));
      expect(screen.getByTestId("prof-form")).toBeInTheDocument();

      // Cerrar formulario
      fireEvent.click(screen.getByText("Cerrar"));
      expect(screen.queryByTestId("prof-form")).not.toBeInTheDocument();

      // Abrir diálogo de confirmación
      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();

      // Cancelar
      fireEvent.click(screen.getByTestId("cancel-button"));
      expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
    });

    /**
     * Verifica que el componente maneje correctamente diferentes profesores
     * 
     * Cubre:
     * - Props dinámicas (profesor cambiante)
     * - Re-renderizado con nuevos datos usando rerender()
     * - Identificación correcta del profesor en handleDelete
     * - Llamadas al servicio con IDs diferentes
     * - Uso correcto de professor.usuID en cada instancia
     * - Escenario real: lista de profesores donde se puede eliminar varios
     */
    it("maneja múltiples profesores con diferentes IDs correctamente", async () => {
      const professor1 = { ...professorMock, usuID: "1" };
      const professor2 = { ...professorMock, usuID: "2" };
      const onRefresh = vi.fn();
      const deleteSpy = vi.spyOn(ProfessorService, "deleteProfessor")
        .mockResolvedValue();

      const { rerender } = render(
        <Professor professor={professor1} onRefresh={onRefresh} />
      );

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("1");
      });

      // Cambiar al segundo profesor
      rerender(<Professor professor={professor2} onRefresh={onRefresh} />);

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
      fireEvent.click(screen.getByTestId("confirm-button"));

      await waitFor(() => {
        expect(deleteSpy).toHaveBeenCalledWith("2");
      });

      expect(deleteSpy).toHaveBeenCalledTimes(2);
    });
  });
});
