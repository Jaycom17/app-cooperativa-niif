import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GrSubtractCircle, GrAddCircle  } from "react-icons/gr";

/**
 * Componente `Acordeon`.
 * 
 * Este componente renderiza un desplegable que permite mostrar algunos contenidos textuales de interés, escondiéndolos cuando no se encuentre activo.
 *
 * @component
 * @param {Object} props Las propiedades del componente.
 * @param {string} props.title El título del acordeón.
 * @param {React.ReactNode} props.children Contenido del acordeón.
 * @param {string} props.arrayIndex Índice del acordeón en un arreglo.
 * @param {Function} props.onAdd Función para agregar un elemento.
 * @param {Function} props.onQuit Función para quitar un elemento.
 * @param {string} props.path Ruta del elemento.
 * @returns {JSX.Element} Elemento JSX que representa el acordeón.
 */

interface AccordeonProps {
    title: string;
    children: React.ReactNode;
    arrayIndex?: string;
    onAdd?: (path: string) => void;
    onQuit?: (path: string) => void;
    path?: string;
}

const Accordeon = ({title, children, arrayIndex, onAdd, onQuit, path}: AccordeonProps) =>{
    const [open, setOpen] = useState(false);
    
    /**
     * Maneja el estado de apertura del acordeón.
     * Alterna entre abierto y cerrado.
     */
    const handleOpen = () => {
        setOpen(!open);
    };

    return(
        <article className={`${open ? "mb-2": "mb-1"}`}>
            {arrayIndex === '0' && (
                <div className="flex gap-4 justify-center my-3 text-unicoop">
                    <button className="flex flex-row items-center justify-center gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h p-2 rounded-3xl w-24 duration-150" onClick={()=>onAdd!(path!)}><GrAddCircle/> Más</button>
                    <button className="flex flex-row items-center justify-center gap-1 bg-buttons-delete-red hover:bg-buttons-delete-red-h p-2 rounded-3xl duration-150" onClick={()=>onQuit!(path!)}><GrSubtractCircle /> Menos</button>
                </div>
            )}
            <button className={`flex justify-between  items-center text-lg w-full hover:bg-gray-400 duration-150 p-3 border-b-2 ${open ? "font-semibold bg-gray-400": "text-black bg-gray-300"}`} onClick={handleOpen} aria-expanded={open} aria-controls="accordion-contenido">
                <h2>{title}</h2>
                <IoIosArrowDown className={`md:text-lg transition-all duration-300 ${open ? 'rotate-180':''}`}/>
            </button>
            <div className={`ml-3 overflow-hidden ${open ? 'max-h-full' : 'max-h-0'}`}>
                <div className={`${Array.isArray(children) && React.Children.toArray(children)[0] && (React.Children.toArray(children)[0] as React.ReactElement).type === "div" ? "grid grid-cols-3 gap-2  p-2" : ""}`}>
                    {children}
                </div>
            </div>
        </article>
    );
}

export default Accordeon;
