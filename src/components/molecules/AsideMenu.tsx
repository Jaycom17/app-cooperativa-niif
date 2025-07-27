import { GrFormClose } from "react-icons/gr";
import AccountDropdown from "./AccountDropdown";
import { Link } from "react-router-dom";
import type { NavButton } from "../types/componentsTypes";

interface AsideMenuProps {
  isMenuOpen: boolean;
  navRef: React.RefObject<HTMLDivElement | null>;
  setIsMenuOpen: (open: boolean) => void;
  navButtons: NavButton[];
  handleSignout: () => void;
}

export function AsideMenu({
  isMenuOpen,
  navRef,
  setIsMenuOpen,
  navButtons,
  handleSignout,
}: AsideMenuProps) {
  return (
    <div
      className={`fixed w-full h-screen md:hidden bg-primary/50 backdrop-blur-sm top-0 right-0 transition-transform duration-150 ${
        isMenuOpen ? "-translate-x-0" : "translate-x-full"
      } z-20`}
    >
      <section
        className="text-unicoop-white bg-primary flex-col absolute right-0 top-0 h-screen p-8 gap-4 z-50 flex font-semibold w-56 items-center"
        ref={navRef}
      >
        <GrFormClose
          onClick={() => setIsMenuOpen(false)}
          className="text-3xl bg-primary cursor-pointer hover:animate-spin-once hover:text-buttons-closing-red"
        />
        <AccountDropdown onCerrarSesion={handleSignout} />
        {navButtons.map((data: NavButton, i: number) => (
          <Link
            to={data.to}
            key={i}
            className={`text-unicoop-white bg-primary w-40 h-10 rounded transition-colors duration-200 ease-in flex justify-center items-center z-50 ${data.hoverProps}`}
          >
            {data.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
