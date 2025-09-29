import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProfForm from "../../../src/admin/components/organisms/ProfForm";
import { ProfessorService } from "../../../src/admin/services/professor.service";

vi.mock("../../../src/admin/services/professor.service", () => ({
  ProfessorService: {
    createProfessor: vi.fn(),
    updateProfessor: vi.fn(),
  }
}));


vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const professorMock = {
  usuID: "123",
  usuName: "Juan Pérez",
  usuEmail: "juan@example.com",
};

describe("ProfForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el formulario de creación cuando no hay profesor", () => {
    render(
      <MemoryRouter>
        <ProfForm />
      </MemoryRouter>
    );
    expect(screen.getByText(/confirmar/i)).toBeInTheDocument();
    expect(screen.queryByText(/actualizar datos del profesor/i)).not.toBeInTheDocument();

  });

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

  it("valida campos obligatorios", async () => {
    render(
      <MemoryRouter>
        <ProfForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText(/nombre/i)).toBeInTheDocument(); // depende de cómo zod devuelva los errores
    });
  });

  it("crea un profesor correctamente", async () => {
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
      expect(ProfessorService.createProfessor).toHaveBeenCalledWith({
        usuName: "Pedro",
        usuEmail: "pedro@test.com",
        usuPassword: "Admin123@",
      });
    });
  });

  it("actualiza un profesor correctamente", async () => {
    const onRefresh = vi.fn();
    const setOpen = vi.fn();
    (ProfessorService.updateProfessor as any).mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <ProfForm professor={professorMock} onRefresh={onRefresh} setOpen={setOpen} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Juan Actualizado" } });
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

    await waitFor(() => {
      expect(ProfessorService.updateProfessor).toHaveBeenCalledWith("123", {
        usuName: "Juan Actualizado",
        usuEmail: "juan@example.com",
        usuPassword: "",
      });
      expect(onRefresh).toHaveBeenCalled();
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  it("muestra mensaje de error si la API falla", async () => {
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
});
