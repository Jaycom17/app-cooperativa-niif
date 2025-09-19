import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { ResumenESFService } from "../services/resumenESF.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";

import { ResumenESFInput } from "../models/ResumenEsfJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

function ResumenESFForm() {
  const [data, setData] = useState(ResumenESFInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ResumenESFService.getResumenESFForStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(ResumenESFInput, response.data.resContent);
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any) => {
    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      ResumenESFService.updateResumenESFForStudent(newData)
        .then(() => setSaveStatus("saved"))
        .catch(() => setSaveStatus("idle"));
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <StudentLayout>
      <main className="w-full pt-7 md:p-8 max-h-screen overflow-auto">
        <div className="text-sm text-gray-600 flex justify-end items-center gap-2 pr-3 md:pr-0 absolute top-0 right-0 mt-3 mr-3 md:mr-10">
          {saveStatus === "saving" && (
            <>
              <FiLoader className="animate-spin" />
              <span>Guardando...</span>
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <FiCheckCircle />
              <span>Guardado</span>
            </>
          )}
          {saveStatus === "idle" && (
            <>
              <FiEdit3 />
              <span>Cambios no guardados</span>
            </>
          )}
        </div>
        <div className="min-w-[500px]">
          <FormRender
          value={data}
          onChange={handleChange}
          canEdit={false}
          defaultOpen={false}
        />
        </div>
      </main>
    </StudentLayout>
  );
}

export default ResumenESFForm;
