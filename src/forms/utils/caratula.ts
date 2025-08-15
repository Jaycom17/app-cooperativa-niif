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
    }
  },
};
