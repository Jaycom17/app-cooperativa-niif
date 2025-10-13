import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

import FloatingContainer from "@/components/atoms/FloatingContainer";
import ProfForm from "@/admin/components/organisms/ProfForm";
import cutString from "@/utils/CropName";
import type { UserModel } from "@/admin/models/User";
import { ProfessorService } from "@/admin/services/professor.service";
import { useStatusStore } from "@/stores/StatusStore";

import ConfirmDialog from "@/components/molecules/ConfirmDialog";

interface ProfessorProps {
  professor: UserModel;
  onRefresh: () => void;
}

const Professor = ({ professor, onRefresh }: ProfessorProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { setStatus } = useStatusStore();

  const handleDelete = (profId: string) => {

    ProfessorService.deleteProfessor(profId)
      .then(() => {
        setStatus({
          show: true,
          title: "Profesor eliminado",
          message: "El profesor ha sido eliminado correctamente",
          type: "success",
        });
        setConfirmDeleteOpen(false);
        onRefresh();
      })
      .catch((error: any) => {
        setStatus({
          show: true,
          title: "Error",
          message: error.response?.data?.error?.message || "Error al eliminar al profesor",
          type: "error",
        });
      });
  };

  return (
    <section className="flex flex-col items-center w-4/5 sm:1/3 lg:w-[375px] bg-primary rounded-lg text-unicoop">
      <h1
        className="text-2xl font-bold text-center mx-1"
        title={professor.usuName}
      >
        {cutString(professor.usuName, 20)}
      </h1>
      <h2 className="text-lg text-center" title={professor.usuEmail}>
        <span className="font-medium">E-mail:</span>{" "}
        {cutString(professor.usuEmail, 30)}
      </h2>
      <div className="flex items-center gap-3 mt-2 mb-3">
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center p-1.5 bg-buttons-update-green hover:bg-buttons-update-green-h duration-150 rounded"
        >
          <FaPencilAlt className="bg-transparent" /> Actualizar
        </button>
        <button
          onClick={() => setConfirmDeleteOpen(true)}
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

      {confirmDeleteOpen && (
        <ConfirmDialog
          isOpen={confirmDeleteOpen}
          onCancel={() => setConfirmDeleteOpen(false)}
          onConfirm={() => handleDelete(professor.usuID)}
          title="¿Seguro que deseas eliminar al profesor?"
          message="No podrás recuperar esta información después."
        />
      )}
    </section>
  );
};

export default Professor;
