interface ActivosFijosValuesProps {
    title: string;
    path: string;
    data: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, path: string) => void;
}

function ActivosFijosValues({ title, path, data, handleChange }: ActivosFijosValuesProps) {
    const contablesValorTotalKeys = [
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

    const contablesDatosInformativosKeys = [
        "ValorActivosLeasing",
        "DesmantelamientoRestauracion",
        "ValorRevaluacion",
    ];

    const fiscalesValorTotalKeys = [
        "SaldoComienzo",
        "IncrementosTransferencias",
        "DisminucionesTransferencias",
        "SubtotalFinalPeriodo",
        "Depreciacion",
        "TotalNeto",
        "GastoFiscalPeriodo",
    ];

    const fiscalesDatosInformativosKeys = [
        "ValorTotal",
        "DepreacionFinal",
        "ValorNeto",
        "GastoFiscal",
    ];

    const friendlyNames = {
        "Comienzo": "Importe al comienzo del período",
        "Incrementos": "Incrementos",
        "Disminuciones": "Disminuciones",
        "Depreciacion": "Depreciación o amortización acumulada al final del período",
        "Deterioro": "Deterioro acumulado al final del período",
        "ImporteNeto": "Importe Neto al final del período",
        "GastoDepreciacion": "Gasto del período por depreciación o amortización",
        "GastoDetereorio": "Gasto del período por deterioro",
        "IngresosPeriodoDetereorio": "Ingresos del período por recuperación del deterioro",
        "ValorActivosLeasing": "Valor Activos Leasing",
        "DesmantelamientoRestauracion": "Desmantelamiento y Restauración",
        "ValorRevaluacion": "Valor Revaluación",
        "SaldoComienzo": "Saldo al Comienzo",
        "IncrementosTransferencias": "Incrementos y Transferencias",
        "DisminucionesTransferencias": "Disminuciones y Transferencias",
        "SubtotalFinalPeriodo": "Subtotal al Final del Período",
        "TotalNeto": "Total Neto",
        "GastoFiscalPeriodo": "Gasto Fiscal del Período",
        "ValorTotal": "Valor Total",
        "DepreacionFinal": "Depreciación Final",
        "ValorNeto": "Valor Neto",
        "GastoFiscal": "Gasto Fiscal"
    };

    const renderSection = (sectionData, keys, sectionTitle, category) => (
        <section className="flex flex-col gap-3 border rounded-md p-2">
            <h3 className="font-semibold text-xl">{sectionTitle}</h3>
            <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3">
                {keys.map((key) => (
                    <article key={key} className="flex flex-col border p-3 rounded-md">
                        <h4 className="mb-3 text-lg font-medium">{friendlyNames[key]}</h4>
                        <section className="flex flex-col gap-y-2">
                            {typeof sectionData[key] === "object" ? (
                                Object.entries(sectionData[key]).map(([subKey, subValue]) => (
                                    <div key={subKey} className="flex flex-col space-y-2 bg-white">
                                        <label className="bg-white font-semibold text-sm" htmlFor={subKey}>
                                            {friendlyNames[subKey] || subKey}
                                        </label>
                                        <input
                                            className="bg-white border rounded-md p-1"
                                            type="number"
                                            name={subKey}
                                            value={subValue === 0 ? '' : subValue}
                                            placeholder="0"
                                            onChange={(e) => handleChange(e, `${path}.${category}.${key}.${subKey}`)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col space-y-2 bg-white">
                                    <label className="bg-white font-semibold text-sm" htmlFor={key}>
                                        {friendlyNames[key]}
                                    </label>
                                    <input
                                        className="bg-white border rounded-md p-1"
                                        type="number"
                                        name={key}
                                        value={sectionData[key] === 0 ? '' : sectionData[key]}
                                        placeholder="0"
                                        onChange={(e) => handleChange(e, `${path}.${category}.${key}`)}
                                    />
                                </div>
                            )}
                        </section>
                    </article>
                ))}
            </section>
        </section>
    );

    return (
        <div className="flex flex-col border my-4 rounded-md p-4 gap-4 bg-white">
            <h3 className="w-full font-bold text-xl pb-2">{title}</h3>
            <section className="flex flex-col gap-3 border rounded-md p-2">
                <h3 className="font-semibold text-2xl text-center">Datos contables</h3>
                {data.Contables && (
                    <>
                        {renderSection(data.Contables, contablesValorTotalKeys, "Valor total, incluyendo arrendamiento financiero o leasing financiero", "Contables")}
                        {renderSection(data.Contables, contablesDatosInformativosKeys, "Datos informativos", "Contables")}
                    </>
                )}
            </section>
            <section className="flex flex-col gap-3 border rounded-md p-2">
                <h3 className="font-semibold text-2xl text-center">Datos Fiscales</h3>
                {data.Fiscales && (
                    <>
                        {renderSection(data.Fiscales, fiscalesValorTotalKeys, "Valor total, incluyendo arrendamiento financiero o leasing financiero", "Fiscales")}
                        {renderSection(data.Fiscales, fiscalesDatosInformativosKeys, "Datos informativos", "Fiscales")}
                    </>
                )}
            </section>
        </div>
    );
}

export default ActivosFijosValues;
