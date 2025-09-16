import { calculateTotalsSources } from "./totalOperations";

export const config = {
  byKey: {
    TarifaGeneralArticulo240ET: {
        label: "Tarifa general art. 240 ET"
    },
  },
  byPath: {
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesAlTerritorioNacional.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesAlTerritorioNacional.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesAlTerritorioNacional.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesAOtrosPaises.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesAOtrosPaises.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesAOtrosPaises.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesZonaFranca.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesZonaFranca.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesZonaFranca.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesComercializadorasInternacionales.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesComercializadorasInternacionales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesComercializadorasInternacionales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesJurisdiccionesNoCooperantesDeBajaONulaImposicionYRegiminesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesJurisdiccionesNoCooperantesDeBajaONulaImposicionYRegiminesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesJurisdiccionesNoCooperantesDeBajaONulaImposicionYRegiminesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesVinculadoEconomicosZonaFrancaYExterior.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesVinculadoEconomicosZonaFrancaYExterior.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.VentaDeBienesVinculadoEconomicosZonaFrancaYExterior.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosAlTerritorioNacional.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosAlTerritorioNacional.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosAlTerritorioNacional.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosExportacionAOtrosPaises.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosExportacionAOtrosPaises.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosExportacionAOtrosPaises.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosZonaFranca.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosZonaFranca.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosZonaFranca.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosComercializadorasInternacionales.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosComercializadorasInternacionales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosComercializadorasInternacionales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosJurisdiccionesNoCooperantesDeBajaONulaImposicionYRegiminesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosJurisdiccionesNoCooperantesDeBajaONulaImposicionYRegiminesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosJurisdiccionesNoCooperantesDeBajaONulaImposicionYRegiminesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosVinculadoEconomicosZonaFrancaYExterior.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosVinculadoEconomicosZonaFrancaYExterior.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.PrestacionDeServiciosVinculadoEconomicosZonaFrancaYExterior.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ServiciosDeConstruccion.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ServiciosDeConstruccion.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ServiciosDeConstruccion.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.AcuerdosDeConcesionDeServicios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.AcuerdosDeConcesionDeServicios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.AcuerdosDeConcesionDeServicios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ArrendamientosOperativos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ArrendamientosOperativos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ArrendamientosOperativos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.Regalías.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.Regalías.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.Regalías.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ComisionesRelacionesDeAgencia.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ComisionesRelacionesDeAgencia.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ComisionesRelacionesDeAgencia.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.HonorariosProfesionales.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.HonorariosProfesionales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.HonorariosProfesionales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ActividadesDeSegurosYDeCapitalizacion.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ActividadesDeSegurosYDeCapitalizacion.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ActividadesDeSegurosYDeCapitalizacion.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.LiberacionDeReservasEnContratosDeSeguros.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.LiberacionDeReservasEnContratosDeSeguros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.LiberacionDeReservasEnContratosDeSeguros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ComisionesBancariasCostosDeTransaccionEntreOtros.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ComisionesBancariasCostosDeTransaccionEntreOtros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.ComisionesBancariasCostosDeTransaccionEntreOtros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.OtrosIngresos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.OtrosIngresos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.IngresosNetosActividadIndustrialComercialYServicios.OtrosIngresos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.EnVentaDeBienes.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.EnPrestacionDeServicios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.EnPrestacionDeServicios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.EnPrestacionDeServicios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.OtrasDevolucionesRebajasYDescuentos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.OtrasDevolucionesRebajasYDescuentos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosNetosActividadIndustrialComercialYServicios.DevolucionesRebajasYDescuentos.OtrasDevolucionesRebajasYDescuentos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.ArrendamientoFinancieroOMercantilLeasing.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.ArrendamientoFinancieroOMercantilLeasing.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.ArrendamientoFinancieroOMercantilLeasing.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesSectorFinanciero.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesSectorFinanciero.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesSectorFinanciero.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesPorPrestamosATercerosDistintosAlSectorFinanciero.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesPorPrestamosATercerosDistintosAlSectorFinanciero.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesPorPrestamosATercerosDistintosAlSectorFinanciero.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.PorInstrumentosFinancierosMedidosACostoAmortizadoDistintoAPrestamos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.InteresesImplicitosTransaccionesDeFinanciacion.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.DiferenciaEnCambio.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.DiferenciaEnCambio.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.DiferenciaEnCambio.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.OtrosIngresosFinancieros.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosFinancieros.OtrosIngresosFinancieros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.GananciasPorElMetodoDeParticipacion.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.GananciasCambiosEnElValorRazonable.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesNoConstitutivosDeRentaNiGananciaOcasionalIncluyeCapitalizacionesNoGravadas.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesNoConstitutivosDeRentaNiGananciaOcasionalIncluyeCapitalizacionesNoGravadas.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesNoConstitutivosDeRentaNiGananciaOcasionalIncluyeCapitalizacionesNoGravadas.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosOParticipacionesDistribuidosPorEntidadesNoResidentesEnColombiaAUnaCHCYPrimaEnColocacionDeAcciones.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasALaTarifaGeneralProvenientesDeSeciedadesYEntidadesExtranjerasODeSociedadesNacionales.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasRecibidasPorPersonasNaturalesSinResidenciaFiscalAnio2016YAnteriores.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasRecibidasPorPersonasNaturalesSinResidenciaFiscalAnio2016YAnteriores.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasRecibidasPorPersonasNaturalesSinResidenciaFiscalAnio2017YSiguientes.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasRecibidasPorPersonasNaturalesSinResidenciaFiscalAnio2017YSiguientes.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasRecibidasPorPersonasNaturalesSinResidenciaFiscalAnio2017YSiguientes.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasAl10Porciento.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYOParticipacionesGravadasATarifaGeneralEPYSociedadesExtranjerasUtilidadesGeneradasAPartirDelAnio2017.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYParticipacionesProvenientesDeProyectosCalificadosComoMegaInversionGravadasAl27Porciento.ValorContable": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYParticipacionesProvenientesDeProyectosCalificadosComoMegaInversionGravadasAl27Porciento.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.DividendosYParticipacionesProvenientesDeProyectosCalificadosComoMegaInversionGravadasAl27Porciento.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorMedicionesAValorRazonable.ActivosBiologicos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorMedicionesAValorRazonable.PropiedadesDeInversion.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorMedicionesAValorRazonable.InstrumentosFinancierosDistintoAInversionesEnSubsidiariasAsociadasYONegociosConjuntos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorMedicionesAValorRazonable.InstrumentosDerivados.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorMedicionesAValorRazonable.Otros.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PropiedadesPlantaYEquipo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PropiedadesPlantaYEquipo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PropiedadesDeInversion.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PropiedadesDeInversion.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PropiedadesDeInversion.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosBiologicosSinPlantasProductoras.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosBiologicosSinPlantasProductoras.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosBiologicosSinPlantasProductoras.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosIntangibles.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosIntangibles.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.ActivosIntangibles.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.InversionesEnAccionesYOtrasParticipaciones.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.InversionesEnAccionesYOtrasParticipaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.InversionesEnAccionesYOtrasParticipaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PorDisposicionDeOtrosInstrumentosFinancieros.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PorDisposicionDeOtrosInstrumentosFinancieros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.PorDisposicionDeOtrosInstrumentosFinancieros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.Otros.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.Otros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios.Otros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.AjustesFiscales.AdicionDeIngresos.InteresesPresuntos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.AjustesFiscales.AdicionDeIngresos.OtrosIngresosFiscalesYNoIncluidosContablemente.ValorFiscal": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostosDeVentasCalculadoPorElSistemaPermanente.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostosDeVentasCalculadoPorElSistemaPermanente.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostosDeVentasCalculadoPorElSistemaPermanente.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.InventarioInicial.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.InventarioInicial.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.InventarioInicial.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.ComprasLocales.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.ComprasLocales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.ComprasLocales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.Importaciones.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.Importaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.Importaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.InventarioFinal.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.InventarioFinal.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.MateriasPrimasProduccion.InventarioFinal.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.InventarioInicial.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.InventarioInicial.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.InventarioInicial.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.ComprasLocales.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.ComprasLocales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.ComprasLocales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.Importaciones.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.Importaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.Importaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.InventarioFinal.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.InventarioFinal.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostoBienesVendidos.InventarioFinal.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.ProductosEnProceso.InventarioInicial.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.ProductosEnProceso.InventarioInicial.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.ProductosEnProceso.InventarioInicial.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.ProductosEnProceso.InventarioFinal.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.ProductosEnProceso.InventarioFinal.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.ProductosEnProceso.InventarioFinal.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostosEnLaPrestacionDeServicios.ValorContable": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostosEnLaPrestacionDeServicios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.MateriasPrimasReventaDeBienesTerminadosYServicios.CostosEnLaPrestacionDeServicios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.DeCortoPlazo.ValorContable": {
    "readonly": true
  },
  "Costos.ManoObra.DeCortoPlazo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.DeCortoPlazo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.DeLargoPlazo.ValorContable": {
    "readonly": true
  },
  "Costos.ManoObra.DeLargoPlazo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.DeLargoPlazo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.PorTerminacionDeVinculoLaboral.ValorContable": {
    "readonly": true
  },
  "Costos.ManoObra.PorTerminacionDeVinculoLaboral.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.PorTerminacionDeVinculoLaboral.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.PostEmpleo.ValorContable": {
    "readonly": true
  },
  "Costos.ManoObra.PostEmpleo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.ManoObra.PostEmpleo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelAjusteAcumunladoPorAjusteAculudadoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelAjusteAcumunladoPorAjusteAculudadoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.DelCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.Cost.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.Cost.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.DelAjusteAcumunladoPorAjusteAculudadoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelAjusteAcumunladoPorAjusteAculudadoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelAjusteAcumunladoPorAjusteAculudadoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.Inventarios.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.ActivosIntangibles.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.ActivosDeExploracionYEvaluacionDeRecursosMinerales.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.PropiedadesDeInversionMedidasAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.ActivosBiologicosMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.BienesDeArteYCulturaMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.CarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.CarteraDeCreditoYOperacionesDeLeasing.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.CarteraDeCreditoYOperacionesDeLeasing.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.DerechosDeUsoEnArrendamientosOperativosNIIF16.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.OtrosDeteriroros.ValorContable": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.OtrosDeteriroros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.DepresionacionesAmortizacionesYDeterioros.DeterioroDelValorDeLosActivos.OtrosDeteriroros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Arrendamientos.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.Arrendamientos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Arrendamientos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Seguros.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.Seguros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Seguros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Servicios.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.Servicios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Servicios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Honorarios.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.Honorarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.Honorarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.ServiciosTecnicos.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.AsistenciaTecnica.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.OtrosConceptosReconocidosComoCostosEnElEstadoDeResultados.ValorContable": {
    "readonly": true
  },
  "Costos.OtrosCostos.OtrosConceptosReconocidosComoCostosEnElEstadoDeResultados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.OtrosConceptosReconocidosComoCostosEnElEstadoDeResultados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Costos.OtrosCostos.OtrosCostosFiscalesNoReconocidosContablemente.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.ManoDeObra.DeCortoPlazo.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.ManoDeObra.DeCortoPlazo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.ManoDeObra.DeCortoPlazo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ImpuestosDistintosAlImpuestosDeRentaYComplementarios.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ImpuestosDistintosAlImpuestosDeRentaYComplementarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ImpuestosDistintosAlImpuestosDeRentaYComplementarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ArrendamientosOperativos.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ArrendamientosOperativos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ArrendamientosOperativos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ContribucionesYAfiliaciones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ContribucionesYAfiliaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ContribucionesYAfiliaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Honorarios.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Honorarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Honorarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Seguros.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Seguros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Seguros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ServiciosAdministrativos.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PropiedadesPlantaYEquipo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PropiedadesPlantaYEquipo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PropiedadesDeInversion.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PropiedadesDeInversion.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PropiedadesDeInversion.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosBiologicosSinPlantasProductoras.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosBiologicosSinPlantasProductoras.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosBiologicosSinPlantasProductoras.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosIntangibles.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosIntangibles.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.ActivosIntangibles.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.InversionesEnAccionesYOtrasParticipaciones.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.InversionesEnAccionesYOtrasParticipaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.InversionesEnAccionesYOtrasParticipaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PorDisposicionDeOtrosInstrumentosFinancieros.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PorDisposicionDeOtrosInstrumentosFinancieros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.PorDisposicionDeOtrosInstrumentosFinancieros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.Otros.ValorContable": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.Otros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional.Otros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.Inventarios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.ActivosIntangibles.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.ActivosDeExploracionYEvaluacionDeRecursosMinerales.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.PropiedadesDeInversionMedidasAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.ActivosBiologicosMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.BienesDeArteYCultura.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.ActivosFinancierosDistintosACarteraDeCrediroYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.CarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.OtrasInversionesMedidasAlCostoOElMetodoDeLaParticipacion.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeDeterioroDelValor.OtrosDeterior.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.Garantias.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.ContratosOnerosos.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.Litigios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.ReembolsosAClientes.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.ReestructuracionesDeNegocios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.PasivosContingentesAsumidosEnUnaCombinacionDeNegocios.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos.Otros.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosDeCortoplazo.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosDeCortoplazo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosDeCortoplazo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosDeLargoPlazo.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosDeLargoPlazo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosDeLargoPlazo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosAEmpleadosPorTerminacionDelVinculoLaboral.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosAEmpleadosPorTerminacionDelVinculoLaboral.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosAEmpleadosPorTerminacionDelVinculoLaboral.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosAEmpleadosPostEmpleo.ValorContable": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosAEmpleadosPostEmpleo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados.BeneficiosAEmpleadosPostEmpleo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.TransferenciasSubvencionesYAyudasGubernamentales.ValorContable": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.TransferenciasSubvencionesYAyudasGubernamentales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.TransferenciasSubvencionesYAyudasGubernamentales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.DonacionesAportacionesYSimilares.ValorContable": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.DonacionesAportacionesYSimilares.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.DonacionesAportacionesYSimilares.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.ReembolsosDeCompaniasDeSeguroIndemnizaciones.ValorContable": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.ReembolsosDeCompaniasDeSeguroIndemnizaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.ReembolsosDeCompaniasDeSeguroIndemnizaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.OtrasIndemnizaciones.ValorContable": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.OtrasIndemnizaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.OtrasIndemnizaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.OtrasReversionesORecuperaciones.ValorContable": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.OtrasReversionesORecuperaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.OtrasReversionesORecuperaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.Otros.ValorContable": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.Otros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Ingresos.OtrosIngresos.Otros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - Regalias - NoVinculados
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Regalias.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - AsistenciaTecnica - VinculadosEconomicos
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - AsistenciaTecnica - JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.JurisdiccionesNoCooperantesBajaNulaImposicionDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - AsistenciaTecnica - NoVinculados
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.AsistenciaTecnica.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - OtrosServicios
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.OtrosServicios.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.OtrosServicios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.OtrosServicios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - InvestigacionYDesarrollo
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.InvestigacionYDesarrollo.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.InvestigacionYDesarrollo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.InvestigacionYDesarrollo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - GastosLegales
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.GastosLegales.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.GastosLegales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.GastosLegales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - ReparacionMantenimientoAdecuacionEInstalaciones
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ReparacionMantenimientoAdecuacionEInstalaciones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ReparacionMantenimientoAdecuacionEInstalaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.ReparacionMantenimientoAdecuacionEInstalaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - Transporte
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Transporte.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Transporte.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.Transporte.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - OtrosGastosDeAdministracion - OtrosGastos
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.OtrosGastos.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.OtrosGastos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.OtrosGastosDeAdministracion.OtrosGastos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DepreciacionPropiedadesPlantaYEquipo - DelCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DepreciacionPropiedadesPlantaYEquipo - DelAjusteAcumuladoPorRevaliacionesOReExpresiones
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DepreciacionPropiedadesDeInversion - DelCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DepreciacionPropiedadesDeInversion - DelAjusteAcumuladoPorRevaliacionesOReExpresiones
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesDeInversion.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesDeInversion.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DepreciacionPropiedadesDeInversion.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - OtrasDepreciaciones - DelCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasDepreciaciones.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasDepreciaciones.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasDepreciaciones.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - OtrasDepreciaciones - DelAjusteAcumuladoPorRevaliacionesOReExpresiones
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasDepreciaciones.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasDepreciaciones.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasDepreciaciones.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - AmortizacionActivosIntangibles - DelCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.AmortizacionActivosIntangibles.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.AmortizacionActivosIntangibles.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.AmortizacionActivosIntangibles.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - AmortizacionActivosIntangibles - DelAjusteAcumuladoPorRevaliacionesOReExpresiones
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.AmortizacionActivosIntangibles.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.AmortizacionActivosIntangibles.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.AmortizacionActivosIntangibles.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - OtrasAmortizaciones - DelCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasAmortizaciones.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasAmortizaciones.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasAmortizaciones.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - OtrasAmortizaciones - DelAjusteAcumuladoPorRevaliacionesOReExpresiones
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasAmortizaciones.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasAmortizaciones.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.OtrasAmortizaciones.DelAjusteAcumuladoPorRevaliacionesOReExpresiones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - Inventarios
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.Inventarios.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - PropiedadesPlantaYEquipo
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - ActivosIntangibles
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.ActivosIntangibles.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - ActivosDeExploracionYEvaluacionDeRecursosMinerales
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.ActivosDeExploracionYEvaluacionDeRecursosMinerales.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - PropiedadesDeInversionMedidasAlModeloDeCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.PropiedadesDeInversionMedidasAlModeloDeCosto.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - BienesDeArteYCulturaMedidosAlModeloDeCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.BienesDeArteYCulturaMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - ActivosBiologicosMedidosAlModeloDeCosto
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.ActivosBiologicosMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - CarteraDeCreditoYOperacionesDeLeasing
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.CarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.CarteraDeCreditoYOperacionesDeLeasing.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.CarteraDeCreditoYOperacionesDeLeasing.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - DerechosDeUsoEnArrendamientosOperativosNIIF16
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.DerechosDeUsoEnArrendamientosOperativosNIIF16.ValorContable": {
    "readonly": true
  },

  // Gastos - DeAdministracion - DepreciacionesAmortizacionesDeterioros - DeterioroDelValorDeLosActivos - OtrosDeterioros
  "Gastos.DeAdministracion.DepreciacionesAmortizacionesDeterioros.DeterioroDelValorDeLosActivos.OtrosDeterioros.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - ManoDeObra - DeCortoPlazo
  "Gastos.GastosDeDistribucionYVentas.ManoDeObra.DeCortoPlazo.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.ManoDeObra.DeCortoPlazo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.ManoDeObra.DeCortoPlazo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ImpuestosDistintosAlImpuestosDeRentaYComplementarios
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ImpuestosDistintosAlImpuestosDeRentaYComplementarios.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ImpuestosDistintosAlImpuestosDeRentaYComplementarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ImpuestosDistintosAlImpuestosDeRentaYComplementarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ArrendamientosOperativos
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ArrendamientosOperativos.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ArrendamientosOperativos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ArrendamientosOperativos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ContribucionesYAfiliaciones
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ContribucionesYAfiliaciones.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ContribucionesYAfiliaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ContribucionesYAfiliaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - Honorarios
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Honorarios.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Honorarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Honorarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - Seguros
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Seguros.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Seguros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Seguros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ServiciosAdministrativos - VinculadosEconomicos
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ServiciosAdministrativos - JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ServiciosAdministrativos - NoVinculados
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ServiciosAdministrativos.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - Regalias - VinculadosEconomicos
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - Regalias - JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - Regalias - NoVinculados
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Regalias.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - AsistenciaTecnica - VinculadosEconomicos
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.VinculadosEconomicos.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.VinculadosEconomicos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.VinculadosEconomicos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - AsistenciaTecnica - JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.JurisdiccionesNoCooperantesDeBajaONulaImposicionYRegimenesTributariosPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - AsistenciaTecnica - NoVinculados
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.NoVinculados.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.NoVinculados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.AsistenciaTecnica.NoVinculados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - OtrosServicios
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.OtrosServicios.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.OtrosServicios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.OtrosServicios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - InvestigacionYDesarrollo
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.InvestigacionYDesarrollo.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.InvestigacionYDesarrollo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.InvestigacionYDesarrollo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - GastosLegales
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.GastosLegales.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.GastosLegales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.GastosLegales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ReparacionMantenimientoAdecuacionEInstalaciones
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ReparacionMantenimientoAdecuacionEInstalaciones.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ReparacionMantenimientoAdecuacionEInstalaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ReparacionMantenimientoAdecuacionEInstalaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - Transporte
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Transporte.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Transporte.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.Transporte.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - ConstitucionReservasEmpresasAseguradoras
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ConstitucionReservasEmpresasAseguradoras.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ConstitucionReservasEmpresasAseguradoras.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.ConstitucionReservasEmpresasAseguradoras.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - LiquidacionDeSiniestros
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.LiquidacionDeSiniestros.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.LiquidacionDeSiniestros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.LiquidacionDeSiniestros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - PrimasDeReaseguros
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.PrimasDeReaseguros.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.PrimasDeReaseguros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.PrimasDeReaseguros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - OtrosGastosDeDistribucionYVentas - OtrosGastos
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.OtrosGastos.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.OtrosGastos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.OtrosGastosDeDistribucionYVentas.OtrosGastos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DepreciacionPropiedadesPlantaYEquipo - DelCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DepreciacionPropiedadesPlantaYEquipo - DelAjusteAcumunladoPorRevaluacionesOReExpresiones
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesPlantaYEquipo.DelAjusteAcumunladoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DepreciacionPropiedadesDeInversion - DelCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DepreciacionPropiedadesDeInversion - DelAjusteAcumunladoPorRevaluacionesOReExpresiones
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionPropiedadesDeInversion.DelAjusteAcumunladoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DepreciacionActivosBiologicos - DelCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DepreciacionActivosBiologicos - DelAjusteAcumunladoPorRevaluacionesOReExpresiones
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DepreciacionActivosBiologicos.DelAjusteAcumunladoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - AmortizacionActivosIntangibles - DelCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - AmortizacionActivosIntangibles - DelAjusteAcumunladoPorRevaluacionesOReExpresiones
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.AmortizacionActivosIntangibles.DelAjusteAcumunladoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - OtrasDepreciacionesYAmortizaciones - DelCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - OtrasDepreciacionesYAmortizaciones - DelAjusteAcumunladoPorRevaluacionesOReExpresiones
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasDepreciacionesYAmortizaciones.DelAjusteAcumunladoPorRevaluacionesOReExpresiones.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DeterioroDelValorActivos - Inventarios
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.Inventarios.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.Inventarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.Inventarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DeterioroDelValorActivos - PropiedadesPlantaYEquipo
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.PropiedadesPlantaYEquipo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.PropiedadesPlantaYEquipo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DeterioroDelValorActivos - ActivosIntangibles
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.ActivosIntangibles.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.ActivosIntangibles.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DeterioroDelValorActivos.ActivosIntangibles.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - ActivosDeExploracionYEvaluacionDeRecursosMinerales
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosDeExploracionYEvaluacionDeRecursosMinerales.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosDeExploracionYEvaluacionDeRecursosMinerales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosDeExploracionYEvaluacionDeRecursosMinerales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - PropiedadesDeInversionMedidasAlModeloDeCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.PropiedadesDeInversionMedidasAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.PropiedadesDeInversionMedidasAlModeloDeCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.PropiedadesDeInversionMedidasAlModeloDeCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosNoCorrientesMantenidosParaLaVentaDistribuirALosPropietarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - BienesDeArteYCulturaMedidosAlModeloDeCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.BienesDeArteYCulturaMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.BienesDeArteYCulturaMedidosAlModeloDeCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.BienesDeArteYCulturaMedidosAlModeloDeCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - ActivosBiologicosMedidosAlModeloDeCosto
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosBiologicosMedidosAlModeloDeCosto.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosBiologicosMedidosAlModeloDeCosto.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosBiologicosMedidosAlModeloDeCosto.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.ActivosFinancierosDistintosACarteraDeCreditoYOperacionesDeLeasing.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - CarteraDeCreditoYOperacionesDeLeasing
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.CarteraDeCreditoYOperacionesDeLeasing.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.CarteraDeCreditoYOperacionesDeLeasing.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.CarteraDeCreditoYOperacionesDeLeasing.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrasInversionesMedidasAlCostoOPorElMetodoDeLaParticipacion.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - DerechosDeUsoEnArrendamientosOperativosNIIF16
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DerechosDeUsoEnArrendamientosOperativosNIIF16.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DerechosDeUsoEnArrendamientosOperativosNIIF16.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.DerechosDeUsoEnArrendamientosOperativosNIIF16.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosDeDistribucionYVentas - DepreciacionesAmortizacionesYDeterioros - OtrosDeterioros
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrosDeterioros.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrosDeterioros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosDeDistribucionYVentas.DepreciacionesAmortizacionesYDeterioros.OtrosDeterioros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - InteresesDevengadosSectorFinanciero
  "Gastos.GastosFinancieros.InteresesDevengadosSectorFinanciero.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.InteresesDevengadosSectorFinanciero.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.InteresesDevengadosSectorFinanciero.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - InteresesDevengadosPorPrestamosDeDistintoAlSectorFinanciero
  "Gastos.GastosFinancieros.InteresesDevengadosPorPrestamosDeDistintoAlSectorFinanciero.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.InteresesDevengadosPorPrestamosDeDistintoAlSectorFinanciero.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.InteresesDevengadosPorPrestamosDeDistintoAlSectorFinanciero.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - PorInstrumentosFinancierosMedidosACostoAmortizadoDistintoAPrestamos
  "Gastos.GastosFinancieros.PorInstrumentosFinancierosMedidosACostoAmortizadoDistintoAPrestamos.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - CostosDeTransaccionComisionesBancariasTasasEntreOtros
  "Gastos.GastosFinancieros.CostosDeTransaccionComisionesBancariasTasasEntreOtros.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.CostosDeTransaccionComisionesBancariasTasasEntreOtros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.CostosDeTransaccionComisionesBancariasTasasEntreOtros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - DiferenciaEnCambio
  "Gastos.GastosFinancieros.DiferenciaEnCambio.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.DiferenciaEnCambio.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.DiferenciaEnCambio.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - InteresesImplicitosTransaccionesDeFinanciacion
  "Gastos.GastosFinancieros.InteresesImplicitosTransaccionesDeFinanciacion.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - ActualizacionDeProvisionesReconocidasAValorPresente
  "Gastos.GastosFinancieros.ActualizacionDeProvisionesReconocidasAValorPresente.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - InteresesPorAccionesPreferenciales
  "Gastos.GastosFinancieros.InteresesPorAccionesPreferenciales.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.InteresesPorAccionesPreferenciales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.InteresesPorAccionesPreferenciales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosFinancieros - OtrosGastosFinancierosReconocidosComoGastoEnElEstadoDeResultados
  "Gastos.GastosFinancieros.OtrosGastosFinancierosReconocidosComoGastoEnElEstadoDeResultados.ValorContable": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.OtrosGastosFinancierosReconocidosComoGastoEnElEstadoDeResultados.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.GastosFinancieros.OtrosGastosFinancierosReconocidosComoGastoEnElEstadoDeResultados.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos - PerdidasPorElMetodoDeParticipacion
  "Gastos.PerdidasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.PerdidasPorElMetodoDeParticipacion.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos - PerdidasPorMedicionesAValorRazonable
  "Gastos.PerdidasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos.PerdidasPorMedicionesAValorRazonable.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidasPorMedicionesAValorRazonable - ActivosBiologicos
  "Gastos.PerdidasPorMedicionesAValorRazonable.ActivosBiologicos.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidasPorMedicionesAValorRazonable - PropiedadesDeInversion
  "Gastos.PerdidasPorMedicionesAValorRazonable.PropiedadesDeInversion.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidasPorMedicionesAValorRazonable - InstrumentosFinancieros
  "Gastos.PerdidasPorMedicionesAValorRazonable.InstrumentosFinancieros.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidasPorMedicionesAValorRazonable - InstrumentosDerivados
  "Gastos.PerdidasPorMedicionesAValorRazonable.InstrumentosDerivados.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidasPorMedicionesAValorRazonable - Otras
  "Gastos.PerdidasPorMedicionesAValorRazonable.Otras.ValorContable": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - PropiedadesPlantaYEquipo
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PropiedadesPlantaYEquipo.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PropiedadesPlantaYEquipo.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PropiedadesPlantaYEquipo.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - PropiedadesDeInversion
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PropiedadesDeInversion.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PropiedadesDeInversion.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PropiedadesDeInversion.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ActivosNoCorrientesMantenidosParaLaVentaEntregarAPropietarios.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - ValoracionYVentaDeInversionesFondoDeLiquidezYTitulosParticipativos
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ValoracionYVentaDeInversionesFondoDeLiquidezYTitulosParticipativos.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ValoracionYVentaDeInversionesFondoDeLiquidezYTitulosParticipativos.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ValoracionYVentaDeInversionesFondoDeLiquidezYTitulosParticipativos.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - PorDisposicionDeOtrosInstrumentosFinancieros
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PorDisposicionDeOtrosInstrumentosFinancieros.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PorDisposicionDeOtrosInstrumentosFinancieros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.PorDisposicionDeOtrosInstrumentosFinancieros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - ActivosIntangibles
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ActivosIntangibles.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ActivosIntangibles.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.ActivosIntangibles.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - DescuentoEnOperacionesDeFactoring
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.DescuentoEnOperacionesDeFactoring.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.DescuentoEnOperacionesDeFactoring.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.DescuentoEnOperacionesDeFactoring.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - InversionesEnAccionesYOtrasParticipaciones
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.InversionesEnAccionesYOtrasParticipaciones.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.InversionesEnAccionesYOtrasParticipaciones.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.InversionesEnAccionesYOtrasParticipaciones.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - PerdidaEnLaVentaOEnajenacionDeActivosFijos - Otros
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.Otros.ValorContable": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.Otros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.PerdidaEnLaVentaOEnajenacionDeActivosFijos.Otros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - Garantias
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.Garantias.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - ContratosOnerosos
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.ContratosOnerosos.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - Litigios
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.Litigios.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - ReembolsosAClientes
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.ReembolsosAClientes.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - ReestructuracionesDeNegocios
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.ReestructuracionesDeNegocios.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - PasivosContingentesAsumidosEnUnaCombinacionDeNegocios
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.PasivosContingentesAsumidosEnUnaCombinacionDeNegocios.ValorContable": {
    "readonly": true
  },

  // Gastos - GastosPorProvisionesPasivosDeMontoOFechaInciertos - Otros
  "Gastos.GastosPorProvisionesPasivosDeMontoOFechaInciertos.Otros.ValorContable": {
    "readonly": true
  },

  // Gastos - OtrosGastos - TransferenciasSubvencionesYAyudasGubernamentales
  "Gastos.OtrosGastos.TransferenciasSubvencionesYAyudasGubernamentales.ValorContable": {
    "readonly": true
  },
  "Gastos.OtrosGastos.TransferenciasSubvencionesYAyudasGubernamentales.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.OtrosGastos.TransferenciasSubvencionesYAyudasGubernamentales.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - OtrosGastos - DonacionesAportacionesYSimilares
  "Gastos.OtrosGastos.DonacionesAportacionesYSimilares.ValorContable": {
    "readonly": true
  },

  // Gastos - OtrosGastos - ContribucionesAEducacionDeLosEmpleadosArt1072DelET
  "Gastos.OtrosGastos.ContribucionesAEducacionDeLosEmpleadosArt1072DelET.ValorContable": {
    "readonly": true
  },
  "Gastos.OtrosGastos.ContribucionesAEducacionDeLosEmpleadosArt1072DelET.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.OtrosGastos.ContribucionesAEducacionDeLosEmpleadosArt1072DelET.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // Gastos - OtrosGastos - Otros
  "Gastos.OtrosGastos.Otros.ValorContable": {
    "readonly": true
  },
  "Gastos.OtrosGastos.Otros.MenorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },
  "Gastos.OtrosGastos.Otros.MayorValorFiscalPorReconocimientoExencionesLimitaciones": {
    "readonly": true
  },

  // InformativoClasificacionDiferencias - DiferenciasPermanentesQueDisminuyenLaRentaLiquida - IngresosNoConstitutivosRenta
  "InformativoClasificacionDiferencias.DiferenciasPermanentesQueDisminuyenLaRentaLiquida.IngresosNoConstitutivosRenta.ValorFiscalAlQueTieneDerecho": {
    "readonly": true
  },

  // AjustesParaLiquidacion - MenosValorInversionesRealizadasEnElPeriodo
  "AjustesParaLiquidacion.MenosValorInversionesRealizadasEnElPeriodo": {
    "readonly": true
  },

  // AjustesParaLiquidacion - MasValorInversionesLiquidasEnElPeriodo
  "AjustesParaLiquidacion.MasValorInversionesLiquidasEnElPeriodo": {
    "readonly": true
  },

  // RentaLiquidaPorRecuperacionDeDeducciones
  "RentaLiquidaPorRecuperacionDeDeducciones.ValorFiscal": {
    "readonly": true
  },

  // Compensaciones - DePerdidasFiscales
  "Compensaciones.DePerdidasFiscales.ValorFiscal": {
    "readonly": true
  },

  // Compensaciones - DelExcesoDeRentaPresuntivaSobreRentaOrdinaria
  "Compensaciones.DelExcesoDeRentaPresuntivaSobreRentaOrdinaria.ValorFiscal": {
    "readonly": true
  },

  // RentaExenta
  "RentaExenta.ValorFiscal": {
    "readonly": true
  },

  // RentasGravablesRentaLiquida - PerdidasCompensadasModificadasPorLiquidacionOficial
  "RentasGravablesRentaLiquida.PerdidasCompensadasModificadasPorLiquidacionOficial.ValorFiscal": {
    "readonly": true
  },

  // RentasGravablesRentaLiquida - PasivosInexistentes
  "RentasGravablesRentaLiquida.PasivosInexistentes.ValorFiscal": {
    "readonly": true
  },

  // RentasGravablesRentaLiquida - OmisionDeActivos
  "RentasGravablesRentaLiquida.OmisionDeActivos.ValorFiscal": {
    "readonly": true
  },

  // RentasGravablesRentaLiquida - ComparacionPatrimonial
  "RentasGravablesRentaLiquida.ComparacionPatrimonial.ValorFiscal": {
    "readonly": true
  },

  // ImpuestoSobreLaRentaLiquidaGravable
  "ImpuestoSobreLaRentaLiquidaGravable.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - TotalGananciasOcasionalesGravables
  "GananciasOcasionalesGravables.TotalGananciasOcasionalesGravables.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - IngresosPorGananciaOcasionalEnVentaDeActivosFijos
  "GananciasOcasionalesGravables.IngresosPorGananciaOcasionalEnVentaDeActivosFijos.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - CostosPorGananciaOcasionalEnVentaDeActivosFijos
  "GananciasOcasionalesGravables.CostosPorGananciaOcasionalEnVentaDeActivosFijos.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - OtrasGananciasOcasionalesNoGravadasYExentas
  "GananciasOcasionalesGravables.OtrasGananciasOcasionalesNoGravadasYExentas.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - RentasDeudoresRegimenLey1116De2006Decretos560Y772De2020
  "GananciasOcasionalesGravables.RentasDeudoresRegimenLey1116De2006Decretos560Y772De2020.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - UtilizacionPerdidasFiscalesAcumuladasInc2Art15Decreto772De2020
  "GananciasOcasionalesGravables.UtilizacionPerdidasFiscalesAcumuladasInc2Art15Decreto772De2020.ValorFiscal": {
    "readonly": true
  },

  // GananciasOcasionalesGravables - ImpuestoDeGananciaOcasional
  "GananciasOcasionalesGravables.ImpuestoDeGananciaOcasional.ValorFiscal": {
    "readonly": true
  },

  // DescuentosTributarios
  "DescuentosTributarios.ValorFiscal": {
    "readonly": true
  },

  // DescuentosPorImpuestosPagadosEnElExteriorPorGananciasOcasionales
  "DescuentosPorImpuestosPagadosEnElExteriorPorGananciasOcasionales.ValorFiscal": {
    "readonly": true
  },

  // ValorInversionObrasPorImpuestosHastaEl50PorcientoDelValorDelImpuestoACargoModalidadDePago1
  "ValorInversionObrasPorImpuestosHastaEl50PorcientoDelValorDelImpuestoACargoModalidadDePago1.ValorFiscal": {
    "readonly": true
  },

  // DescuentoEfectivoInversionObrasPorImpuestosModalidadDePago2
  "DescuentoEfectivoInversionObrasPorImpuestosModalidadDePago2.ValorFiscal": {
    "readonly": true
  },

  // AnticipoRentaLiquidadoAnioAnterior
  "AnticipoRentaLiquidadoAnioAnterior.ValorFiscal": {
    "readonly": true
  },

  // AnticipoSobretasaLiquidadoAnioGravableAnterior
  "AnticipoSobretasaLiquidadoAnioGravableAnterior.ValorFiscal": {
    "readonly": true
  },

  // SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion - OtrasRetenciones - PorVentas
  "SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion.OtrasRetenciones.PorVentas.ValorFiscal": {
    "readonly": true
  },

  // SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion - OtrasRetenciones - PorServicios
  "SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion.OtrasRetenciones.PorServicios.ValorFiscal": {
    "readonly": true
  },

  // SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion - OtrasRetenciones - PorHonorariosYComisiones
  "SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion.OtrasRetenciones.PorHonorariosYComisiones.ValorFiscal": {
    "readonly": true
  },

  // SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion - OtrasRetenciones - PorRendimientosFinancieros
  "SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion.OtrasRetenciones.PorRendimientosFinancieros.ValorFiscal": {
    "readonly": true
  },

  // SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion - OtrasRetenciones - PorDividendosYParticipaciones
  "SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion.OtrasRetenciones.PorDividendosYParticipaciones.ValorFiscal": {
    "readonly": true
  },

  // SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion - OtrasRetenciones - OtrasRetenciones
  "SaldoAFavorAnioGravableAnteriorSinSolicitudDeDevolucionOCompensacion.OtrasRetenciones.OtrasRetenciones.ValorFiscal": {
    "readonly": true
  },

  // AnticipoRentaPorElAnioGravableSiguiente
  "AnticipoRentaPorElAnioGravableSiguiente.ValorFiscal": {
    "readonly": true
  },

  // AnticipoSobretasaInstitucionesFinancierasAnioGravableAnterior
  "AnticipoSobretasaInstitucionesFinancierasAnioGravableAnterior.ValorFiscal": {
    "readonly": true
  },

  // SobretasaInstitucionesFinancieras
  "SobretasaInstitucionesFinancieras.ValorFiscal": {
    "readonly": true
  },

  // AnticipoSobretasaInstitucionesFinancierasAnioGravableSiguiente
  "AnticipoSobretasaInstitucionesFinancierasAnioGravableSiguiente.ValorFiscal": {
    "readonly": true
  },

  // CreditoFiscalParaInversionesEnProyectosDeInvestigacionDesarrolloTecnologicoEInnovacionOVinculacionDeCapitalHumanoDeAltoNivelArt2561DelETCreadoConArt168Ley1955MayoDe2019
  "CreditoFiscalParaInversionesEnProyectosDeInvestigacionDesarrolloTecnologicoEInnovacionOVinculacionDeCapitalHumanoDeAltoNivelArt2561DelETCreadoConArt168Ley1955MayoDe2019.ValorFiscal": {
    "readonly": true
  },

  // Sanciones
  "Sanciones.ValorFiscal": {
    "readonly": true
  },

  // DatosInformativosConcepto - OtrosDatosInformativos - TotalCostosYGastosDeNomina
  "DatosInformativosConcepto.OtrosDatosInformativos.TotalCostosYGastosDeNomina.ValorContable": {
    "readonly": true
  },
  "DatosInformativosConcepto.OtrosDatosInformativos.TotalCostosYGastosDeNomina.ValorFiscal": {
    "readonly": true
  },

  // DatosInformativosConcepto - OtrosDatosInformativos - AportesAlSistemaDeSecuridadSocial
  "DatosInformativosConcepto.OtrosDatosInformativos.AportesAlSistemaDeSecuridadSocial.ValorContable": {
    "readonly": true
  },
  "DatosInformativosConcepto.OtrosDatosInformativos.AportesAlSistemaDeSecuridadSocial.ValorFiscal": {
    "readonly": true
  },

  // DatosInformativosConcepto - OtrosDatosInformativos - AportesAlSENAICBFCajasDeCompensacion
  "DatosInformativosConcepto.OtrosDatosInformativos.AportesAlSENAICBFCajasDeCompensacion.ValorContable": {
    "readonly": true
  },
  "DatosInformativosConcepto.OtrosDatosInformativos.AportesAlSENAICBFCajasDeCompensacion.ValorFiscal": {
    "readonly": true
  }
}

}

export const calculatedValorFiscal = (data: any) => {
    if (data?.ValorFiscal == null) {
      return;
    }

    data.ValorFiscal = (data?.ValorContable || 0) + (data?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) + (data?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
  }

  export const calculateValorFiscalSolicitado = (data: any) => {
    if (data?.ValorFiscalSolicitado == null) {
      return;
    }

    data.ValorFiscalAlQueTieneDerecho = (data?.ValorFiscalAlQueTieneDerecho || 0)
  }

  export const calculateOtras = (data: any) => {
    if (data?.Otras == null) {
      return;
    }

    data.Otras = (data?.ValorFiscal || 0);
  }

  export const calculateTotalIngresosNetosAvIn = (data: any) => {
    if (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.Total == null) {
      return;
    }

    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.ValorContable = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.ValorContable || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.ValorContable || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MenorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.ValorFiscal = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.ValorFiscal || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.ValorFiscal || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel9Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaDel9Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaDel9Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel15Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaDel15Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaDel15Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaDel20Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaDel20Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaDel20Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MegaInversiones = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MegaInversiones || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MegaInversiones || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.MegaInversiones27Porciento = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.MegaInversiones27Porciento || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.MegaInversiones27Porciento || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.TarifaGeneralArticulo240ET = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.TarifaGeneralArticulo240ET || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.TarifaGeneralArticulo240ET || 0);
    
    data.Ingresos.IngresosNetosActividadIndustrialComercialYServicios.Total.Otras = (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.IngresosNetosActividadIndustrialComercialYServicios?.Total?.Otras || 0) - (data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.DevolucionesRebajasYDescuentos?.Total?.Otras || 0);
  }
  
 export const calculateTotalIngresos = (data: any) => {
    calculateTotalsSources(data?.Ingresos,
      [
        data?.Ingresos?.IngresosNetosActividadIndustrialComercialYServicios?.Total,
        data?.Ingresos?.IngresosFinancieros?.Total,
        data?.Ingresos?.GananciasPorInversionesEnSubsidiariasAsociadasYONegociosConjuntos?.Total,
        data?.Ingresos?.IngresosPorMedicionesAValorRazonable?.Total,
        data?.Ingresos?.UtilidadEnLaVentaOEnajenacionDeActivosBienesPoseidosPorMenosDeDoAnios?.Total,
        data?.Ingresos?.UtilidadPorVentaOEnajenacionDeActivosBienesPoseidosPorDosAniosOMasGananciaOcasional?.Total,
        data?.Ingresos?.IngresosPorReversionDeDeterioroDelValor?.Total,
        data?.Ingresos?.IngresosPorReversionDeProvisionesPasivosDeMontoOFechaInciertos?.Total,
        data?.Ingresos?.IngresosPorReversionDePasivosPorBeneficiosALosEmpleados?.Total,
        data?.Ingresos?.OtrosIngresos?.Total,
        data?.Ingresos?.GananciasNetasEnOperacionesDiscontinuas,
      ],
      "TotalIngresos"
    );

    data.Ingresos.TotalIngresos.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.TotalIngresos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);

    data.Ingresos.TotalIngresos.ValorFiscal = (data?.Ingresos?.TotalIngresos?.ValorFiscal || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.ValorFiscal || 0);

    data.Ingresos.TotalIngresos.TarifaDel9Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel9Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaDel9Porciento || 0);

    data.Ingresos.TotalIngresos.TarifaDel15Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel15Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaDel15Porciento || 0);

    data.Ingresos.TotalIngresos.TarifaDel20Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel20Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaDel20Porciento || 0);

    data.Ingresos.TotalIngresos.MegaInversiones = (data?.Ingresos?.TotalIngresos?.MegaInversiones || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.MegaInversiones || 0);

    data.Ingresos.TotalIngresos.MegaInversiones27Porciento = (data?.Ingresos?.TotalIngresos?.MegaInversiones27Porciento || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.MegaInversiones27Porciento || 0);

    data.Ingresos.TotalIngresos.TarifaGeneralArticulo240ET = (data?.Ingresos?.TotalIngresos?.TarifaGeneralArticulo240ET || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.TarifaGeneralArticulo240ET || 0);

    data.Ingresos.TotalIngresos.Otras = (data?.Ingresos?.TotalIngresos?.Otras || 0) - (data?.Ingresos?.MenosIngresosNoConstitutivosDeRentaNiGananciaOcasional?.Otras || 0);
  }

  export const calculateGananciaOPerdida = (data: any) => {
    if (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida == null) {
      return;
    }
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.ValorContable = (data?.Ingresos?.TotalIngresos?.ValorContable || 0) - (data?.Costos?.TotalCostos?.ValorContable || 0) - (data?.Gastos?.TotalGastos?.ValorContable || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano = (data?.Ingresos?.TotalIngresos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.Costos?.TotalCostos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.Gastos?.TotalGastos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MenorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.TotalIngresos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Costos?.TotalCostos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Gastos?.TotalGastos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.Ingresos?.TotalIngresos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Costos?.TotalCostos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.Gastos?.TotalGastos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.ValorFiscal = (data?.Ingresos?.TotalIngresos?.ValorFiscal || 0) - (data?.Costos?.TotalCostos?.ValorFiscal || 0) - (data?.Gastos?.TotalGastos?.ValorFiscal || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel9Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel9Porciento || 0) - (data?.Costos?.TotalCostos?.TarifaDel9Porciento || 0) - (data?.Gastos?.TotalGastos?.TarifaDel9Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel15Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel15Porciento || 0) - (data?.Costos?.TotalCostos?.TarifaDel15Porciento || 0) - (data?.Gastos?.TotalGastos?.TarifaDel15Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaDel20Porciento = (data?.Ingresos?.TotalIngresos?.TarifaDel20Porciento || 0) - (data?.Costos?.TotalCostos?.TarifaDel20Porciento || 0) - (data?.Gastos?.TotalGastos?.TarifaDel20Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MegaInversiones = (data?.Ingresos?.TotalIngresos?.MegaInversiones || 0) - (data?.Costos?.TotalCostos?.MegaInversiones || 0) - (data?.Gastos?.TotalGastos?.MegaInversiones || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.MegaInversiones27Porciento = (data?.Ingresos?.TotalIngresos?.MegaInversiones27Porciento || 0) - (data?.Costos?.TotalCostos?.MegaInversiones27Porciento || 0) - (data?.Gastos?.TotalGastos?.MegaInversiones27Porciento || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.TarifaGeneralArticulo240ET = (data?.Ingresos?.TotalIngresos?.TarifaGeneralArticulo240ET || 0) - (data?.Costos?.TotalCostos?.TarifaGeneralArticulo240ET || 0) - (data?.Gastos?.TotalGastos?.TarifaGeneralArticulo240ET || 0);
    
    data.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida.Otras = (data?.Ingresos?.TotalIngresos?.Otras || 0) - (data?.Costos?.TotalCostos?.Otras || 0) - (data?.Gastos?.TotalGastos?.Otras || 0);
  }

  export const calculateLiquidasPasivasECE = (data: any) => {

    data.RentaLiquidaOrdinariaDelEjercicioIncluyendeoDividendosYAntesDeLasRentasLiquidasPasivasECE = (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) > 0 ? (data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) : 0;
    
    data.OPerdidaLiquidaOrdinariaDelEjercicioIncluyendoDividendosYAntesDeLaRentasLiquidasPasivasECE = ((data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) + (data?.Ingresos?.RentasLiquidasPasivasECE?.ValorFiscal || 0)) < 0 ? ((data?.GanaciaOPerdidaAntesDeImpuestoALaRentaORentaLiquida?.ValorFiscal || 0) + (data?.Ingresos?.RentasLiquidasPasivasECE?.ValorFiscal || 0)) : 0;

    data.RentasLiquidasPasivasECE.ValorContable = (data?.RentasPasivasECE?.Ingresos?.Total?.ValorContable || 0) - (data?.RentasPasivasECE?.Costos?.ValorContable || 0) - (data?.RentasPasivasECE?.Deduccionesl?.ValorContable || 0);

    data.RentasLiquidasPasivasECE.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano = (data?.RentasPasivasECE?.Ingresos?.Total?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.RentasPasivasECE?.Costos?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0) - (data?.RentasPasivasECE?.Deduccionesl?.EfectoConversionMonedaFuncionalDiferenteAlPesoColombiano || 0);

    data.RentasLiquidasPasivasECE.MenorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.RentasPasivasECE?.Ingresos?.Total?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Costos?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Deduccionesl?.MenorValorFiscalPorReconocimientoExencionesLimitaciones || 0);

    data.RentasLiquidasPasivasECE.MayorValorFiscalPorReconocimientoExencionesLimitaciones = (data?.RentasPasivasECE?.Ingresos?.Total?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Costos?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0) - (data?.RentasPasivasECE?.Deduccionesl?.MayorValorFiscalPorReconocimientoExencionesLimitaciones || 0);

    data.RentasLiquidasPasivasECE.ValorFiscal = (data?.RentasPasivasECE?.Ingresos?.Total?.ValorFiscal || 0) - (data?.RentasPasivasECE?.Costos?.ValorFiscal || 0) - (data?.RentasPasivasECE?.Deduccionesl?.ValorFiscal || 0);
  }

  export const calculateRentaLiquidaUnicamenteDividendos = (data: any) => {
    data.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral.ValorFiscal = (data?.RentaLiquidaOrdinariaDelEjercicioExcedenteNetoIncluyeUnicamenteDividendosDeSociedadesNacionalesATarifaGeneral?.ValorFiscal || 0) - (data?.Compensaciones?.Total?.ValorFiscal || 0);
  }

  export const calculateRentaPresuntiva = (data: any) => {
    data.RentaPresuntiva.BaseDeCalculoDeLaRentaPresuntiva.ValorFiscal = (data?.RentaPresuntiva?.PatrimonioLiquidoDelAnioOPeriodoGravableAnterior?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.AccionesYAportesPoseidosEnSociedadesNacionales?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesAfectadosPorHechosConstitutosDeFuerzaMayorOCasoFortuito?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesVinculadosAEmpresasEnPeriodoImproductivo?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesDestinadosExclusivamenteAActividadesDeportivas?.ValorFiscal || 0) + (data?.RentaPresuntiva?.ValorPatrimonialNeto?.BienesVinculadosAEmpresasExclusivamenteMineras?.ValorFiscal || 0) + (data?.RentaPresuntiva?.Primeras19000UVTDeActivosDestinadosAlSectorAgropecuario?.ValorFiscal || 0) + (data?.RentaPresuntiva?.OtrasExclusiones?.ValorFiscal || 0);

    data.RentaPresuntiva.CalculoRentaPresuntiva0PorcientoSalvoExcepciones.ValorFiscal = 0;

    data.RentaPresuntiva.Total.ValorFiscal = (data?.RentaPresuntiva?.BaseDeCalculoDeLaRentaPresuntiva?.ValorFiscal || 0);
  }

  export const calculateRentasLiquidasGravables = (data: any) => {

    const valueFiscal = (data?.RentaLquidaIncluyeDividendosDeSociedadesNacionalesATarifaGeneral?.ValorFiscal || 0) - (data?.RentaExenta?.ValorFiscal || 0) + (data?.RentasGravablesRentaLiquida?.Total?.ValorFiscal || 0);

    data.RentasLiquidasGravables.ValorFiscal = ((data?.RentaPresuntiva?.Total?.ValorFiscal || 0) > (data?.RentaExenta?.ValorFiscal || 0)) ? valueFiscal : 0;
  }

  export const calculateGananciasOcasionalesGravables = (data: any) => {
    data.GananciasOcasionalesGravables.TotalIngresosPorGananciasOcasionales.ValorFiscal = (data?.GananciasOcasionalesGravables?.IngresosPorGananciaOcasionalEnVentaDeActivosFijos?.ValorFiscal || 0) + (data?.GananciasOcasionalesGravables?.OtrosIngresosPorGananciaOcasional?.ValorFiscal || 0);

    data.GananciasOcasionalesGravables.TotalCostosPorGananciasOcasionales.ValorFiscal = (data?.GananciasOcasionalesGravables?.CostosPorGananciaOcasionalEnVentaDeActivosFijos?.ValorFiscal || 0) + (data?.GananciasOcasionalesGravables?.OtrosCostosPorGananciasOcasionales?.ValorFiscal || 0);
  }

  export const calculateTotalRetencionesAnioGravableQueDeclara = (data: any) => {
    data.TotalRetencionesAnioGravableQueDeclara.ValorFiscal = (data?.Autorretenciones?.TotalAutorretenciones?.ValorFiscal || 0) - (data?.OtrasRetenciones?.TotalOtrasRetenciones?.ValorFiscal || 0);
  }

  export const calculateInformativoOtroResultadoIntegralORII = (data: any) => {
    const valuesGanancia = (data?.InformativoOtroResultadoIntegralORII?.NoSeReclasificanAlResultado?.Total?.Ganancia || 0) + (data?.InformativoOtroResultadoIntegralORII?.SeReclasificanAlResultado?.Total?.Ganancia || 0);

    const valuesPerdida = (data?.InformativoOtroResultadoIntegralORII?.NoSeReclasificanAlResultado?.Total?.Perdida || 0) + (data?.InformativoOtroResultadoIntegralORII?.SeReclasificanAlResultado?.Total?.Perdida || 0);

    data.InformativoOtroResultadoIntegralORII.OTROResultadoIntegralAntesDeImpuestos.Ganancia = (valuesGanancia - valuesPerdida) > 0 ? (valuesGanancia - valuesPerdida) : 0;

    data.InformativoOtroResultadoIntegralORII.OTROResultadoIntegralAntesDeImpuestos.EfectoConversion = (valuesPerdida - valuesGanancia) > 0 ? (valuesPerdida - valuesGanancia) : 0;

    const auxValue = (data?.CreditoFiscalParaInversionesEnProyectosDeInvestigacionDesarrolloTecnologicoEInnovacionOVinculacionDeCapitalHumanoDeAltoNivelArt2561DelETCreadoConArt168Ley1955MayoDe2019?.ValorFiscal || 0) + ((data?.InformativoOtroResultadoIntegralORII?.OTROResultadoIntegralAntesDeImpuestos?.ValorFiscal || 0) - (data?.InformativoOtroResultadoIntegralORII?.OTROResultadoIntegralAntesDeImpuestos?.EfectoConversion || 0));

    data.InformativoOtroResultadoIntegralORII.ResultadoIntegralTotalDelAnio.Ganancia = auxValue > 0 ? auxValue : 0;

    data.InformativoOtroResultadoIntegralORII.ResultadoIntegralTotalDelAnio.Perdida = auxValue < 0 ? (auxValue * -1) : 0;
  }