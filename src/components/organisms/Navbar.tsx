import { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import AccountDropdown from "../molecules/AccountDropdown";
import { useNavigate } from "react-router-dom";
import { AsideMenu } from "../molecules/AsideMenu";
import type { NavButton } from "../types/componentsTypes";

interface NavbarProps {
  navButtons: NavButton[];
  title: string;
  navigateToUpdateInfo: string;
}

const Navbar = ({ navButtons, title, navigateToUpdateInfo }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  //TODO: viene del estado global, pero se puede mejorar
  const singout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navRef = useRef<HTMLDivElement>(null);

  // Función para cerrar el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        event.target &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-primary">
      <h1 className="bg-primary font-semibold text-2xl text-unicoop-white my-auto">
        {title}
      </h1>
      <div className="flex gap-3 bg-primary font-semibold">
        <MdMenu
          className="text-3xl bg-primary text-unicoop-white md:hidden cursor-pointer hover:text-unicoop-yellow"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
      <section className="gap-3 bg-primary font-semibold hidden md:flex">
        {navButtons.map((data: NavButton, i: number) => (
          <Link
            to={data.to}
            key={i}
            className={`text-unicoop-white bg-primary w-40 h-10 rounded transition-colors duration-200 ease-in flex justify-center items-center z-50 ${data.hoverProps}`}
          >
            {data.label}
          </Link>
        ))}
        <AccountDropdown
          onCerrarSesion={singout}
          onActualizarDatos={() => navigate(navigateToUpdateInfo)}
        />
      </section>

      <AsideMenu
        isMenuOpen={isMenuOpen}
        navRef={navRef}
        setIsMenuOpen={setIsMenuOpen}
        navButtons={navButtons}
        singout={singout}
      />
    </nav>
  );
};

export default Navbar;
