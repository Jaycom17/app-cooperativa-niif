import { useForm } from "react-hook-form";
import { IoMdLogIn } from "react-icons/io";
import type { Code } from "../models/Code";

interface StudentLogFormProps {
  onSubmit: (data: Code) => void;
}

function StudentLogForm({ onSubmit }: StudentLogFormProps) {
  const roomError = false; // TODO: Replace with actual error state from context or props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ roomPassword: string }>();

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
      <input
        type="text"
        placeholder="Código de la sala"
        className="w-11/12 p-2.5 rounded-md text-xl text-unicoop text-center bg-background border-solid border-unicoop border"
        {...register("roomPassword", { required: true })}
      />
      {errors.roomPassword && (
        <p className="text-[red] text-sm bg-transparent">
          Debes ingresar el código de la sala
        </p>
      )}
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
