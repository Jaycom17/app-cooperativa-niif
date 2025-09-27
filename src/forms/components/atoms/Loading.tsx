import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";

interface LoadingProps {
  saveStatus: "idle" | "saving" | "saved";
}

function Loading({ saveStatus }: LoadingProps) {
  return (
    <div className="text-sm text-gray-950 font-semibold flex justify-end items-center gap-2 pr-3 md:pr-0 absolute top-0 right-0 mt-3 mr-3 md:mr-10">
      {saveStatus === "saving" && (
        <>
          <FiLoader className="animate-spin" />
          <span>Guardando y calculando totales...</span>
        </>
      )}
      {saveStatus === "saved" && (
        <>
          <FiCheckCircle />
          <span>Guardado y totales calculados</span>
        </>
      )}
      {saveStatus === "idle" && (
        <>
          <FiEdit3 />
          <span>Cambios no guardados</span>
        </>
      )}
    </div>
  );
}

export default Loading;
