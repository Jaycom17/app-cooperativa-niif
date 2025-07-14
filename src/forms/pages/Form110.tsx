    import StudentLayout from '../../layout/StudentLayout';
    import Form110Values from '../components/Form110Values';
    import Accordeon from '../components/Accordeon';
    import TabBar from '../components/TabBar';
    import { ValuesNames } from '../utils/form110';
    import { useState, useEffect } from "react";

    const Form110 = () => {

        const getForm = async () => {
            // Simulate an API call to get the form data
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        status: 200,
                        data: {
                            r110Content: {
                                "DatoPers": {
                                    "Anno": 2023,
                                    "NumForm": 110,
                                    "DatDecl": {
                                        "NIT": 123456789,
                                        "DV": 0,
                                        "PriApll": "Juan",
                                        "SecApll": "Perez",
                                        "PriNomb": "Juan",
                                        "OtrosNomb": "",
                                        "RazonSoc": "",
                                        "CodDir": "",
                                        "ActEcoPrin": "",
                                        "Correct": {
                                            "Cod": 0,
                                            "NoFormAnt": 0
                                        }
                                    },
                                    "FractAnnoAgrv": false,
                                    "RenunPertRegTribEsp": false,
                                    "VinPagObraImpu": false,
                                    "PerdFiscAcumAnnoAnt": 0
                                },
                                // ... other data
                            }
                        }
                    });
                }, 1000);
            });
        }

        const updateForm = async (data: any) => {
            // Simulate an API call to update the form data
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ status: 200 });
                }, 1000);
            });
        }

        const [data, setData] = useState({
            "DatoPers": {
                "Anno": 0,
                "NumForm": 0,
                "DatDecl": {
                    "NIT": 0,
                    "DV": 0,
                    "PriApll": "",
                    "SecApll": "",
                    "PriNomb": "",
                    "OtrosNomb": "",
                    "RazonSoc": "",
                    "CodDir": "",
                    "ActEcoPrin": "",
                    "Correct": {
                        "Cod": 0,
                        "NoFormAnt": 0
                    }
                },
                "FractAnnoAgrv": false,
                "RenunPertRegTribEsp": false,
                "VinPagObraImpu": false,
                "PerdFiscAcumAnnoAnt": 0
            },
            "DatosResum": {
                "DatosInf": {
                    "TotalCostGastNom": 0,
                    "AportSistSegSocial": 0,
                    "AportSenaEtc": 0
                },
                "Patrim": {
                    "EfectvEquiEfect": 0,
                    "InvInstFinDeriv": 0,
                    "CuentDocArreFinCob": 0,
                    "Inv": 0,
                    "ActivInt": 0,
                    "ActivBio": 0,
                    "PPEPANCMC": 0,
                    "Otro": 0,
                    "TotalBruto": 0,
                    "Pasiv": 0,
                    "TotalLiqui": 0
                },
                "Ingre": {
                    "Brutos": 0,
                    "Finan": 0,
                    "DividNoCont": 0,
                    "DividDistrEntNoCol": 0,
                    "DividGravExt06": 0,
                    "DividGravNat06": 0,
                    "DividGravNat07": 0,
                    "DiviDNoGrav07": 0,
                    "DividGravExt07": 0,
                    "DividGravMega07": 0,
                    "Otro": 0,
                    "TotBruto": 0,
                    "DevRebDec": 0,
                    "IngNoRent": 0,
                    "Tot": 0
                },
                "CostDedic": {
                    "Cost": 0,
                    "GastAdmin": 0,
                    "GastDistVent": 0,
                    "GastFinan": 0,
                    "Otro": 0,
                    "Tot": 0
                },
                "ESAL": {
                    "InvEfecAnno": 0,
                    "InvLiqui": 0
                },
                "Renta": {
                    "RecuDedu": 0,
                    "Passiv": 0,
                    "LiquidOrd": 0,
                    "PerdidLiqui": 0,
                    "Compensacion": 0,
                    "RentLiquida": 0,
                    "RentPresun": 0,
                    "RentExenta": 0,
                    "RenGravable": 0,
                    "RenLiquida": 0
                },
                "GananciasOcasion": {
                    "IngreGananOcasion": 0,
                    "RentDeudReg": 0,
                    "UtiliPerdFisc": 0,
                    "CostGananOcas": 0,
                    "GananOcasionNoAgrav": 0,
                    "GananOcasGrav": 0
                },
                "LiquiPriv": {
                    "ImpuesRentLiquiGrav": {
                        "RentLiquidGrav": 0,
                        "DivPartGravET00": 0,
                        "DivPartGravET": 0,
                        "DivPartGrav27": 0,
                        "DivPartGrav": 0,
                        "DivPartGrav33": 0
                    },
                    "TotImpRentLiquidGrav": 0,
                    "DescTrib": 0,
                    "ImpNetRent": 0,
                    "ImpGanOcas": 0,
                    "DescPorImpPagad": 0,
                    "TotImpCarg": 0,
                    "ValInvObraImp50": 0,
                    "DescEfectInvObrImp": 0,
                    "CredFisc": 0,
                    "AnticRentLiquidAnnoAntGrav": 0,
                    "SaldFavAnnoAntGrav": 0,
                    "Reten": {
                        "AutoReten": 0,
                        "OtraReten": 0,
                        "TotReten": 0
                    },
                    "AntRenAnnoGravSig": 0,
                    "SobreInstFin": {
                        "AnticSobreInstAnnoGranAnt": 0,
                        "SobreInstFinan": 0,
                        "AnticSobreInstAnnoGravSig": 0
                    },
                    "SaldoPagImp": 0,
                    "Sansion": 0,
                    "TotSaldPag": 0,
                    "TotSaldFav": 0
                }
            },
            "Totales": {
                "ValTotExiObrImpMod0": 0,
                "ValTotProyObrImpMod2": 0,
                "CodRepre": 0,
                "CodCont": 0,
                "Salvedad": false,
                "NoTarjProf": 0,
                "PagoTot": 0
            }
        });

        const updateValue = (value: string | number, path: string) => {
            // Crear una copia del objeto data
            const updatedData = { ...data };

            // Navegar al valor específico usando la ruta (path)
            let currentLevel: any = updatedData;
            const pathArray = path.split('.');
            for (let i = 0; i < pathArray.length - 1; i++) {
                currentLevel = currentLevel[pathArray[i]];
            }

            const lastKey = pathArray[pathArray.length - 1];

            // Actualizar el valor
            currentLevel[lastKey] = value;
            setData(updatedData);
        }

        const recieveData = (key, path) => {
            if (typeof key === 'object') {
                Object.entries(key).map(([key, val]) => {
                    recieveData(val, `${path}.${key}`);
                })
            } else {
                updateValue(key, path)
            }
        }

        useEffect(() => {
            getForm()
                .then((response) => {
                    if (response.status === 200) {
                        Object.entries(response.data.r110Content).map(([key, val]) => {
                            recieveData(val, [key]);
                        });
                    } else {
                        console.error("Error en la respuesta", response);
                    }
                })
                .catch((error) => {
                    console.error("Error en la llamada a la API", error);
                });
        }, []);

        const calculateTotalPatBruto = (currentData) => {
            return (currentData.EfectvEquiEfect || 0) + (currentData.InvInstFinDeriv || 0) + (currentData.CuentDocArreFinCob || 0) + (currentData.Inv || 0) + (currentData.ActivInt || 0) + (currentData.ActivBio || 0) + (currentData.PPEPANCMC || 0) + (currentData.Otro || 0);
        }

        const calculateTotalLiqui = (currentData) => {
            if (((currentData.TotalBruto || 0) - (currentData.Pasiv || 0)) > 0) {
                return (currentData.TotalBruto || 0) - (currentData.Pasiv || 0);
            } else {
                return 0;
            }
        }

        const calculateTotBruto = (currentData) => {
            return (currentData.Brutos || 0) + (currentData.Finan || 0) + (currentData.DividNoCont || 0) +
                (currentData.DividDistrEntNoCol || 0) + (currentData.DividGravExt06 || 0) + (currentData.DividGravNat06 || 0) +
                (currentData.DividGravNat07 || 0) + (currentData.DiviDNoGrav07 || 0) + (currentData.DividGravExt07 || 0) +
                (currentData.DividGravMega07 || 0) + (currentData.Otro || 0)
        }

        const calculateTotNeto = (currentData) => {
            if (((currentData.TotBruto || 0) - (currentData.DevRebDec || 0) - (currentData.IngNoRent || 0)) > 0) {
                return (currentData.TotBruto || 0) - (currentData.DevRebDec || 0) - (currentData.IngNoRent || 0);
            } else {
                return 0;
            }
        }

        const calculateTotCostGast = (currentData) => {
            return (currentData.Cost || 0) + (currentData.GastAdmin || 0) + (currentData.GastDistVent || 0) +
                (currentData.GastFinan || 0) + (currentData.Otro || 0);
        }

        const calculateLiquidOrd = (currentData) => {
            const result = (currentData.Ingre.Tot || 0) + (currentData.ESAL.InvLiqui || 0) + (currentData.Renta.RecuDedu || 0) +
                (currentData.Renta.Passiv || 0) - (currentData.Ingre.DividGravNat06 || 0) - (currentData.Ingre.DividGravNat07 || 0) -
                (currentData.Ingre.DiviDNoGrav07 || 0) - (currentData.Ingre.DividGravExt07 || 0) - (currentData.Ingre.DividGravMega07 || 0) -
                (currentData.CostDedic.Tot || 0) - (currentData.ESAL.InvEfecAnno || 0);
            if (result < 0) {
                return 0;
            } else {
                return result;
            }
        }

        const calculatePerdidLiqui = (currentData) => {
            const result = (currentData.Ingre.DividGravNat06 || 0) + (currentData.Ingre.DividGravNat07 || 0) + (currentData.Ingre.DiviDNoGrav07 || 0) +
                (currentData.Ingre.DividGravExt07 || 0) + (currentData.Ingre.DividGravMega07 || 0) + (currentData.CostDedic.Tot || 0) +
                (currentData.ESAL.InvEfecAnno || 0) - (currentData.Ingre.Tot || 0) - (currentData.ESAL.InvLiqui || 0) -
                (currentData.Renta.RecuDedu || 0) - (currentData.Renta.Passiv || 0);
            if (result < 0) {
                return 0;
            } else {
                return result;
            }
        }

        const calculateRentLiquida = (currentData) => {
            return (currentData.LiquidOrd || 0) - (currentData.Compensacion || 0);
        }

        const calculateRenLiquida = (currentData) => {
            if ((currentData.RentLiquida || 0) > (currentData.RentPresun || 0)) {
                return (currentData.RentLiquida || 0) - (currentData.RentExenta || 0) - (currentData.RenGravable || 0);
            } else {
                return (currentData.RentPresun || 0) - (currentData.RentExenta || 0) - (currentData.RenGravable || 0);
            }
        }

        const calculateTotImpRentLiquidGrav = (currentData) => {
            return (currentData.RentLiquidGrav || 0) + (currentData.DivPartGravET00 || 0) + + (currentData.DivPartGravET || 0) +
                (currentData.DivPartGrav27 || 0) + (currentData.DivPartGrav || 0) + + (currentData.DivPartGrav33 || 0);
        }

        const calculateImpNetRent = (currentData) => {
            const result = (currentData.TotImpRentLiquidGrav || 0) - (currentData.DescTrib || 0);
            if (result > 0) {
                return result;
            } else {
                return 0;
            }
        }

        const calculateTotImpCarg = (currentData) => {
            const result = (currentData.ImpNetRent || 0) + (currentData.ImpGanOcas || 0) - (currentData.DescPorImpPagad || 0);
            if (result > 0) {
                return result;
            } else {
                return 0;
            }
        }

        const calculateTotReten = (currentData) => {
            return (currentData.AutoReten || 0) + (currentData.OtraReten || 0);
        }

        const calculateSaldoPagImp = (currentData) => {
            const result = (currentData.TotImpCarg || 0) + (currentData.AntRenAnnoGravSig || 0) + (currentData.SobreInstFin.SobreInstFinan || 0) +
                (currentData.SobreInstFin.AnticSobreInstAnnoGravSig || 0) - (currentData.ValInvObraImp50 || 0) - (currentData.DescEfectInvObrImp || 0) -
                (currentData.CredFisc || 0) - (currentData.AnticRentLiquidAnnoAntGrav || 0) - (currentData.SaldFavAnnoAntGrav || 0) -
                (currentData.Reten.TotReten || 0) - (currentData.SobreInstFin.AnticSobreInstAnnoGranAnt || 0);
            if (result < 0) {
                return 0;
            } else {
                return result;
            }
        }

        const calculateTotSaldPag = (currentData) => {
            const result = (currentData.TotImpCarg || 0) + (currentData.AntRenAnnoGravSig || 0) + (currentData.SobreInstFin.SobreInstFinan || 0) +
                (currentData.SobreInstFin.AnticSobreInstAnnoGravSig || 0) + (currentData.Sansion || 0) - (currentData.ValInvObraImp50 || 0) -
                (currentData.DescEfectInvObrImp || 0) - (currentData.CredFisc || 0) - (currentData.AnticRentLiquidAnnoAntGrav || 0) -
                (currentData.SaldFavAnnoAntGrav || 0) - (currentData.Reten.TotReten || 0) - (currentData.SobreInstFin.AnticSobreInstAnnoGranAnt || 0);
            if (result < 0) {
                return 0;
            } else {
                return result;
            }
        }

        const calculateTotSaldFav = (currentData) => {
            const result = (currentData.ValInvObraImp50 || 0) + (currentData.DescEfectInvObrImp || 0) + (currentData.CredFisc || 0) +
                (currentData.AnticRentLiquidAnnoAntGrav || 0) + (currentData.SaldFavAnnoAntGrav || 0) + (currentData.Reten.TotReten || 0) +
                (currentData.SobreInstFin.AnticSobreInstAnnoGranAnt || 0) - (currentData.TotImpCarg || 0) - (currentData.AntRenAnnoGravSig || 0) -
                (currentData.SobreInstFin.SobreInstFinan || 0) - (currentData.SobreInstFin.AnticSobreInstAnnoGravSig || 0) - (currentData.Sansion || 0);
            if (result < 0) {
                return 0;
            } else {
                return result;
            }
        }

        const handleChange = (e) => {
            let { name, value } = e.target;
            console.log(name, value)



            if (value === '') value = 0;

            // Crear una copia del objeto data
            const updatedData = { ...data };

            // Navegar al valor específico usando la ruta (name)
            let currentLevel = updatedData;
            const pathArray = name.split('.');
            for (let i = 0; i < pathArray.length - 1; i++) {
                currentLevel = currentLevel[pathArray[i]];
            }

            const lastKey = pathArray[pathArray.length - 1];

            // Detectar el tipo de dato actual
            const currentValueType = typeof currentLevel[lastKey];

            // Convertir el valor al tipo correcto
            if (currentValueType === 'number') {
                value = parseFloat(value);
            } else if (currentValueType === 'boolean') {
                value = value === 'true';
            }
            // No es necesario convertir si es una cadena de texto (string)

            // Actualizar el valor
            currentLevel[lastKey] = value;

            // Actualizar el estado con el objeto modificado
            updatedData.DatosResum.Patrim.TotalBruto = calculateTotalPatBruto(updatedData.DatosResum.Patrim);
            updatedData.DatosResum.Patrim.TotalLiqui = calculateTotalLiqui(updatedData.DatosResum.Patrim);
            updatedData.DatosResum.Ingre.TotBruto = calculateTotBruto(updatedData.DatosResum.Ingre);
            updatedData.DatosResum.Ingre.Tot = calculateTotNeto(updatedData.DatosResum.Ingre);
            updatedData.DatosResum.CostDedic.Tot = calculateTotCostGast(updatedData.DatosResum.CostDedic);
            updatedData.DatosResum.Renta.LiquidOrd = calculateLiquidOrd(updatedData.DatosResum);
            updatedData.DatosResum.Renta.PerdidLiqui = calculatePerdidLiqui(updatedData.DatosResum);
            updatedData.DatosResum.Renta.RentLiquida = calculateRentLiquida(updatedData.DatosResum.Renta);
            updatedData.DatosResum.Renta.RenLiquida = calculateRenLiquida(updatedData.DatosResum.Renta);
            updatedData.DatosResum.LiquiPriv.TotImpRentLiquidGrav = calculateTotImpRentLiquidGrav(updatedData.DatosResum.LiquiPriv.ImpuesRentLiquiGrav);
            updatedData.DatosResum.LiquiPriv.ImpNetRent = calculateImpNetRent(updatedData.DatosResum.LiquiPriv);
            updatedData.DatosResum.LiquiPriv.TotImpCarg = calculateTotImpCarg(updatedData.DatosResum.LiquiPriv);
            updatedData.DatosResum.LiquiPriv.Reten.TotReten = calculateTotReten(updatedData.DatosResum.LiquiPriv.Reten);
            updatedData.DatosResum.LiquiPriv.SaldoPagImp = calculateSaldoPagImp(updatedData.DatosResum.LiquiPriv);
            updatedData.DatosResum.LiquiPriv.TotSaldPag = calculateTotSaldPag(updatedData.DatosResum.LiquiPriv);
            updatedData.DatosResum.LiquiPriv.TotSaldFav = calculateTotSaldFav(updatedData.DatosResum.LiquiPriv);

            // Calculo de los totales
            setData(updatedData);
            console.log(data);
            updateForm(data);

        };

        const tabs = [
            { name: 'DatoPers', label: 'Datos Personales' },
            { name: 'DatosResum', label: 'Datos Resumidos' },
            { name: 'Totales', label: 'Totales' }
        ];

        const [activeTab, setActiveTab] = useState(tabs[0].name);

        const renderSections = (sectionData, pathPrefix, excludeSection = "", friendlyNames = []) => {
            if (Array.isArray(sectionData)) {
                return Object.keys(sectionData).map((sectionKey) => {
                    if (sectionKey === excludeSection) return null;

                    const friendlyName = sectionData[sectionKey].Anio.toString();

                    return (
                        <Accordeon
                            key={sectionKey}
                            title={friendlyName}
                            arrayIndex={sectionKey}
                        >
                            <Form110Values
                                title={friendlyName}
                                path={`${pathPrefix}.${sectionKey}`}
                                data={sectionData[sectionKey]}
                                handleChange={handleChange}
                            />
                        </Accordeon>
                    );
                });
            }

            return Object.keys(sectionData).map((sectionKey) => {
                if (sectionKey === excludeSection) return null;

                const friendlyName = friendlyNames[sectionKey] || sectionKey;

                if (typeof sectionData[sectionKey] !== 'object') {
                    return (
                        <div key={sectionKey}>
                            <Form110Values
                                title={friendlyName}
                                path={`${pathPrefix}.${sectionKey}`}
                                data={sectionData[sectionKey]}
                                handleChange={handleChange}
                            />
                        </div>
                    );
                }
                return (
                    <Accordeon key={sectionKey} title={friendlyName}>
                        <Form110Values
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
                <section className="w-full mt-12 md:mt-0 overflow-auto max-h-screen p-1">
                    <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === 'DatoPers' && renderSections(
                        data.DatoPers,
                        "DatoPers",
                        "",
                        ValuesNames
                    )}
                    {activeTab === 'DatosResum' && renderSections(
                        data.DatosResum,
                        "DatosResum",
                        "",
                        ValuesNames
                    )}
                    {activeTab === 'Totales' && renderSections(
                        data.Totales,
                        "Totales",
                        "",
                        ValuesNames
                    )}
                </section>
            </StudentLayout>
        );
    };

    export default Form110;
