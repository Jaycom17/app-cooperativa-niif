import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import FloatingContainer from "../../components/FloatingContainer";
import ProfForm from "./ProfForm";
import cutString from "../../utils/CropName";
import type { ProfessorModel } from "../models/User";

interface ProfessorProps {
  professor: ProfessorModel;
  onRefresh: () => void;
}

const Professor = ({ professor, onRefresh }: ProfessorProps) => {
  const [formOpen, setFormOpen] = useState(false);

  const deleteProfessor = async (profId: string) => {
    // Simulate an API call to delete the professor
    return { status: 200, data: { message: "Profesor eliminado" } };
  };

  const handleDelete = (profId: string) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar al profesor ${professor.usuName}?`
    );
    if (confirmDelete) {
      deleteProfessor(profId)
        .then((response) => {
          if (response.status === 200) {
            alert("Se ha eliminado el profesor correctamente");
            onRefresh();
          }
        })
        .catch(() => {
          alert("Error al eliminar al profesor");
        });
    }
  };

  return (
    <section className="flex flex-col items-center w-4/5 sm:1/3 lg:w-[375px] bg-primary rounded-lg text-unicoop">
      <h1
        className="text-2xl font-bold text-center mx-1"
        title={professor.usuName}
      >
        {cutString(professor.usuName)}
      </h1>
      <h2 className="text-lg text-center" title={professor.usuEmail}>
        <span className="font-medium">E-mail:</span>{" "}
        {cutString(professor.usuEmail)}
      </h2>
      <div className="flex items-center gap-3 mt-2 mb-3">
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center p-1.5 bg-buttons-update-green hover:bg-buttons-update-green-h duration-150 rounded"
        >
          <FaPencilAlt className="bg-transparent" /> Actualizar
        </button>
        <button
          onClick={() => handleDelete(professor.usuId)}
          className="flex items-center p-1.5 bg-buttons-delete-red hover:bg-buttons-delete-red-h duration-150 rounded"
        >
          <FaRegTrashAlt className="bg-transparent" /> Eliminar
        </button>
      </div>

      {formOpen && (
        <FloatingContainer open={formOpen} setOpen={setFormOpen}>
          <ProfForm
            professor={professor}
            onRefresh={onRefresh}
            setOpen={setFormOpen}
          />
        </FloatingContainer>
      )}
    </section>
  );
};

export default Professor;
