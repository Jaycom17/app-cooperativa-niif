import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import logo from '../../assets/LogoUniversidadCooperativa.png'


function UpdateInfoAdminPage() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


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

  const updateAdmin = async (userData) => {
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
        if (response.status === 200) {
          const userData = response.data;
          setValue("usuName", userData.usuName);
          setValue("usuEmail", userData.usuEmail);
        }
      })
      .catch(() => {
        alert("Error al cargar la información del usuario");
      });
  }, [setValue]);

  const togglePasswordVisibility = (field) => {
    if(field === 1) {setShowPassword(!showPassword);}
    else if(field === 2){setShowPassword2(!showPassword2);}
  };

  const onSubmit = (data) => {
    if (data.usuPassword !== data.confirmPassword) {
      setPasswordMatch(false);
      setTimeout(() => {
        setPasswordMatch(true);
      }, 5000);
      return;
    }

    const userData = {
      usuName: data.usuName,
      usuEmail: data.usuEmail,
      usuPassword: data.usuPassword,
    };

    updateAdmin(userData).then((response) => {
      if (response.status === 200) {
          alert("Se han actualizado los datos del usuario");
      } else {
          alert("Error al actualizar los datos del usuario");
      }
      }).catch(() => {
          alert("Error al actualizar los datos del usuario");
      });
  };

  return (
    <>
      <Navbar />
      <main className="w-full h-screen flex flex-col justify-center items-center bg-background text-white">
        <img src={logo} alt="logo universidad cooperativa" className="w-11/12 sm:w-96"/>
        <form
          className="flex flex-col items-center w-11/12 lg:w-3/5 bg-unicoop-black rounded-md gap-3 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <article className="flex flex-col items-center">
            <MdCreate className="text-5xl font-semibold text-center"/>
            <h1 className="text-2xl font-semibold text-center">
              Actualiza tus datos
            </h1>
            <p className="text-center">
              A continuación, puede actualizar sus datos de administrador.
            </p>
          </article>
          <section className="flex flex-col md:flex-row gap-3 w-11/12">
            <div className="w-full flex flex-col items-center">
              <input
                type="text"
                className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
                placeholder="Nombre"
                {...register("usuName", { required: true })}
              />
              {errors.usuName && (
                <p className="text-red-500 text-sm font-semibold">
                  El nombre no puede quedar vacío
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-center">
              <input
                type="email"
                className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
                placeholder="Correo electronico"
                {...register("usuEmail", { required: true })}
              />
              {errors.usuEmail && (
                <p className="text-red-500 text-sm font-semibold">
                  El email no puede quedar vacío
                </p>
              )}
            </div>
          </section>

          {!passwordMatch && (
            <p className="text-red-500 text-sm font-semibold">
              Las contraseñas no coinciden
            </p>
          )}
          <div className="relative w-11/12">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
              placeholder="Contraseña"
              {...register("usuPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(1)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          {errors.usuPassword && (
            <p className="text-red-500 text-sm font-semibold">
              Debe ingresar una contraseña
            </p>
          )}
          <div className="relative w-11/12">
            <input
              type={showPassword2 ? "text" : "password"}
              className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
              placeholder="Repita la contraseña"
              {...register("confirmPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(2)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
            >
              {showPassword2 ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm font-semibold">
              Debe repetir la contraseña
            </p>
          )}
          <button type="submit" className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded" >
                <FaCheckCircle className='bg-transparent'/> Confirmar
            </button>
        </form>
      </main>
    </>
  );
}

export default UpdateInfoAdminPage;
