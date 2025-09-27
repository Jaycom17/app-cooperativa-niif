import StudentLayout from "../../components/templates/StudentLayout";
import { useState, useEffect, useRef } from "react";
import { ResumenESFService } from "../services/resumenESF.service";
import { FormRender } from "../components/FormRender";

import { ResumenESFInput } from "../models/ResumenEsfJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";
import Loading from "../components/atoms/Loading";

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
