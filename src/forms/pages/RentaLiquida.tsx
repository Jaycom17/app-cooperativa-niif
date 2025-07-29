import StudentLayout from "../../components/templates/StudentLayout";
import jsonData from "../models/RentaLiquida.json";
import TabBar from "../components/TabBar";
import Accordeon from "../components/Accordeon";
import RentaLiquidaValues from "../components/RentaLiquidaValues";
import {
  rentaLiquidaNames,
  calculateValorFiscalInputs,
  excludedCalculateValorFiscalInputs,
} from "../utils/RentaLiquida";
import { useState, useEffect, useRef } from "react";
import { RentaLiquidaService } from "../services/rentaLiquida.service";

function RentaLiquidaForm() {
  const tabs = [
    {
      name: "Ingresos",
      label: "Ingresos",
    },
    {
      name: "Costos",
      label: "Costos",
    },
    {
      name: "Gastos",
      label: "Gastos",
    },
    {
      name: "GanaciaPerdidaAntesImpuestos",
      label: "Ganancia y perdida de Impuestos",
    },
    {
      name: "InformativoClasificacionDiferencias",
      label: "Informativo Clasificacion Diferencias",
    },
    {
      name: "RentasPasivasECE",
      label: "Rentas Pasivas ECE",
    },
    {
      name: "Compensaciones",
      label: "Compensaciones",
    },
    {
      name: "RentaPresuntiva",
      label: "Renta Presuntiva",
    },
    {
      name: "RentasGrvablesREntaLiquida",
      label: "Rentas Grvables Renta Liquida",
    },
    {
      name: "GananciasOcasionalesGravables",
      label: "Ganancias Ocasionales Gravables",
    },
    {
      name: "SaldoFavorAnioGravableAnteriorSinSolicitusDevolucion",
      label: "Saldo a Favor Anio Gravable Anterior Sin Solicitud de Devolucion",
    },
    {
      name: "InformativoOtroResultadoIntegral",
      label: "Informativo Otro Resultado Integral",
    },
    {
      name: "GastoIngresoImpuestoRentaComplementarioPeriodo",
      label: "Gasto Ingreso Impuesto Renta Complementario Periodo",
    },
    {
      name: "DatosInformativoConcepto",
      label: "Datos Informativo Concepto",
    },
    {
      name: "OtrosDatosConSoloUnCampo",
      label: "Otros Campos",
    },
  ];

  const [data, setData] = useState(jsonData);
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    RentaLiquidaService.getRentaLiquidaForStudent().then((res) => {
      console.log(res.data.renContent);
      if (res.data.renContent) {
        setData(res.data.renContent);
      }
    });
  }, []);

  const calculateValorFiscal = (pathArray) => {
    if (
      calculateValorFiscalInputs.includes(pathArray[0]) &&
      !excludedCalculateValorFiscalInputs.some((elemment) =>
        pathArray.includes(elemment)
      )
    ) {
      let newData = { ...data };
      let temp = newData;

      let auxData = newData[pathArray[0]];

      for (let i = 1; i < pathArray.length - 1; i++) {
        auxData = auxData[pathArray[i]];
      }

      let calculatedValue =
        (auxData.ValorContable || 0) +
        (auxData.EfectoConversion || 0) -
        (auxData.MenorValorFiscal || 0) +
        (auxData.MayorValorFiscal || 0);

      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!temp[pathArray[i]]) {
          temp[pathArray[i]] = {}; // Crear objeto si no existe
        }
        temp = temp[pathArray[i]]; // Mover al siguiente nivel del objeto
      }

      temp.ValorFiscal = calculatedValue;
      temp.Otras = temp.ValorFiscal;
    }
  };

  const calculateTotalIngresosNetosAct = (path, newData) => {
    if (
      path[0] !== "Ingresos" ||
      path[1] !== "IngresosNetosActividadIndustrialCoSer"
    )
      return;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.ValorContable =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.ValorContable -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.ValorContable;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.EfectoConversion =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.EfectoConversion -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.EfectoConversion;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.MenorValorFiscal =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.MenorValorFiscal -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.MenorValorFiscal;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.MayorValorFiscal =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.MayorValorFiscal -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.MayorValorFiscal;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.ValorFiscal =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.ValorFiscal -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.ValorFiscal;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.Tarifa9 =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.Tarifa9 -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.Tarifa9;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.Tarifa15 =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.Tarifa15 -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.Tarifa15;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.Tarifa20 =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.Tarifa20 -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.Tarifa20;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.MegaInversiones =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.MegaInversiones -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.MegaInversiones;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.MegaInversiones27 =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.MegaInversiones27 -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.MegaInversiones27;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.TarifaGeneral240 =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.TarifaGeneral240 -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.TarifaGeneral240;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.Total.Otras =
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total.Otras -
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total.Otras;
  };

  const calculateTotalAjustesFiscales = (path, newData) => {
    if (path[0] !== "Ingresos" || path[1] !== "AjustesFiscales") return;

    newData.Ingresos.AjustesFiscales.Total.MayorValorFiscal =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.MayorValorFiscal;
    newData.Ingresos.AjustesFiscales.Total.ValorFiscal =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.ValorFiscal;
    newData.Ingresos.AjustesFiscales.Total.Tarifa9 =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.Tarifa9;
    newData.Ingresos.AjustesFiscales.Total.Tarifa15 =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.Tarifa15;
    newData.Ingresos.AjustesFiscales.Total.Tarifa20 =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.Tarifa20;
    newData.Ingresos.AjustesFiscales.Total.MegaInversiones =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.MegaInversiones;
    newData.Ingresos.AjustesFiscales.Total.MegaInversiones27 =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.MegaInversiones27;
    newData.Ingresos.AjustesFiscales.Total.TarifaGeneral240 =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.TarifaGeneral240;
    newData.Ingresos.AjustesFiscales.Total.Otras =
      newData.Ingresos.AjustesFiscales.AdicionIngresos.Total.Otras;
  };

  const calculateIngresos = (path, newData) => {
    if (path[0] !== "Ingresos") return;

    const keys = Object.keys({ ...newData.Ingresos });

    const totalIngresos = {
      ValorContable: 0,
      EfectoConversion: 0,
      MenorValorFiscal: 0,
      MayorValorFiscal: 0,
      ValorFiscal: 0,
      Tarifa9: 0,
      Tarifa15: 0,
      Tarifa20: 0,
      MegaInversiones: 0,
      MegaInversiones27: 0,
      TarifaGeneral240: 0,
      Otras: 0,
    };

    keys.forEach((key) => {
      if (key === "TotalIngresos") return;

      totalIngresos.ValorContable +=
        newData.Ingresos[key]?.Total?.ValorContable ||
        newData.Ingresos[key]?.ValorContable ||
        0;
      totalIngresos.EfectoConversion +=
        newData.Ingresos[key]?.Total?.EfectoConversion ||
        newData.Ingresos[key]?.EfectoConversion ||
        0;
      totalIngresos.MenorValorFiscal +=
        newData.Ingresos[key]?.Total?.MenorValorFiscal ||
        newData.Ingresos[key]?.MenorValorFiscal ||
        0;
      totalIngresos.MayorValorFiscal +=
        newData.Ingresos[key]?.Total?.MayorValorFiscal ||
        newData.Ingresos[key]?.MayorValorFiscal ||
        0;
      totalIngresos.ValorFiscal +=
        newData.Ingresos[key]?.Total?.ValorFiscal ||
        newData.Ingresos[key]?.ValorFiscal ||
        0;
      totalIngresos.Tarifa9 +=
        newData.Ingresos[key]?.Total?.Tarifa9 ||
        newData.Ingresos[key]?.Tarifa9 ||
        0;
      totalIngresos.Tarifa15 +=
        newData.Ingresos[key]?.Total?.Tarifa15 ||
        newData.Ingresos[key]?.Tarifa15 ||
        0;
      totalIngresos.Tarifa20 +=
        newData.Ingresos[key]?.Total?.Tarifa20 ||
        newData.Ingresos[key]?.Tarifa20 ||
        0;
      totalIngresos.MegaInversiones +=
        newData.Ingresos[key]?.Total?.MegaInversiones ||
        newData.Ingresos[key]?.MegaInversiones ||
        0;
      totalIngresos.MegaInversiones27 +=
        newData.Ingresos[key]?.Total?.MegaInversiones27 ||
        newData.Ingresos[key]?.MegaInversiones27 ||
        0;
      totalIngresos.TarifaGeneral240 +=
        newData.Ingresos[key]?.Total?.TarifaGeneral240 ||
        newData.Ingresos[key]?.TarifaGeneral240 ||
        0;
      totalIngresos.Otras +=
        newData.Ingresos[key]?.Total?.Otras ||
        newData.Ingresos[key]?.Otras ||
        0;
    });

    newData.Ingresos.TotalIngresos = { ...totalIngresos };
  };

  const calaculateCostos = (path, newData) => {
    if (path[0] !== "Costos") return;

    const keys = Object.keys({ ...newData.Costos });

    const totalCostos = {
      ValorContable: 0,
      EfectoConversion: 0,
      MenorValorFiscal: 0,
      MayorValorFiscal: 0,
      ValorFiscal: 0,
      Tarifa9: 0,
      Tarifa15: 0,
      Tarifa20: 0,
      MegaInversiones: 0,
      MegaInversiones27: 0,
      TarifaGeneral240: 0,
      Otras: 0,
    };

    keys.forEach((key) => {
      if (key === "TotalCostos") return;

      totalCostos.ValorContable +=
        newData.Costos[key]?.Total?.ValorContable ||
        newData.Costos[key]?.ValorContable ||
        0;
      totalCostos.EfectoConversion +=
        newData.Costos[key]?.Total?.EfectoConversion ||
        newData.Costos[key]?.EfectoConversion ||
        0;
      totalCostos.MenorValorFiscal +=
        newData.Costos[key]?.Total?.MenorValorFiscal ||
        newData.Costos[key]?.MenorValorFiscal ||
        0;
      totalCostos.MayorValorFiscal +=
        newData.Costos[key]?.Total?.MayorValorFiscal ||
        newData.Costos[key]?.MayorValorFiscal ||
        0;
      totalCostos.ValorFiscal +=
        newData.Costos[key]?.Total?.ValorFiscal ||
        newData.Costos[key]?.ValorFiscal ||
        0;
      totalCostos.Tarifa9 +=
        newData.Costos[key]?.Total?.Tarifa9 ||
        newData.Costos[key]?.Tarifa9 ||
        0;
      totalCostos.Tarifa15 +=
        newData.Costos[key]?.Total?.Tarifa15 ||
        newData.Costos[key]?.Tarifa15 ||
        0;
      totalCostos.Tarifa20 +=
        newData.Costos[key]?.Total?.Tarifa20 ||
        newData.Costos[key]?.Tarifa20 ||
        0;
      totalCostos.MegaInversiones +=
        newData.Costos[key]?.Total?.MegaInversiones ||
        newData.Costos[key]?.MegaInversiones ||
        0;
      totalCostos.MegaInversiones27 +=
        newData.Costos[key]?.Total?.MegaInversiones27 ||
        newData.Costos[key]?.MegaInversiones27 ||
        0;
      totalCostos.TarifaGeneral240 +=
        newData.Costos[key]?.Total?.TarifaGeneral240 ||
        newData.Costos[key]?.TarifaGeneral240 ||
        0;
      totalCostos.Otras +=
        newData.Costos[key]?.Total?.Otras || newData.Costos[key]?.Otras || 0;
    });

    newData.Costos.TotalCostos = { ...totalCostos };
  };

  const calcuateSubSection = (total, section) => {
    total.ValorContable += section.ValorContable || 0;
    total.EfectoConversion += section.EfectoConversion || 0;
    total.MenorValorFiscal += section.MenorValorFiscal || 0;
    total.MayorValorFiscal += section.MayorValorFiscal || 0;
    total.ValorFiscal += section.ValorFiscal || 0;
    total.Tarifa9 += section.Tarifa9 || 0;
    total.Tarifa15 += section.Tarifa15 || 0;
    total.Tarifa20 += section.Tarifa20 || 0;
    total.MegaInversiones += section.MegaInversiones || 0;
    total.MegaInversiones27 += section.MegaInversiones27 || 0;
    total.TarifaGeneral240 += section.TarifaGeneral240 || 0;
    total.Otras += section.Otras || 0;
  };

  const calculateTotalSectionGeneric = (path, newData, condition) => {
    for (let i = 0; i < condition.length; i++) {
      if (path[i] !== condition[i]) return;
    }

    const section = { ...newData };

    let total = {
      ValorContable: 0,
      EfectoConversion: 0,
      MenorValorFiscal: 0,
      MayorValorFiscal: 0,
      ValorFiscal: 0,
      Tarifa9: 0,
      Tarifa15: 0,
      Tarifa20: 0,
      MegaInversiones: 0,
      MegaInversiones27: 0,
      TarifaGeneral240: 0,
      Otras: 0,
    };

    const keys = Object.keys(section);

    keys.forEach((key) => {
      if (key === "Total") return;

      if (
        typeof section[key].ValorContable !== "number" &&
        typeof section[key].ValorFiscal !== "number"
      ) {
        Object.keys(section[key]).forEach((subKey) => {
          calcuateSubSection(total, section[key][subKey]);
        });
        return;
      }

      total.ValorContable += section[key].ValorContable || 0;
      total.EfectoConversion += section[key].EfectoConversion || 0;
      total.MenorValorFiscal += section[key].MenorValorFiscal || 0;
      total.MayorValorFiscal += section[key].MayorValorFiscal || 0;
      total.ValorFiscal += section[key].ValorFiscal || 0;
      total.Tarifa9 += section[key].Tarifa9 || 0;
      total.Tarifa15 += section[key].Tarifa15 || 0;
      total.Tarifa20 += section[key].Tarifa20 || 0;
      total.MegaInversiones += section[key].MegaInversiones || 0;
      total.MegaInversiones27 += section[key].MegaInversiones27 || 0;
      total.TarifaGeneral240 += section[key].TarifaGeneral240 || 0;
      total.Otras += section[key].Otras || 0;
    });

    // Asignar los valores calculados a newData
    //newData[condition[0]][condition[1]].Total = { ...total };
    return total;
  };

  const createOtrosSection = () => {
    const keys = Object.keys(data);
    const excludedSections = tabs.map((tab) => tab.name);

    const otherSections = keys.filter((key) => !excludedSections.includes(key));

    const Otros = {};

    otherSections.forEach((section) => {
      Otros[section] = data[section];
    });

    return Otros;
  };

  const Otros = createOtrosSection();

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value === "") value = 0;
    const pathArray = name.split(".");

    let newData = { ...data };
    let temp = newData;

    for (let i = 0; i < pathArray.length; i++) {
      if (i === pathArray.length - 1) {
        if (typeof temp[pathArray[i]] === "object") {
          temp[pathArray[i]] = parseFloat(value) || 0;
        } else {
          temp[pathArray[i]] = parseFloat(value) || 0;
        }
      } else {
        temp = temp[pathArray[i]];
      }
    }

    calculateValorFiscal(pathArray);

    // Ingresos
    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.IngresosNetosActividadIndustrialCoSer.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        {
          ...newData.Ingresos.IngresosNetosActividadIndustrialCoSer
            .IngresosNetosActividadIndustrialCoSer,
        },
        [
          "Ingresos",
          "IngresosNetosActividadIndustrialCoSer",
          "IngresosNetosActividadIndustrialCoSer",
        ]
      ) ||
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .IngresosNetosActividadIndustrialCoSer.Total;

    newData.Ingresos.IngresosNetosActividadIndustrialCoSer.DevolucionesRebajasDescuentos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        {
          ...newData.Ingresos.IngresosNetosActividadIndustrialCoSer
            .DevolucionesRebajasDescuentos,
        },
        [
          "Ingresos",
          "IngresosNetosActividadIndustrialCoSer",
          "DevolucionesRebajasDescuentos",
        ]
      ) ||
      newData.Ingresos.IngresosNetosActividadIndustrialCoSer
        .DevolucionesRebajasDescuentos.Total;

    calculateTotalIngresosNetosAct(pathArray, newData);

    newData.Ingresos.IngresosFinancieros.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.IngresosFinancieros },
        ["Ingresos", "IngresosFinancieros"]
      ) || newData.Ingresos.IngresosFinancieros.Total;

    newData.Ingresos.GananciasInversionesSubsidiariasAsociadasNegocios.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        {
          ...newData.Ingresos.GananciasInversionesSubsidiariasAsociadasNegocios,
        },
        ["Ingresos", "GananciasInversionesSubsidiariasAsociadasNegocios"]
      ) ||
      newData.Ingresos.GananciasInversionesSubsidiariasAsociadasNegocios.Total;

    newData.Ingresos.IngresosPorMedicionesValorRazonable.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.IngresosPorMedicionesValorRazonable },
        ["Ingresos", "IngresosPorMedicionesValorRazonable"]
      ) || newData.Ingresos.IngresosPorMedicionesValorRazonable.Total;

    newData.Ingresos.UtilidadVentaEnajenacionActivosMenos2Anos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.UtilidadVentaEnajenacionActivosMenos2Anos },
        ["Ingresos", "UtilidadVentaEnajenacionActivosMenos2Anos"]
      ) || newData.Ingresos.UtilidadVentaEnajenacionActivosMenos2Anos.Total;

    newData.Ingresos.UtilidadVentaEnajenacionActivosMas2Anos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.UtilidadVentaEnajenacionActivosMas2Anos },
        ["Ingresos", "UtilidadVentaEnajenacionActivosMas2Anos"]
      ) || newData.Ingresos.UtilidadVentaEnajenacionActivosMas2Anos.Total;

    newData.Ingresos.IngresosReversionDeterioroValor.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.IngresosReversionDeterioroValor },
        ["Ingresos", "IngresosReversionDeterioroValor"]
      ) || newData.Ingresos.IngresosReversionDeterioroValor.Total;

    newData.Ingresos.IngresosReversionProvisiones.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.IngresosReversionProvisiones },
        ["Ingresos", "IngresosReversionProvisiones"]
      ) || newData.Ingresos.IngresosReversionProvisiones.Total;

    newData.Ingresos.IngresosReversionPasivosBeneficiosEmpleados.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.IngresosReversionPasivosBeneficiosEmpleados },
        ["Ingresos", "IngresosReversionPasivosBeneficiosEmpleados"]
      ) || newData.Ingresos.IngresosReversionPasivosBeneficiosEmpleados.Total;

    newData.Ingresos.OtrosIngresos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.OtrosIngresos },
        ["Ingresos", "OtrosIngresos"]
      ) || newData.Ingresos.OtrosIngresos.Total;

    newData.Ingresos.AjustesFiscales.AdicionIngresos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Ingresos.AjustesFiscales.AdicionIngresos },
        ["Ingresos", "AjustesFiscales", "AdicionIngresos"]
      ) || newData.Ingresos.AjustesFiscales.AdicionIngresos.Total;

    calculateTotalAjustesFiscales(pathArray, newData);

    //Total de Ingresos
    calculateIngresos(pathArray, newData);

    // Costos
    newData.Costos.MateriasPrimasReventaBienes.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Costos.MateriasPrimasReventaBienes },
        ["Costos", "MateriasPrimasReventaBienes"]
      ) || newData.Costos.MateriasPrimasReventaBienes.Total;

    newData.Costos.ManoObra.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Costos.ManoObra },
        ["Costos", "ManoObra"]
      ) || newData.Costos.ManoObra.Total;

    newData.Costos.DepresionacionesAmortizacionesDeterioros.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Costos.DepresionacionesAmortizacionesDeterioros },
        ["Costos", "DepresionacionesAmortizacionesDeterioros"]
      ) || newData.Costos.DepresionacionesAmortizacionesDeterioros.Total;

    newData.Costos.OtrosCostos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Costos.OtrosCostos },
        ["Costos", "OtrosCostos"]
      ) || newData.Costos.OtrosCostos.Total;

    calaculateCostos(pathArray, newData);

    // Gastos

    newData.Gastos.Administracion.ManoObra.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.Administracion.ManoObra },
        ["Gastos", "Administracion", "ManoObra"]
      ) || newData.Gastos.Administracion.ManoObra.Total;

    newData.Gastos.Administracion.OtrosGastosAdministracion.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.Administracion.OtrosGastosAdministracion },
        ["Gastos", "Administracion", "OtrosGastosAdministracion"]
      ) || newData.Gastos.Administracion.OtrosGastosAdministracion.Total;

    newData.Gastos.Administracion.DepreciacionesAmortizacionesDeterioros.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        {
          ...newData.Gastos.Administracion
            .DepreciacionesAmortizacionesDeterioros,
        },
        ["Gastos", "Administracion", "DepreciacionesAmortizacionesDeterioros"]
      ) ||
      newData.Gastos.Administracion.DepreciacionesAmortizacionesDeterioros
        .Total;

    newData.Gastos.GastosDistribucionVentas.ManoObra.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.GastosDistribucionVentas.ManoObra },
        ["Gastos", "GastosDistribucionVentas", "ManoObra"]
      ) || newData.Gastos.GastosDistribucionVentas.ManoObra.Total;

    if (
      newData?.Gastos?.GastosDistribucionVentas?.OtrosGastosDistribucionVentas
    ) {
      newData.Gastos.GastosDistribucionVentas.OtrosGastosDistribucionVentas.Total =
        calculateTotalSectionGeneric(
          [...pathArray],
          {
            ...newData.Gastos.GastosDistribucionVentas
              .OtrosGastosDistribucionVentas,
          },
          [
            "Gastos",
            "GastosDistribucionVentas",
            "OtrosGastosDistribucionVentas",
          ]
        ) ||
        newData.Gastos.GastosDistribucionVentas.OtrosGastosDistribucionVentas
          .Total;
    }

    newData.Gastos.GastosDistribucionVentas.DepreciacionesAmortizacionesDeterioros.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        {
          ...newData.Gastos.GastosDistribucionVentas
            .DepreciacionesAmortizacionesDeterioros,
        },
        [
          "Gastos",
          "GastosDistribucionVentas",
          "DepreciacionesAmortizacionesDeterioros",
        ]
      ) ||
      newData.Gastos.GastosDistribucionVentas
        .DepreciacionesAmortizacionesDeterioros.Total;

    newData.Gastos.GastosFinancieros.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.GastosFinancieros },
        ["Gastos", "GastosFinancieros"]
      ) || newData.Gastos.GastosFinancieros.Total;

    /**
     * TODO: calcular el de perdidas por inversion
     */

    newData.Gastos.PerdidasPorMedicionesValorRazonable.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.PerdidasPorMedicionesValorRazonable },
        ["Gastos", "PerdidasPorMedicionesValorRazonable"]
      ) || newData.Gastos.PerdidasPorMedicionesValorRazonable.Total;

    newData.Gastos.PerdidaVentaEnajenacionActivosFijos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.PerdidaVentaEnajenacionActivosFijos },
        ["Gastos", "PerdidaVentaEnajenacionActivosFijos"]
      ) || newData.Gastos.PerdidaVentaEnajenacionActivosFijos.Total;

    newData.Gastos.GastosPorProviciones.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.GastosPorProviciones },
        ["Gastos", "GastosPorProviciones"]
      ) || newData.Gastos.GastosPorProviciones.Total;

    newData.Gastos.OtrosGastos.Total =
      calculateTotalSectionGeneric(
        [...pathArray],
        { ...newData.Gastos.OtrosGastos },
        ["Gastos", "OtrosGastos"]
      ) || newData.Gastos.OtrosGastos.Total;

    setData(newData);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      RentaLiquidaService.updateRentaLiquidaForStudent(newData);
      timeoutRef.current = null;
    }, 5000);
  };

  const renderSections = (
    sectionData,
    pathPrefix = "",
    friendlyNames: Record<string, string> = {}
  ) => {
    return Object.keys(sectionData).map((sectionKey) => {
      const friendlyName = friendlyNames[sectionKey] || sectionKey;

      if (typeof sectionData[sectionKey] !== "object") {
        return (
          <div key={sectionKey}>
            <RentaLiquidaValues
              path={`${pathPrefix === "" ? "" : `${pathPrefix}.`}${sectionKey}`}
              data={sectionData[sectionKey]}
              handleChange={handleChange}
            />
          </div>
        );
      }
      return (
        <Accordeon key={sectionKey} title={friendlyName}>
          <RentaLiquidaValues
            path={`${pathPrefix === "" ? "" : `${pathPrefix}.`}${sectionKey}`}
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
        {activeTab === "Ingresos" &&
          renderSections(data.Ingresos, "Ingresos", rentaLiquidaNames)}
        {activeTab === "Costos" &&
          renderSections(data.Costos, "Costos", rentaLiquidaNames)}
        {activeTab === "Gastos" &&
          renderSections(data.Gastos, "Gastos", rentaLiquidaNames)}
        {activeTab === "GanaciaPerdidaAntesImpuestos" &&
          renderSections(
            data.GanaciaPerdidaAntesImpuestos,
            "GanaciaPerdidaAntesImpuestos",
            rentaLiquidaNames
          )}
        {activeTab === "InformativoClasificacionDiferencias" &&
          renderSections(
            data.InformativoClasificacionDiferencias,
            "InformativoClasificacionDiferencias",
            rentaLiquidaNames
          )}
        {activeTab === "RentasPasivasECE" &&
          renderSections(
            data.RentasPasivasECE,
            "RentasPasivasECE",
            rentaLiquidaNames
          )}
        {activeTab === "Compensaciones" &&
          renderSections(
            data.Compensaciones,
            "Compensaciones",
            rentaLiquidaNames
          )}
        {activeTab === "RentaPresuntiva" &&
          renderSections(
            data.RentaPresuntiva,
            "RentaPresuntiva",
            rentaLiquidaNames
          )}
        {activeTab === "RentasGrvablesREntaLiquida" &&
          renderSections(
            data.RentasGrvablesREntaLiquida,
            "RentasGrvablesREntaLiquida",
            rentaLiquidaNames
          )}
        {activeTab === "GananciasOcasionalesGravables" &&
          renderSections(
            data.GananciasOcasionalesGravables,
            "GananciasOcasionalesGravables",
            rentaLiquidaNames
          )}
        {activeTab === "SaldoFavorAnioGravableAnteriorSinSolicitusDevolucion" &&
          renderSections(
            data.SaldoFavorAnioGravableAnteriorSinSolicitusDevolucion,
            "SaldoFavorAnioGravableAnteriorSinSolicitusDevolucion",
            rentaLiquidaNames
          )}
        {activeTab === "InformativoOtroResultadoIntegral" &&
          renderSections(
            data.InformativoOtroResultadoIntegral,
            "InformativoOtroResultadoIntegral",
            rentaLiquidaNames
          )}
        {activeTab === "GastoIngresoImpuestoRentaComplementarioPeriodo" &&
          renderSections(
            data.GastoIngresoImpuestoRentaComplementarioPeriodo,
            "GastoIngresoImpuestoRentaComplementarioPeriodo",
            rentaLiquidaNames
          )}
        {activeTab === "DatosInformativoConcepto" &&
          renderSections(
            data.DatosInformativoConcepto,
            "DatosInformativoConcepto",
            rentaLiquidaNames
          )}
        {activeTab === "OtrosDatosConSoloUnCampo" &&
          renderSections(Otros, "", rentaLiquidaNames)}
      </section>
    </StudentLayout>
  );
}

export default RentaLiquidaForm;
