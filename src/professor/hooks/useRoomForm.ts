import { useEffect } from "react";
import { RoomService } from "../services/room.service";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RoomSchema, type RoomFormSchema } from "../models/Room";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RoomModel } from "../models/Room";

interface UseRoomFormOptions {
  room?: RoomModel;
  usuId: string;
  onRefresh?: () => void;
  closeModal?: () => void;
}

export function useRoomForm({
  room,
  usuId,
  onRefresh,
  closeModal,
}: UseRoomFormOptions) {
  const navigate = useNavigate();
  const isUpdate = Boolean(room);

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
        await RoomService.update(room?.roomId!, {
          roomName: values.roomName,
          roomPassword: values.roomPassword,
        });
        alert("Sala actualizada");
        onRefresh?.();
        closeModal?.();
      } else {
        await RoomService.create({
          ...values,
          usuId,
        });
        alert("Sala creada");
        navigate("/professor");
      }
    } catch {
      alert("Algo salió mal, intenta de nuevo");
    }
  };

  return {
    register,
    errors,
    isUpdate,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
  };
}
