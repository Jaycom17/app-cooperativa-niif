import { MdCreate } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useRoomForm } from "../../hooks/useRoomForm";
import type { RoomModel } from "../../models/Room";
import InputForm from "../../../components/atoms/InputForm";

interface RoomFormProps {
  room?: RoomModel;
  usuId: string;
  onRefresh?: () => void;
  setOpen?: (open: boolean) => void;
}

const RoomForm = ({ room, usuId, onRefresh, setOpen }: RoomFormProps) => {
  const { register, errors, handleSubmit, isUpdate, isSubmitting, roomErrors } =
    useRoomForm({
      room: room,
      usuID: usuId,
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

      {roomErrors && (
        <p className="text-red-500 text-sm mt-2">{roomErrors}</p>
      )}

      <section className="flex flex-col md:flex-row gap-3 w-11/12 mt-3">
        <div className="w-full flex flex-col items-center">
          <InputForm
            type="text"
            placeholder="Nombre"
            register={register}
            errors={errors}
            inputName="roomName"
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <InputForm
            type="text"
            placeholder="Código"
            register={register}
            errors={errors}
            inputName="roomPassword"
          />
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
