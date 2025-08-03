import StudentLayout from "../../components/templates/StudentLayout";
import { ImpuestoDiferidoService } from "../services/impuestoDiferido.service";
import { useState, useEffect, useRef } from "react";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import {
  config,
  calculateDiferenciaTemporariaAcivoDiferidoPrimeraFormaUno,
  calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaUno,
  calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaDos,
  calculateDiferenciaTemporariaAcivoDiferidoTerceraFormaDos,
} from "../utils/impuestoDiferido";

import { ImpuestoDiferidoInput } from "../models/ImpuestoDiferidoJson";

import { mergeDeepPreservingOrder } from "../utils/mergeDeep";


function ImpuestoDiferidoForm() {
  const [data, setData] = useState(ImpuestoDiferidoInput);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
  ImpuestoDiferidoService.getImpuestoDiferidoForStudent()
    .then((res) => {
      const merged = mergeDeepPreservingOrder(ImpuestoDiferidoInput, res.data.impContent);
      setData(merged);
    })
    .catch((error) => {
      console.error("Error en la llamada a la API", error);
    });
}, []);


  const handleChange = (newData: any, changedPath: any) => {

    if (
      changedPath ===
      "ImpuestosDiferidosProvenientesDeDiferenciasTemporarias.ActivoDiferidoDiferenciasTemporariasDeducibles"
    ) {
      const basePathDiferenciaTemporariaAcivoDiferido =
        newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias
          .ActivoDiferidoDiferenciasTemporariasDeducibles;

      for (const item of calculateDiferenciaTemporariaAcivoDiferidoPrimeraFormaUno) {
        const elemento = basePathDiferenciaTemporariaAcivoDiferido[item];
        if (
          elemento?.BaseFiscal !== undefined &&
          elemento?.BaseContable !== undefined
        ) {
          elemento.DiferenciaTemporaria =
            elemento.BaseFiscal - elemento.BaseContable;
        }
      }

      for (const item of calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaUno) {
        const elemento = basePathDiferenciaTemporariaAcivoDiferido[item];
        if (
          elemento?.BaseFiscal !== undefined &&
          elemento?.BaseContable !== undefined
        ) {
          elemento.DiferenciaTemporaria =
            elemento.BaseContable - elemento.BaseFiscal;
        }
      }

      for (const item of [
        ...calculateDiferenciaTemporariaAcivoDiferidoPrimeraFormaUno,
        ...calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaUno,
      ]) {
        const elemento = basePathDiferenciaTemporariaAcivoDiferido[item];
        if (elemento?.DiferenciaTemporaria !== undefined) {
          elemento.SaldoImpuestoDiferidoActual = Number(
            (elemento.DiferenciaTemporaria * 0.35).toFixed(3)
          );
        }

        if (
          elemento?.SaldoImpuestoDiferidoActual !== undefined &&
          elemento?.SaldoImpuestoDiferidoAnterior !== undefined
        ) {
          elemento.Variacion =
            elemento.SaldoImpuestoDiferidoAnterior -
            elemento.SaldoImpuestoDiferidoActual;
        }

        if (elemento?.SaldoImpuestoDiferidoActual !== undefined && elemento?.DiferenciaTemporaria !== undefined) {
          elemento.TasaFiscalAplicada = elemento.DiferenciaTemporaria > 0
            ? elemento.SaldoImpuestoDiferidoActual / elemento.DiferenciaTemporaria * 100
            : 0;
        }
      }

      //TODO: calcular el total
    }

    if (
      changedPath ===
      "ImpuestosDiferidosProvenientesDeDiferenciasTemporarias.PasivoDiferidoDiferenciasTemporariasImponibles"
    ) {
      const basePathDiferenciaTemporariaAcivoDiferido =
        newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias
          .PasivoDiferidoDiferenciasTemporariasImponibles;

      for (const item of calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaDos) {
        const elemento = basePathDiferenciaTemporariaAcivoDiferido[item];
        if (
          elemento?.BaseFiscal !== undefined &&
          elemento?.BaseContable !== undefined
        ) {
          elemento.DiferenciaTemporaria =
            elemento.BaseContable - elemento.BaseFiscal;
        }
      }

      for (const item of calculateDiferenciaTemporariaAcivoDiferidoTerceraFormaDos) {
        const elemento = basePathDiferenciaTemporariaAcivoDiferido[item];
        if (
          elemento?.BaseFiscal !== undefined &&
          elemento?.BaseContable !== undefined
        ) {
          elemento.DiferenciaTemporaria =
            elemento.BaseFiscal - elemento.BaseContable;
        }
      }

      for (const item of [
        ...calculateDiferenciaTemporariaAcivoDiferidoSegundaFormaDos,
        ...calculateDiferenciaTemporariaAcivoDiferidoTerceraFormaDos,
      ]) {
        const elemento = basePathDiferenciaTemporariaAcivoDiferido[item];
        if (elemento?.DiferenciaTemporaria !== undefined) {
          elemento.SaldoImpuestoDiferidoActual = Number(
            (elemento.DiferenciaTemporaria * 0.35).toFixed(3)
          );
        }

        if (
          elemento?.SaldoImpuestoDiferidoActual !== undefined &&
          elemento?.SaldoImpuestoDiferidoAnterior !== undefined
        ) {
          elemento.Variacion =
            elemento.SaldoImpuestoDiferidoAnterior -
            elemento.SaldoImpuestoDiferidoActual;
        }

        if (elemento?.SaldoImpuestoDiferidoActual !== undefined && elemento?.DiferenciaTemporaria !== undefined) {
          elemento.TasaFiscalAplicada = elemento.DiferenciaTemporaria > 0
            ? elemento.SaldoImpuestoDiferidoActual / elemento.DiferenciaTemporaria * 100
            : 0;
        }
      }
    }

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
}

export default ImpuestoDiferidoForm;
