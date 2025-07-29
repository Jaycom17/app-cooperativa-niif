import { useState, useEffect, useRef } from "react";
import basicInformation from "../models/ESFPatrimonio.json";
import StudentLayout from "../../components/templates/StudentLayout";
import { EsfPatrimonioService } from "../services/esfPatrimonio.service";
import {
  ValuesNames,
  excludedCalculateValorFiscalInputs,
} from "../utils/esfPatrimonio";
import TabBar from "../components/TabBar";
import Accordeon from "../components/Accordeon";
import EsfValues from "../components/ESFValues";

const ESFpatrimonio = () => {
  const [data, setData] = useState(basicInformation);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    EsfPatrimonioService.getEsfPatrimonioFormStudent()
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.esfContent);
        } else {
          console.error("Error en la respuesta", response);
        }
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);
  // Activos Equivalentes Efectivo
  const valorcontactivosequi = (currentData) => {
    return (
      (currentData.Efectivo.ValorContable || 0) +
      (currentData.EquivalentesEfectivo.ValorContable || 0) +
      (currentData.EfectivoRestringido.ValorContable || 0)
    );
  };
  const efectconveractivosequi = (currentData) => {
    return (
      (currentData.Efectivo.EfectoConversion || 0) +
      (currentData.EquivalentesEfectivo.EfectoConversion || 0) +
      (currentData.EfectivoRestringido.EfectoConversion || 0)
    );
  };
  const menorfiscalactivosequi = (currentData) => {
    return (
      (currentData.Efectivo.MenorValorFiscal || 0) +
      (currentData.EquivalentesEfectivo.MenorValorFiscal || 0) +
      (currentData.EfectivoRestringido.MenorValorFiscal || 0)
    );
  };
  const mayorfiscalactivosequi = (currentData) => {
    return (
      (currentData.Efectivo.MayorValorFiscal || 0) +
      (currentData.EquivalentesEfectivo.MayorValorFiscal || 0) +
      (currentData.EfectivoRestringido.MayorValorFiscal || 0)
    );
  };
  const valorfiscalactivosequi = (currentData) => {
    return (
      (currentData.Efectivo.ValorFiscal || 0) +
      (currentData.EquivalentesEfectivo.ValorFiscal || 0) +
      (currentData.EfectivoRestringido.ValorFiscal || 0)
    );
  };
  // Inversiones Instrumentos Financieros Derivados VN
  //Cuentas Comerciales Cobrar Otras Por Cobrar
  const valorcontcuentascomercialestotal = (currentData) => {
    return (
      (currentData.CuentasDocumentosPorCobrar.Total.ValorContable || 0) -
      (currentData.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total
        .ValorContable || 0)
    );
  };
  const efectconvercuentascomercialestotal = (currentData) => {
    return (
      (currentData.CuentasDocumentosPorCobrar.Total.EfectoConversion || 0) -
      (currentData.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total
        .EfectoConversion || 0)
    );
  };
  const menorfiscalcuentascomercialestotal = (currentData) => {
    return (
      (currentData.CuentasDocumentosPorCobrar.Total.MenorValorFiscal || 0) -
      (currentData.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total
        .MenorValorFiscal || 0)
    );
  };
  const mayorfiscalcuentascomercialestotal = (currentData) => {
    return (
      (currentData.CuentasDocumentosPorCobrar.Total.MayorValorFiscal || 0) -
      (currentData.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total
        .MayorValorFiscal || 0)
    );
  };
  const valorfiscalcuentascomercialestotal = (currentData) => {
    return (
      (currentData.CuentasDocumentosPorCobrar.Total.ValorFiscal || 0) -
      (currentData.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total
        .ValorFiscal || 0)
    );
  };
  // //Cuentas Documentos Por Cobrar
  const valorcontaccuentascomerciales = (currentData) => {
    return (
      (currentData.CarteraCreditoPrestamosBancarios.ValorContable || 0) +
      (currentData.CuentasComercialesPorCobrar.ValorContable || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.ValorContable || 0) +
      (currentData.ArrendamientoFinancieroOLeasingFinanciero.ValorContable ||
        0) +
      (currentData.DividendosParticipaciones.ValorContable || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes.ValorContable ||
        0) +
      (currentData.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas
        .ValorContable || 0) +
      (currentData.PrimasSegurosPorRecaudar.ValorContable || 0) +
      (currentData.CarteraDificilCobro.ValorContable || 0) +
      (currentData.ReclamacionesPorCobrar.ValorContable || 0) +
      (currentData.AnticiposPagos.ValorContable || 0) +
      (currentData.OtrasCuentasDocumentosPorCobrar.ValorContable || 0)
    );
  };
  const efectconvercuentascomerciales = (currentData) => {
    return (
      (currentData.CarteraCreditoPrestamosBancarios.EfectoConversion || 0) +
      (currentData.CuentasComercialesPorCobrar.EfectoConversion || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.EfectoConversion || 0) +
      (currentData.ArrendamientoFinancieroOLeasingFinanciero.EfectoConversion ||
        0) +
      (currentData.DividendosParticipaciones.EfectoConversion || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes
        .EfectoConversion || 0) +
      (currentData.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas
        .EfectoConversion || 0) +
      (currentData.PrimasSegurosPorRecaudar.EfectoConversion || 0) +
      (currentData.CarteraDificilCobro.EfectoConversion || 0) +
      (currentData.ReclamacionesPorCobrar.EfectoConversion || 0) +
      (currentData.AnticiposPagos.EfectoConversion || 0) +
      (currentData.OtrasCuentasDocumentosPorCobrar.EfectoConversion || 0)
    );
  };
  const menorfiscalcuentascomerciales = (currentData) => {
    return (
      (currentData.CarteraCreditoPrestamosBancarios.MenorValorFiscal || 0) +
      (currentData.CuentasComercialesPorCobrar.MenorValorFiscal || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.MenorValorFiscal || 0) +
      (currentData.ArrendamientoFinancieroOLeasingFinanciero.MenorValorFiscal ||
        0) +
      (currentData.DividendosParticipaciones.MenorValorFiscal || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes
        .MenorValorFiscal || 0) +
      (currentData.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas
        .MenorValorFiscal || 0) +
      (currentData.PrimasSegurosPorRecaudar.MenorValorFiscal || 0) +
      (currentData.CarteraDificilCobro.MenorValorFiscal || 0) +
      (currentData.ReclamacionesPorCobrar.MenorValorFiscal || 0) +
      (currentData.AnticiposPagos.MenorValorFiscal || 0) +
      (currentData.OtrasCuentasDocumentosPorCobrar.MenorValorFiscal || 0)
    );
  };
  const mayorfiscalcuentascomerciales = (currentData) => {
    return (
      (currentData.CarteraCreditoPrestamosBancarios.MayorValorFiscal || 0) +
      (currentData.CuentasComercialesPorCobrar.MayorValorFiscal || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.MayorValorFiscal || 0) +
      (currentData.ArrendamientoFinancieroOLeasingFinanciero.MayorValorFiscal ||
        0) +
      (currentData.DividendosParticipaciones.MayorValorFiscal || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes
        .MayorValorFiscal || 0) +
      (currentData.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas
        .MayorValorFiscal || 0) +
      (currentData.PrimasSegurosPorRecaudar.MayorValorFiscal || 0) +
      (currentData.CarteraDificilCobro.MayorValorFiscal || 0) +
      (currentData.ReclamacionesPorCobrar.MayorValorFiscal || 0) +
      (currentData.AnticiposPagos.MayorValorFiscal || 0) +
      (currentData.OtrasCuentasDocumentosPorCobrar.MayorValorFiscal || 0)
    );
  };
  const valorfiscalcuentascomerciales = (currentData) => {
    return (
      (currentData.CarteraCreditoPrestamosBancarios.ValorFiscal || 0) +
      (currentData.CuentasComercialesPorCobrar.ValorFiscal || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.ValorFiscal || 0) +
      (currentData.ArrendamientoFinancieroOLeasingFinanciero.ValorFiscal || 0) +
      (currentData.DividendosParticipaciones.ValorFiscal || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes.ValorFiscal ||
        0) +
      (currentData.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas
        .ValorFiscal || 0) +
      (currentData.PrimasSegurosPorRecaudar.ValorFiscal || 0) +
      (currentData.CarteraDificilCobro.ValorFiscal || 0) +
      (currentData.ReclamacionesPorCobrar.ValorFiscal || 0) +
      (currentData.AnticiposPagos.ValorFiscal || 0) +
      (currentData.OtrasCuentasDocumentosPorCobrar.ValorFiscal || 0)
    );
  };

  // // Deterioro Acumulado Valor Cuentas Documentos Cobrar
  const valorcontdeterioroacumuladodocumentos = (currentData) => {
    return (
      (currentData.CarteraDeCredito.ValorContable || 0) +
      (currentData.CuentasComercialesPorCobrar.ValorContable || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.ValorContable || 0) +
      (currentData.ArrendamientoFinancieroLeasingFinanciero.ValorContable ||
        0) +
      (currentData.DividendosParticipaciones.ValorContable || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes.ValorContable ||
        0) +
      (currentData.CuentasPorCobrarOtrasPartesRelacionadasAsociadas
        .ValorContable || 0) +
      (currentData.OtrasCuentasPorCobrar.ValorContable || 0)
    );
  };
  const efectconversiondeterioroacumuladodocumentos = (currentData) => {
    return (
      (currentData.CarteraDeCredito.EfectoConversion || 0) +
      (currentData.CuentasComercialesPorCobrar.EfectoConversion || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.EfectoConversion || 0) +
      (currentData.ArrendamientoFinancieroLeasingFinanciero.EfectoConversion ||
        0) +
      (currentData.DividendosParticipaciones.EfectoConversion || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes
        .EfectoConversion || 0) +
      (currentData.CuentasPorCobrarOtrasPartesRelacionadasAsociadas
        .EfectoConversion || 0) +
      (currentData.OtrasCuentasPorCobrar.EfectoConversion || 0)
    );
  };
  const menorfiscaldeterioroacumuladodocumentos = (currentData) => {
    return (
      (currentData.CarteraDeCredito.MenorValorFiscal || 0) +
      (currentData.CuentasComercialesPorCobrar.MenorValorFiscal || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.MenorValorFiscal || 0) +
      (currentData.ArrendamientoFinancieroLeasingFinanciero.MenorValorFiscal ||
        0) +
      (currentData.DividendosParticipaciones.MenorValorFiscal || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes
        .MenorValorFiscal || 0) +
      (currentData.CuentasPorCobrarOtrasPartesRelacionadasAsociadas
        .MenorValorFiscal || 0) +
      (currentData.OtrasCuentasPorCobrar.MenorValorFiscal || 0)
    );
  };
  const mayorfiscaldeterioroacumuladodocumentos = (currentData) => {
    return (
      (currentData.CarteraDeCredito.MayorValorFiscal || 0) +
      (currentData.CuentasComercialesPorCobrar.MayorValorFiscal || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.MayorValorFiscal || 0) +
      (currentData.ArrendamientoFinancieroLeasingFinanciero.MayorValorFiscal ||
        0) +
      (currentData.DividendosParticipaciones.MayorValorFiscal || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes
        .MayorValorFiscal || 0) +
      (currentData.CuentasPorCobrarOtrasPartesRelacionadasAsociadas
        .MayorValorFiscal || 0) +
      (currentData.OtrasCuentasPorCobrar.MayorValorFiscal || 0)
    );
  };
  const valorfiscaldeterioroacumuladodocumentos = (currentData) => {
    return (
      (currentData.CarteraDeCredito.ValorFiscal || 0) +
      (currentData.CuentasComercialesPorCobrar.ValorFiscal || 0) +
      (currentData.CuentasPorCobrarAcuerdosConcesion.ValorFiscal || 0) +
      (currentData.ArrendamientoFinancieroLeasingFinanciero.ValorFiscal || 0) +
      (currentData.DividendosParticipaciones.ValorFiscal || 0) +
      (currentData.CuentasPorCobrarSociosAccionistasParticipes.ValorFiscal ||
        0) +
      (currentData.CuentasPorCobrarOtrasPartesRelacionadasAsociadas
        .ValorFiscal || 0) +
      (currentData.OtrasCuentasPorCobrar.ValorFiscal || 0)
    );
  };
  //Activos Total
  const valorcontactivostotal = (currentData) => {
    return currentData.ActivosEquivalentesEfectivo.Total.ValorContable || 0;
  };
  //Pasivos
  //Obligaciones financieras y cuentas por pagar
  const valorcontobligacionesfinancieras = (currentData) => {
    return (
      (currentData.ObligacionesFinancierasEnMonedaLocal.ValorContable || 0) +
      (currentData.ObligacionesFinancierasEnMonedaExtranjera.ValorContable ||
        0) +
      (currentData.DepositosYExigibilidades.ValorContable || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaLocal.ValorContable || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaExtranjera.ValorContable ||
        0) +
      (currentData.DividendosYParticipacionesPorPagar.ValorContable || 0) +
      (currentData.CuentasPorPagarASociosAccionistasOParticipes.ValorContable ||
        0) +
      (currentData.CuentasYDocumentosPorPagarAOtrasPartesRelacionadasYAsociadas
        .ValorContable || 0) +
      (currentData
        .ReservaMatematicaYOTecnicaYOtrosPasivosExclusivosEnCompaniasDeSeguros
        .ValorContable || 0) +
      (currentData.RecaudoAFavorDeTerceros.ValorContable || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaLocal.ValorContable ||
        0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaExtranjera
        .ValorContable || 0)
    );
  };
  const efectconverobligacionesfinancieras = (currentData) => {
    return (
      (currentData.ObligacionesFinancierasEnMonedaLocal.EfectoConversion || 0) +
      (currentData.ObligacionesFinancierasEnMonedaExtranjera.EfectoConversion ||
        0) +
      (currentData.DepositosYExigibilidades.EfectoConversion || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaLocal.EfectoConversion ||
        0) +
      (currentData.CuentasComercialesPorPagarEnMonedaExtranjera
        .EfectoConversion || 0) +
      (currentData.DividendosYParticipacionesPorPagar.EfectoConversion || 0) +
      (currentData.CuentasPorPagarASociosAccionistasOParticipes
        .EfectoConversion || 0) +
      (currentData.CuentasYDocumentosPorPagarAOtrasPartesRelacionadasYAsociadas
        .EfectoConversion || 0) +
      (currentData
        .ReservaMatematicaYOTecnicaYOtrosPasivosExclusivosEnCompaniasDeSeguros
        .EfectoConversion || 0) +
      (currentData.RecaudoAFavorDeTerceros.EfectoConversion || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaLocal
        .EfectoConversion || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaExtranjera
        .EfectoConversion || 0)
    );
  };
  const menorfiscalobligacionesfinancieras = (currentData) => {
    return (
      (currentData.ObligacionesFinancierasEnMonedaLocal.MenorValorFiscal || 0) +
      (currentData.ObligacionesFinancierasEnMonedaExtranjera.MenorValorFiscal ||
        0) +
      (currentData.DepositosYExigibilidades.MenorValorFiscal || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaLocal.MenorValorFiscal ||
        0) +
      (currentData.CuentasComercialesPorPagarEnMonedaExtranjera
        .MenorValorFiscal || 0) +
      (currentData.DividendosYParticipacionesPorPagar.MenorValorFiscal || 0) +
      (currentData.CuentasPorPagarASociosAccionistasOParticipes
        .MenorValorFiscal || 0) +
      (currentData.CuentasYDocumentosPorPagarAOtrasPartesRelacionadasYAsociadas
        .MenorValorFiscal || 0) +
      (currentData
        .ReservaMatematicaYOTecnicaYOtrosPasivosExclusivosEnCompaniasDeSeguros
        .MenorValorFiscal || 0) +
      (currentData.RecaudoAFavorDeTerceros.MenorValorFiscal || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaLocal
        .MenorValorFiscal || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaExtranjera
        .MenorValorFiscal || 0)
    );
  };
  const mayorfiscalobligacionesfinancieras = (currentData) => {
    return (
      (currentData.ObligacionesFinancierasEnMonedaLocal.MayorValorFiscal || 0) +
      (currentData.ObligacionesFinancierasEnMonedaExtranjera.MayorValorFiscal ||
        0) +
      (currentData.DepositosYExigibilidades.MayorValorFiscal || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaLocal.MayorValorFiscal ||
        0) +
      (currentData.CuentasComercialesPorPagarEnMonedaExtranjera
        .MayorValorFiscal || 0) +
      (currentData.DividendosYParticipacionesPorPagar.MayorValorFiscal || 0) +
      (currentData.CuentasPorPagarASociosAccionistasOParticipes
        .MayorValorFiscal || 0) +
      (currentData.CuentasYDocumentosPorPagarAOtrasPartesRelacionadasYAsociadas
        .MayorValorFiscal || 0) +
      (currentData
        .ReservaMatematicaYOTecnicaYOtrosPasivosExclusivosEnCompaniasDeSeguros
        .MayorValorFiscal || 0) +
      (currentData.RecaudoAFavorDeTerceros.MayorValorFiscal || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaLocal
        .MayorValorFiscal || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaExtranjera
        .MayorValorFiscal || 0)
    );
  };
  const valorfiscalobligacionesfinancieras = (currentData) => {
    return (
      (currentData.ObligacionesFinancierasEnMonedaLocal.ValorFiscal || 0) +
      (currentData.ObligacionesFinancierasEnMonedaExtranjera.ValorFiscal || 0) +
      (currentData.DepositosYExigibilidades.ValorFiscal || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaLocal.ValorFiscal || 0) +
      (currentData.CuentasComercialesPorPagarEnMonedaExtranjera.ValorFiscal ||
        0) +
      (currentData.DividendosYParticipacionesPorPagar.ValorFiscal || 0) +
      (currentData.CuentasPorPagarASociosAccionistasOParticipes.ValorFiscal ||
        0) +
      (currentData.CuentasYDocumentosPorPagarAOtrasPartesRelacionadasYAsociadas
        .ValorFiscal || 0) +
      (currentData
        .ReservaMatematicaYOTecnicaYOtrosPasivosExclusivosEnCompaniasDeSeguros
        .ValorFiscal || 0) +
      (currentData.RecaudoAFavorDeTerceros.ValorFiscal || 0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaLocal.ValorFiscal ||
        0) +
      (currentData.OtrasCuentasYDocumentosPorPagarEnMonedaExtranjera
        .ValorFiscal || 0)
    );
  };
  //Arrendamientos por pagar
  const valorcontrarrendamientoporpagar = (currentData) => {
    return (
      (currentData.FinancieroLeasingPartesNoRelacionadas.ValorContable || 0) +
      (currentData.FinancieroLeasingPartesRelacionadas.ValorContable || 0) +
      (currentData.Operativo.ValorContable || 0)
    );
  };
  const efectconverrrendamientoporpagar = (currentData) => {
    return (
      (currentData.FinancieroLeasingPartesNoRelacionadas.EfectoConversion ||
        0) +
      (currentData.FinancieroLeasingPartesRelacionadas.EfectoConversion || 0) +
      (currentData.Operativo.EfectoConversion || 0)
    );
  };
  const menorfiscalrrendamientoporpagar = (currentData) => {
    return (
      (currentData.FinancieroLeasingPartesNoRelacionadas.MenorValorFiscal ||
        0) +
      (currentData.FinancieroLeasingPartesRelacionadas.MenorValorFiscal || 0) +
      (currentData.Operativo.MenorValorFiscal || 0)
    );
  };
  const mayorfiscalrrendamientoporpagar = (currentData) => {
    return (
      (currentData.FinancieroLeasingPartesNoRelacionadas.MayorValorFiscal ||
        0) +
      (currentData.FinancieroLeasingPartesRelacionadas.MayorValorFiscal || 0) +
      (currentData.Operativo.MayorValorFiscal || 0)
    );
  };
  const valorfiscalrrendamientoporpagar = (currentData) => {
    return (
      (currentData.FinancieroLeasingPartesNoRelacionadas.ValorFiscal || 0) +
      (currentData.FinancieroLeasingPartesRelacionadas.ValorFiscal || 0) +
      (currentData.Operativo.ValorFiscal || 0)
    );
  };
  // Otros Pasivos Financieros
  const valorcontotrospasivosfinancieros = (currentData) => {
    return (
      (currentData.BonosYDocumentosEquivalentes.ValorContable || 0) +
      (currentData.InstrumentosFinancierosDerivados.ValorContable || 0) +
      (currentData
        .AccionesPreferencialesOAportesDeCapitalClasificadosComoPasivos
        .ValorContable || 0) +
      (currentData.DerechosFiduciarios.ValorContable || 0) +
      (currentData.OtrosPasivosFinancieros.ValorContable || 0)
    );
  };
  const efectconverotrospasivosfinancieros = (currentData) => {
    return (
      (currentData.BonosYDocumentosEquivalentes.EfectoConversion || 0) +
      (currentData.InstrumentosFinancierosDerivados.EfectoConversion || 0) +
      (currentData
        .AccionesPreferencialesOAportesDeCapitalClasificadosComoPasivos
        .EfectoConversion || 0) +
      (currentData.DerechosFiduciarios.EfectoConversion || 0) +
      (currentData.OtrosPasivosFinancieros.EfectoConversion || 0)
    );
  };
  const menorfiscalotrospasivosfinancieros = (currentData) => {
    return (
      (currentData.BonosYDocumentosEquivalentes.MenorValorFiscal || 0) +
      (currentData.InstrumentosFinancierosDerivados.MenorValorFiscal || 0) +
      (currentData
        .AccionesPreferencialesOAportesDeCapitalClasificadosComoPasivos
        .MenorValorFiscal || 0) +
      (currentData.DerechosFiduciarios.MenorValorFiscal || 0) +
      (currentData.OtrosPasivosFinancieros.MenorValorFiscal || 0)
    );
  };
  const mayorfiscalotrospasivosfinancieros = (currentData) => {
    return (
      (currentData.BonosYDocumentosEquivalentes.MayorValorFiscal || 0) +
      (currentData.InstrumentosFinancierosDerivados.MayorValorFiscal || 0) +
      (currentData
        .AccionesPreferencialesOAportesDeCapitalClasificadosComoPasivos
        .MayorValorFiscal || 0) +
      (currentData.DerechosFiduciarios.MayorValorFiscal || 0) +
      (currentData.OtrosPasivosFinancieros.MayorValorFiscal || 0)
    );
  };
  const valorfiscalotrospasivosfinancieros = (currentData) => {
    return (
      (currentData.BonosYDocumentosEquivalentes.ValorFiscal || 0) +
      (currentData.InstrumentosFinancierosDerivados.ValorFiscal || 0) +
      (currentData
        .AccionesPreferencialesOAportesDeCapitalClasificadosComoPasivos
        .ValorFiscal || 0) +
      (currentData.DerechosFiduciarios.ValorFiscal || 0) +
      (currentData.OtrosPasivosFinancieros.ValorFiscal || 0)
    );
  };
  //Impuestos, gravámenes y tasas por pagar
  const valorcontimpuestosgravamentasas = (currentData) => {
    return (
      (currentData.ImpuestoRenta.ValorContable || 0) +
      (currentData.IVA.ValorContable || 0) +
      (currentData.Otrosimpuestos.ValorContable || 0)
    );
  };
  const efectconverimpuestosgravamentasas = (currentData) => {
    return (
      (currentData.ImpuestoRenta.EfectoConversion || 0) +
      (currentData.IVA.EfectoConversion || 0) +
      (currentData.Otrosimpuestos.EfectoConversion || 0)
    );
  };
  const menorfiscalimpuestosgravamentasas = (currentData) => {
    return (
      (currentData.ImpuestoRenta.MenorValorFiscal || 0) +
      (currentData.IVA.MenorValorFiscal || 0) +
      (currentData.Otrosimpuestos.MenorValorFiscal || 0)
    );
  };
  const mayorfiscalimpuestosgravamentasas = (currentData) => {
    return (
      (currentData.ImpuestoRenta.MayorValorFiscal || 0) +
      (currentData.IVA.MayorValorFiscal || 0) +
      (currentData.Otrosimpuestos.MayorValorFiscal || 0)
    );
  };
  const valorfiscalimpuestosgravamentasas = (currentData) => {
    return (
      (currentData.ImpuestoRenta.ValorFiscal || 0) +
      (currentData.IVA.ValorFiscal || 0) +
      (currentData.Otrosimpuestos.ValorFiscal || 0)
    );
  };
  //Pasivos por impuestos diferidos
  //Pasivos por beneficios a los empleados
  const valorcontpasivosbeneficiosempleados = (currentData) => {
    return (
      (currentData.CortoPlazo.ValorContable || 0) +
      (currentData.LargoPlazo.ValorContable || 0) +
      (currentData.TerminacionVinculosLaborales.ValorContable || 0) +
      (currentData.PostEmpleo.ValorContable || 0)
    );
  };
  const efectconverpasivosbeneficiosempleados = (currentData) => {
    return (
      (currentData.CortoPlazo.EfectoConversion || 0) +
      (currentData.LargoPlazo.EfectoConversion || 0) +
      (currentData.TerminacionVinculosLaborales.EfectoConversion || 0) +
      (currentData.PostEmpleo.EfectoConversion || 0)
    );
  };
  const menorfiscalpasivosbeneficiosempleados = (currentData) => {
    return (
      (currentData.CortoPlazo.MenorValorFiscal || 0) +
      (currentData.LargoPlazo.MenorValorFiscal || 0) +
      (currentData.TerminacionVinculosLaborales.MenorValorFiscal || 0) +
      (currentData.PostEmpleo.MenorValorFiscal || 0)
    );
  };
  const mayorfiscalpasivosbeneficiosempleados = (currentData) => {
    return (
      (currentData.CortoPlazo.MayorValorFiscal || 0) +
      (currentData.LargoPlazo.MayorValorFiscal || 0) +
      (currentData.TerminacionVinculosLaborales.MayorValorFiscal || 0) +
      (currentData.PostEmpleo.MayorValorFiscal || 0)
    );
  };
  const valorfiscalpasivosbeneficiosempleados = (currentData) => {
    return (
      (currentData.CortoPlazo.ValorFiscal || 0) +
      (currentData.LargoPlazo.ValorFiscal || 0) +
      (currentData.TerminacionVinculosLaborales.ValorFiscal || 0) +
      (currentData.PostEmpleo.ValorFiscal || 0)
    );
  };
  //Provisiones
  const valorcontprovisiones = (currentData) => {
    return 0; //return (currentData.procesosLegalesLitigiosYDemandas.ValorContable || 0) + (currentData.mantenimientoYReparaciones.ValorContable || 0) + (currentData.obligacionesFiscales.ValorContable || 0) + (currentData.desmantelamientosRestauracionYRehabilitacion.ValorContable || 0) + (currentData.garantias.ValorContable || 0) + (currentData.contratosOnerosos.ValorContable || 0) + (currentData.reembolsosAClientes.ValorContable || 0) + (currentData.reestructuracionesDeNegocios.ValorContable || 0) + (currentData.OtrosPasivos.ValorContable || 0) + (currentData.pasivosContingentesAsumidosEnUnaCombinacionDeNegocios.ValorContable || 0) + (currentData.relacionadasConElMedioAmbiente.ValorContable || 0) + (currentData.otrasProvisiones.ValorContable || 0);
  };
  const efectconverprovisiones = (currentData) => {
    return 0; //return (currentData.procesosLegalesLitigiosYDemandas.EfectoConversion || 0) + (currentData.mantenimientoYReparaciones.EfectoConversion || 0) + (currentData.obligacionesFiscales.EfectoConversion || 0) + (currentData.desmantelamientosRestauracionYRehabilitacion.EfectoConversion || 0) + (currentData.garantias.EfectoConversion || 0) + (currentData.contratosOnerosos.EfectoConversion || 0) + (currentData.reembolsosAClientes.EfectoConversion || 0) + (currentData.reestructuracionesDeNegocios.EfectoConversion || 0) + (currentData.OtrosPasivos.EfectoConversion || 0) + (currentData.pasivosContingentesAsumidosEnUnaCombinacionDeNegocios.EfectoConversion || 0) + (currentData.relacionadasConElMedioAmbiente.EfectoConversion || 0) + (currentData.otrasProvisiones.EfectoConversion || 0);
  };
  const menorfiscalprovisiones = (currentData) => {
    return 0; //return (currentData.procesosLegalesLitigiosYDemandas.MenorValorFiscal || 0) + (currentData.mantenimientoYReparaciones.MenorValorFiscal || 0) + (currentData.obligacionesFiscales.MenorValorFiscal || 0) + (currentData.desmantelamientosRestauracionYRehabilitacion.MenorValorFiscal || 0) + (currentData.garantias.MenorValorFiscal || 0) + (currentData.contratosOnerosos.MenorValorFiscal || 0) + (currentData.reembolsosAClientes.MenorValorFiscal || 0) + (currentData.reestructuracionesDeNegocios.MenorValorFiscal || 0) + (currentData.OtrosPasivos.MenorValorFiscal || 0) + (currentData.pasivosContingentesAsumidosEnUnaCombinacionDeNegocios.MenorValorFiscal || 0) + (currentData.relacionadasConElMedioAmbiente.MenorValorFiscal || 0) + (currentData.otrasProvisiones.MenorValorFiscal || 0);
  };
  const mayorfiscalprovisiones = (currentData) => {
    return 0; //return (currentData.procesosLegalesLitigiosYDemandas.MayorValorFiscal || 0) + (currentData.mantenimientoYReparaciones.MayorValorFiscal || 0) + (currentData.obligacionesFiscales.MayorValorFiscal || 0) + (currentData.desmantelamientosRestauracionYRehabilitacion.MayorValorFiscal || 0) + (currentData.garantias.MayorValorFiscal || 0) + (currentData.contratosOnerosos.MayorValorFiscal || 0) + (currentData.reembolsosAClientes.MayorValorFiscal || 0) + (currentData.reestructuracionesDeNegocios.MayorValorFiscal || 0) + (currentData.OtrosPasivos.MayorValorFiscal || 0) + (currentData.pasivosContingentesAsumidosEnUnaCombinacionDeNegocios.MayorValorFiscal || 0) + (currentData.relacionadasConElMedioAmbiente.MayorValorFiscal || 0) + (currentData.otrasProvisiones.MayorValorFiscal || 0);
  };

  const valorfiscalprovisiones = (currentData) => {
    /**
     * TODO: Revisar que esa vualta le falta algo
     */
    //return (currentData.procesosLegalesLitigiosYDemandas.ValorFiscal || 0) + (currentData.mantenimientoYReparaciones.ValorFiscal || 0) + (currentData.obligacionesFiscales.ValorFiscal || 0) + (currentData.desmantelamientosRestauracionYRehabilitacion.ValorFiscal || 0) + (currentData.garantias.ValorFiscal || 0) + (currentData.contratosOnerosos.ValorFiscal || 0) + (currentData.reembolsosAClientes.ValorFiscal || 0) + (currentData.reestructuracionesDeNegocios.ValorFiscal || 0) + (currentData.return 0;//.ValorFiscal || 0) + (currentData.pasivosContingentesAsumidosEnUnaCombinacionDeNegocios.ValorFiscal || 0) + (currentData.relacionadasConElMedioAmbiente.ValorFiscal || 0) + (currentData.otrasProvisiones.ValorFiscal || 0) || 0;
    return 0;
  };
  //Pasivos por ingresos diferidos
  const valorcontpasivosingresosdiferidos = (currentData) => {
    return 0; //return (currentData.AnticiposYAvancesRecibidosDeClientes.ValorContable || 0) + (currentData.IngresosDiferidosPorProgramasDeFidelizacion.ValorContable || 0) + (currentData.SubvencionesDelGobiernoYOtrasAyudas.ValorContable || 0) + (currentData.OtrosPasivosIngresosDiferidos.ValorContable || 0);
  };
  const efectconverpasivosingresosdiferidos = (currentData) => {
    return 0; //return (currentData.AnticiposYAvancesRecibidosDeClientes.EfectoConversion || 0) + (currentData.IngresosDiferidosPorProgramasDeFidelizacion.EfectoConversion || 0) + (currentData.SubvencionesDelGobiernoYOtrasAyudas.EfectoConversion || 0) + (currentData.OtrosPasivosIngresosDiferidos.EfectoConversion || 0);
  };
  const menorfiscalpasivosingresosdiferidos = (currentData) => {
    return 0; //return (currentData.AnticiposYAvancesRecibidosDeClientes.MenorValorFiscal || 0) + (currentData.IngresosDiferidosPorProgramasDeFidelizacion.MenorValorFiscal || 0) + (currentData.SubvencionesDelGobiernoYOtrasAyudas.MenorValorFiscal || 0) + (currentData.OtrosPasivosIngresosDiferidos.MenorValorFiscal || 0);
  };
  const mayorfiscalpasivosingresosdiferidos = (currentData) => {
    return 0; //return (currentData.AnticiposYAvancesRecibidosDeClientes.MayorValorFiscal || 0) + (currentData.IngresosDiferidosPorProgramasDeFidelizacion.MayorValorFiscal || 0) + (currentData.SubvencionesDelGobiernoYOtrasAyudas.MayorValorFiscal || 0) + (currentData.OtrosPasivosIngresosDiferidos.MayorValorFiscal || 0);
  };
  const valorfiscalpasivosingresosdiferidos = (currentData) => {
    return 0; //return (currentData.AnticiposYAvancesRecibidosDeClientes.ValorFiscal || 0) + (currentData.IngresosDiferidosPorProgramasDeFidelizacion.ValorFiscal || 0) + (currentData.SubvencionesDelGobiernoYOtrasAyudas.ValorFiscal || 0) + (currentData.OtrosPasivosIngresosDiferidos.ValorFiscal || 0);
  };
  //Otros pasivos
  const valorcontotrospasivos = (currentData) => {
    return 0; //return (currentData.DepositosRecibidos.ValorContable || 0) + (currentData.RetencionesATercerosSobreContratos.ValorContable || 0) + (currentData.EmbargosJudiciales.ValorContable || 0) + (currentData.CuentasEnParticipacion.ValorContable || 0) + (currentData.PasivoParaEjecucionDeExcedentesESAL.ValorContable || 0) + (currentData.FondosSocialesMutualesYOtros.ValorContable || 0) + (currentData.OtrosPasivos.ValorContable || 0) + (currentData.PasivosReconocidosSolamenteParaFinesFiscales.ValorContable || 0);
  };
  const efectconverotrospasivos = (currentData) => {
    return 0; //return (currentData.DepositosRecibidos.EfectoConversion || 0) + (currentData.RetencionesATercerosSobreContratos.EfectoConversion || 0) + (currentData.EmbargosJudiciales.EfectoConversion || 0) + (currentData.CuentasEnParticipacion.EfectoConversion || 0) + (currentData.PasivoParaEjecucionDeExcedentesESAL.EfectoConversion || 0) + (currentData.FondosSocialesMutualesYOtros.EfectoConversion || 0) + (currentData.OtrosPasivos.EfectoConversion || 0) + (currentData.PasivosReconocidosSolamenteParaFinesFiscales.EfectoConversion || 0);
  };
  const menorfiscalotrospasivos = (currentData) => {
    return 0; //return (currentData.DepositosRecibidos.MenorValorFiscal || 0) + (currentData.RetencionesATercerosSobreContratos.MenorValorFiscal || 0) + (currentData.EmbargosJudiciales.MenorValorFiscal || 0) + (currentData.CuentasEnParticipacion.MenorValorFiscal || 0) + (currentData.PasivoParaEjecucionDeExcedentesESAL.MenorValorFiscal || 0) + (currentData.FondosSocialesMutualesYOtros.MenorValorFiscal || 0) + (currentData.OtrosPasivos.MenorValorFiscal || 0) + (currentData.PasivosReconocidosSolamenteParaFinesFiscales.MenorValorFiscal || 0);
  };
  const mayorfiscalotrospasivos = (currentData) => {
    return 0; //return (currentData.DepositosRecibidos.MayorValorFiscal || 0) + (currentData.RetencionesATercerosSobreContratos.MayorValorFiscal || 0) + (currentData.EmbargosJudiciales.MayorValorFiscal || 0) + (currentData.CuentasEnParticipacion.MayorValorFiscal || 0) + (currentData.PasivoParaEjecucionDeExcedentesESAL.MayorValorFiscal || 0) + (currentData.FondosSocialesMutualesYOtros.MayorValorFiscal || 0) + (currentData.OtrosPasivos.MayorValorFiscal || 0) + (currentData.PasivosReconocidosSolamenteParaFinesFiscales.MayorValorFiscal || 0);
  };
  const valorfiscalotrospasivos = (currentData) => {
    return 0; //return (currentData.DepositosRecibidos.ValorFiscal || 0) + (currentData.RetencionesATercerosSobreContratos.ValorFiscal || 0) + (currentData.EmbargosJudiciales.ValorFiscal || 0) + (currentData.CuentasEnParticipacion.ValorFiscal || 0) + (currentData.PasivoParaEjecucionDeExcedentesESAL.ValorFiscal || 0) + (currentData.FondosSocialesMutualesYOtros.ValorFiscal || 0) + (currentData.OtrosPasivos.ValorFiscal || 0) + (currentData.PasivosReconocidosSolamenteParaFinesFiscales.ValorFiscal || 0);
  };
  //Patrimonio Total
  //Patrimonio
  //Capital social y reservas
  //Resultados del ejercicio
  //Resultados acumulados
  //Ganancias (pérdidas) acumuladas o retenidas por la adopción por primera
  //Otro resultado integral acumulado
  //Datos Informativos

  const clculateValorFiscal = (path) => {
    const pathArray = path.split(".");

    console.log({ pathArray, excludedCalculateValorFiscalInputs });

    console.log(
      excludedCalculateValorFiscalInputs.some((elemment) =>
        pathArray.includes(elemment)
      )
    );

    if (
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
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value === "") value = 0;

    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (name)
    let currentLevel = updatedData;
    const pathArray = name.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Detectar el tipo de dato actual
    const currentValueType = typeof currentLevel[lastKey];

    // Convertir el valor al tipo correcto
    if (currentValueType === "number") {
      value = parseFloat(value);
    } else if (currentValueType === "boolean") {
      value = value === "true";
    }
    // No es necesario convertir si es una cadena de texto (string)

    // Actualizar el valor
    currentLevel[lastKey] = value;

    // Activos Equivalentes Efectivo
    clculateValorFiscal(name);
    // Inversiones Instrumentos Financieros Derivados VN
    //Cuentas Comerciales Cobrar Otras Por Cobrar
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorContable =
      valorcontcuentascomercialestotal(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.EfectoConversion =
      efectconvercuentascomercialestotal(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MenorValorFiscal =
      menorfiscalcuentascomercialestotal(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MayorValorFiscal =
      mayorfiscalcuentascomercialestotal(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorFiscal =
      valorfiscalcuentascomercialestotal(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
      );
    // //Cuentas Documentos Por Cobrar
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.ValorContable =
      valorcontaccuentascomerciales(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .CuentasDocumentosPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.EfectoConversion =
      efectconvercuentascomerciales(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .CuentasDocumentosPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.MenorValorFiscal =
      menorfiscalcuentascomerciales(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .CuentasDocumentosPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.MayorValorFiscal =
      mayorfiscalcuentascomerciales(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .CuentasDocumentosPorCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.ValorFiscal =
      valorfiscalcuentascomerciales(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .CuentasDocumentosPorCobrar
      );
    // // Deterioro Acumulado Valor Cuentas Documentos Cobrar
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.ValorContable =
      valorcontdeterioroacumuladodocumentos(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .DeterioroAcumuladoValorCuentasDocumentosCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.EfectoConversion =
      efectconversiondeterioroacumuladodocumentos(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .DeterioroAcumuladoValorCuentasDocumentosCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.MenorValorFiscal =
      menorfiscaldeterioroacumuladodocumentos(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .DeterioroAcumuladoValorCuentasDocumentosCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.MayorValorFiscal =
      mayorfiscaldeterioroacumuladodocumentos(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .DeterioroAcumuladoValorCuentasDocumentosCobrar
      );
    updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.ValorFiscal =
      valorfiscaldeterioroacumuladodocumentos(
        updatedData.Activos.CuentasComercialesCobrarOtrasPorCobrar
          .DeterioroAcumuladoValorCuentasDocumentosCobrar
      );
    //Activos Total
    /**
     * TODO: revisar
     */
    updatedData.Activos.Total.ValorContable = valorcontactivostotal(
      updatedData.Activos
    );
    //Pasivos
    //Obligaciones financieras y cuentas por pagar
    updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar.Total.ValorContable =
      valorcontobligacionesfinancieras(
        updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar
      );
    updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar.Total.EfectoConversion =
      efectconverobligacionesfinancieras(
        updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar
      );
    updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar.Total.MenorValorFiscal =
      menorfiscalobligacionesfinancieras(
        updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar
      );
    updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar.Total.MayorValorFiscal =
      mayorfiscalobligacionesfinancieras(
        updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar
      );
    updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar.Total.ValorFiscal =
      valorfiscalobligacionesfinancieras(
        updatedData.Pasivos.ObligacionesFinancierasCuentasPorPagar
      );
    //Arrendamientos por pagar
    updatedData.Pasivos.ArrendamientosPorPagar.Total.ValorContable =
      valorcontrarrendamientoporpagar(
        updatedData.Pasivos.ArrendamientosPorPagar
      );
    updatedData.Pasivos.ArrendamientosPorPagar.Total.EfectoConversion =
      efectconverrrendamientoporpagar(
        updatedData.Pasivos.ArrendamientosPorPagar
      );
    updatedData.Pasivos.ArrendamientosPorPagar.Total.MenorValorFiscal =
      menorfiscalrrendamientoporpagar(
        updatedData.Pasivos.ArrendamientosPorPagar
      );
    updatedData.Pasivos.ArrendamientosPorPagar.Total.MayorValorFiscal =
      mayorfiscalrrendamientoporpagar(
        updatedData.Pasivos.ArrendamientosPorPagar
      );
    updatedData.Pasivos.ArrendamientosPorPagar.Total.ValorFiscal =
      valorfiscalrrendamientoporpagar(
        updatedData.Pasivos.ArrendamientosPorPagar
      );
    //Otros Pasivos Financieros
    updatedData.Pasivos.OtrosPasivosFinancieros.Total.ValorContable =
      valorcontotrospasivosfinancieros(
        updatedData.Pasivos.OtrosPasivosFinancieros
      );
    updatedData.Pasivos.OtrosPasivosFinancieros.Total.EfectoConversion =
      efectconverotrospasivosfinancieros(
        updatedData.Pasivos.OtrosPasivosFinancieros
      );
    updatedData.Pasivos.OtrosPasivosFinancieros.Total.MenorValorFiscal =
      menorfiscalotrospasivosfinancieros(
        updatedData.Pasivos.OtrosPasivosFinancieros
      );
    updatedData.Pasivos.OtrosPasivosFinancieros.Total.MayorValorFiscal =
      mayorfiscalotrospasivosfinancieros(
        updatedData.Pasivos.OtrosPasivosFinancieros
      );
    updatedData.Pasivos.OtrosPasivosFinancieros.Total.ValorFiscal =
      valorfiscalotrospasivosfinancieros(
        updatedData.Pasivos.OtrosPasivosFinancieros
      );
    //Impuestos, gravámenes y tasas por pagar
    updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar.Total.ValorContable =
      valorcontimpuestosgravamentasas(
        updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar
      );
    updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar.Total.EfectoConversion =
      efectconverimpuestosgravamentasas(
        updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar
      );
    updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar.Total.MenorValorFiscal =
      menorfiscalimpuestosgravamentasas(
        updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar
      );
    updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar.Total.MayorValorFiscal =
      mayorfiscalimpuestosgravamentasas(
        updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar
      );
    updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar.Total.ValorFiscal =
      valorfiscalimpuestosgravamentasas(
        updatedData.Pasivos.ImpuestosGravamenesTasasPorPagar
      );
    //Pasivos por impuestos diferidos
    //Pasivos por beneficios a los empleados
    updatedData.Pasivos.PasivosBeneficiosEmpleados.Total.ValorContable =
      valorcontpasivosbeneficiosempleados(
        updatedData.Pasivos.PasivosBeneficiosEmpleados
      );
    updatedData.Pasivos.PasivosBeneficiosEmpleados.Total.EfectoConversion =
      efectconverpasivosbeneficiosempleados(
        updatedData.Pasivos.PasivosBeneficiosEmpleados
      );
    updatedData.Pasivos.PasivosBeneficiosEmpleados.Total.MenorValorFiscal =
      menorfiscalpasivosbeneficiosempleados(
        updatedData.Pasivos.PasivosBeneficiosEmpleados
      );
    updatedData.Pasivos.PasivosBeneficiosEmpleados.Total.MayorValorFiscal =
      mayorfiscalpasivosbeneficiosempleados(
        updatedData.Pasivos.PasivosBeneficiosEmpleados
      );
    updatedData.Pasivos.PasivosBeneficiosEmpleados.Total.ValorFiscal =
      valorfiscalpasivosbeneficiosempleados(
        updatedData.Pasivos.PasivosBeneficiosEmpleados
      );
    //Provisiones
    updatedData.Pasivos.Provisiones.Total.ValorContable = valorcontprovisiones(
      updatedData.Pasivos.Provisiones
    );
    updatedData.Pasivos.Provisiones.Total.EfectoConversion =
      efectconverprovisiones(updatedData.Pasivos.Provisiones);
    updatedData.Pasivos.Provisiones.Total.MenorValorFiscal =
      menorfiscalprovisiones(updatedData.Pasivos.Provisiones);
    updatedData.Pasivos.Provisiones.Total.MayorValorFiscal =
      mayorfiscalprovisiones(updatedData.Pasivos.Provisiones);
    updatedData.Pasivos.Provisiones.Total.ValorFiscal = valorfiscalprovisiones(
      updatedData.Pasivos.Provisiones
    );
    //Pasivos por ingresos diferidos
    updatedData.Pasivos.PasivosIngresosDiferidos.Total.ValorContable =
      valorcontpasivosingresosdiferidos(
        updatedData.Pasivos.PasivosIngresosDiferidos
      );
    updatedData.Pasivos.PasivosIngresosDiferidos.Total.EfectoConversion =
      efectconverpasivosingresosdiferidos(
        updatedData.Pasivos.PasivosIngresosDiferidos
      );
    updatedData.Pasivos.PasivosIngresosDiferidos.Total.MenorValorFiscal =
      menorfiscalpasivosingresosdiferidos(
        updatedData.Pasivos.PasivosIngresosDiferidos
      );
    updatedData.Pasivos.PasivosIngresosDiferidos.Total.MayorValorFiscal =
      mayorfiscalpasivosingresosdiferidos(
        updatedData.Pasivos.PasivosIngresosDiferidos
      );
    updatedData.Pasivos.PasivosIngresosDiferidos.Total.ValorFiscal =
      valorfiscalpasivosingresosdiferidos(
        updatedData.Pasivos.PasivosIngresosDiferidos
      );
    //Otros pasivos
    updatedData.Pasivos.OtrosPasivos.Total.ValorContable =
      valorcontotrospasivos(updatedData.Pasivos.OtrosPasivos);
    updatedData.Pasivos.OtrosPasivos.Total.EfectoConversion =
      efectconverotrospasivos(updatedData.Pasivos.OtrosPasivos);
    updatedData.Pasivos.OtrosPasivos.Total.MenorValorFiscal =
      menorfiscalotrospasivos(updatedData.Pasivos.OtrosPasivos);
    updatedData.Pasivos.OtrosPasivos.Total.MayorValorFiscal =
      mayorfiscalotrospasivos(updatedData.Pasivos.OtrosPasivos);
    updatedData.Pasivos.OtrosPasivos.Total.ValorFiscal =
      valorfiscalotrospasivos(updatedData.Pasivos.OtrosPasivos);
    //Patrimonio Total

    //Totales
    updatedData.Activos.ActivosEquivalentesEfectivo.Total.ValorContable =
      valorcontactivosequi(updatedData.Activos.ActivosEquivalentesEfectivo);
    updatedData.Activos.ActivosEquivalentesEfectivo.Total.EfectoConversion =
      efectconveractivosequi(updatedData.Activos.ActivosEquivalentesEfectivo);
    updatedData.Activos.ActivosEquivalentesEfectivo.Total.MenorValorFiscal =
      menorfiscalactivosequi(updatedData.Activos.ActivosEquivalentesEfectivo);
    updatedData.Activos.ActivosEquivalentesEfectivo.Total.MayorValorFiscal =
      mayorfiscalactivosequi(updatedData.Activos.ActivosEquivalentesEfectivo);
    updatedData.Activos.ActivosEquivalentesEfectivo.Total.ValorFiscal =
      valorfiscalactivosequi(updatedData.Activos.ActivosEquivalentesEfectivo);
    // Calculo de los totales
    setData(updatedData);

    // Actualizar el estado con los nuevos datos

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      EsfPatrimonioService.updateAEsfPatrimonioFormStudent(updatedData);
      timeoutRef.current = null;
    }, 5000);
  };

  const tabs = [
    { name: "Activos", label: "Activos" },
    { name: "Pasivos", label: "Pasivos" },
    { name: "TotalPatrimonio", label: "Patrimonio Total" },
    { name: "PatrimonioContable", label: "Patrimonio" },
    { name: "DatosInformativos", label: "Datos Informativos" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const renderSections = (
    sectionData,
    pathPrefix,
    excludeSection = "",
    ValuesNamess = []
  ) => {
    if (Array.isArray(sectionData)) {
      return Object.keys(sectionData).map((sectionKey) => {
        if (sectionKey === excludeSection) return null;

        const ValuesNames = sectionData[sectionKey].Anio.toString();

        return (
          <Accordeon
            key={sectionKey}
            title={ValuesNames}
            arrayIndex={sectionKey}
          >
            <EsfValues
              title={ValuesNames}
              path={`${pathPrefix}.${sectionKey}`}
              data={sectionData[sectionKey]}
              handleChange={handleChange}
            />
          </Accordeon>
        );
      });
    }

    if (typeof sectionData !== "object" || sectionData === null) {
      return null; // Si no es un objeto, no renderizar nada
    }

    return Object.keys(sectionData).map((sectionKey) => {
      if (sectionKey === excludeSection) return null;

      const ValuesNames = ValuesNamess[sectionKey] || sectionKey;

      if (typeof sectionData[sectionKey] !== "object") {
        return (
          <div key={sectionKey}>
            <EsfValues
              title={ValuesNames}
              path={`${pathPrefix}.${sectionKey}`}
              data={sectionData[sectionKey]}
              handleChange={handleChange}
            />
          </div>
        );
      }
      return (
        <Accordeon key={sectionKey} title={ValuesNames}>
          <EsfValues
            title={ValuesNames}
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
        {activeTab === "Activos" &&
          renderSections(data.Activos, "Activos", "", ValuesNames)}
        {activeTab === "Pasivos" &&
          renderSections(data.Pasivos, "Pasivos", "", ValuesNames)}
        {activeTab === "TotalPatrimonio" &&
          renderSections(
            data.TotalPatrimonio,
            "TotalPatrimonio",
            "",
            ValuesNames
          )}
        {activeTab === "PatrimonioContable" &&
          renderSections(
            data.PatrimonioContable,
            "PatrimonioContable",
            "",
            ValuesNames
          )}
        {activeTab === "DatosInformativos" &&
          renderSections(
            data.DatosInformativos,
            "DatosInformativos",
            "",
            ValuesNames
          )}
      </section>
    </StudentLayout>
  );
};

export default ESFpatrimonio;
