import { useState, useEffect } from "react";
import { IoCaretBackSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { OPTIONS } from "../utils/Options";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema, type StudentModel } from "../models/Student";
import InputForm from "../../components/atoms/InputForm";
import { useStudentStore } from "../../stores/StudentStore";
import { useRoomStore } from "../../stores/RoomStore";

function MiddlewareStudent() {
  const [firstTime, setFirstTime] = useState(OPTIONS.NOTHING);
  const [animationClass, setAnimationClass] = useState("");

  const { leaveRoom, currentRoom } = useRoomStore();
  const { student, checkStudent, sStudent, studentError } = useStudentStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentSchema),
  });

  useEffect(() => {
    if (!currentRoom) {
      navigate("/");
    }

    if (student) {
      navigate("/student");
    }
  }, [student]);

  const onSubmit = async (data: StudentModel) => {
    console.log(data)
    if (firstTime === OPTIONS.SI) {
      await checkStudent(data);
    } else if (firstTime === OPTIONS.NO) {
      await sStudent(data.stuCedula);
    }
  };

  const handleSetFirstTime = (option: string) => {
    if (option === OPTIONS.SI) {
      setAnimationClass("animate-slide-from-top");
    } else if (option === OPTIONS.NO) {
      setAnimationClass("animate-slide-from-bottom");
    } else {
      setAnimationClass("animate-fade-in");
    }
    setFirstTime(option);
  };

  return (
    <div className="bg-background w-full h-screen flex justify-center items-center flex-col text-white">
      {firstTime === OPTIONS.NOTHING && (
        <div className={`flex flex-col items-center ${animationClass}`}>
          <h2 className="font-semibold text-lg">
            ¿Es la primera vez que entras a la sala?
          </h2>
          <section className="flex gap-6 mt-3">
            <button
              onClick={() => handleSetFirstTime(OPTIONS.SI)}
              className="p-2 bg-green-400 w-16 text-black rounded-md hover:bg-green-300 duration-150 text-lg font-semibold"
            >
              SI
            </button>
            <button
              onClick={() => handleSetFirstTime(OPTIONS.NO)}
              className="p-2 bg-red-400 w-16 text-black rounded-md hover:bg-red-300 duration-150 text-lg font-semibold"
            >
              NO
            </button>
          </section>
          <button
            onClick={() => leaveRoom()}
            className="p-2 bg-unicoop-blue w-auto mt-5 text-black rounded-md hover:bg-buttons-list-blue duration-150 text-lg font-semibold"
          >
            Regresar al inicio
          </button>
        </div>
      )}

      {firstTime === OPTIONS.NO && (
        <div
          className={`flex w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 flex-col items-center p-3 ${animationClass}`}
        >
          <h2 className="font-semibold text-3xl text-center">
            Bienvenido a la sala
          </h2>
          <p className="text-center mt-3">A continuación, escribe tu cedula.</p>
          <form
            className="flex flex-col w-full sm:w-2xl items-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {studentError && (
              <p className="text-[red] text-sm bg-transparent">
                {studentError}
              </p>
            )}
            <InputForm
              type="number"
              register={register}
              errors={errors}
              placeholder="Cedula"
              inputName="stuCedula"
            />
            <button
              type="submit"
              className="p-2 bg-buttons-login w-24 text-unicoop rounded-md hover:bg-gray-600 duration-150 focus:ring-2 transition-colors ease-in font-medium"
            >
              Buscar
            </button>
          </form>

          <div className="w-full">
            <button
              onClick={() => handleSetFirstTime(OPTIONS.NOTHING)}
              className="flex items-center text-start bg-unicoop-blue w-20 py-1 rounded-lg text-unicoop hover:bg-buttons-list-blue font-semibold"
            >
              <IoCaretBackSharp className="text-sm mt-1 ml-2 mr-1" /> Atrás
            </button>
          </div>
        </div>
      )}

      {firstTime === OPTIONS.SI && (
        <div
          className={`flex w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 flex-col items-center p-3 ${animationClass}`}
        >
          <h2 className="font-semibold text-3xl text-center">
            Bienvenido a la sala
          </h2>
          <p className="text-center mt-3">
            A continuación escribe tu numero de cedula, con el cual deseas
            registrarte en la sala.
          </p>
          <form
            className="flex flex-col w-full sm:w-2xl items-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {studentError && (
              <p className="text-[red] text-sm bg-transparent">
                {studentError}
              </p>
            )}
            <InputForm
              type="number"
              register={register}
              errors={errors}
              placeholder="Cedula"
              inputName="stuCedula"
            />
            <button
              type="submit"
              className="p-2 bg-buttons-login w-24 text-unicoop rounded-md hover:bg-gray-600 duration-150 focus:ring-2 transition-colors ease-in font-medium"
            >
              Ingresar
            </button>
          </form>
          <div className="w-full">
            <button
              onClick={() => handleSetFirstTime(OPTIONS.NOTHING)}
              className="flex items-center text-start bg-unicoop-blue w-20 py-1 rounded-lg text-unicoop hover:bg-buttons-list-blue font-semibold"
            >
              <IoCaretBackSharp className="text-sm mt-1 ml-2 mr-1" /> Atrás
            </button>
          </div>
          <p className="mt-3 text-center">
            <span className="font-bold">Recomendación:</span> Anota este nombre
            para futuros ingresos a esta sala ;)
          </p>
        </div>
      )}
    </div>
  );
}

export default MiddlewareStudent;
