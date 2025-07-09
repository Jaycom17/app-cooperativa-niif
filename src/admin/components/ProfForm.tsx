import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline, IoPersonAddSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import  { type UserModel, type UserFormData, UserEditSchema, UserCreateSchema } from "../models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFields } from "../utils/UserFields";

interface ProfFormProps {
    professor?: UserModel;
    onRefresh?: () => void;
    setOpen?: (open: boolean) => void;
}

const ProfForm = ({ professor, onRefresh, setOpen }: ProfFormProps) => {
  const isUpdate = Boolean(professor);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  const createProfessor = async (data: Omit<UserModel, "usuId">): Promise<{ status: number }> => {
    return { status: 200 };
  };
  const updateProfessor = async (id: string, data:  Omit<UserModel, "usuId">): Promise<{ status: number }> => {
    return { status: 200 };
  };

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

  const togglePasswordVisibility = (field: PasswordFields) => {
    if(field === PasswordFields.Password) {setShowPassword(!showPassword);}
    else if(field === PasswordFields.ConfirmPassword){setShowPassword2(!showPassword2);}
  };

  const onSubmit = (data: UserFormData) => {

    const professorData = {
        usuName: data.usuName,
        usuEmail: data.usuEmail,
        usuPassword: data.usuPassword,
    }

    if (isUpdate) {
      updateProfessor(professor!.usuId, professorData).then((response) => {
        if(response.status === 200){
          alert("Se han actualizado los datos del profesor");
          onRefresh!();
          setOpen!(false)
        }else{
          alert("Error al actualizar los datos del profesor");
        }
      }).catch(() => {
        alert("Error al actualizar los datos del docente");
      }) 
    } 
    else {
      createProfessor(professorData).then((response) => {
        if (response.status === 200) {
          alert("Profesor creado exitosamente");
          navigate("/admin");
        }else{
          alert("Error al crear el profesor");
        }
      }).catch(() => {
        alert("Error al crear el profesor");
      });
    }
  };

  return (
    <form className="flex flex-col items-center bg-unicoop-black rounded-md gap-3 p-6" onSubmit={handleSubmit(onSubmit)}>
      {isUpdate ? (
        <article className="flex flex-col items-center">
          <MdCreate className="text-5xl font-semibold text-center"/>
          <h1 className="text-2xl font-semibold text-center">Actualizar datos del profesor</h1>
          <p className="text-center">A continuación, puede actualizar los datos del profesor. Recuerde informar al docente los cambios realizados</p>  
        </article>
      ): <IoPersonAddSharp className="text-unicoop text-4xl"/>}
      <section className="flex flex-col md:flex-row gap-3 w-11/12">
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
            placeholder="Nombre"
            {...register("usuName")}
          />
          {errors.usuName && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.usuName.message || "El nombre del docente no puede quedar vacío"}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <input
            type="email"
            className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
            placeholder="Correo electronico"
            {...register("usuEmail")}
          />
          {errors.usuEmail && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.usuEmail.message || "El correo electrónico es obligatorio"}
            </p>
          )}
        </div>
      </section>

      <div className="relative w-11/12">
          <input
          type={showPassword ? "text" : "password"}
          className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
          placeholder="Contraseña"
          {...register("usuPassword")}
          />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(PasswordFields.Password)}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
      {errors.usuPassword && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.usuPassword.message || "La contraseña es obligatoria y debe tener entre 6 y 50 caracteres"}
        </p>
      )}
      <div className="relative w-11/12">
          <input
            type={showPassword2 ? "text" : "password"}
            className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
            placeholder="Repita la contraseña"
            {...register("confirmPassword")}
          />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(PasswordFields.ConfirmPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
        >
          {showPassword2 ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.confirmPassword.message || "La confirmación de la contraseña es obligatoria y debe coincidir con la contraseña anterior"}
        </p>
      )}
      <button type="submit" className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded" >
        <FaCheckCircle className='bg-transparent'/> Confirmar
      </button>
    </form>
  );
};

export default ProfForm;