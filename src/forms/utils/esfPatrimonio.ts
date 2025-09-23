import { calculateTotals, calculateTotalsSources } from "./totalOperations";

export const config = {
  byKey: {
    SaldosaFavor: {
      label: "Saldos a favor por el impuesto de renta",
    },
    SaldosaFavorOtrosImpuestos: {
      label: "Saldos a favor - otros impuestos y gravámenes",
    },
    AnticiposyOtros: {
      label: "Anticipos y otros",
    },
    ValorFiscal: {
      readonly: true,
    },
    EfectoConversion: {
      label:
        "EFECTO DE CONVERSIÓN (Moneda Funcional Diferente al peso Colombiano)",
    },
    MenorValorFiscal: {
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    MayorValorFiscal: {
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    InversionesInstrumentosFinancierosDerivadosVN: {
      label: "Inversiones e Instrumentos Financieros y Derivados - Valor Neto",
    },
  },
  byPath: {
    "Activos.ActivosEquivalentesEfectivo.Efectivo.ValorContable": {
      readonly: true,
    },
    "Activos.ActivosEquivalentesEfectivo.Efectivo.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosEquivalentesEfectivo.Efectivo.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosEquivalentesEfectivo.EquivalentesEfectivo.ValorContable": {
      readonly: true,
    },
    "Activos.ActivosEquivalentesEfectivo.EquivalentesEfectivo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosEquivalentesEfectivo.EquivalentesEfectivo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosRecompraInversiones.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosRecompraInversiones.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosRecompraInversiones.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosResultados.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosResultados.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosResultados.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosORI.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosORI.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosORI.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.MetodoParticipacion.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.MetodoParticipacion.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.MetodoParticipacion.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.AlCosto.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.AlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.AlCosto.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioCosto.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioCosto.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableResultados.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableResultados.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableResultados.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableORI.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableORI.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableORI.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosNegociación.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosNegociación.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosNegociación.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosCobertura.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosCobertura.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosCobertura.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosFiduciarios.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosFiduciarios.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosFiduciarios.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Metodo.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Metodo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Metodo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Costo.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Costo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Costo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InstrumentosDeudaPatrimoniooCosto.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InstrumentosDeudaPatrimoniooCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InstrumentosDeudaPatrimoniooCosto.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.DerechosFiduciarios.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Otros.ValorContable":
      { readonly: true },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Otros.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Otros.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasComercialesPorCobrar.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasComercialesPorCobrar.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasComercialesPorCobrar.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarSociosAccionistasParticipes.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarSociosAccionistasParticipes.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarSociosAccionistasParticipes.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ReclamacionesPorCobrar.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ReclamacionesPorCobrar.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ReclamacionesPorCobrar.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.AnticiposPagos.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.AnticiposPagos.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.AnticiposPagos.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.OtrasCuentasDocumentosPorCobrar.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.OtrasCuentasDocumentosPorCobrar.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.OtrasCuentasDocumentosPorCobrar.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CarteraDeCredito.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CarteraDeCredito.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CarteraDeCredito.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.OtrasCuentasPorCobrar.ValorContable":
      { readonly: true },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.OtrasCuentasPorCobrar.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.OtrasCuentasPorCobrar.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.ParaLaVentaNoProducidosPorLaEmpresa.ValorContable": {
      readonly: true,
    },
    "Activos.Inventarios.ParaLaVentaNoProducidosPorLaEmpresa.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.ParaLaVentaNoProducidosPorLaEmpresa.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.EnTransito.ValorContable": { readonly: true },
    "Activos.Inventarios.EnTransito.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.EnTransito.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.MateriasPrimasSuministrosMateriales.ValorContable": {
      readonly: true,
    },
    "Activos.Inventarios.MateriasPrimasSuministrosMateriales.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.MateriasPrimasSuministrosMateriales.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.EnProcesoDiferentesDeObrasInmueblesEnConstruccionParaVenta.ValorContable":
      { readonly: true },
    "Activos.Inventarios.EnProcesoDiferentesDeObrasInmueblesEnConstruccionParaVenta.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.EnProcesoDiferentesDeObrasInmueblesEnConstruccionParaVenta.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.CostosPrestadoresServicios.ValorContable": {
      readonly: true,
    },
    "Activos.Inventarios.CostosPrestadoresServicios.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.CostosPrestadoresServicios.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.ProductoTerminadoDiferentesObrasInmueblesTerminadosParaVenta.ValorContable":
      { readonly: true },
    "Activos.Inventarios.ProductoTerminadoDiferentesObrasInmueblesTerminadosParaVenta.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.ProductoTerminadoDiferentesObrasInmueblesTerminadosParaVenta.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.ObrasInmueblesConstruccionParaVenta.ValorContable": {
      readonly: true,
    },
    "Activos.Inventarios.ObrasInmueblesConstruccionParaVenta.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.ObrasInmueblesConstruccionParaVenta.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.ObrasInmueblesTerminadosParaVenta.ValorContable": {
      readonly: true,
    },
    "Activos.Inventarios.ObrasInmueblesTerminadosParaVenta.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.ObrasInmueblesTerminadosParaVenta.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.PiezasRepuestoEquipoAuxiliarClasificadosComoInventarios.ValorContable":
      { readonly: true },
    "Activos.Inventarios.PiezasRepuestoEquipoAuxiliarClasificadosComoInventarios.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.PiezasRepuestoEquipoAuxiliarClasificadosComoInventarios.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.Inventarios.DeterioroAcumuladoValorInventarios.ValorContable": {
      readonly: true,
    },
    "Activos.Inventarios.DeterioroAcumuladoValorInventarios.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.Inventarios.DeterioroAcumuladoValorInventarios.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.Publicidad.ValorContable": {
      readonly: true,
    },
    "Activos.GastosPagadosPorAnticipado.Publicidad.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.Publicidad.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.PrimasSeguros.ValorContable": {
      readonly: true,
    },
    "Activos.GastosPagadosPorAnticipado.PrimasSeguros.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.PrimasSeguros.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.Arrendamientos.ValorContable": {
      readonly: true,
    },
    "Activos.GastosPagadosPorAnticipado.Arrendamientos.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.Arrendamientos.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.Otros.ValorContable": {
      readonly: true,
    },
    "Activos.GastosPagadosPorAnticipado.Otros.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.GastosPagadosPorAnticipado.Otros.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosImpuestosCorrientes.SaldosaFavor.ValorContable": {
      readonly: true,
    },
    "Activos.ActivosImpuestosCorrientes.SaldosaFavor.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosImpuestosCorrientes.SaldosaFavor.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosImpuestosCorrientes.SaldosaFavorOtrosImpuestos.ValorContable":
      { readonly: true },
    "Activos.ActivosImpuestosCorrientes.SaldosaFavorOtrosImpuestos.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosImpuestosCorrientes.SaldosaFavorOtrosImpuestos.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosImpuestosCorrientes.AnticiposyOtros.ValorContable": {
      readonly: true,
    },
    "Activos.ActivosImpuestosCorrientes.AnticiposyOtros.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosImpuestosCorrientes.AnticiposyOtros.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosImpuestosDiferidos.ValorContable": { readonly: true },
    "Activos.PropiedadesPlantaEquipo.Terrenos.ValorContable": {
      readonly: true,
    },
    "Activos.PropiedadesPlantaEquipo.Terrenos.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.PropiedadesPlantaEquipo.Terrenos.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.PropiedadesPlantaEquipo.ConstruccionesEnProceso.ValorContable": {
      readonly: true,
    },
    "Activos.PropiedadesPlantaEquipo.ConstruccionesEnProceso.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesPlantaEquipo.ConstruccionesEnProceso.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesPlantaEquipo.Edificios.Costo.ValorContable": {
      readonly: true,
    },
    "Activos.PropiedadesPlantaEquipo.Edificios.Costo.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.PropiedadesPlantaEquipo.Edificios.AjusteAcumuladoRevaluacionesReexpresiones.ValorContable":
      { readonly: true },
    "Activos.PropiedadesPlantaEquipo.ActivosTangiblesExploracionEvaluacionRecursosMinerales.ValorContable":
      { readonly: true },
    "Activos.PropiedadesPlantaEquipo.DepreciacionAcumuladaPropiedadesPlantaEquipo.ValorContable":
      { readonly: true },
    "Activos.PropiedadesPlantaEquipo.DepreciacionAcumuladaPropiedadesPlantaEquipo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesPlantaEquipo.DepreciacionAcumuladaPropiedadesPlantaEquipo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesPlantaEquipo.DeterioroAcumuladoPropiedadesPlantaEquipo.ValorContable":
      { readonly: true },
    "Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Costo.ValorContable":
      { readonly: true },
    "Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Costo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Costo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.AjusteAcumuladoRevaluacionesReexpresiones.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.ActivosIntangiblesExploracionEvaluacionRecursosMinerales.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.ActivosIntangiblesExploracionEvaluacionRecursosMinerales.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.ActivosIntangiblesExploracionEvaluacionRecursosMinerales.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.MarcasPatentesLicenciasOtrosDerechos.Costo.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.MarcasPatentesLicenciasOtrosDerechos.Costo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.MarcasPatentesLicenciasOtrosDerechos.Costo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.MarcasPatentesLicenciasOtrosDerechos.AjusteAcumuladoRevaluacionesReexpresiones.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.AmortizacionAcumuladaActivosIntangiblesDistintosPlusvalia.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.AmortizacionAcumuladaActivosIntangiblesDistintosPlusvalia.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.AmortizacionAcumuladaActivosIntangiblesDistintosPlusvalia.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.DeterioroAcumuladoActivosIntangiblesDistintosPlusvalia.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.OtrosActivosIntangibles.AjusteAcumuladoRevaluacionesReexpresiones.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.OtrosActivosIntangibles.Costo.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.OtrosActivosIntangibles.Costo.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.ActivosIntangiblesDistintosPlusvalia.OtrosActivosIntangibles.Costo.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.AdquisicionEstablecimientoComercio.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.AdquisicionEstablecimientoComercio.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.AdquisicionEstablecimientoComercio.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.Fusiones.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.Fusiones.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.Fusiones.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.Escisiones.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.Escisiones.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.Escisiones.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.CompraAcciones.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.CompraAcciones.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.PlusvaliaGoodwill.CompraAcciones.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.AmortizacionAcumuladaPlusvaliaGoodwill.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.AmortizacionAcumuladaPlusvaliaGoodwill.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.AmortizacionAcumuladaPlusvaliaGoodwill.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.DeterioroAcumuladoPlusvaliaGoodwill.ValorContable":
      { readonly: true },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.DeterioroAcumuladoPlusvaliaGoodwill.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosIntangibles.PlusvaliaGoodwill.PlusvaliaGoodwill.DeterioroAcumuladoPlusvaliaGoodwill.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesInversion.TerrenoEdificios.AlCosto.ValorContable": {
      readonly: true,
    },
    "Activos.PropiedadesInversion.TerrenoEdificios.AlCosto.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.PropiedadesInversion.TerrenoEdificios.AlCosto.MayorValorFiscal": {
      readonly: true,
      label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.PropiedadesInversion.TerrenoEdificios.AlValorRazonable.ValorContable":
      { readonly: true },
    "Activos.PropiedadesInversion.TerrenoEdificios.AlValorRazonable.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesInversion.TerrenoEdificios.AlValorRazonable.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesInversion.DepreciacionAcumuladaPropiedadesInversion.ValorContable":
      { readonly: true },
    "Activos.PropiedadesInversion.DepreciacionAcumuladaPropiedadesInversion.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesInversion.DepreciacionAcumuladaPropiedadesInversion.MayorValorFiscal":
      {
        readonly: true,
        label: "MAYOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.PropiedadesInversion.DeterioroAcumuladoPropiedadesInversion.ValorContable":
      { readonly: true },
    "Activos.ActivosNoCorrientes.MantenidosParaVenta.ValorContable": {
      readonly: true,
    },
    "Activos.ActivosNoCorrientes.MantenidosParaVenta.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.ActivosNoCorrientes.DeterioroAcumuladoActivosCorrientesMantenidosParaVenta.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesProductoresMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesProductoresMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.AnimalesVivos.DepreciacionAcumuladaDeAnimalesProductoresMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.DepreciacionAcumuladaDeAnimalesProductoresMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.AnimalesVivos.DeterioroAcumuladoDeAnimalesProductoresMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.DeterioroAcumuladoDeAnimalesProductoresMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesProductoresMedidosAlValorRazonableMenosCostosDeVenta.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesProductoresMedidosAlValorRazonableMenosCostosDeVenta.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesConsumiblesMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesConsumiblesMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.AnimalesVivos.DeterioroAcumuladoAnimalesConsumiblesMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.DeterioroAcumuladoAnimalesConsumiblesMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesConsumiblesMedidosAlValorRazonableMenosCostosDeVenta.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.AnimalesVivos.AnimalesConsumiblesMedidosAlValorRazonableMenosCostosDeVenta.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.PlantasProductorasMedidasAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.PlantasProductorasMedidasAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.DepreciacionAcumuladaDePlantasProductoras.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.DepreciacionAcumuladaDePlantasProductoras.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.DeterioroAcumuladoDePlantasProductoras.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.DeterioroAcumuladoDePlantasProductoras.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.PlantasProductorasMedidasAlValorRazonable.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.PlantasProductorasMedidasAlValorRazonable.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.CultivosConsumiblesMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.CultivosConsumiblesMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.DeterioroAcumuladoCultivosConsumiblesMedidosAlCosto.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.DeterioroAcumuladoCultivosConsumiblesMedidosAlCosto.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.CultivosConsumiblesMedidosAlValorRazonableMenosCostosDeVenta.ValorContable":
      { readonly: true },
    "Activos.ActivosBiologicos.PlantasProductorasCultivosConsumibles.CultivosConsumiblesMedidosAlValorRazonableMenosCostosDeVenta.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Activos.OtrosActivos.ActivosPlanBeneficiosEmpleados.ValorContable": {
      readonly: true,
    },
    "Activos.OtrosActivos.ActivosPlanBeneficiosEmpleados.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Activos.OtrosActivos.ActivosReconocidosSolamenteFinesFiscales.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.ObligacionesFinancierasEnMonedaLocal.ValorContable":
      { readonly: true },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.ObligacionesFinancierasEnMonedaLocal.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.ObligacionesFinancierasEnMonedaExtranjera.ValorContable":
      { readonly: true },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.ObligacionesFinancierasEnMonedaExtranjera.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.CuentasPorPagarASociosAccionistasOParticipes.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.RecaudoAFavorDeTerceros.ValorContable":
      { readonly: true },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.RecaudoAFavorDeTerceros.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.OtrasCuentasYDocumentosPorPagarEnMonedaLocal.ValorContable":
      { readonly: true },
    "Pasivos.ObligacionesFinancierasCuentasPorPagar.OtrasCuentasYDocumentosPorPagarEnMonedaLocal.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.ImpuestosGravamenesTasasPorPagar.ImpuestoRenta.ValorContable": {
      readonly: true,
    },
    "Pasivos.ImpuestosGravamenesTasasPorPagar.ImpuestoRenta.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Pasivos.ImpuestosGravamenesTasasPorPagar.IVA.ValorContable": {
      readonly: true,
    },
    "Pasivos.ImpuestosGravamenesTasasPorPagar.IVA.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Pasivos.ImpuestosGravamenesTasasPorPagar.Otrosimpuestos.ValorContable": {
      readonly: true,
    },
    "Pasivos.ImpuestosGravamenesTasasPorPagar.Otrosimpuestos.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.PasivosImpuestosDiferidos.ValorContable": { readonly: true },
    "Pasivos.PasivosBeneficiosEmpleados.CortoPlazo.ValorContable": {
      readonly: true,
    },
    "Pasivos.PasivosBeneficiosEmpleados.CortoPlazo.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Pasivos.Provisiones.mantenimientoYReparaciones.ValorContable": {
      readonly: true,
    },
    "Pasivos.PasivosIngresosDiferidos.AnticiposYAvancesRecibidosDeClientes.ValorContable":
      { readonly: true },
    "Pasivos.PasivosIngresosDiferidos.AnticiposYAvancesRecibidosDeClientes.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.PasivosIngresosDiferidos.OtrosPasivosPorIngresosDiferidos.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.OtrosPasivos.DepositosRecibidos.ValorContable": { readonly: true },
    "Pasivos.OtrosPasivos.DepositosRecibidos.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Pasivos.OtrosPasivos.RetencionesATercerosSobreContratos.ValorContable": {
      readonly: true,
    },
    "Pasivos.OtrosPasivos.RetencionesATercerosSobreContratos.MenorValorFiscal":
      {
        readonly: true,
        label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
      },
    "Pasivos.OtrosPasivos.CuentasEnParticipacion.ValorContable": {
      readonly: true,
    },
    "Pasivos.OtrosPasivos.CuentasEnParticipacion.MenorValorFiscal": {
      readonly: true,
      label: "MENOR VALOR FISCAL (por reconocimiento, exenciones, etc.)",
    },
    "Pasivos.OtrosPasivos.OtrosPasivos.ValorContable": { readonly: true },
    "Pasivos.OtrosPasivos.OtrosPasivos.ValorFiscal": { readonly: true },
    "PatrimonioContable.CapitalSocialReservas.CapitalPagado.ValorContable": {
      readonly: true,
    },
    "PatrimonioContable.CapitalSocialReservas.SuperavitRevaluaciones.ValorContable":
      { readonly: true },
    "PatrimonioContable.CapitalSocialReservas.SuperavitMetodoParticipacion.ValorContable":
      { readonly: true },
    "PatrimonioContable.ResultadoEjercicio.UtilidadOExcedenteDelEjercicioEnOperacionesContinuadas.ValorContable":
      { readonly: true },
    "PatrimonioContable.ResultadoEjercicio.PerdidaODeficitDelEjercicioEnOperacionesContinuadas.ValorContable":
      { readonly: true },
    "PatrimonioContable.ResultadosAcumulados.UtilidadesOExcedentesAcumuladosSusceptiblesDeDistribucionATituloDeNoConstitutivoDeRentaNiGananciaOcasional.ValorContable":
      { readonly: true },
    "PatrimonioContable.ResultadosAcumulados.PerdidasODeficitAcumulados.ValorContable":
      { readonly: true },
    "PatrimonioContable.GananciasPerdidasAcumuladasRetenidasAdopcionPrimera.GananciasPrimeraVez.ValorContable":
      { readonly: true },
    "PatrimonioContable.GananciasPerdidasAcumuladasRetenidasAdopcionPrimera.PerdidasPrimeraVez.ValorContable":
      { readonly: true },
    "PatrimonioContable.OtroResultadoIntegralAcumulado.GananciasAcomuladasORI.ValorContable":
      { readonly: true },
    "PatrimonioContable.OtroResultadoIntegralAcumulado.PerdidasAcumuladasORI.ValorContable":
      { readonly: true },
  },
};

export const calculatedValorFiscal = (data: any) => {
  if (data?.ValorFiscal == null) {
    return;
  }

  data.ValorFiscal =
    (data?.ValorContable || 0) +
    (data?.EfectoConversion || 0) -
    (data?.MenorValorFiscal || 0) +
    (data?.MayorValorFiscal || 0);
};

export const calculateFirstValorFiscal = (
  obj: any,
  data: any,
  parents: any = [],
  arrayPath: string[] = []
) => {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "number") {
      if (!parents.includes(obj)) {
        parents.push(obj);
        calculatedValorFiscal(obj);
        calculateTotals(
          arrayPath,
          data,
          "Total",
          /^(AmortizacionAcumulada|DeterioroAcumulado|DepreciacionAcumulada|AccionesCuotasPartesInteresSocialPropiasCartera|PerdidaODeficitDelEjercicioEnOperacionesContinuadas|PerdidaODeficitDelEjercicioEnOperacionesDiscontinuadas|PerdidasODeficitAcumulados|PerdidasAcumuladasPorAjustesPorCorreccionesDeErrores|PerdidasPorAjustesPorCambiosEnPoliticasContables|PerdidasPrimeraVez|AjusteNegativoPorEfectoConversion|PerdidasAcumuladasORI)/
        );
      }
    }

    if (typeof value === "object" && value !== null) {
      calculateFirstValorFiscal(value, data, parents, [...arrayPath, key]);
    }
  }
};

const calculateTotalInversionesIntrumentosFinancierosDerivadosVN = (
  data: any
) => {
  data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorContable =
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.InversionesInstrumentosFinancierosDerivados?.Total?.ValorContable ||
      0) -
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.DeterioroAcumuladoInversiones?.Total?.ValorContable || 0);

  data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.EfectoConversion =
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.InversionesInstrumentosFinancierosDerivados?.Total?.EfectoConversion ||
      0) -
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.DeterioroAcumuladoInversiones?.Total?.EfectoConversion || 0);

  data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MenorValorFiscal =
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.InversionesInstrumentosFinancierosDerivados?.Total?.MenorValorFiscal ||
      0) -
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.DeterioroAcumuladoInversiones?.Total?.MenorValorFiscal || 0);

  data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MayorValorFiscal =
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.InversionesInstrumentosFinancierosDerivados?.Total?.MayorValorFiscal ||
      0) -
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.DeterioroAcumuladoInversiones?.Total?.MayorValorFiscal || 0);

  data.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorFiscal =
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.InversionesInstrumentosFinancierosDerivados?.Total?.ValorFiscal || 0) -
    (data?.Activos?.InversionesInstrumentosFinancierosDerivadosVN
      ?.DeterioroAcumuladoInversiones?.Total?.ValorFiscal || 0);
};

const calculateTotalCuentasComercialesPorCobrar = (data: any) => {
  data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorContable =
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.CuentasDocumentosPorCobrar?.Total?.ValorContable || 0) -
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.ValorContable ||
      0);

  data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.EfectoConversion =
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.CuentasDocumentosPorCobrar?.Total?.EfectoConversion || 0) -
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
      ?.EfectoConversion || 0);

  data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MenorValorFiscal =
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.CuentasDocumentosPorCobrar?.Total?.MenorValorFiscal || 0) -
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
      ?.MenorValorFiscal || 0);

  data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MayorValorFiscal =
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.CuentasDocumentosPorCobrar?.Total?.MayorValorFiscal || 0) -
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total
      ?.MayorValorFiscal || 0);

  data.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorFiscal =
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.CuentasDocumentosPorCobrar?.Total?.ValorFiscal || 0) -
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar
      ?.DeterioroAcumuladoValorCuentasDocumentosCobrar?.Total?.ValorFiscal ||
      0);
};

const calculateTotalActivosIntangibles = (data: any) => {
  data.Activos.ActivosIntangibles.Total.ValorContable =
    (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
      ?.Total?.ValorContable || 0) +
    (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
      ?.ValorContable || 0);

  data.Activos.ActivosIntangibles.Total.EfectoConversion =
    (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
      ?.Total?.EfectoConversion || 0) +
    (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
      ?.EfectoConversion || 0);

  data.Activos.ActivosIntangibles.Total.MenorValorFiscal =
    (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
      ?.Total?.MenorValorFiscal || 0) +
    (data?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.PlusvaliaGoodwill
      ?.Total?.MenorValorFiscal || 0);

  data.Activos.ActivosIntangibles.Total.MayorValorFiscal =
    (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
      ?.Total?.MayorValorFiscal || 0) +
    (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total
      ?.MayorValorFiscal || 0);

  data.Activos.ActivosIntangibles.Total.ValorFiscal =
    (data?.Activos?.ActivosIntangibles?.ActivosIntangiblesDistintosPlusvalia
      ?.Total?.ValorFiscal || 0) +
    (data?.Activos?.ActivosIntangibles?.PlusvaliaGoodwill?.Total?.ValorFiscal ||
      0);
};

const calculateTotalActivosBiologicos = (data: any) => {
  data.Activos.ActivosBiologicos.Total.ValorContable =
    (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.ValorContable ||
      0) +
    (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
      ?.Total?.ValorContable || 0);

  data.Activos.ActivosBiologicos.Total.EfectoConversion =
    (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.EfectoConversion ||
      0) +
    (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
      ?.Total?.EfectoConversion || 0);

  data.Activos.ActivosBiologicos.Total.MenorValorFiscal =
    (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.MenorValorFiscal ||
      0) +
    (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
      ?.Total?.MenorValorFiscal || 0);

  data.Activos.ActivosBiologicos.Total.MayorValorFiscal =
    (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.MayorValorFiscal ||
      0) +
    (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
      ?.Total?.MayorValorFiscal || 0);

  data.Activos.ActivosBiologicos.Total.ValorFiscal =
    (data?.Activos?.ActivosBiologicos?.AnimalesVivos?.Total?.ValorFiscal || 0) +
    (data?.Activos?.ActivosBiologicos?.PlantasProductorasCultivosConsumibles
      ?.Total?.ValorFiscal || 0);
};

const calculateTotalPatrimonio = (data: any) => {
  data.TotalPatrimonio.ValorContable =
    (data?.Activos?.Total?.ValorContable || 0) -
    (data?.Pasivos?.Total?.ValorContable || 0);

  data.TotalPatrimonio.EfectoConversion =
    (data?.Activos?.Total?.EfectoConversion || 0) -
    (data?.Pasivos?.Total?.EfectoConversion || 0);

  data.TotalPatrimonio.MenorValorFiscal =
    (data?.Activos?.Total?.MenorValorFiscal || 0) -
    (data?.Pasivos?.Total?.MenorValorFiscal || 0);

  data.TotalPatrimonio.MayorValorFiscal =
    (data?.Activos?.Total?.MayorValorFiscal || 0) -
    (data?.Pasivos?.Total?.MayorValorFiscal || 0);

  data.TotalPatrimonio.ValorFiscal =
    (data?.Activos?.Total?.ValorFiscal || 0) -
    (data?.Pasivos?.Total?.ValorFiscal || 0);
};

export const calculateAll = (newData: any, arrayPath: string[]) => {
  if (arrayPath.length !== 0) {
    calculateTotals(
      arrayPath,
      newData,
      "Total",
      /^(AmortizacionAcumulada|DeterioroAcumulado|DepreciacionAcumulada|AccionesCuotasPartesInteresSocialPropiasCartera|PerdidaODeficitDelEjercicioEnOperacionesContinuadas|PerdidaODeficitDelEjercicioEnOperacionesDiscontinuadas|PerdidasODeficitAcumulados|PerdidasAcumuladasPorAjustesPorCorreccionesDeErrores|PerdidasPorAjustesPorCambiosEnPoliticasContables|PerdidasPrimeraVez|AjusteNegativoPorEfectoConversion|PerdidasAcumuladasORI)/
    );
  }

  calculateTotalInversionesIntrumentosFinancierosDerivadosVN(newData);
  calculateTotalCuentasComercialesPorCobrar(newData);
  calculateTotalActivosIntangibles(newData);
  calculateTotalActivosBiologicos(newData);

  calculateTotalsSources(
    newData?.Activos,
    [
      newData?.Activos?.ActivosEquivalentesEfectivo?.Total,
      newData?.Activos?.InversionesInstrumentosFinancierosDerivadosVN?.Total,
      newData?.Activos?.CuentasComercialesCobrarOtrasPorCobrar?.Total,
      newData?.Activos?.Inventarios?.Total,
      newData?.Activos?.GastosPagadosPorAnticipado?.Total,
      newData?.Activos?.ActivosImpuestosCorrientes?.Total,
      newData?.Activos?.ActivosImpuestosDiferidos?.Total,
      newData?.Activos?.PropiedadesPlantaEquipo?.Total,
      newData?.Activos?.ActivosIntangibles?.Total,
      newData?.Activos?.PropiedadesInversion?.Total,
      newData?.Activos?.ActivosNoCorrientes?.Total,
      newData?.Activos?.ActivosBiologicos?.Total,
      newData?.Activos?.OtrosActivos?.Total,
    ],
    "Total"
  );

  calculateTotalsSources(
    newData?.Pasivos,
    [
      newData?.Pasivos?.ObligacionesFinancierasCuentasPorPagar?.Total,
      newData?.Pasivos?.ArrendamientosPorPagar?.Total,
      newData?.Pasivos?.OtrosPasivosFinancieros?.Total,
      newData?.Pasivos?.ImpuestosGravamenesTasasPorPagar?.Total,
      newData?.Pasivos?.PasivosImpuestosDiferidos?.Total,
      newData?.Pasivos?.PasivosBeneficiosEmpleados?.Total,
      newData?.Pasivos?.Provisiones?.Total,
      newData?.Pasivos?.PasivosIngresosDiferidos?.Total,
      newData?.Pasivos?.OtrosPasivos?.Total,
    ],
    "Total"
  );

  calculateTotalPatrimonio(newData);

  calculateTotalsSources(
    newData?.PatrimonioContable,
    [
      newData?.PatrimonioContable?.CapitalSocialReservas?.Total,
      newData?.PatrimonioContable?.ResultadoEjercicio?.Total,
      newData?.PatrimonioContable?.ResultadosAcumulados?.Total,
      newData?.PatrimonioContable
        ?.GananciasPerdidasAcumuladasRetenidasAdopcionPrimera?.Total,
      newData?.PatrimonioContable?.OtroResultadoIntegralAcumulado?.Total,
    ],
    "Total"
  );
};
