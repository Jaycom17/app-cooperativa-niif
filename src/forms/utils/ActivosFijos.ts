//Datos calculados automáticamente del json
export const ActivosFijosTotal = [
    "ImporteNeto.Costo",
    "ImporteNeto.Ajuste",
    "SubtotalFinalPeriodo",
    "TotalNeto", "ValorNeto"
];

//Rutas o caminos del json
export const paths = [
    "Contables.Comienzo.Costo",
    "Contables.Comienzo.Conversion",
    "Contables.Comienzo.Ajuste",
    "Contables.Incrementos.Transferencias",
    "Contables.Incrementos.CambiosValorRazonable",
    "Contables.Disminuciones.Transferencias",
    "Contables.Disminuciones.CambiosValorRazonable",
    "Contables.Depreciacion.Costo",
    "Contables.Depreciacion.Conversion",
    "Contables.Depreciacion.Ajuste",
    "Contables.Deterioro",
    "Contables.ImporteNeto.Costo",
    "Contables.ImporteNeto.Ajuste",
    "Contables.GastoDepreciacion.Costo",
    "Contables.GastoDepreciacion.Ajuste",
    "Contables.GastoDetereorio",
    "Contables.IngresosPeriodoDetereorio",
    "Contables.ValorActivosLeasing",
    "Contables.DesmantelamientoRestauracion",
    "Contables.ValorRevaluacion",
    "Fiscales.SaldoComienzo",
    "Fiscales.IncrementosTransferencias",
    "Fiscales.DisminucionesTransferencias",
    "Fiscales.SubtotalFinalPeriodo",
    "Fiscales.Depreciacion",
    "Fiscales.TotalNeto",
    "Fiscales.GastoFiscalPeriodo",
    "Fiscales.ValorTotal",
    "Fiscales.DepreacionFinal",
    "Fiscales.ValorNeto",
    "Fiscales.GastoFiscal",
];

//Nombres más completos y amigables de las secciones
export const friendlyNames = {
    Comienzo: "Importe al comienzo del período (No incluye Depreciación, amortización o deterioro)",
    Incrementos: "Incrementos",
    Disminuciones: "Disminuciones",
    Depreciacion: "Depreciación y/o amortización acumulada al final del período",
    Deterioro: "Deterioro acumulado al final del período",
    ImporteNeto: "Importe Neto al final del período (Calculado)",
    GastoDepreciacion: "Gasto del período por depreciación o amortización",
    GastoDetereorio: "Gasto del período por deterioro",
    IngresosPeriodoDetereorio: "Ingresos del período por recuperación del deterioro",
    ValorActivosLeasing: "Valor de activos adquiridos mediante arrendamiento financiero o Leasing",
    DesmantelamientoRestauracion: "Desmantelamiento, restauración y rehabilitación total acumulado al final del período",
    ValorRevaluacion: "Mayor valor por revaluación acumulado al final del período",
    SaldoComienzo: "Saldo al comienzo del período ",
    IncrementosTransferencias: "Incrementos por transferencias, adquisiciones  y otros cambios",
    DisminucionesTransferencias: "Disminuciones  por transferencias y otros cambios",
    SubtotalFinalPeriodo: "Subtotal al final del período (Calculado)",
    TotalNeto: "Total Neto al final del período (Calculado)",
    GastoFiscalPeriodo: "Gasto fiscal por Depreciación y/o amortización del período",
    ValorTotal: "Valor total al final del periodo",
    DepreacionFinal: "Depreciación Final",
    ValorNeto: "Valor Neto al final del período (Calculado)",
    GastoFiscal: "Gasto fiscal Depreciación y/o Amortización del período",
    CambiosValorRazonable: "Cambios de valor razonable",
};

export const friendlyNamesPPE = {
    Terrenos: "Terrenos",
    Edificios: "Edificios",
    Maquinaria: "Maquinaria",
    Buques: "Buques",
    Aeronave: "Aeronave",
    EquiposTransporte: "Equipos de transporte",
    EnseresAccesorios: "Enseres y accesorios",
    EquiposInformaticos: "Equipos informáticos",
    EquiposRedesComunicacion: "Equipos de redes y comunicación",
    InfraestructuraRed: "Infraestructura de red",
    ActivosTangiblesExploracionEvaluacion: "Activos tangibles de exploración y evaluación",
    ActivosMineria: "Activos de minería",
    ActivosPetroleoGas: "Activos de petróleo y gas",
    PPyEArrendamientoOperativo: "PP&E en arrendamiento operativo",
    PlantasProductoras: "Plantas productoras",
    AnimalesProductores: "Animales productores",
    ConstruccionesProceso: "Construcciones en proceso",
    Otras: "Otras propiedades, plantas y equipo",
};

export const friendlyNamesAI = {
    MarcasComerciales: "Marcas comerciales",
    ActivosIntangiblesExploracionEvaluacion: "Activos intangibles de exploración y evaluación",
    CabecerasOeriodicosRevistasTitulosPublicaciones: "Cabeceras de periódicos, revistas, títulos de publicaciones",
    ProgramasAplicacionesInformaticos: "Programas y aplicaciones informáticos",
    LicenciasFranquicias: "Licencias y Franquicias",
    PropiedadIntelectualPatentesPropiedadIndustrialServiciosDerechosOperacion: "Propiedad intelectual, patentes y otra propiedad industrial, servicios y derechos de operación",
    RecetasFormulasModelosDiseñosPrototipos: "Recetas, fórmulas, modelos, diseños y prototipos",
    Concesiones: "Concesiones",
    DesembolsosDesarrolloCapitalizados: "Desembolsos de desarrollo capitalizados",
    ActivosIntangiblesDesarrollo: "Activos intangibles en desarrollo",
    Plusvalia: "Plusvalía",
    MejorasDerechosArrendamiento: "Mejoras de derechos de arrendamiento",
    SubvencionesEstado: "Subvenciones del Estado",
    Otros: "Otros activos intangibles",
};

//Llaves para diferenciar las secciones del json
export const contablesValorTotalKeys = [
    "Comienzo",
    "Incrementos",
    "Disminuciones",
    "Depreciacion",
    "Deterioro",
    "ImporteNeto",
    "GastoDepreciacion",
    "GastoDetereorio",
    "IngresosPeriodoDetereorio",
];

export const contablesDatosInformativosKeys = [
    "ValorActivosLeasing",
    "DesmantelamientoRestauracion",
    "ValorRevaluacion",
];

export const fiscalesValorTotalKeys = [
    "SaldoComienzo",
    "IncrementosTransferencias",
    "DisminucionesTransferencias",
    "SubtotalFinalPeriodo",
    "Depreciacion",
    "TotalNeto",
    "GastoFiscalPeriodo",
];

export const fiscalesDatosInformativosKeys = [
    "ValorTotal",
    "DepreacionFinal",
    "ValorNeto",
    "GastoFiscal",
];

//Funciones de cálculo
export const calculateCostoImpNetoFinPeriodo = (currentData) => {
    return (currentData.Contables.Comienzo.Costo || 0) + (currentData.Contables.Comienzo.Conversion || 0) + (currentData.Contables.Incrementos.Transferencias || 0) - (currentData.Contables.Disminuciones.Transferencias || 0) - (currentData.Contables.Depreciacion.Costo || 0) - (currentData.Contables.Depreciacion.Conversion || 0) + (currentData.Contables.Deterioro || 0);
}

export const calculateAjusteImpNetoFinPeriodo = (currentData) => {
    return (currentData.Contables.Comienzo.Ajuste || 0) + (currentData.Contables.Incrementos.CambiosValorRazonable || 0) - (currentData.Contables.Disminuciones.CambiosValorRazonable || 0) - (currentData.Contables.Depreciacion.Ajuste || 0)
}

export const calculateSubTotalFinPeriodo = (currentData) => {
    return (currentData.Fiscales.SaldoComienzo || 0) + (currentData.Fiscales.IncrementosTransferencias || 0) - (currentData.Fiscales.DisminucionesTransferencias || 0)
}

export const calculateTotalNetoFinPeriodo = (currentData) => {
    return (currentData.Fiscales.SubtotalFinalPeriodo || 0) - (currentData.Fiscales.Depreciacion || 0)
}

export const calculateValorNetoFinPeriodo = (currentData) => {
    return (currentData.Fiscales.ValorTotal || 0) - (currentData.Fiscales.DepreacionFinal || 0)
}

export const calcultateTotal = (target, elements) => {
    // Inicializamos el objeto "Total" dentro de la sección con cero
    const totals = {};

    // Inicializamos cada ruta en el objeto "totals"
    paths.forEach(path => {
        totals[path] = 0;
    });

    // Iteramos sobre cada elemento
    elements.forEach(element => {
        // Iteramos sobre cada ruta
        paths.forEach(path => {
            const keys = path.split('.');
            let value = element;
            
            keys.forEach(key => {
                if (value) {
                    value = value[key];
                } else {
                    value = 0;
                }
            });
            // Sumamos el valor al total correspondiente
            if (typeof value === 'number') {
                totals[path] += value;
            }
        });
    });

    // Asignamos los totales a la sección "Total"
    paths.forEach(path => {
        const keys = path.split('.');
        let tempTarget = target;  // Usamos una variable temporal para no modificar el target original
        
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                tempTarget[key] = totals[path];
            } else {
                if (!tempTarget[key]) tempTarget[key] = {};
                tempTarget = tempTarget[key];
            }
        });
    });
    return totals;
}