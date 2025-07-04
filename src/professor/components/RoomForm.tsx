import { MdCreate } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useRoomForm } from "../hooks/useRoomForm";
import type { RoomModel } from "../models/Room";

interface RoomFormProps {
  room?: RoomModel;
  usuId: string;
  onRefresh?: () => void;
  setOpen?: (open: boolean) => void;
}

const RoomForm = ({ room, usuId, onRefresh, setOpen }: RoomFormProps) => {
  const { register, errors, handleSubmit, isUpdate, isSubmitting } =
    useRoomForm({
      room: room,
      usuId: usuId,
      onRefresh: onRefresh,
      closeModal: () => setOpen?.(false),
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-unicoop-black p-4 rounded-md flex flex-col items-center"
    >
      {isUpdate ? (
        <article className="flex flex-col items-center">
          <MdCreate className="text-5xl font-semibold text-center" />
          <h1 className="text-2xl font-semibold text-center">
            Actualizar datos de la sala
          </h1>
          <p className="text-center">
            A continuación, puede actualizar el nombre o el código de la sala.
          </p>
        </article>
      ) : (
        <MdAddHome className="text-unicoop text-4xl" />
      )}

      <section className="flex flex-col md:flex-row gap-3 w-11/12 mt-3">
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
            placeholder="Nombre"
            {...register("roomName", { required: true })}
          />
          {errors.roomName && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.roomName.message ||
                "El nombre de la sala no puede quedar vacío"}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
            placeholder="Código"
            {...register("roomPassword", { required: true })}
          />
          {errors.roomPassword && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.roomPassword.message ||
                "El código de la sala no puede quedar vacío"}
            </p>
          )}
        </div>
      </section>
      <button
        type="submit"
        className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded"
        disabled={isSubmitting}
      >
        <FaCheckCircle className="bg-transparent" /> Confirmar
      </button>
    </form>
  );
};

export default RoomForm;
