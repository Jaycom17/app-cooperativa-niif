import RoomForm from "../components/organisms/RoomForm";
import InfoBubble from "../../components/atoms/InfoBubble";
import ProfessorLayout from "../components/templates/ProfessorLayout";

const CreateRoomPage = () => {
  const user = {
    usuName: "Profesor",
    usuID: "12345",
  };
  const infoStatus =
    "La sala se crea con estado inactivo por defecto. Recuerda activarla :)";

  return (
    <ProfessorLayout>
      <main className="w-full min-h-screen bg-background flex justify-center items-center flex-col">
        <article className="px-5 md:px-32 lg:px-60 xl:px-80 mb-5 text-center text-unicoop">
          <h1 className="font-bold text-4xl mb-3">CREAR SALA</h1>
          <h2 className="font-semibold text-xl mb-5">
            Ingresa los siguientes datos para crear la sala
          </h2>
          <div className="flex items-center gap-2">
            <InfoBubble info={infoStatus} />
            <p className="text-center text-lg">
              {" "}
              A continuación, puede crear una sala. Una vez creada y activada,
              los estudiantes podrán ingresar y trabajar en la misma.
            </p>
          </div>
        </article>
        <section className="w-10/12 md:w-4/5 lg:w-3/5">
          <RoomForm usuId={user.usuID} />
        </section>
      </main>
    </ProfessorLayout>
  );
};

export default CreateRoomPage;
