import { useForm } from "react-hook-form";
import { IoMdLogIn } from "react-icons/io";
import type { Code } from "../../models/Code";
import InputForm from "../../../components/atoms/InputForm";
import { CodeSchema } from "../../models/Code";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface StudentLogFormProps {
  onSubmit: (data: Code) => void;
  roomError: string | null;
  roomCode?: string;
}

function StudentLogForm({ onSubmit, roomError, roomCode }: StudentLogFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(CodeSchema),
  });

  useEffect(() => {
    if (roomCode) {
      setValue("roomPassword", roomCode);
    }
  }, [roomCode, setValue]);

  return (
    <form
      className="flex flex-col items-center bg-transparent rounded-md gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <IoMdLogIn className="bg-transparent text-unicoop text-4xl" />
      <h1 className="bg-transparent text-unicoop text-xl font-medium text-center">
        Ingresa a una sala con el código
      </h1>
      {roomError && (
        <p className="text-[red] text-sm bg-transparent">{roomError}</p>
      )}
      <div className="w-11/12">
        <InputForm
        type="text"
        placeholder="Código de la sala"
        register={register}
        errors={errors}
        inputName="roomPassword"
      />
      </div>
      <button
        className="bg-buttons-login text-unicoop-white w-11/12 p-2.5 rounded-md my-4 hover:bg-gray-600 focus:ring-2 transition-colors duration-200 ease-in font-medium"
        disabled={isSubmitting}
        type="submit"
      >
        Ingresar
      </button>
    </form>
  );
}

export default StudentLogForm;
