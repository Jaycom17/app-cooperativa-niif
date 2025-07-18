import { Link, useNavigate } from "react-router-dom";
import StudentLogForm from "../components/organisms/StudentLogForm";
import logo from "../../assets/LogoUniversidadCooperativa.png";
import type { Code } from "../models/Code";

function MainPage() {

  const navigate = useNavigate();

  const onSubmit = async (values: Code) => {
    console.log(values);
    navigate("/middlewarestudent");
  };

  return (
    <main className="flex flex-col mx-auto items-center min-h-screen place-content-center bg-background">
      <img
        src={logo}
        alt="logo universidad cooperativa"
        className="w-11/12 md:w-96"
      />
      <section className="p-6 w-11/12 md:w-[400px] bg-unicoop-black rounded-lg">
        <StudentLogForm onSubmit={onSubmit} />
      </section>
      <p className="text-unicoop mt-5 font-medium text-center">
        ¿No eres un estudiante?{" "}
        <Link
          className="text-unicoop-blue hover:text-buttons-list-blue "
          to="/login"
        >
          ¡Inicia sesión!
        </Link>
      </p>
    </main>
  );
}

export default MainPage;
