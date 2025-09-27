import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { CaratulaService } from "../services/caratula.service";
import { FormRender } from "../components/FormRender";

import { CaratulaInput } from "../models/CaratulaJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";
import { config } from "../utils/caratula";
import Loading from "../components/atoms/Loading";

function CaratulaForm() {
  const [data, setData] = useState(CaratulaInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    CaratulaService.getCaratulaForStudent()
      .then((response) => {
        const merged = mergeDeepPreservingOrder(
          CaratulaInput,
          response.data.carContent
        );
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
      CaratulaService.updateCaratulaForStudent(newData)
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
}

export default CaratulaForm;
