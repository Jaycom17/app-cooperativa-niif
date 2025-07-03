import Room from "../components/Room";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import InfoBubble from "../../components/InfoBubble";
import { IoIosArrowDown } from "react-icons/io";

import type { RoomModel } from "../models/Room";

const MainProfessorPage = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [isDateAscending, setIsDateAscending] = useState(false);
  const [isNameAscending, setIsNameAscending] = useState(false);

  const dateInfo = "La fecha se encuentra en formato: - Día / Mes / Año";

  const getRooms = () => {
    // Simulate an API call to get rooms
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          status: 201,
          data: [
            {
              roomID: "1",
              roomName: "Sala A",
              roomPassword: "1234",
              roomDate: "2023-10-01",
              roomStatus: "open",
            },
            {
              roomID: "2",
              roomName: "Sala B",
              roomPassword: "5678",
              roomDate: "2023-10-02",
              roomStatus: "closed",
            },
            // Add more rooms as needed
          ],
        });
      }, 1000);
    });
  };

  useEffect(() => {
    getRooms()
      .then((response) => {
        const res = response as { status: number; data: any[] };
        if (res.status === 201) {
          const sortedRooms = res.data.sort((a, b) =>
            a.roomName.localeCompare(b.roomName)
          );
          setRooms(sortedRooms);
        }
      })
      .catch(() => {
        alert("Error al cargar las salas");
      });
  }, []);

  const refreshRooms = () => {
    getRooms()
      .then((response) => {
        const res = response as { status: number; data: any[] };
        if (res.status === 201) {
          setRooms(res.data);
        }
      })
      .catch(() => {
        alert("Error al cargar las salas");
      });
  };

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
    <>
      <Navbar />
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
            <Room key={room.roomId} room={room} usuId={"someUsuId"} onRefresh={refreshRooms}/>
          ))}
        </section>
      </main>
    </>
  );
};

export default MainProfessorPage;
