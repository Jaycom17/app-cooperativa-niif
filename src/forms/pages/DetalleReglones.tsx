import { useState, useEffect, useRef } from "react";

import StudentLayout from "@/components/templates/StudentLayout";
import { DetalleReglonesService } from "@/forms/services/detalleReglones.service";
import { FormRender } from "@/forms/components/FormRender";
import {
  config,
  calculateTotalSaldos,
  calculateSaldosFiscalesParciales,
  calculateNonTotalData,
  calculateTotalData,
} from "@/forms/utils/DetalleReng";
import Loading from "@/forms/components/atoms/Loading";
import { DetalleRenglonesInput } from "@/forms/models/DetalleRenglonesJson";
import { mergeDeepPreservingOrder } from "@/forms/utils/mergeDeep";

import { useStatusStore } from "@/stores/StatusStore";
import PopUpMessage from "@/components/molecules/PopUpMessage";

const DetalleRenglones = () => {
  const [data, setData] = useState(DetalleRenglonesInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setStatus, message, show, title, type } = useStatusStore();

  useEffect(() => {
    DetalleReglonesService.getDetalleReglonesFormStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(
          DetalleRenglonesInput,
          response.data.detContent
        );

        calculateSaldosFiscalesParciales(merged?.Renglon42?.["1779PropiedadesDeInversionTerrenos"]?.ValorDelCosto);
        
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {
    const arrayPath = changedPath?.split(".");


    if (arrayPath) {
      const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

      calculateSaldosFiscalesParciales(element);

      calculateTotalSaldos(newData, arrayPath[0]);
      calculateNonTotalData(newData);
    }

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculateTotalData(newData);
      DetalleReglonesService.updateADetalleReglonesFormStudent(newData)
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
export default DetalleRenglones;
