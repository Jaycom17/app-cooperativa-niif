import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { RoomService } from "@/professor/services/room.service";
import { RoomSchema, type RoomFormSchema } from "@/professor/models/Room";
import type { RoomModel } from "@/professor/models/Room";

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
        if (!room) {
          setRoomErrors("No se encontró la sala para actualizar");
          return;
        }
        await RoomService.update(room.roomID, {
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
      setRoomErrors(
        error.response?.data?.error?.message ||
          "Error al crear o actualizar la sala"
      );
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
