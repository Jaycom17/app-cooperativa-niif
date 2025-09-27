import StudentLayout from "../../components/templates/StudentLayout";
import { ImpuestoDiferidoService } from "../services/impuestoDiferido.service";
import { useState, useEffect, useRef } from "react";
import { FormRender } from "../components/FormRender";
import {
  config,
  calculateAll,
  calculateFirstValues
} from "../utils/impuestoDiferido";

import { ImpuestoDiferidoInput } from "../models/ImpuestoDiferidoJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";
import Loading from "../components/atoms/Loading";

function ImpuestoDiferidoForm() {
  const [data, setData] = useState(ImpuestoDiferidoInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ImpuestoDiferidoService.getImpuestoDiferidoForStudent()
      .then((res) => {
        const merged = mergeDeepPreservingOrder(
          ImpuestoDiferidoInput,
          res.data.impContent
        );
        calculateFirstValues(merged, merged);

        ImpuestoDiferidoService.updateImpuestoDiferidoForStudent(merged);

        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {

    calculateAll(changedPath!, newData);

    setData(newData);

    setSaveStatus("saving");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      ImpuestoDiferidoService.updateImpuestoDiferidoForStudent(newData)
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

export default ImpuestoDiferidoForm;
