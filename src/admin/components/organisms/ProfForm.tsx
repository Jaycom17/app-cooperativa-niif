import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { type UserModel, type UserFormData, UserEditSchema, UserCreateSchema } from "../../models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../../components/atoms/InputForm";
import PasswordInput from "../../../components/atoms/PasswordInput";
import { ProfessorService } from "../../services/professor.service";

interface ProfFormProps {
  professor?: UserModel;
  onRefresh?: () => void;
  setOpen?: (open: boolean) => void;
}

const ProfForm = ({ professor, onRefresh, setOpen }: ProfFormProps) => {
  const isUpdate = Boolean(professor);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isUpdate ? UserEditSchema : UserCreateSchema),
  });

  useEffect(() => {
    if (professor) {
      setValue('usuName', professor.usuName);
      setValue('usuEmail', professor.usuEmail);
    }
  }, [professor, setValue]);

  const onSubmit = (data: UserFormData) => {

    const professorData = {
      usuName: data.usuName,
      usuEmail: data.usuEmail,
      usuPassword: data.usuPassword,
    }

    if (isUpdate) {
      ProfessorService.updateProfessor(professor!.usuID, professorData).then((_res) => {
        alert("Se han actualizado los datos del profesor");
        onRefresh!();
        setOpen!(false);
      }).catch(() => {
        alert("Error al actualizar los datos del docente");
      })
    }
    else {
      ProfessorService.createProfessor(professorData).then(() => {
        alert("Profesor creado exitosamente");
        navigate("/admin");
      }).catch(() => {
        alert("Error al crear el profesor");
      });
    }
  };

  return (
    <form className="flex flex-col items-center bg-unicoop-black rounded-md gap-3 p-6" onSubmit={handleSubmit(onSubmit)}>
      {isUpdate ? (
        <article className="flex flex-col items-center">
          <MdCreate className="text-5xl font-semibold text-center" />
          <h1 className="text-2xl font-semibold text-center">Actualizar datos del profesor</h1>
          <p className="text-center">A continuación, puede actualizar los datos del profesor. Recuerde informar al docente los cambios realizados</p>
        </article>
      ) : <IoPersonAddSharp className="text-unicoop text-4xl" />}
      <section className="flex flex-col md:flex-row gap-3 w-11/12">
        <div className="w-full flex flex-col items-center">
          <InputForm errors={errors} register={register} inputName="usuName" placeholder="Nombre" />
        </div>
        <div className="w-full flex flex-col items-center">
          <InputForm errors={errors} register={register} inputName="usuEmail" placeholder="Correo electronico" type="email" />
        </div>
      </section>

      <div className="w-11/12">
        <PasswordInput register={register} errors={errors} inputName="usuPassword" placeholder="Contraseña" />
      </div>

      <div className="w-11/12">
        <PasswordInput register={register} errors={errors} inputName="confirmPassword" placeholder="Repita la contraseña" />
      </div>
      <button type="submit" className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded" >
        <FaCheckCircle className='bg-transparent' /> Confirmar
      </button>
    </form>
  );
};

export default ProfForm;