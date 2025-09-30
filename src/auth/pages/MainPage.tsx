import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import StudentLogForm from "@/auth/components/organisms/StudentLogForm";
import logo from "@/assets/LogoUniversidadCooperativa.png";
import type { Code } from "@/auth/models/Code";
import { useRoomStore } from "@/stores/RoomStore";

import { API_URL } from "@/config/env";

function MainPage() {
  const { checkRoom, roomError, currentRoom, initCheck } = useRoomStore();
  const hasNavigatedRef = useRef(false);

  const [searchParams] = useSearchParams();

  const [roomCode, setRoomCode] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = async (values: Code) => {
    await checkRoom(values);

    if (!currentRoom) {
      return;
    }

    navigate("/middlewarestudent");
  };

  useEffect(() => {
    initCheck();
    console.log(API_URL);
  }, [initCheck]);

  useEffect(() => {
    const roomCode = searchParams.get("code");
    if (roomCode) {
      setRoomCode(roomCode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentRoom && !hasNavigatedRef.current) {
      navigate("/middlewarestudent");
    }
  }, [currentRoom, navigate]);

  return (
    <main className="flex flex-col mx-auto items-center min-h-screen place-content-center bg-background">
      <img
        src={logo}
        alt="logo universidad cooperativa"
        className="w-11/12 md:w-96"
      />
      <section className="p-6 w-11/12 md:w-[400px] bg-unicoop-black rounded-lg">
        <StudentLogForm onSubmit={onSubmit} roomError={roomError} roomCode={roomCode!} />
      </section>
      <p className="text-unicoop mt-5 font-medium text-center">
        ¿No eres un estudiante?{" "}
        <Link
          className="text-unicoop-blue hover:text-buttons-list-blue "
          to="/login"
        >
          ¡Inicia sesión!
        </Link>
      </p>
    </main>
  );
}

export default MainPage;
