import { useState, useEffect, useRef } from "react";
import StudentLayout from "@/components/templates/StudentLayout";
import { EsfPatrimonioService } from "@/forms/services/esfPatrimonio.service";
import { FormRender } from "@/forms/components/FormRender";

import { ESFPatrimonioInput } from "@/forms/models/EsfPatrimonioJson";

import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";

import {
  config,
  calculateAll,
  calculatedValorFiscal,
  calculateFirstValorFiscal
} from "@/forms/utils/esfPatrimonio";
import Loading from "@/forms/components/atoms/Loading";

import { useStatusStore } from "@/stores/StatusStore";
import PopUpMessage from "@/components/molecules/PopUpMessage";

const ESFpatrimonio = () => {
  const [data, setData] = useState(ESFPatrimonioInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setStatus, message, show, title, type } = useStatusStore();

  useEffect(() => {
    EsfPatrimonioService.getEsfPatrimonioFormStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(
          ESFPatrimonioInput,
          response.data.esfContent
        );
        calculateFirstValorFiscal(merged, merged);

        calculateAll(merged, []);

        EsfPatrimonioService.updateAEsfPatrimonioFormStudent(merged);

        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {
    const arrayPath = changedPath!.split(".");

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculatedValorFiscal(element);

    calculateAll(newData, arrayPath);

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      EsfPatrimonioService.updateAEsfPatrimonioFormStudent(newData)
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

export default ESFpatrimonio;
