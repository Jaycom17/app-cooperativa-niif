import { useState } from 'react';
import basicInformation from '../models/ESFPatrimonio.json';
import ESFvalues from '../components/Form110Values';
import AsideStudent from '../../components/organisms/AsideStudent';

const ESFpatrimonioForm = () => {
  const [data, setData] = useState(basicInformation);
  const [activeTab, setActiveTab] = useState('activos');
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubSection, setExpandedSubSection] = useState(null);
  const [expandedSubSubSection, setExpandedSubSubSection] = useState(null);

  const handleChange = (e, path) => {
    let { name, value } = e.target;

    if (value === '') value = 0;

    const newData = { ...data };
    path.reduce((acc, key, index) => {
      if (index === path.length - 1) {
        acc[key][name] = Number.parseInt(value);
      }
      return acc[key];
    }, newData);

    const calculateTotals = (obj) => {
      const totals = {};

      Object.entries(obj).forEach(([key, values]) => {
        if (key !== 'Total' && typeof values === 'object' && values !== null) {
          Object.entries(values).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'number') {
              if (!totals[subKey]) {
                totals[subKey] = 0;
              }
              totals[subKey] += subValue;
            }
          });
        }
      });

      return totals;
    };

    const parentPath = path.slice(0, -1);
    const parent = parentPath.reduce((acc, key) => acc[key], newData);

    if (parent && typeof parent === 'object' && parent.Total) {
      parent.Total = calculateTotals(parent);
    }

    setData(newData);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    setExpandedSubSection(null);
  };

  const toggleSubSection = (subSection) => {
    setExpandedSubSection(expandedSubSection === subSection ? null : subSection);
  };
  const toggleSubSubSection = (subSubSection) => {
    setExpandedSubSubSection(expandedSubSubSection === subSubSection ? null : subSubSection);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setExpandedSection(null);
    setExpandedSubSection(null);
  };

  return (
    <div className="flex bg-gray-100 rounded shadow-md">
      <AsideStudent />
      <div className="bg-white w-full p-2 mt-12 md:mt-0 overflow-auto max-h-screen">
        <div className="bg-white">
          <div className="flex">
            <button
              className={`flex-1 text-left p-4 border-b-2 ${
                activeTab === 'activos' ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleTabClick('activos')}
            >
              Activos
            </button>
            <button
              className={`flex-1 text-left p-4 border-b-2 ${
                activeTab === 'pasivos' ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleTabClick('pasivos')}
            >
              Pasivos
            </button>
            <button
              className={`flex-1 text-left p-4 border-b-2 ${
                activeTab === 'patrimonio' ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleTabClick('patrimonio')}
            >
              Patrimonio
            </button>
            <button
              className={`flex-1 text-left p-4 border-b-2 ${
                activeTab === 'datos-informativos' ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleTabClick('datos-informativos')}
            >
              Datos Informativos
            </button>
          </div>
          {activeTab === 'activos' && (
            <div>
              <div className="border-t border-gray-200">
                <button
                  type="button"
                  className="w-full text-left p-4 border-b border-gray-200"
                  onClick={() => toggleSection('activos')}
                >
                  Efectivo y equivalentes al efectivo 
                </button>
                {expandedSection === 'activos' && (
                  <div className="pl-4">
                    <div className="pl-4">
                      <section className="p-2 bg-white border rounded-md">
                        <h2 className="bg-white font-bold text-xl pb-2">
                          Activos Equivalentes Efectivo
                        </h2>
                        <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          <ESFvalues
                            title="Efectivo"
                            path={
                              'ActivosPasivos.Activos.ActivosEquivalentesEfectivo.Efectivo'
                            }
                            data={
                              data.ActivosPasivos.Activos
                                .ActivosEquivalentesEfectivo.Efectivo
                            }
                            handleChange={handleChange}
                          />
                          <ESFvalues
                            title="Equivalentes efectivo"
                            path={
                              'ActivosPasivos.Activos.ActivosEquivalentesEfectivo.EquivalentesEfectivo'
                            }
                            data={
                              data.ActivosPasivos.Activos
                                .ActivosEquivalentesEfectivo.EquivalentesEfectivo
                            }
                            handleChange={handleChange}
                          />
                          <ESFvalues
                            title="Efectivo restringido"
                            path={
                              'ActivosPasivos.Activos.ActivosEquivalentesEfectivo.EfectivoRestringido'
                            }
                            data={
                              data.ActivosPasivos.Activos
                                .ActivosEquivalentesEfectivo.EfectivoRestringido
                            }
                            handleChange={handleChange}
                          />
                        </article>
                        <article>
                          <h3 className="text-lg font-bold">Total</h3>
                          <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Valor contable:
                              </span>
                              {
                                data.ActivosPasivos.Activos
                                  .ActivosEquivalentesEfectivo.Total
                                  .ValorContable
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Efecto conversion:
                              </span>{' '}
                              {
                                data.ActivosPasivos.Activos
                                  .ActivosEquivalentesEfectivo.Total
                                  .EfectoConversion
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Menor valor fical:
                              </span>
                              {
                                data.ActivosPasivos.Activos
                                  .ActivosEquivalentesEfectivo.Total
                                  .MenorValorFiscal
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Mayor Valor Fiscal:
                              </span>
                              {
                                data.ActivosPasivos.Activos
                                  .ActivosEquivalentesEfectivo.Total
                                  .MayorValorFiscal
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Valor fiscal:
                              </span>{' '}
                              {
                                data.ActivosPasivos.Activos
                                  .ActivosEquivalentesEfectivo.Total
                                  .ValorFiscal
                              }
                            </p>
                          </div>
                        </article>
                      </section>
                    </div>
                    {/* Aquí se pueden añadir más secciones según sea necesario */}
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200">
              <button type="button" 
                className="w-full text-left p-4 border-b border-gray-200"
                onClick={() => toggleSection("activos-i")}>
                Inversiones e instrumentos financieros derivados (valor neto)
                </button>
                {expandedSection === "activos-i" && (
                  <div className="pl-4">
                    <div className="pl-4">
                      <button
                        type="button"
                        className="w-full text-left p-4 border-b border-gray-200"
                        onClick={() => toggleSubSection("activos-instrumentos-financieros")}
                      >
                        Inversiones e instrumentos financieros derivados
                      </button>
                      {expandedSubSection === "activos-instrumentos-financieros" && (
                        <div className="pl-4">
                        <section className="p-2 bg-white border rounded-md">
                          <h2 className="bg-white font-bold text-xl pb-2">
                            Cuentas por Cobrar Comerciales y Otras Cuentas por Cobrar
                          </h2>
                          <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <ESFvalues
                              title="Derechos de recompra de inversiones"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosRecompraInversiones"
                              }
                                data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosRecompraInversiones
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Instrumentos de deuda a costo amortizado"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaCostoAmortizado"                           
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaCostoAmortizado
                              }
                              handleChange={handleChange}                     
                            />
                            <ESFvalues
                              title="Instrumentos de deuda o patrimonio al costo"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioCosto"                           
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioCosto
                              }
                              handleChange={handleChange}                     
                            />
                            <button type="button"
                              className="w-full text-left p-4 border-b border-gray-200"
                              onClick={() => toggleSubSubSection("activos-is")}>
                              Inversiones en subsidiarias, asociadas y negocios conjuntos
                            </button>
                            {expandedSubSubSection === "activos-is" && (
                              <div className="pl-4">
                                <h1>Inversiones en subsidiarias, asociadas y negocios conjuntos</h1>
                                <ESFvalues
                                  title='Valor razonable con cambios en resultados'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosResultados'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosResultados
                                  }
                                  handleChange={handleChange}
                                />
                                <ESFvalues
                                  title='Valor razonable con cambios en el ORI'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosORI'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.ValorRazonableCambiosORI
                                  }
                                  handleChange={handleChange}
                                />
                                <ESFvalues
                                  title='Método de la participación'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.MetodoParticipacion'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.MetodoParticipacion
                                  }
                                  handleChange={handleChange}
                                />
                                <ESFvalues
                                  title='Al costo'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.AlCosto'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.AlCosto
                                  }
                                  handleChange={handleChange}
                                />
                              </div> 
                            )}
                            <ESFvalues
                              title="Inversiones en subsidiarias, asociadas y negocios conjuntos total"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.Total"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InversionesSubsidiariasAsociadasNegociosConjuntos.Total
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Instrumentos de deuda o patrimonio al valor razonable con cambios en resultados"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableResultados"                           
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableResultados
                              }
                              handleChange={handleChange}                     
                            />
                            <ESFvalues
                              title="Instrumentos de deuda o patrimonio al valor razonable con cambios en el ORI"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableORI"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosDeudaPatrimonioValorRazonableORI
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Instrumentos financieros derivados con fines de negociación"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosNegociación"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosNegociación
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues 
                              title="Instrumentos financieros derivados con fines de cobertura"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosCobertura"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.InstrumentosFinancierosDerivadosCobertura
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Derechos fiduciarios"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosFiduciarios"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.DerechosFiduciarios
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Otros"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Otros"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Otros
                              }
                              handleChange={handleChange}
                            />
                            </article>
                          <article>
                            <h3 className="text-lg font-bold">Total</h3>
                            <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Valor contable:
                                </span>
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Total.ValorContable
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Efecto conversion:
                                </span>{' '}
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Total.EfectoConversion
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Menor valor fical:
                                </span>
                                {
                                   data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Total.MenorValorFiscal
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Mayor Valor Fiscal:
                                </span>
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Total.MayorValorFiscal
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Valor fiscal:
                                </span>{' '}
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.InversionesInstrumentosFinancierosDerivados.Total.ValorFiscal
                                }
                              </p>
                            </div>
                          </article>
                        </section>
                      </div>
                      )}
                    </div>
                    <div className="pl-4">
                      <button type="button"
                      className="w-full text-left p-4 border-b border-gray-200"
                      onClick={() => toggleSubSection("activos-instrumentos-financieros-deterioro")}>
                        Deterioro acumulado de inversiones
                      </button>
                      {expandedSubSection === "activos-instrumentos-financieros-deterioro" && (
                        <div className="pl-4">
                        <section className="p-2 bg-white border rounded-md">
                          <h2 className="bg-white font-bold text-xl pb-2">
                            Cuentas por Cobrar Comerciales y Otras Cuentas por Cobrar
                          </h2>
                          <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <ESFvalues
                              title="Derechos de recompra de inversiones"
                              path={
                                'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.DerechosRecompraInversiones'
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.DerechosRecompraInversiones
                              }
                              handleChange={handleChange}
                            />
                            <button type="button"
                              className="w-full text-left p-4 border-b border-gray-200"
                              onClick={() => toggleSubSubSection("activos-is-d")}>
                              Inversiones en subsidiarias, asociadas y negocios conjuntos
                            </button>
                            {expandedSubSubSection === "activos-is-d" && (
                              <div className="pl-4">
                                <h1>Inversiones en subsidiarias, asociadas y negocios conjuntos</h1>
                                <ESFvalues
                                  title='Método de la participación'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Metodo'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Metodo
                                  }
                                  handleChange={handleChange}
                                />
                                <ESFvalues

                                  title='Costo'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Costo'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Costo
                                  }
                                  handleChange={handleChange}
                                />
                                </div>
                            )}
                            <ESFvalues
                                  title=' Inversiones en subsidiarias, asociadas y negocios conjuntos Total'
                                  path={
                                    'ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Total'
                                  }
                                  data={
                                    data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InversionesSubsidiariasAsociadasNegociosConjuntos.Total
                                  }
                                  handleChange={handleChange}
                            />
                            <ESFvalues
                              title="instrumentos de deuda a costo amortizado"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.instrumentosDeudaCostoAmortizado"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.instrumentosDeudaCostoAmortizado
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Instrumentos de deuda o patrimonio al costo"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InstrumentosDeudaPatrimonioCosto"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.InstrumentosDeudaPatrimonioCosto
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Derechos fiduciarios"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.DerechosFiduciarios"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.DerechosFiduciarios
                              }
                              handleChange={handleChange}
                            />
                            <ESFvalues
                              title="Otros"
                              path={
                                "ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Otros"
                              }
                              data={
                                data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Otros
                              }
                              handleChange={handleChange}
                            />
                          </article>
                          <article>
                            <h3 className="text-lg font-bold">Total</h3>
                            <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Valor contable:
                                </span>
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Total.ValorContable
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Efecto conversion:
                                </span>{' '}
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Total.EfectoConversion
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Menor valor fical:
                                </span>
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Total.MenorValorFiscal
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Mayor Valor Fiscal:
                                </span>
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Total.MayorValorFiscal
                                }
                              </p>
                              <p className="border p-1 rounded-sm">
                                <span className="font-semibold bg-white">
                                  Valor fiscal:
                                </span>{' '}
                                {
                                  data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.DeterioroAcumuladoInversiones.Total.ValorFiscal
                                }
                              </p>
                            </div>
                          </article>
                        </section>
                      </div>
                      )}
                    </div>
                    {/* Aquí se pueden añadir más secciones según sea necesario */} 
                    <article>
                      <h3 className="text-lg font-bold">Total</h3>
                      <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Valor contable:
                          </span>
                          {
                            data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorContable
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Efecto conversion:
                          </span>{' '}
                          {
                            data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.EfectoConversion
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Menor valor fical:
                          </span>
                          {
                              data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MenorValorFiscal
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Mayor Valor Fiscal:
                          </span>
                          {
                            data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.MayorValorFiscal
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Valor fiscal:
                          </span>{' '}
                          {
                            data.ActivosPasivos.Activos.InversionesInstrumentosFinancierosDerivadosVN.Total.ValorFiscal
                          }
                        </p>
                      </div>
                    </article>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200">
                <button type="button"
                  className="w-full text-left p-4 border-b border-gray-200"
                  onClick={() => toggleSection("activos-comerciales-cobrar")}>
                  Cuentas comerciales por cobrar y otras cuentas por cobrar
                </button>
                {expandedSection === "activos-comerciales-cobrar" && (
                  <div className="pl-4">
                    <div className="pl-4">
                      <button type="button"
                        className="w-full text-left p-4 border-b border-gray-200"
                        onClick={() => toggleSubSection("activos-cc")}>
                        Cuentas y documentos por cobrar
                      </button>
                      {expandedSubSection === "activos-cc" && (
                        <div className="pl-4">
                          <section className="p-2 bg-white border rounded-md">
                            <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              <ESFvalues
                                title='Cartera de crédito (préstamos bancarios)'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CarteraCreditoPrestamosBancarios'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CarteraCreditoPrestamosBancarios
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Cuentas por cobrar comerciales'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasComercialesPorCobrar'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasComercialesPorCobrar
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Cuentas por cobrar en acuerdos de concesión (modelo del activo financiero)'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarAcuerdosConcesion'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarAcuerdosConcesion
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Arrendamiento financiero o leasing financiero'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ArrendamientoFinancieroOLeasingFinanciero'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ArrendamientoFinancieroOLeasingFinanciero
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Dividendos y participaciones'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.DividendosParticipaciones'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.DividendosParticipaciones
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Cuentas por cobrar a socios, accionistas o partícipes'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarSociosAccionistasParticipes'
                              } 
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasPorCobrarSociosAccionistasParticipes
                              }
                              handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Cuentas y documentos por cobrar a otras partes relacionadas y asociadas'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas'
                              }
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CuentasDocumentosPorCobrarOtrasPartesRelacionadasAsociadas
                              }
                              handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Primas de seguros por recaudar'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.PrimasSegurosPorRecaudar'
                              }
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.PrimasSegurosPorRecaudar
                              }
                              handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Cartera de difícil cobro'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CarteraDificilCobro'
                              }
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CarteraDificilCobro
                              }
                              handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Reclamaciones por cobrar'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ReclamacionesPorCobrar'
                              }
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.ReclamacionesPorCobrar
                              }
                              handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Anticipos de pagos'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.AnticiposPagos'
                              }
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.AnticiposPagos
                              }
                              handleChange={handleChange}
                              />
                              <ESFvalues
                              title='Otras cuentas y documentos por cobrar'
                              path={
                                'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.OtrasCuentasDocumentosPorCobrar'
                              }
                              data={
                                data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.OtrasCuentasDocumentosPorCobrar
                              }
                              handleChange={handleChange}
                              />
                            </article>    
                              <article>
                                <h3 className="text-lg font-bold">Total</h3>
                                <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                                  <p className="border p-1 rounded-sm">
                                    <span className="font-semibold bg-white">
                                      Valor contable:
                                    </span>
                                    {
                                      data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.ValorContable
                                    }
                                  </p>
                                  <p className="border p-1 rounded-sm">
                                    <span className="font-semibold bg-white">
                                      Efecto conversion:
                                    </span>{' '}
                                    {
                                      data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.EfectoConversion
                                    }
                                  </p>
                                  <p className="border p-1 rounded-sm">
                                    <span className="font-semibold bg-white">
                                      Menor valor fical:
                                    </span>
                                    {
                                        data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.MenorValorFiscal
                                    }
                                  </p>
                                  <p className="border p-1 rounded-sm">
                                    <span className="font-semibold bg-white">
                                      Mayor Valor Fiscal:
                                    </span>
                                    {
                                      data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.MayorValorFiscal
                                    }
                                  </p>
                                  <p className="border p-1 rounded-sm">
                                    <span className="font-semibold bg-white">
                                      Valor fiscal:
                                    </span>{' '}
                                    {
                                      data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.Total.ValorFiscal
                                    }
                                  </p>
                                </div>
                              </article>                     
                            </section>
                        </div>
                      )}
                    </div>
                    <div className="pl-4">
                      <button type="button"
                        className="w-full text-left p-4 border-b border-gray-200"
                        onClick={() => toggleSubSection("activos-co")}>
                        Deterioro acumulado del valor cuentas y documentos por cobrar
                      </button>
                      {expandedSubSection === "activos-co" && (
                        <div className="pl-4">
                          <section className="p-2 bg-white border rounded-md">
                            <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              <ESFvalues
                                title='Cartera de crédito (préstamos bancarios)'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CarteraDeCredito'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CarteraDeCredito
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Cuentas comerciales por cobrar'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasComercialesPorCobrar'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasComercialesPorCobrar
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Cuentas por cobrar en acuerdos de concesión (modelo del activo financiero)'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasPorCobrarAcuerdosConcesion'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasPorCobrarAcuerdosConcesion
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Arrendamiento financiero o leasing financiero'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.ArrendamientoFinancieroLeasingFinanciero'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.ArrendamientoFinancieroLeasingFinanciero
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Dividendos y participaciones'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.DividendosParticipaciones'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.DividendosParticipaciones
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Cuentas por cobrar a socios, accionistas o partícipes'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasPorCobrarSociosAccionistasParticipes'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasPorCobrarSociosAccionistasParticipes
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Cuentas por cobrar a otras partes relacionadas y asociadas'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasPorCobrarOtrasPartesRelacionadasAsociadas'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.CuentasPorCobrarOtrasPartesRelacionadasAsociadas
                                }
                                handleChange={handleChange}
                              />
                              <ESFvalues
                                title='Otras cuentas por cobrar'
                                path={
                                  'ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.OtrasCuentasPorCobrar'
                                }
                                data={
                                  data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.OtrasCuentasPorCobrar  
                                }
                                handleChange={handleChange}
                              />                         
                            </article>
                            <article>
                              <h3 className="text-lg font-bold">Total</h3>
                              <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                                <p className="border p-1 rounded-sm">
                                  <span className="font-semibold bg-white">
                                    Valor contable:
                                  </span>
                                  {
                                    data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.ValorContable
                                  }
                                </p>
                                <p className="border p-1 rounded-sm">
                                  <span className="font-semibold bg-white">
                                    Efecto conversion:
                                  </span>{' '}
                                  {
                                    data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.EfectoConversion
                                  }
                                </p>
                                <p className="border p-1 rounded-sm">
                                  <span className="font-semibold bg-white">
                                    Menor valor fical:
                                  </span>
                                  {
                                      data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.MenorValorFiscal
                                  }
                                </p>
                                <p className="border p-1 rounded-sm">
                                  <span className="font-semibold bg-white">
                                    Mayor Valor Fiscal:
                                  </span>
                                  {
                                    data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.MayorValorFiscal
                                  }
                                </p>
                                <p className="border p-1 rounded-sm">
                                  <span className="font-semibold bg-white">
                                    Valor fiscal:
                                  </span>{' '}
                                  {
                                    data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.DeterioroAcumuladoValorCuentasDocumentosCobrar.Total.ValorFiscal
                                  }
                                </p>
                              </div>
                            </article>
                          </section>                         
                        </div>
                      )}
                    </div>
                    <article>
                  <h3 className="text-lg font-bold">Total</h3>
                  <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                    <p className="border p-1 rounded-sm">
                      <span className="font-semibold bg-white">
                        Valor contable:
                      </span>
                      {
                        data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorContable
                      }
                    </p>
                    <p className="border p-1 rounded-sm">
                      <span className="font-semibold bg-white">
                        Efecto conversion:
                      </span>{' '}
                      {
                        data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.EfectoConversion
                      }
                    </p>
                    <p className="border p-1 rounded-sm">
                      <span className="font-semibold bg-white">
                        Menor valor fical:
                      </span>
                      {
                          data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MenorValorFiscal
                      }
                    </p>
                    <p className="border p-1 rounded-sm">
                      <span className="font-semibold bg-white">
                        Mayor Valor Fiscal:
                      </span>
                      {
                        data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.MayorValorFiscal
                      }
                    </p>
                    <p className="border p-1 rounded-sm">
                      <span className="font-semibold bg-white">
                        Valor fiscal:
                      </span>{' '}
                      {
                        data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.Total.ValorFiscal
                      }
                    </p>
                  </div>
                  </article>
                  </div>
                )}               
              </div>
              <div className="border-t border-gray-200">
                <button type="button"
                  className="w-full text-left p-4 border-b border-gray-200"
                  onClick={() => toggleSection("Inventarios")}>
                  Inventarios
                </button>
                {expandedSection === "Inventarios" && (
                   <div className="pl-4">
                   <section className="p-2 bg-white border rounded-md">
                      <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <ESFvalues
                            title='Para la venta, no producidos por la empresa'
                            path={
                              'ActivosPasivos.Activos.Inventarios.ParaLaVentaNoProducidosPorLaEmpresa'  
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.ParaLaVentaNoProducidosPorLaEmpresa
                            }
                            handleChange={handleChange}/>
                          <ESFvalues
                            title='En tránsito'
                            path={
                              'ActivosPasivos.Activos.Inventarios.EnTransito'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.EnTransito
                            }
                            handleChange={handleChange}/>  
                          <ESFvalues
                            title='Materias primas, suministros y materiales'
                            path={
                              'ActivosPasivos.Activos.Inventarios.MateriasPrimasSuministrosMateriales'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.MateriasPrimasSuministrosMateriales
                            }
                            handleChange={handleChange}/>  
                          <ESFvalues
                            title='En proceso (diferentes de obras o inmuebles en construcción para la venta)'
                            path={
                              'ActivosPasivos.Activos.Inventarios.EnProcesoDiferentesDeObrasInmueblesEnConstruccionParaVenta'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.EnProcesoDiferentesDeObrasInmueblesEnConstruccionParaVenta
                            }
                            handleChange={handleChange}/> 
                         <ESFvalues
                            title='Costos prestadores de servicios'
                            path={
                              'ActivosPasivos.Activos.Inventarios.CostosPrestadoresServicios'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.CostosPrestadoresServicios
                            }
                            handleChange={handleChange}/> 
                          <ESFvalues
                            title='Producto terminado (diferentes de obras o inmuebles terminados para la venta)'
                            path={
                              'ActivosPasivos.Activos.Inventarios.ProductoTerminadoDiferentesObrasInmueblesTerminadosParaVenta'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.ProductoTerminadoDiferentesObrasInmueblesTerminadosParaVenta
                            }
                            handleChange={handleChange}/>
                          <ESFvalues
                            title='Obras o inmuebles en construcción para la venta'
                            path={
                              'ActivosPasivos.Activos.Inventarios.ObrasInmueblesConstruccionParaVenta'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.ObrasInmueblesConstruccionParaVenta
                            }
                            handleChange={handleChange}/>                             
                          <ESFvalues
                            title='Obras o inmuebles terminados para la venta'
                            path={
                              'ActivosPasivos.Activos.Inventarios.ObrasInmueblesTerminadosParaVenta'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.ObrasInmueblesTerminadosParaVenta
                            }
                            handleChange={handleChange}/>
                          <ESFvalues
                            title='Piezas de repuesto y equipo auxiliar clasificados como inventarios'
                            path={
                              'ActivosPasivos.Activos.Inventarios.PiezasRepuestoEquipoAuxiliarClasificadosComoInventarios'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.PiezasRepuestoEquipoAuxiliarClasificadosComoInventarios
                            }
                            handleChange={handleChange}/>  
                          <ESFvalues
                            title='Inventario que surge de la actividad de extracción'
                            path={
                              'ActivosPasivos.Activos.Inventarios.InventarioSurgeActividadExtraccion'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.InventarioSurgeActividadExtraccion
                            }
                            handleChange={handleChange}/>  
                          <ESFvalues
                            title='Deterioro acumulado del valor de inventarios'
                            path={
                              'ActivosPasivos.Activos.Inventarios.DeterioroAcumuladoValorInventarios'
                            }
                            data={
                              data.ActivosPasivos.Activos.Inventarios.DeterioroAcumuladoValorInventarios
                            }
                            handleChange={handleChange}/>                                       
                      </article>                       
                      <article>
                          <h3 className="text-lg font-bold">Total</h3>
                          <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Valor contable:
                              </span>
                              {
                                data.ActivosPasivos.Activos.Inventarios.Total.ValorContable
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Efecto conversion:
                              </span>{' '}
                              {
                                  data.ActivosPasivos.Activos.Inventarios.Total.EfectoConversion
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Menor valor fical:
                              </span>
                              {
                                data.ActivosPasivos.Activos.Inventarios.Total.MenorValorFiscal
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Mayor Valor Fiscal:
                              </span>
                              {
                                  data.ActivosPasivos.Activos.Inventarios.Total.MayorValorFiscal
                              }
                            </p>
                            <p className="border p-1 rounded-sm">
                              <span className="font-semibold bg-white">
                                Valor fiscal:
                              </span>{' '}
                              {
                                  data.ActivosPasivos.Activos.Inventarios.Total.ValorFiscal
                              }
                            </p>
                          </div>
                        </article>                     
                     </section>
                 </div>
                )}
              </div>
              <div>
                <button type="button"
                  className="w-full text-left p-4 border-b border-gray-200"
                  onClick={() => toggleSection("Gastos-pagados")}>
                  Gastos pagados por anticipado
                </button>
                {expandedSection === "Gastos-pagados" && (
                  <div className="pl-4">
                  <section className="p-2 bg-white border rounded-md">
                    <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      <ESFvalues
                        title='Publicidad'
                        path={
                          'ActivosPasivos.Activos.GastosPagadosPorAnticipado.Publicidad'
                        }
                        data={
                          data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Publicidad
                        }
                        handleChange={handleChange}
                      />   
                      <ESFvalues 
                      title='Primas de seguros'  
                      path={
                        'ActivosPasivos.Activos.GastosPagadosPorAnticipado.PrimasSeguros'
                      }
                      data={
                        data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.PrimasSeguros
                      }
                      handleChange={handleChange}
                      />
                      <ESFvalues
                      title='Arrendamientos'
                      path={
                        'ActivosPasivos.Activos.GastosPagadosPorAnticipado.Arrendamientos'
                      }
                      data={
                        data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Arrendamientos
                      }
                      handleChange={handleChange}
                      />
                      <ESFvalues
                      title='Otros'
                      path={
                        'ActivosPasivos.Activos.GastosPagadosPorAnticipado.Otros'
                      }
                      data={
                        data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Otros
                      }
                      handleChange={handleChange}
                      />

                    </article>    
                      <article>
                        <h3 className="text-lg font-bold">Total</h3>
                        <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                          <p className="border p-1 rounded-sm">
                            <span className="font-semibold bg-white">
                              Valor contable:
                            </span>
                            {
                              data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Total.ValorContable
                            }
                          </p>
                          <p className="border p-1 rounded-sm">
                            <span className="font-semibold bg-white">
                              Efecto conversion:
                            </span>{' '}
                            {
                              data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Total.EfectoConversion
                            }
                          </p>
                          <p className="border p-1 rounded-sm">
                            <span className="font-semibold bg-white">
                              Menor valor fical:
                            </span>
                            {
                              data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Total.MenorValorFiscal
                            }
                          </p>
                          <p className="border p-1 rounded-sm">
                            <span className="font-semibold bg-white">
                              Mayor Valor Fiscal:
                            </span>
                            {
                              data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Total.MayorValorFiscal
                            }
                          </p>
                          <p className="border p-1 rounded-sm">
                            <span className="font-semibold bg-white">
                              Valor fiscal:
                            </span>{' '}
                            {
                              data.ActivosPasivos.Activos.GastosPagadosPorAnticipado.Total.ValorFiscal
                            }
                          </p>
                        </div>
                      </article>                     
                    </section>
                </div>
                )}
              </div> 
              <div>
                <button type="button"
                  className="w-full text-left p-4 border-b border-gray-200"
                  onClick={() => toggleSection("Activos-impuestos-diferidos")}>
                Activos por impuestos diferidos               
                </button>
                {expandedSection === "Activos-impuestos-diferidos" && (
                  <article>
                   <ESFvalues
                    title='Impuestos diferidos activos'
                    path={
                      'ActivosPasivos.Activos.ActivosImpuestosDiferidos'
                    }
                    data={
                      data.ActivosPasivos.Activos.ActivosImpuestosDiferidos
                    }
                    handleChange={handleChange}
                    />
                 </article>  
                )}
              </div>
              <div>
                <button type="button"
                  className="w-full text-left p-4 border-b border-gray-200"
                  onClick={() => toggleSection("Activos-propiedades")}>
                  Propiedades, planta y equipo
                </button>
              </div>
              {expandedSection === "Activos-propiedades" && (
                <div className="pl-4">
                <section className="p-2 bg-white border rounded-md">
                  <article className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <ESFvalues
                      title='Terrenos'
                      path={
                        'ActivosPasivos.Activos.PropiedadesPlantaEquipo.Terrenos'
                      }
                      data={
                        data.ActivosPasivos.Activos.CuentasComercialesCobrarOtrasPorCobrar.CuentasDocumentosPorCobrar.CarteraCreditoPrestamosBancarios
                      }
                      handleChange={handleChange}
                    />
                    <ESFvalues
                      title='Construcciones en proceso'  
                      path={
                        'ActivosPasivos.Activos.PropiedadesPlantaEquipo.ConstruccionesEnProceso'
                      }
                      data={
                        data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.ConstruccionesEnProceso
                      }
                      handleChange={handleChange}
                    />  
                    <button type="button"
                      className="w-full text-left p-4 border-b border-gray-200"
                      onClick={() => toggleSubSection("Edificios")}>
                      Edificios
                    </button>      
                    {expandedSubSection === "Edificios" && (
                      <div className="pl-4">
                      <section className="p-2 bg-white border rounded-md">
                        <article>
                          <ESFvalues
                            title='Costo'
                            path={
                              'ActivosPasivos.Activos.PropiedadesPlantaEquipo.Edificios.Costo'
                            }
                            data={
                              data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Edificios.Costo
                            }
                            handleChange={handleChange}
                          />   
                          <ESFvalues
                            title='Ajuste acumulado por revaluaciones o reexpresiones'
                            path={
                              'ActivosPasivos.Activos.PropiedadesPlantaEquipo.Edificios.AjusteAcumuladoRevaluacionesReexpresiones'
                            }
                            data={
                              data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Edificios.AjusteAcumuladoRevaluacionesReexpresiones
                            }
                            handleChange={handleChange}
                          />                            
                        </article>                                                
                        </section>
                    </div>
                    )}
                    <ESFvalues
                    title='Edificios Total'         
                    path={
                      'ActivosPasivos.Activos.PropiedadesPlantaEquipo.Edificios.Total'
                    }
                    data={
                      data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Edificios.Total
                    }
                    handleChange={handleChange}
                    />  
                    <ESFvalues
                    title='Activos tangibles para exploración y evaluación de recursos minerales'
                    path={
                      'ActivosPasivos.Activos.PropiedadesPlantaEquipo.ActivosTangiblesExploracionEvaluacionRecursosMinerales'
                    }
                    data={
                      data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.ActivosTangiblesExploracionEvaluacionRecursosMinerales
                    }
                    handleChange={handleChange}
                    />
                    <button type="button"
                      className="w-full text-left p-4 border-b border-gray-200"
                      onClick={() => toggleSubSection("Otras-propiedades")}>
                      Otras propiedades, planta y equipo
                    </button> 
                    {expandedSubSection === "Otras-propiedades" && (
                      <div className="pl-4">
                      <section className="p-2 bg-white border rounded-md">
                        <article>
                          <ESFvalues
                            title='Costo'
                            path={
                              'ActivosPasivos.Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Costo'
                            }
                            data={
                              data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Costo
                            }
                            handleChange={handleChange}
                          />   
                          <ESFvalues
                            title='Ajuste acumulado por revaluaciones o reexpresiones'
                            path={
                              'ActivosPasivos.Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.AjusteAcumuladoRevaluacionesReexpresiones'
                            }
                            data={
                              data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.AjusteAcumuladoRevaluacionesReexpresiones
                            }
                            handleChange={handleChange}
                          />                            
                        </article>                                                
                        </section>
                    </div>
                    )}
                    <ESFvalues
                    title='Otras propiedades, planta y equipo Total'
                    path={
                      'ActivosPasivos.Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Total'
                    }
                    data={
                      data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.OtrasPropiedadesPlantaEquipo.Total
                    }
                    handleChange={handleChange}
                    />
                    <ESFvalues
                    title='Depreciación acumulada de propiedades, planta y equipo'
                    path={
                      'ActivosPasivos.Activos.PropiedadesPlantaEquipo.DepreciacionAcumuladaPropiedadesPlantaEquipo'
                    }
                    data={
                      data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.DepreciacionAcumuladaPropiedadesPlantaEquipo
                    }
                    handleChange={handleChange}
                    />
                    <ESFvalues
                    title='Deterioro acumulado de propiedades, planta y equipo'
                    path={
                      'ActivosPasivos.Activos.PropiedadesPlantaEquipo.DeterioroAcumuladoPropiedadesPlantaEquipo'
                    }
                    data={
                      data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.DeterioroAcumuladoPropiedadesPlantaEquipo
                    }
                    handleChange={handleChange}
                    />
                  </article>    
                    <article>
                      <h3 className="text-lg font-bold">Total</h3>
                      <div className="bg-white flex flex-col md:flex-row gap-2 justify-between">
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Valor contable:
                          </span>
                          {
                            data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Total.ValorContable
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Efecto conversion:
                          </span>{' '}
                          {
                            data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Total.EfectoConversion
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Menor valor fical:
                          </span>
                          {
                            data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Total.MenorValorFiscal
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Mayor Valor Fiscal:
                          </span>
                          {
                            data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Total.MayorValorFiscal
                          }
                        </p>
                        <p className="border p-1 rounded-sm">
                          <span className="font-semibold bg-white">
                            Valor fiscal:
                          </span>{' '}
                          {
                            data.ActivosPasivos.Activos.PropiedadesPlantaEquipo.Total.ValorFiscal
                          }
                        </p>
                      </div>
                    </article>                     
                  </section>
                </div>
              )}
            </div>
          )}
          {/* Aquí irían las secciones de Pasivos, Patrimonio y Datos Informativos, implementadas de manera similar */}
        </div>
      </div>
    </div>
  );
};

export default ESFpatrimonioForm;

