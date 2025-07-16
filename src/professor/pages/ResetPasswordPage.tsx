import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdCreate } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import ProfessorLayout from "../../components/templates/ProfessorLayout";

import { type PasswordModel, PasswordSchema } from "../models/Password";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdatePasswordService } from "../services/updatePassword.service";

import logo from "../../assets/LogoUniversidadCooperativa.png";

import { PasswordFields } from "../utils/RoomFields";

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const togglePasswordVisibility = (field: PasswordFields) => {
    if (field === PasswordFields.OldPassword) {
      setShowPassword(!showPassword);
    } else if (field === PasswordFields.NewPassword) {
      setShowPassword2(!showPassword2);
    } else if (field === PasswordFields.ConfirmPassword) {
      setShowPassword3(!showPassword3);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit = async (data: PasswordModel) => {
    try {
      const res = await UpdatePasswordService.updatePassword(data);
      if (res.status === 200) {
        alert("Contraseña cambiada correctamente");
        setValue("usuOldPassword", "");
        setValue("usuPassword", "");
        setValue("confirmPassword", "");
      }
    } catch (error) {
      alert("Error al cambiar la contraseña");
      console.error(error);
    }
  };
  return (
    <ProfessorLayout>
      <main className="w-full h-screen flex flex-col justify-center items-center bg-background text-white">
        <img
          src={logo}
          alt="logo universidad cooperativa"
          className="w-11/12 sm:w-96"
        />
        <form
          className="flex flex-col items-center bg-unicoop-black rounded-md gap-3 w-10/12 md:w-96 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <MdCreate className="text-5xl font-semibold text-center" />
          <h1 className="text-2xl font-semibold text-center mb-2">
            Cambiar Contraseña
          </h1>
          <div className="relative w-11/12">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
              placeholder="Contraseña anterior"
              {...register("usuOldPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(PasswordFields.OldPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          {errors.usuOldPassword && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.usuOldPassword.message || "Debe ingresar la contraseña anterior"}
            </p>
          )}
          <div className="relative w-11/12">
            <input
              type={showPassword2 ? "text" : "password"}
              className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
              placeholder="Nueva contraseña"
              {...register("usuPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(PasswordFields.NewPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
            >
              {showPassword2 ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          {errors.usuPassword && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.usuPassword.message || "Debe ingresar una nueva contraseña"}
            </p>
          )}
          <div className="relative w-11/12">
            <input
              type={showPassword3 ? "text" : "password"}
              className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
              placeholder="Confirmar contraseña"
              {...register("confirmPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(PasswordFields.ConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
            >
              {showPassword3 ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message || "Las contraseñas no coinciden"}
            </p>
          )}
          <button
            type="submit"
            className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded"
            disabled={isSubmitting}
          >
            <FaCheckCircle className="bg-transparent" /> Confirmar
          </button>
        </form>
      </main>
    </ProfessorLayout>
  );
}

export default ResetPasswordPage;
