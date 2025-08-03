import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { Form110Service } from "../services/form110.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import { config } from "../utils/form110";

import { Form110Input } from "../models/Form110Json";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

const Form110 = () => {
  const [data, setData] = useState(Form110Input);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    Form110Service.getForm110ForStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(Form110Input, response.data.r110Content);
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
      Form110Service.updateForm110ForStudent(newData)
        .then(() => setSaveStatus("saved"))
        .catch(() => setSaveStatus("idle"));
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <StudentLayout>
      <main className="w-full pt-7 md:p-8 max-h-screen overflow-auto">
        <div className="mb-2 text-right text-sm text-gray-600 flex justify-end items-center gap-2 pr-3 md:pr-0">
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
        <FormRender
          value={data}
          onChange={handleChange}
          canEdit={true}
          defaultOpen={false}
          config={config}
        />
      </main>
    </StudentLayout>
  );
};

export default Form110;
