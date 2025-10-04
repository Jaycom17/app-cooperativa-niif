import { useForm } from "react-hook-form";
import { MdCreate } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import ProfessorLayout from "@/professor/components/templates/ProfessorLayout";
import PasswordInput from "@/components/atoms/PasswordInput";

import { type PasswordModel, PasswordSchema } from "@/professor/models/Password";

import { UpdatePasswordService } from "@/professor/services/updatePassword.service";

import { useStatusStore } from "@/stores/StatusStore";

import logo from "@/assets/LogoUniversidadCooperativa.png";

import PopUpMessage from "@/components/molecules/PopUpMessage";

function ResetPasswordPage() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  const { setStatus, message, show, title, type } = useStatusStore();

  const onSubmit = async (data: PasswordModel) => {
      UpdatePasswordService.updatePassword(data).then(() => {
        setStatus({
          show: true,
          message: "La contraseña ha sido actualizada correctamente",
          title: "Contraseña actualizada",
          type: "success",
        });
        setValue("usuOldPassword", "");
        setValue("usuPassword", "");
        setValue("confirmPassword", "");
      }).catch((err: unknown) => {
        console.log(err);
        const error = err as { response?: { data?: { error?: { message?: string } } } };
        setStatus({
          show: true,
          message: error.response?.data?.error?.message || "Error al actualizar la contraseña",
          title: "Error",
          type: "error",
        });
    });
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
        {show && 
        <PopUpMessage
          message={message}
          title={title}
          type={type}
          onClose={() => setStatus({ show: false, message: "", title: "", type: "info" })}
        />}
      </main>
    </ProfessorLayout>
  );
}

export default ResetPasswordPage;
