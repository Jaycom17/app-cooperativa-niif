import StudentLayout from "../../components/templates/StudentLayout";
import TabBar from "../components/TabBar";
import Accordeon from "../components/Accordeon";
import ImpuestoDiferidoValues from "../components/ImpuestoDiferidoValues";
import { ImpuestoDiferidoService } from "../services/impuestoDiferido.service";
import { useState, useEffect, useRef } from "react";

function ImpuestoDiferidoForm() {
  const tabs = [
    {
      name: "ImpuestosDiferidosDiferenciasTemporarias",
      label: "Impuesto Diferido por Diferencias Temporarias",
    },
    {
      name: "ActivosCreditosTributos",
      label: "Activos por Créditos Tributarios",
    },
    {
      name: "DetalleCompensacionPerdidasFiscales",
      label: "Detalle de la Compensación de Pérdidas Fiscales",
    },
    {
      name: "DetalleCompensacionExcesoRentaPresuntiva",
      label: "Detalle de la Compensación del Exceso de Renta Presuntiva",
    },
  ];

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [data, setData] = useState({
    ImpuestosDiferidosDiferenciasTemporarias: {},
    ActivosCreditosTributos: {},
    DetalleCompensacionPerdidasFiscales: {},
    DetalleCompensacionExcesoRentaPresuntiva: {},
  });
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  useEffect(() => {
    ImpuestoDiferidoService.getImpuestoDiferidoForStudent().then((res) => {
      console.log(res.data);
      if (res.data.impContent) {
        setData(res.data.impContent);
      }
    });
  }, []);

  const calculateHoriActivosCreditosTributos = (path, newData) => {
    if (path[0] !== "ActivosCreditosTributos" && path[1] !== "SaldosFavor") {
      return;
    }

    let temp = newData;

    let auxData = newData[path[0]];

    for (let i = 1; i < path.length - 1; i++) {
      auxData = auxData[path[i]];
    }

    let calculatedVariacion =
      auxData.Saldo31VigenciaActual - auxData.Saldo31VigenciaAnterior;

    for (let i = 0; i < path.length - 1; i++) {
      if (!temp[path[i]]) {
        temp[path[i]] = {}; // Crear objeto si no existe
      }
      temp = temp[path[i]]; // Mover al siguiente nivel del objeto
    }
    temp.Variacion = calculatedVariacion;
    temp.ReduccionCompensacion = auxData.ReduccionCompensacion;
  };

  const calculateHoriPerdidasFiscales = (path, newData) => {
    if (path[0] !== "DetalleCompensacionPerdidasFiscales") {
      return;
    }

    let temp = newData;

    if (path[1] === "Anterior") {
      let calculatedPerdidaFiscalAcumuladaAnt =
        newData.DetalleCompensacionPerdidasFiscales.Anterior
          .PerdidasFiscalesAcumuladasCompensarInicio +
        newData.DetalleCompensacionPerdidasFiscales.Actual
          .PerdidaFiscalGeneradaPeriodo -
        newData.DetalleCompensacionPerdidasFiscales.Anterior
          .PerdidaFiscalCompensadaPeriodo -
        newData.DetalleCompensacionPerdidasFiscales.Anterior
          .ValoresNoCompesados +
        newData.DetalleCompensacionPerdidasFiscales.Anterior.AjustesMayorValor -
        newData.DetalleCompensacionPerdidasFiscales.Anterior.AjustesMenorValor;

      temp.DetalleCompensacionPerdidasFiscales.Anterior.PerdidaFiscalAcumulada =
        calculatedPerdidaFiscalAcumuladaAnt;
      temp.DetalleCompensacionPerdidasFiscales.Anterior.SaldoActivoImpuestoDiferido =
        Math.abs((calculatedPerdidaFiscalAcumuladaAnt * 0.35).toFixed(2));
    } else {
      let calculatedPerdidaFiscalAcumuladaAct =
        newData.DetalleCompensacionPerdidasFiscales.Actual
          .PerdidasFiscalesAcumuladasCompensarInicio -
        newData.DetalleCompensacionPerdidasFiscales.Actual
          .PerdidaFiscalCompensadaPeriodo -
        newData.DetalleCompensacionPerdidasFiscales.Actual.ValoresNoCompesados +
        newData.DetalleCompensacionPerdidasFiscales.Actual.AjustesMayorValor -
        newData.DetalleCompensacionPerdidasFiscales.Actual.AjustesMenorValor;

      temp.DetalleCompensacionPerdidasFiscales.Actual.PerdidaFiscalAcumulada =
        calculatedPerdidaFiscalAcumuladaAct;
      temp.DetalleCompensacionPerdidasFiscales.Actual.SaldoActivoImpuestoDiferido =
        Math.abs((calculatedPerdidaFiscalAcumuladaAct * 0.35).toFixed(2));
    }
  };

  const calculateHoriExcesoRentaPresuntiva = (path, newData) => {
    if (path[0] !== "DetalleCompensacionExcesoRentaPresuntiva") {
      return;
    }

    let temp = newData;

    if (path[1] === "Anterior") {
      let calculatedValorAcumuladoCompensarFinalPeridoAnt =
        newData.DetalleCompensacionExcesoRentaPresuntiva.Anterior
          .ValorAcumuladoCompensarInicioPeriodo +
        newData.DetalleCompensacionExcesoRentaPresuntiva.Anterior
          .ValorGeneradoPeriodo -
        newData.DetalleCompensacionExcesoRentaPresuntiva.Anterior
          .ValorCompensadoPeriodo -
        newData.DetalleCompensacionExcesoRentaPresuntiva.Anterior
          .ValoresNoCompensados +
        newData.DetalleCompensacionExcesoRentaPresuntiva.Anterior
          .AjustesMayorValor -
        newData.DetalleCompensacionExcesoRentaPresuntiva.Anterior
          .AjustesMenorValor;

      temp.DetalleCompensacionExcesoRentaPresuntiva.Anterior.PerdidaFiscalAcumulada =
        calculatedValorAcumuladoCompensarFinalPeridoAnt;
      temp.DetalleCompensacionExcesoRentaPresuntiva.Anterior.SaldoActivoImpuestoDiferido =
        Math.abs(
          (calculatedValorAcumuladoCompensarFinalPeridoAnt * 0.35).toFixed(2)
        );
    } else {
      let calculatedValorAcumuladoCompensarFinalPeridoAct =
        newData.DetalleCompensacionExcesoRentaPresuntiva.Actual
          .ValorAcumuladoCompensarInicioPeriodo +
        newData.DetalleCompensacionExcesoRentaPresuntiva.Actual
          .ValorGeneradoPeriodo -
        newData.DetalleCompensacionExcesoRentaPresuntiva.Actual
          .ValorCompensadoPeriodo -
        newData.DetalleCompensacionExcesoRentaPresuntiva.Actual
          .ValoresNoCompensados +
        newData.DetalleCompensacionExcesoRentaPresuntiva.Actual
          .AjustesMayorValor -
        newData.DetalleCompensacionExcesoRentaPresuntiva.Actual
          .AjustesMenorValor;

      temp.DetalleCompensacionExcesoRentaPresuntiva.Actual.PerdidaFiscalAcumulada =
        calculatedValorAcumuladoCompensarFinalPeridoAct;
      temp.DetalleCompensacionExcesoRentaPresuntiva.Actual.SaldoActivoImpuestoDiferido =
        Math.abs(
          (calculatedValorAcumuladoCompensarFinalPeridoAct * 0.35).toFixed(2)
        );
    }
  };

  const calculateTotalActivos = (path, newData) => {
    if (
      path[0] !== "ImpuestosDiferidosDiferenciasTemporarias" &&
      path[0] !== "ActivoDiferido"
    ) {
      return;
    }

    let temp = newData;

    let auxData =
      newData.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido;

    let calculatedTotal = {
      BaseContable: 0,
      BaseFiscal: 0,
      DiferenciaTemporaria: 0,
      DiferenciaPermanente: 0,
      SaldoImpuestoDiferidoActual: 0,
      SaldoImpuestoDiferidoAnterior: 0,
      Variacion: 0,
      TasaFiscalAplicada: 0,
    };

    Object.keys(auxData).forEach((key) => {
      if (key === "Total") {
        return;
      }
      calculatedTotal.BaseContable += auxData[key].BaseContable;
      calculatedTotal.BaseFiscal += auxData[key].BaseFiscal;
      calculatedTotal.DiferenciaTemporaria += auxData[key].DiferenciaTemporaria;
      calculatedTotal.DiferenciaPermanente += auxData[key].DiferenciaPermanente;
      calculatedTotal.SaldoImpuestoDiferidoActual +=
        auxData[key].SaldoImpuestoDiferidoActual;
      calculatedTotal.SaldoImpuestoDiferidoAnterior +=
        auxData[key].SaldoImpuestoDiferidoAnterior;
      calculatedTotal.Variacion += auxData[key].Variacion;
      calculatedTotal.TasaFiscalAplicada += auxData[key].TasaFiscalAplicada;
    });

    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.BaseContable =
      calculatedTotal.BaseContable;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.BaseFiscal =
      calculatedTotal.BaseFiscal;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.DiferenciaTemporaria =
      calculatedTotal.DiferenciaTemporaria;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.DiferenciaPermanente =
      calculatedTotal.DiferenciaPermanente;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.SaldoImpuestoDiferidoActual =
      calculatedTotal.SaldoImpuestoDiferidoActual;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.SaldoImpuestoDiferidoAnterior =
      calculatedTotal.SaldoImpuestoDiferidoAnterior;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.Variacion =
      calculatedTotal.Variacion;
    temp.ImpuestosDiferidosDiferenciasTemporarias.ActivoDiferido.Total.TasaFiscalAplicada =
      calculatedTotal.TasaFiscalAplicada;
  };

  const calculateTotalPasivos = (path, newData) => {
    if (
      path[0] !== "ImpuestosDiferidosDiferenciasTemporarias" &&
      path[0] !== "PasivoDiferido"
    ) {
      return;
    }

    let temp = newData;

    let auxData =
      newData.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido;

    let calculatedTotal = {
      BaseContable: 0,
      BaseFiscal: 0,
      DiferenciaTemporaria: 0,
      DiferenciaPermanente: 0,
      SaldoImpuestoDiferidoActual: 0,
      SaldoImpuestoDiferidoAnterior: 0,
      Variacion: 0,
      TasaFiscalAplicada: 0,
    };

    Object.keys(auxData).forEach((key) => {
      if (key === "Total") {
        return;
      }
      calculatedTotal.BaseContable += auxData[key].BaseContable;
      calculatedTotal.BaseFiscal += auxData[key].BaseFiscal;
      calculatedTotal.DiferenciaTemporaria += auxData[key].DiferenciaTemporaria;
      calculatedTotal.DiferenciaPermanente += auxData[key].DiferenciaPermanente;
      calculatedTotal.SaldoImpuestoDiferidoActual +=
        auxData[key].SaldoImpuestoDiferidoActual;
      calculatedTotal.SaldoImpuestoDiferidoAnterior +=
        auxData[key].SaldoImpuestoDiferidoAnterior;
      calculatedTotal.Variacion += auxData[key].Variacion;
      calculatedTotal.TasaFiscalAplicada += auxData[key].TasaFiscalAplicada;
    });

    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.BaseContable =
      calculatedTotal.BaseContable;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.BaseFiscal =
      calculatedTotal.BaseFiscal;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.DiferenciaTemporaria =
      calculatedTotal.DiferenciaTemporaria;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.DiferenciaPermanente =
      calculatedTotal.DiferenciaPermanente;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.SaldoImpuestoDiferidoActual =
      calculatedTotal.SaldoImpuestoDiferidoActual;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.SaldoImpuestoDiferidoAnterior =
      calculatedTotal.SaldoImpuestoDiferidoAnterior;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.Variacion =
      calculatedTotal.Variacion;
    temp.ImpuestosDiferidosDiferenciasTemporarias.PasivoDiferido.Total.TasaFiscalAplicada =
      calculatedTotal.TasaFiscalAplicada;
  };

  const calculateHoriDiferenciasTemporarias = (path) => {
    if (path[0] !== "ImpuestosDiferidosDiferenciasTemporarias") {
      return;
    }

    let newData = { ...data };
    let temp = newData;

    let auxData = newData[path[0]];

    for (let i = 1; i < path.length - 1; i++) {
      auxData = auxData[path[i]];
    }

    let calculatedDiferenciaTemporaria =
      (auxData.BaseContable - auxData.BaseFiscal) * -1;
    let calculatedSaldoImpuestoActual = calculatedDiferenciaTemporaria * 0.35;
    let calculatedVariacion =
      auxData.SaldoImpuestoDiferidoAnterior - calculatedSaldoImpuestoActual;
    let calculatedTarifaFiscalAplicada =
      calculatedDiferenciaTemporaria > 0
        ? (calculatedSaldoImpuestoActual / calculatedDiferenciaTemporaria) * 100
        : 0;

    for (let i = 0; i < path.length - 1; i++) {
      if (!temp[path[i]]) {
        temp[path[i]] = {}; // Crear objeto si no existe
      }
      temp = temp[path[i]]; // Mover al siguiente nivel del objeto
    }

    temp.Variacion = calculatedVariacion;
    temp.DiferenciaTemporaria = calculatedDiferenciaTemporaria;
    temp.TasaFiscalAplicada = calculatedTarifaFiscalAplicada;
    temp.SaldoImpuestoDiferidoActual = calculatedSaldoImpuestoActual;
  };

  const handleChange = (e, path) => {
    let { name, value } = e.target;
    if (value === "") value = 0;
    const pathArray = path.split(".");

    let newData = { ...data };
    let temp = newData;

    for (let i = 0; i < pathArray.length; i++) {
      if (i === pathArray.length - 1) {
        if (typeof temp[pathArray[i]] === "object") {
          temp[pathArray[i]][name] = parseFloat(value) || 0;
        } else {
          temp[pathArray[i]] = parseFloat(value) || 0;
        }
      } else {
        temp = temp[pathArray[i]];
      }
    }

    calculateHoriDiferenciasTemporarias(pathArray, newData);
    calculateHoriActivosCreditosTributos(pathArray, newData);
    calculateHoriPerdidasFiscales(pathArray, newData);
    calculateHoriExcesoRentaPresuntiva(pathArray, newData);

    calculateTotalActivos(pathArray, newData);
    calculateTotalPasivos(pathArray, newData);

    setData(newData);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      ImpuestoDiferidoService.updateImpuestoDiferidoForStudent(newData);
      timeoutRef.current = null;
    }, 5000);
  };

  const renderSections = (
    sectionData,
    pathPrefix,
    excludeSection = "",
    friendlyNames = []
  ) => {
    if (!sectionData || typeof sectionData !== "object") return null;

    return Object.keys(sectionData).map((sectionKey) => {
      if (sectionKey === excludeSection) return null;

      const friendlyName = friendlyNames[sectionKey] || sectionKey;

      return (
        <Accordeon key={sectionKey} title={friendlyName}>
          <ImpuestoDiferidoValues
            title={friendlyName}
            path={`${pathPrefix}.${sectionKey}`}
            data={sectionData[sectionKey]}
            handleChange={handleChange}
          />
        </Accordeon>
      );
    });
  };

  return (
    <StudentLayout>
      <section className="w-full mt-12 md:mt-0 overflow-auto max-h-screen">
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "ImpuestosDiferidosDiferenciasTemporarias" &&
          renderSections(
            data.ImpuestosDiferidosDiferenciasTemporarias,
            "ImpuestosDiferidosDiferenciasTemporarias",
            "Total",
            []
          )}
        {activeTab === "ActivosCreditosTributos" &&
          renderSections(
            data.ActivosCreditosTributos,
            "ActivosCreditosTributos",
            "Total"
          )}
        {activeTab === "DetalleCompensacionPerdidasFiscales" &&
          renderSections(
            data.DetalleCompensacionPerdidasFiscales,
            "DetalleCompensacionPerdidasFiscales",
            "Total",
            []
          )}
        {activeTab === "DetalleCompensacionExcesoRentaPresuntiva" &&
          renderSections(
            data.DetalleCompensacionExcesoRentaPresuntiva,
            "DetalleCompensacionExcesoRentaPresuntiva",
            "Total",
            []
          )}
      </section>
    </StudentLayout>
  );
}

export default ImpuestoDiferidoForm;
