export const config = {
  byKey: {
    TarifGen: {
      label: "Tarifa general art.240 ET",
    },
    Año: { 
      widget: "number" as const 
    },
    NumeroDeIdentificacionTributariaNIT: { 
      widget: "number" as const 
    },
    DV: { 
      widget: "number" as const 
    },
    NoIdentificacionSignatario: { 
      widget: "number" as const 
    },
    CodigoRepresentacion: { 
      widget: "number" as const  // ejemplo
    },
    CodigoContadorORevisorFiscal: { 
      widget: "number" as const 
    },
    NumeroDeTarjetaProfesional: { 
      widget: "number" as const 
    },
    DatosDelDeclante: {
      label: "Datos Del Declarante",
    },
    EntidadCooperativaArticulo19EstatutoTributario: {
      label: "Entidad Cooperativa (artículo 19-4 Estatuto Tributario)"
    },
    ObligadoAAplicarSistemasEspecialesDeCaloracionDeInversiones: {
      label: "Obligado A Aplicar Sistemas Especiales de Valoración de Inversiones"
    },
    ProgresividadDeLaTarifaDeImpuestoDeRentaOSociedadExtranjeraOEntidadExtranjeraSinSucursalOEstablecimientoPermanente: {
      label: "Progresividad De La Tarifa De Impuesto De Renta, O, Sociedad Extranjera O Entidad Extranjera Sin Sucursal O Establecimiento Permanente"
    }
  },
};
