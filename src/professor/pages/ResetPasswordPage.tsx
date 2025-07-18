import { useForm } from "react-hook-form";
import { MdCreate } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import ProfessorLayout from "../components/templates/ProfessorLayout";
import PasswordInput from "../../components/atoms/PasswordInput";

import { type PasswordModel, PasswordSchema } from "../models/Password";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdatePasswordService } from "../services/updatePassword.service";

import logo from "../../assets/LogoUniversidadCooperativa.png";

function ResetPasswordPage() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  //TODO: cambiar el await por un then catch
  const onSubmit = async (data: PasswordModel) => {
    try {
      const res = await UpdatePasswordService.updatePassword(data);
      alert("Contraseña cambiada correctamente");
      setValue("usuOldPassword", "");
      setValue("usuPassword", "");
      setValue("confirmPassword", "");
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
          <div className="w-11/12">
            <PasswordInput
              placeholder="Contraseña anterior"
              errors={errors}
              register={register}
              inputName="usuOldPassword"
            />
          </div>
          <div className="w-11/12">
            <PasswordInput
              placeholder="Nueva contraseña"
              errors={errors}
              register={register}
              inputName="usuPassword"
            />
          </div>
          <div className="w-11/12">
            <PasswordInput
              placeholder="Confirmar contraseña"
              errors={errors}
              register={register}
              inputName="confirmPassword"
            />
          </div>
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
