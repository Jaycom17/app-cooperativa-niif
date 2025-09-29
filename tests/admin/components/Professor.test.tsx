import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Professor from "../../../src/admin/components/organisms/Professor";
import { ProfessorService } from "../../../src/admin/services/professor.service";

const professorMock = {
  usuID: "123",
  usuName: "Juan Perez",
  usuEmail: "juan@example.com",
};

describe("Professor component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Renderizado básico", () => {
    it("renderiza nombre y correo del profesor", () => {
      render(<Professor professor={professorMock} onRefresh={() => {}} />);
      expect(screen.getByText(/Juan Perez/i)).toBeInTheDocument();
      expect(screen.getByText(/juan@example.com/i)).toBeInTheDocument();
    });
  });

  describe("Botón de actualización", () => {
    it("abre el formulario al hacer click en actualizar", () => {
      render(
        <MemoryRouter>
          <Professor professor={professorMock} onRefresh={() => {}} />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));
      expect(screen.getByText(/E-mail:/i)).toBeInTheDocument();
    });
  });

  describe("Botón de eliminación", () => {
    it("llama a deleteProfessor y onRefresh si se confirma la eliminación", async () => {
      const onRefresh = vi.fn();
      vi.spyOn(window, "confirm").mockReturnValue(true);
      vi.spyOn(window, "alert").mockImplementation(() => {});
      vi.spyOn(ProfessorService, "deleteProfessor").mockResolvedValueOnce();

      render(<Professor professor={professorMock} onRefresh={onRefresh} />);

      fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));

      await waitFor(() => {
        expect(ProfessorService.deleteProfessor).toHaveBeenCalledWith("123");
        expect(onRefresh).toHaveBeenCalled();
      });
    });
  });
});
