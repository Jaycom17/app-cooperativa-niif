import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import logo from '../../assets/LogoUniversidadCooperativa.png'
import { zodResolver } from "@hookform/resolvers/zod";
import { UserEditSchema, type UserFormData } from "../models/User";
import AdminLayout from "../components/templates/AdminLayout";
import InputForm from "../../components/atoms/InputForm";
import PasswordInput from "../../components/atoms/PasswordInput";

function UpdateInfoAdminPage() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserEditSchema)
  });


  const profile = async () => {
    // Simulate an API call to get user profile data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: {
            usuName: "Admin User",
            usuEmail: "admin@algo.com",
          }
        });
      }, 1000);
    });
  };

  const updateAdmin = async (userData: UserFormData) => {
    // Simulate an API call to update admin data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.usuName && userData.usuEmail && userData.usuPassword) {
          resolve({ status: 200 });
        } else {
          reject(new Error("Error updating admin data"));
        }
      }, 1000);
    });
  };

  useEffect(() => {
    profile()
      .then((response) => {
        const res = response as { status: number; data: { usuName: string; usuEmail: string } };
        const userData = res.data;
        setValue("usuName", userData.usuName);
        setValue("usuEmail", userData.usuEmail);
      })
      .catch(() => {
        alert("Error al cargar la información del usuario");
      });
  }, [setValue]);

  const onSubmit = (data: UserFormData) => {

    const userData = {
      usuName: data.usuName,
      usuEmail: data.usuEmail,
      usuPassword: data.usuPassword,
    };

    updateAdmin(userData).then((_res) => {
      alert("Se han actualizado los datos del usuario");
    }).catch(() => {
      alert("Error al actualizar los datos del usuario");
    });
  };

  return (
    <AdminLayout>
      <main className="w-full h-screen flex flex-col justify-center items-center bg-background text-white">
        <img src={logo} alt="logo universidad cooperativa" className="w-11/12 sm:w-96" />
        <form
          className="flex flex-col items-center w-11/12 lg:w-3/5 bg-unicoop-black rounded-md gap-3 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <article className="flex flex-col items-center">
            <MdCreate className="text-5xl font-semibold text-center" />
            <h1 className="text-2xl font-semibold text-center">
              Actualiza tus datos
            </h1>
            <p className="text-center">
              A continuación, puede actualizar sus datos de administrador.
            </p>
          </article>
          <section className="flex flex-col md:flex-row gap-3 w-11/12">
            <div className="w-full flex flex-col items-center">
              <InputForm
                register={register}
                errors={errors}
                inputName="usuName"
                placeholder="Nombre completo"
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <InputForm
                register={register}
                errors={errors}
                inputName="usuEmail"
                type="email"
                placeholder="Correo electrónico"
              />
            </div>
          </section>
          <div className="relative w-11/12">
            <PasswordInput
              register={register}
              errors={errors}
              inputName="usuPassword"
              placeholder="Contraseña"
            />
          </div>
          <div className="w-11/12">
            <PasswordInput
              register={register}
              errors={errors}
              inputName="confirmPassword"
              placeholder="Repita la contraseña"
            />
          </div>
          <button type="submit" className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded" >
            <FaCheckCircle className='bg-transparent' /> Confirmar
          </button>
        </form>
      </main>
    </AdminLayout>
  );
}

export default UpdateInfoAdminPage;
