import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import type { RoomModel } from "../models/Room";

interface RoomFormProps {
    roomId?: string;
    usuId: string;
    onRefresh: () => void;
    setOpen: (open: boolean) => void;
}

const RoomForm = ({roomId, usuId , onRefresh, setOpen}: RoomFormProps)=>{
    const [isUpdate, setIsUpdate] = useState(false);

    const navigate = useNavigate();

    const createRoom = (roomData: Omit<RoomModel, "roomId">) => {
        // Simulate an API call to create a room
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve({ status: 201, data: { ...roomData, roomID: "newRoomId" } });
            }, 1000);
        });
    };

    const updateRoom = (roomData: Omit<RoomModel, "roomId" | "roomDate" | "roomStatus" | "usuId">, roomId: string) => {
        // Simulate an API call to update a room
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve({ status: 201, data: { ...roomData, roomID: roomId } });
            }, 1000);
        });
    };

    const getRoom = (roomId: string) => {
        // Simulate an API call to get room details
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve({
                    status: 201,
                    data: {
                        roomID: roomId,
                        roomName: "Sample Room",
                        roomPassword: "12345",
                        roomDate: "2023-10-01",
                        roomStatus: "closed",
                    },
                });
            }, 1000);
        });
    };

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<Omit<RoomModel, "roomId">>();


    useEffect(() => {
      if (roomId) {
        getRoom(roomId).then((response) => {
          const res = response as { status: number; data: any };
          if (res.status === 201) {
            const roomData = res.data;
            setValue('roomName', roomData.roomName);
            setValue('roomPassword', roomData.roomPassword);
            setIsUpdate(true);
          }
        }).catch(() => {
          alert("Error al cargar la información de la sala");
        });
      } else { setIsUpdate(false); }
    }, [roomId, setValue]);

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleUpdate = (data: Omit<RoomModel, "roomId">) =>{
        const roomData = { roomName: data.roomName, roomPassword: data.roomPassword };
    
        updateRoom(roomData, roomId!).then((response) => {
          const res = response as { status: number; data: any };
          if(res.status === 201){
            alert("Se ha actualizado la sala");
            onRefresh();
            setOpen(false)
          }else{
            alert("Error al actualizar la sala");
          }
        }).catch(() => {
          alert("Error al actualizar la sala");
        }) 
    }

    //Falta lo del usuID y verificar bien la función del getDate
    const handleCreate = (data: Omit<RoomModel, "roomId" | "roomDate" | "roomStatus">) =>{
        const roomData ={
            roomName: data.roomName, 
            roomPassword: data.roomPassword,
            roomDate: getCurrentDate(),
            roomStatus: 'closed' as 'closed',
            usuId: usuId,
        };
        createRoom(roomData).then((response) => {
            const res = response as { status: number; data: any };
            if(res.status === 201){
              alert("Se ha creado la sala");
              navigate("/professor");
            }else{
              alert("Error al crear la sala");
            }
          }).catch(() => {
            alert("Error al crear la sala");
          }) 
    }

    const handleRoomSubmit = (data: Omit<RoomModel, "roomId">) =>{
        if (isUpdate) { handleUpdate(data); }
        else { handleCreate(data); }
    };

    return(
        <form onSubmit={handleSubmit(handleRoomSubmit)} className="bg-unicoop-black p-4 rounded-md flex flex-col items-center">
            {isUpdate ? (
                <article className="flex flex-col items-center">
                    <MdCreate className="text-5xl font-semibold text-center"/>
                    <h1 className="text-2xl font-semibold text-center">Actualizar datos de la sala</h1>
                    <p className="text-center">A continuación, puede actualizar el nombre o el código de la sala.</p>  
                </article>
            ): <MdAddHome className="text-unicoop text-4xl"/>}
            
            <section className="flex flex-col md:flex-row gap-3 w-11/12 mt-3">
                <div className="w-full flex flex-col items-center">
                <input
                    type="text"
                    className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
                    placeholder="Nombre"
                    {...register("roomName", { required: true })}
                />
                {errors.roomName && (
                    <p className="text-red-500 text-sm font-semibold">
                      El nombre de la sala no puede quedar vacío
                    </p>
                )}
                </div>
                <div className="w-full flex flex-col items-center">
                <input
                    type="text"
                    className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
                    placeholder="Código"
                    {...register("roomPassword", { required: true })}
                />
                {errors.roomPassword && (
                    <p className="text-red-500 text-sm font-semibold">
                    El código de la sala no puede quedar vacío
                    </p>
                )}
                </div>
            </section>
            <button type="submit" className="flex items-center p-1.5 mt-4 gap-1 bg-buttons-update-green hover:bg-buttons-update-green-h text-unicoop duration-150 rounded" >
                <FaCheckCircle className='bg-transparent'/> Confirmar
            </button>
        </form>
    );
};

export default RoomForm;