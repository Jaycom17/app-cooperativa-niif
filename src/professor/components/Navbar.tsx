import { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

import AccountDropdown from "../../components/AccountDropdown";

const TeacherNavbarTW = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const singout = () => {};

  const user = {
    usuName: "Profesor",
    usuId: "12345",
  };

  const tNavRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tNavRef.current &&
        event.target &&
        !tNavRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navButtons = [
    {
      label: "Lista de salas",
      hoverProps: "hover:bg-buttons-list-blue",
      to: "/professor",
    },
    {
      label: "Crear sala",
      hoverProps: "hover:bg-unicoop-green",
      to: "/createroom",
    },
  ];

  const buttonStyle =
    "text-unicoop-white bg-primary w-40 h-10 rounded transition-colors duration-200 ease-in flex justify-center items-center z-50";

  return (
    <nav className="flex justify-between items-center p-4 bg-primary w-full z-50">
      <h1 className="bg-primary font-semibold text-2xl text-unicoop-white my-auto">
        {user.usuName}
      </h1>
      <div className="flex gap-3 bg-primary font-semibold">
        <MdMenu
          className="text-3xl bg-primary text-unicoop-white md:hidden cursor-pointer hover:text-unicoop-yellow"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
      <section className="gap-3 bg-primary font-semibold hidden md:flex">
        {navButtons.map((data, i) => (
          <Link
            to={data.to}
            key={i}
            className={`${buttonStyle} ${data.hoverProps}`}
          >
            {data.label}
          </Link>
        ))}
        <AccountDropdown
          onActualizarDatos={() => navigate("/resetpasswordteacher")}
          onCerrarSesion={singout}
        />
      </section>

      {/*Menu lateral*/}
      <div
        className={`fixed w-full h-screen md:hidden bg-primary/50 backdrop-blur-sm top-0 right-0 transition-transform duration-150 ${
          isMenuOpen ? "-translate-x-0" : "translate-x-full"
        } z-20`}
      >
        <section
          className="text-unicoop-white bg-primary flex-col absolute right-0 top-0 h-screen p-8 gap-4 z-50 flex font-semibold w-56 items-center"
          ref={tNavRef}
        >
          <GrFormClose
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl bg-primary cursor-pointer hover:animate-spin-once hover:text-buttons-closing-red"
          />
          <AccountDropdown onCerrarSesion={singout} />
          {navButtons.map((data, i) => (
            <Link
              to={data.to}
              key={i}
              className={`${buttonStyle} ${data.hoverProps}`}
            >
              {data.label}
            </Link>
          ))}
        </section>
      </div>
      {/*Hasta aquí el menú lateral*/}
    </nav>
  );
};

export default TeacherNavbarTW;
