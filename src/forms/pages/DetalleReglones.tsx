import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { DetalleReglonesService } from "../services/detalleReglones.service";
import { FormRender } from "../components/FormRender";
import {
  config,
  calculateTotalSaldos,
  calculateSaldosFiscalesParciales,
  calculateNonTotalData,
  calculateTotalData,
} from "../utils/DetalleReng";

import Loading from "../components/atoms/Loading";

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
