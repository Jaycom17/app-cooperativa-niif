import { useState, useEffect, useRef } from "react";

import StudentLayout from "@/components/templates/StudentLayout";
import { Form110Service } from "@/forms/services/form110.service";
import { FormRender } from "@/forms/components/FormRender";
import { config } from "@/forms/utils/form110";
import { Form110Input } from "@/forms/models/Form110Json";
import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";
import Loading from "@/forms/components/atoms/Loading";

import { useStatusStore } from "@/stores/StatusStore";
import PopUpMessage from "@/components/molecules/PopUpMessage";

const Form110 = () => {
  const [data, setData] = useState(Form110Input);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setStatus, message, show, title, type } = useStatusStore();

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
          canEdit={true}
          config={config}
          defaultOpen={false}
        />
        </div>
      </main>
    </StudentLayout>
  );
};

export default Form110;
