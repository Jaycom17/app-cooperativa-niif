import { useState, useEffect, useRef } from "react";

import StudentLayout from "@/components/templates/StudentLayout";
import { ResumenESFService } from "@/forms/services/resumenESF.service";
import { FormRender } from "@/forms/components/FormRender";

import { ResumenESFInput } from "@/forms/models/ResumenEsfJson";

import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";
import Loading from "@/forms/components/atoms/Loading";

import { useStatusStore } from "@/stores/StatusStore";
import PopUpMessage from "@/components/molecules/PopUpMessage";

function ResumenESFForm() {
  const [data, setData] = useState(ResumenESFInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setStatus, message, show, title, type } = useStatusStore();

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
        .catch((error) => {
          setSaveStatus("idle");
          setStatus({ show: true, message: error.response?.data?.message || "Error al guardar el formulario", title: "Error", type: "error" });
        });
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <StudentLayout>
      <main className="w-full pt-7 md:p-8 max-h-screen overflow-auto">
        {show && (
        <PopUpMessage
          message={message}
          title={title}
          onClose={() =>
            setStatus({ show: false, message: "", title: "", type: "info" })
          }
          type={type}
        />
      )}
        
        <Loading saveStatus={saveStatus} />
        
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
