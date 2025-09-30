import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLogInOutline } from "react-icons/io5";

import { type LoginModel, LoginSchema } from "@/auth/models/Login";
import InputForm from "@/components/atoms/InputForm";
import PasswordInput from "@/components/atoms/PasswordInput";
import { useAuthStore } from "@/stores/AuthStore";

interface UsersLogFormProps {
  onSubmit: (data: LoginModel) => void;
}

function UsersLogForm({ onSubmit }: UsersLogFormProps) {
  const {loginError} = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginModel>({
    resolver: zodResolver(LoginSchema),
  });

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
      <div className="w-11/12">
        <InputForm
        type="text"
        placeholder="Correo electrónico"
        register={register}
        errors={errors}
        inputName="email"
      />
      </div>
      <div className="w-11/12">
        <PasswordInput
          placeholder="Contraseña"
          register={register}
          errors={errors}
          inputName="password"
        />
      </div>
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
