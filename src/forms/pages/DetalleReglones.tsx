import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { DetalleReglonesService } from "../services/detalleReglones.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import { config } from "../utils/DetalleReng";

import { DetalleRenglonesInput } from "../models/DetalleRenglonesJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";

const DetalleRenglones = () => {
  const [data, setData] = useState(DetalleRenglonesInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    DetalleReglonesService.getDetalleReglonesFormStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(
          DetalleRenglonesInput,
          response.data.detContent
        );
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const calculateSaldosFiscalesParciales = (data: any) => {

    if(data?.SaldosFiscalesADiciembre31Parciales == null) {
      return;
    }

    data.SaldosFiscalesADiciembre31Parciales =
      (data?.SaldosContablesADiciembre31Parciales || 0) +
      (data?.AjustesParaLlegarASaldosFiscales1 || 0) -
      (data?.AjustesParaLlegarASaldosFiscales3 || 0);
  };

  const handleChange = (newData: any, changedPath?: string) => {
    const arrayPath = changedPath!.split(".");

    const element = arrayPath.reduce((acc, key) => acc?.[key], newData);

    calculateSaldosFiscalesParciales(element);

    console.log(changedPath);

    setData(newData);
    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      DetalleReglonesService.updateADetalleReglonesFormStudent(newData)
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
export default DetalleRenglones;
