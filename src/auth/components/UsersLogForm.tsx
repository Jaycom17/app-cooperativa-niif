import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLogInOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { type LoginModel, LoginSchema } from "../models/Login";

interface UsersLogFormProps {
  onSubmit: (data: LoginModel) => void;
}

function UsersLogForm({ onSubmit }: UsersLogFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const loginError = false; // TODO: Replace with actual error state from context or props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginModel>({
    resolver: zodResolver(LoginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="flex flex-col items-center bg-transparent rounded-md gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <IoLogInOutline className="bg-transparent text-unicoop text-4xl" />
      <h1 className="bg-transparent text-unicoop text-xl font-medium text-center">
        Inicia sesión con tus credenciales
      </h1>
      {loginError && (
        <p className="text-[red] text-sm bg-transparent">
          Credenciales incorrectas
        </p>
      )}
      <input
        type="text"
        placeholder="Correo electrónico"
        className="w-11/12 p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
        {...register("usuEmail")}
      />
      {errors.usuEmail && (
        <p className="text-[red] text-sm bg-transparent">
          {errors.usuEmail.message || "Error al ingresar el correo electrónico"}
        </p>
      )}
      <div className="relative w-11/12">
        <input
          className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          {...register("usuPassword")}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
      {errors.usuPassword && (
        <p className="text-[red] text-sm bg-transparent">
          {errors.usuPassword.message || "Error al ingresar la contraseña"}
        </p>
      )}
      <button
        className="bg-buttons-login text-unicoop-white w-11/12 p-2.5 rounded-md my-4 hover:bg-gray-600 focus:ring-2 transition-colors duration-200 ease-in font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        Ingresar
      </button>
    </form>
  );
}

export default UsersLogForm;
