import { Link } from "react-router-dom";
import logo from "../../assets/LogoUniversidadCooperativa.png";

import UsersLogForm from "../components/UsersLogForm";
import type { LoginModel } from "../models/Login";

function LoginPage() {
  //TODO: cambiar el tipo de datos de values
  const onSubmit = async (values: LoginModel) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col bg-background mx-auto items-center min-h-screen place-content-center">
      <img
        src={logo}
        alt="logo universidad cooperativa"
        className="w-11/12 md:w-96"
      />
      <section className="p-6 w-11/12 md:w-[400px] bg-unicoop-black rounded-lg">
        <UsersLogForm onSubmit={onSubmit} />
      </section>
      <p className="text-unicoop mt-5 font-medium text-center">
        ¿Tienes un código de sala?{" "}
        <Link
          className="text-unicoop-blue hover:text-buttons-list-blue "
          to="/"
        >
          ¡Únete!
        </Link>
      </p>
    </main>
  );
}

export default LoginPage;
