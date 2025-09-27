import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineQrcode } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import FloatingContainer from "../../../components/atoms/FloatingContainer";
import RoomForm from "./RoomForm";
import cutString from "../../../utils/CropName";
import { Link } from "react-router-dom";
import type { RoomModel } from "../../models/Room";
import { RoomService } from "../../services/room.service";
import { formatDate } from "../../../utils/Dates";

import { QRCodeSVG } from "qrcode.react";
import { PAGE_URL } from "../../../config/env";

import CopyBox from "../../../components/atoms/CopyBox";

interface RoomProps {
  room: RoomModel;
  usuId: string;
  onRefresh: () => void;
}

const Room = ({ room, usuId, onRefresh }: RoomProps) => {
  const [activated, setActivated] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    setActivated(room.roomStatus.toLowerCase() === "open");
  }, [room.roomStatus]);

  const toggleActivated = () => {
    const roomState = !activated ? "open" : "closed";
    try {
      RoomService.updateRoomState({ roomState }, room.roomID);
      setActivated(!activated);
    } catch (error) {
      console.error("Error al actualizar el estado de la sala:", error);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar la sala ${room.roomName}?`
    );
    if (confirmDelete) {
      RoomService.delete(room.roomID)
        .then(() => {
          alert("Se ha eliminado la sala correctamente");
          onRefresh();
        })
        .catch(() => {
          alert("Error al eliminar la sala");
        });
    }
  };

  return (
    <section className="flex flex-col items-center w-11/12 sm:1/3 lg:w-[375px] bg-primary rounded-lg text-unicoop">
      <div className="w-full text-center mt-2">
        <h1 className="text-2xl font-bold mx-1" title={room.roomName}>
          {cutString(room.roomName, 20)}
        </h1>
        <div className="flex flex-row items-center justify-center gap-2">
          <CopyBox text={room.roomPassword} />
          <button
            onClick={() => setQrOpen(true)}
            className="group flex items-center p-2 rounded-full bg-transparent hover:bg-buttons-login transition-colors"
          >
            <AiOutlineQrcode
              size={22}
              className="text-gray-600 transition-colors duration-300 group-hover:text-white"
            />
          </button>
        </div>
        {qrOpen && (
          <FloatingContainer open={qrOpen} setOpen={setQrOpen}>
            <div className="flex flex-col items-center gap-4 bg-unicoop-black p-5">
              <h2 className="text-bold text-2xl">Escanea el QR</h2>
              <QRCodeSVG value={`${PAGE_URL}/?code=${room.roomPassword}`}  size={200} />
            </div>
          </FloatingContainer>
        )}
        <h2>
          <span className="font-medium">Fecha de creación:</span>{" "}
          {formatDate(room.roomDate)}
        </h2>
      </div>
      <div className="flex flex-row my-1">
        <h1 className="font-medium mr-2">Estado:</h1>
        <span className={`mr-1 w-14 text-center`}>
          {activated ? "Activa" : "Inactiva"}
        </span>
        <label className="flex items-center cursor-pointer">
          {/* Input oculto para manejar el estado */}
          <input
            type="checkbox"
            className="hidden"
            checked={activated}
            onChange={toggleActivated}
          />
          {/* El interruptor deslizante */}
          <div
            className={`toggle-wrapper relative w-10 h-6 mt-0.5 rounded-full transition-colors duration-150 ${
              activated ? "bg-[green]/40" : "bg-[red]/40"
            } `}
          >
            <div
              className={`toggle absolute left-1 top-1 w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${
                activated ? "translate-x-full bg-[green]" : "bg-[red]"
              }`}
            ></div>
          </div>
        </label>
      </div>
      <div className="flex gap-3 mt-2 mb-3">
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center p-1.5 bg-buttons-update-green hover:bg-buttons-update-green-h duration-150 rounded"
        >
          <FaPencilAlt className="bg-transparent mr-1" /> Actualizar
        </button>
        <Link
          to={`/roomreport/${room.roomID}`}
          className="flex items-center p-1.5 bg-buttons-login hover:bg-[#696969] duration-150 rounded"
        >
          <FaEye className="bg-transparent mr-1" /> Revisar
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center p-1.5 bg-buttons-delete-red hover:bg-buttons-delete-red-h duration-150 rounded"
        >
          <FaRegTrashAlt className="bg-transparent mr-1" /> Eliminar
        </button>
      </div>

      {formOpen && (
        <FloatingContainer open={formOpen} setOpen={setFormOpen}>
          <RoomForm
            room={room}
            usuId={usuId}
            onRefresh={onRefresh}
            setOpen={setFormOpen}
          />
        </FloatingContainer>
      )}
    </section>
  );
};

export default Room;
