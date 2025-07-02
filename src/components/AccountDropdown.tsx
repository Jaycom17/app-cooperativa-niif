import { useState, useEffect, useRef } from "react";
import { VscAccount } from "react-icons/vsc";

/**
 * Componente desplegable de cuenta.
 * 
 * Este componente muestra un botón de cuenta que despliega opciones al hacer clic en él.
 *
 * @component
 * @param {Object} props Las propiedades del componente.
 * @param {Function} props.onActualizarDatos Función que se llama al hacer clic en "Cambiar contraseña".
 * @param {Function} props.onCerrarSesion Función que se llama al hacer clic en "Cerrar sesión".
 * @returns {JSX.Element} Elemento JSX que representa el desplegable de cuenta.
 */


interface AccountDropdownProps {
    onActualizarDatos?: () => void;
    onCerrarSesion?: () => void;
}

const AccountDropdown = ({onActualizarDatos, onCerrarSesion}: AccountDropdownProps)=>{
    const [isAccountOptOpen, setIsAccountOptOpen] = useState(false);
    const dropdownRef = useRef(null);

    /**
     * Maneja la apertura y cierre del menú de opciones de cuenta.
     */
    const handleAccOpt = () =>{
        setIsAccountOptOpen(!isAccountOptOpen);
    }
    
    /**
    * Cierra el menú de opciones de cuenta cuando se hace clic fuera de él.
    */
    useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsAccountOptOpen(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const accountButtons = [
            {
                label: "Cambiar contraseña",
                hoverProps: "hover:bg-unicoop-blue ",
                onClick: onActualizarDatos
            },
            {
                label: "Cerrar sesión",
                hoverProps: "hover:bg-buttons-closing-red",
                onClick: onCerrarSesion
            }
    ]

    const buttonStyle2 = "text-unicoop-black font-semibold bg-unicoop-white w-[100%] h-10 transition-colors duration-200 ease-in hover:text-unicoop-white"

    return(
        <div className="relative inline-block  mt-5 md:my-auto md:mx-0" ref={dropdownRef} style={{zIndex:100}}>
            <button
                className="text-3xl text-unicoop-white my-auto mx-auto md:mr-8 transition-colors duration-100 ease-in hover:text-buttons-list-blue cursor-pointer" onClick={handleAccOpt}
            >
            <VscAccount className=""/>
            </button>
            {isAccountOptOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-md z-40">
                {accountButtons.map((data, i) => (
                    <li key={i}><button className={`${buttonStyle2} ${data.hoverProps}`} onClick={data.onClick}>{data.label}</button></li>
                ))}
                </ul>
            )}
        </div>
    );
};

export default AccountDropdown;