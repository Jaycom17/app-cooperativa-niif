import { useEffect, useState } from "react";
import { RoomService } from "../services/room.service";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RoomSchema, type RoomFormSchema } from "../models/Room";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RoomModel } from "../models/Room";

interface UseRoomFormOptions {
  room?: RoomModel;
  usuID: string;
  onRefresh?: () => void;
  closeModal?: () => void;
}

export function useRoomForm({
  room,
  usuID,
  onRefresh,
  closeModal,
}: UseRoomFormOptions) {
  const navigate = useNavigate();
  const isUpdate = Boolean(room);
  const [roomErrors, setRoomErrors] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormSchema>({
    resolver: zodResolver(RoomSchema),
    defaultValues: { roomName: "", roomPassword: "" },
  });

  useEffect(() => {
    if (!room) return;

    setValue("roomName", room.roomName);
    setValue("roomPassword", room.roomPassword);

  }, [room, setValue]);

  const onSubmit = async (values: RoomFormSchema) => {
    try {
      if (isUpdate) {
        await RoomService.update(room?.roomID!, {
          roomName: values.roomName,
          roomPassword: values.roomPassword,
        });
        alert("Sala actualizada");
        onRefresh?.();
        closeModal?.();
      } else {
        await RoomService.create({
          ...values,
          usuID,
        });
        alert("Sala creada");
        navigate("/professor");
      }
    } catch (error: any) {
      setRoomErrors(error.response.data.error.message || "Error al crear o actualizar la sala");
      setTimeout(() => {
        setRoomErrors("");
      }, 5000);
    }
  };

  return {
    register,
    errors,
    isUpdate,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
    roomErrors,
  };
}
