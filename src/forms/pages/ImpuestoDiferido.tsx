import StudentLayout from "../../components/templates/StudentLayout";
import { ImpuestoDiferidoService } from "../services/impuestoDiferido.service";
import { useState, useEffect, useRef } from "react";
import { FormRender } from "../components/FormRender";
import { FiLoader, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import {
  config,
  calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma,
  calculateDiferenciaTemporariaAcivoDiferidoSegundaForma,
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
        const merged = mergeDeepPreservingOrder(
          ImpuestoDiferidoInput,
          res.data.impContent
        );
        setData(merged);
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const handleChange = (newData: any, changedPath?: string) => {
    const arrayPath: string[] = changedPath!.split(".");

    if (
      changedPath?.startsWith(
        "ImpuestosDiferidosProvenientesDeDiferenciasTemporarias"
      )
    ) {
      const element =
        newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
          arrayPath![arrayPath!.length - 2]
        ][arrayPath![arrayPath!.length - 1]];

      if (
        calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma.includes(
          arrayPath![arrayPath!.length - 1]
        )
      ) {
        if (
          element?.BaseFiscal !== undefined &&
          element?.BaseContable !== undefined
        ) {
          element.DiferenciaTemporaria =
            element.BaseFiscal - element.BaseContable;
        }
      } else if (
        calculateDiferenciaTemporariaAcivoDiferidoSegundaForma.includes(
          arrayPath![arrayPath!.length - 1]
        )
      ) {
        if (
          element?.BaseFiscal !== undefined &&
          element?.BaseContable !== undefined
        ) {
          element.DiferenciaTemporaria =
            element.BaseContable - element.BaseFiscal;
        }
      }

      element.SaldoImpuestoDiferidoActual = Number(
        (element.DiferenciaTemporaria * 0.35).toFixed(3)
      );

      element.Variacion =
        element.SaldoImpuestoDiferidoAnterior -
        element.SaldoImpuestoDiferidoActual;

      element.TasaFiscalAplicada =
        element.DiferenciaTemporaria > 0
          ? (element.SaldoImpuestoDiferidoActual /
              element.DiferenciaTemporaria) *
            100
          : 0;

      const total = {
        SaldoImpuestoDiferidoActual: 0,
        SaldoImpuestoDiferidoAnterior: 0,
        Variacion: 0,
      };

      [
        ...calculateDiferenciaTemporariaAcivoDiferidoPrimeraForma,
        ...calculateDiferenciaTemporariaAcivoDiferidoSegundaForma,
      ].forEach((item) => {
        const basePath =
          newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
            arrayPath![arrayPath!.length - 2]
          ];

        total.SaldoImpuestoDiferidoActual +=
          basePath[item].SaldoImpuestoDiferidoActual || 0;
        total.SaldoImpuestoDiferidoAnterior +=
          basePath[item].SaldoImpuestoDiferidoAnterior || 0;
        total.Variacion += basePath[item].Variacion || 0;
      });

      newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
        arrayPath![arrayPath!.length - 2]
      ].ValorTotal.SaldoImpuestoDiferidoActual =
        Number(
          total.SaldoImpuestoDiferidoActual.toFixed(3)
        ) || 0;
      newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
        arrayPath![arrayPath!.length - 2]
      ].ValorTotal.SaldoImpuestoDiferidoAnterior =
        Number(total.SaldoImpuestoDiferidoAnterior.toFixed(3)) || 0;
      newData.ImpuestosDiferidosProvenientesDeDiferenciasTemporarias[
        arrayPath![arrayPath!.length - 2]
      ].ValorTotal.Variacion = Number(
        total.Variacion.toFixed(3)
      );
    }

    if (
      changedPath!.includes(
        "ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior"
      )
    ) {
      const basePath =
        newData.ActivosPorCreditosTributariosSaldosAfavorEImpuestosPagadosEnElEsterior;

      basePath.SaldosAFavor.Variacion =
        basePath.SaldosAFavor.Saldo31VigenciaActual ||
        0 - basePath.SaldosAFavor.Saldo31VigenciaAnterior ||
        0;

      basePath.ImpuestosPagadosEnELExterior.Variacion =
        basePath.ImpuestosPagadosEnELExterior.Saldo31VigenciaActual ||
        0 - basePath.ImpuestosPagadosEnELExterior.Saldo31VigenciaAnterior ||
        0;

      basePath.SaldosAFavor.ExplicacionDeLaVariacion.ReduccionCompensacionApliacion =
        basePath.SaldosAFavor.Variacion || 0;
    }

    if (changedPath!.includes("DetalleCompensacionPerdidasFiscales")) {
      const basePath = newData.DetalleCompensacionPerdidasFiscales;

      basePath.AñoAnterior.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo =
        (basePath.AñoAnterior
          .perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo || 0) +
        (basePath.AñoAnterior.PerdidaFiscalGeneradaEnElPeriodo || 0) -
        (basePath.AñoAnterior.PerdidaFiscalCompensadaEnElPeriodo || 0) -
        (basePath.AñoAnterior.ValoresNoCompensadosPorCaducidad || 0) +
        (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMayorValor ||
          0) -
        (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMenorValor ||
          0);

      basePath.AñoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
        Number(
          (
            basePath.AñoAnterior
              .PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo * 0.35
          ).toFixed(3)
        ) || 0;

      basePath.AñoActual.PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo =
        (basePath.AñoActual
          .perdidasFiscalesAcumuladasPorCompensarAlInicioDelPeriodo || 0) +
        (basePath.AñoActual.PerdidaFiscalGeneradaEnElPeriodo || 0) -
        (basePath.AñoActual.PerdidaFiscalCompensadaEnElPeriodo || 0) -
        (basePath.AñoActual.ValoresNoCompensadosPorCaducidad || 0) +
        (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMayorValor ||
          0) -
        (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMenorValor || 0);

      basePath.AñoActual.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
        Number(
          (
            basePath.AñoActual
              .PerdidaFiscalAcumuladaPorCompensarAlFinalDelPeriodo * 0.35
          ).toFixed(3)
        ) || 0;
    }

    if (
      changedPath!.includes("DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva")
    ) {
      const basePath =
        newData.DetalleDeLaCompensacionPorExcesoDeRentaPresuntiva;

      basePath.AñoAnterior.ValorAcumuladoPorCompensarAlFinalDelPeriodo =
        (basePath.AñoAnterior.ValorAcumuladoPorCompensarAlInicioDelPeriodo ||
          0) +
        (basePath.AñoAnterior.ValorGeneradoEnElPeriodo || 0) -
        (basePath.AñoAnterior.ValorCompensadoEnElPeriodo || 0) -
        (basePath.AñoAnterior.ValoresNoCompensadosPorCaducidad || 0) +
        (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMayorValor ||
          0) -
        (basePath.AñoAnterior.AjustesPorCorreccionDeLaDeclaracionMenorValor ||
          0);

      basePath.AñoAnterior.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
        Number(
          (
            basePath.AñoAnterior.ValorAcumuladoPorCompensarAlFinalDelPeriodo *
            0.35
          ).toFixed(3)
        ) || 0;

      basePath.AñoActual.ValorAcumuladoPorCompensarAlFinalDelPeriodo =
        (basePath.AñoActual.ValorAcumuladoPorCompensarAlInicioDelPeriodo || 0) +
        (basePath.AñoActual.ValorGeneradoEnElPeriodo || 0) -
        (basePath.AñoActual.ValorCompensadoEnElPeriodo || 0) -
        (basePath.AñoActual.ValoresNoCompensadosPorCaducidad || 0) +
        (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMayorValor ||
          0) -
        (basePath.AñoActual.AjustesPorCorreccionDeLaDeclaracionMenorValor || 0);

      basePath.AñoActual.SaldoActivoPorImpuestoDiferidoAlFinalDelPeriodo =
        Number(
          (
            basePath.AñoActual.ValorAcumuladoPorCompensarAlFinalDelPeriodo *
            0.35
          ).toFixed(3)
        ) || 0;
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
        <div className="text-sm text-gray-600 flex justify-end items-center gap-2 pr-3 md:pr-0 absolute top-0 right-0 mt-3 mr-3 md:mr-10">
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
