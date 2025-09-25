import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { DetalleReglonesService } from "../services/detalleReglones.service";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import {
  config,
  calculateTotalSaldos,
  calculateSaldosFiscalesParciales,
  calculateNonTotalData,
  calculateTotalData,
} from "../utils/DetalleReng";

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

        calculateSaldosFiscalesParciales(merged?.Renglon42?.["1779PropiedadesDeInversionTerrenos"]?.ValorDelCosto);

        
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {
    const arrayPath = changedPath?.split(".");

    console.log(arrayPath)

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
