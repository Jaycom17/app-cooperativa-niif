import Room from "../components/organisms/Room";
import { useState, useEffect } from "react";
import InfoBubble from "../../components/atoms/InfoBubble";
import { IoIosArrowDown } from "react-icons/io";
import { RoomService } from "../services/room.service";
import ProfessorLayout from "../components/templates/ProfessorLayout";

import type { RoomModel } from "../models/Room";

const MainProfessorPage = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [isDateAscending, setIsDateAscending] = useState(false);
  const [isNameAscending, setIsNameAscending] = useState(false);

  const dateInfo = "La fecha se encuentra en formato: - Día / Mes / Año";

  const getRooms = () => {
    RoomService.findAll()
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch(() => {
        alert("Error al cargar las salas");
      });
  };

  useEffect(() => {
    getRooms();
  }, []);  

  const orderByDate = () => {
    const sortedRooms = [...rooms].sort((a, b) =>
      isDateAscending
        ? new Date(a.roomDate).getTime() - new Date(b.roomDate).getTime()
        : new Date(b.roomDate).getTime() - new Date(a.roomDate).getTime()
    );
    setRooms(sortedRooms);
    setIsDateAscending(!isDateAscending);
  };

  const orderByName = () => {
    const sortedRooms = [...rooms].sort((a, b) =>
      isNameAscending
        ? a.roomName.localeCompare(b.roomName)
        : b.roomName.localeCompare(a.roomName)
    );
    setRooms(sortedRooms);
    setIsNameAscending(!isNameAscending);
  };

  return (
    <ProfessorLayout>
      <main className="flex flex-col items-center min-h-screen bg-background">
        {/**Aquí, en esta sección la idea sería poner los filtros (Barra de busqueda, ordenar por?) */}
        <section className="flex justify-between items-center w-11/12 mt-5">
          <InfoBubble info={dateInfo} />
          <div className="flex gap-4 text-background text-xs md:text-base">
            <button
              className="bg-unicoop p-1.5 rounded-md font-medium hover:bg-slate-200 duration-150 flex items-center"
              onClick={orderByDate}
            >
              Ordenar por fecha
              <IoIosArrowDown
                className={`ml-1 md:text-lg transition-transform duration-300 ${
                  isDateAscending ? "rotate-180" : ""
                }`}
              />
            </button>
            <button
              className="bg-unicoop p-1.5 rounded-md font-medium hover:bg-slate-200 duration-150 flex items-center"
              onClick={orderByName}
            >
              Ordenar por nombre
              <IoIosArrowDown
                className={`ml-1 md:text-lg transition-transform duration-300 ${
                  isNameAscending ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </section>
        <section className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-5 mx-auto justify-items-center">
          {/* TODO: Verificar lo del usuId */}
          {rooms.map((room) => (
            <Room key={room.roomID} room={room} usuId={"someUsuId"} onRefresh={getRooms}/>
          ))}
        </section>
      </main>
    </ProfessorLayout>
  );
};

export default MainProfessorPage;
