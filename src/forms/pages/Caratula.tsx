import StudentLayout from "../../components/templates/StudentLayout";
import YesNoSelect from "../../components/atoms/YesNoSelect";
import { useState, useEffect, useRef } from "react";
import { CaratulaService } from "../services/caratula.service";

function CaratulaForm() {
  const [data, setData] = useState({
    Anno: 0,
    DatDecl: {
      NIT: 0,
      DV: 0,
      PriApell: "",
      SegunApell: "",
      PriNomb: "",
      OtrosNomb: "",
      RazonSoc: "",
      CodDir: "",
    },
    Tarif: {
      Art240: 0,
      Art2401: 0,
      Art194240360: 0,
      MegaInvHot: 0,
      MegaInv: 0,
      TarifGen: 0,
    },
    DatosInf: {
      PerNatuSinRes: false,
      ContrRegTriEsp: false,
      EntCoop: false,
      EntSecFin: false,
      NueSoc: false,
      ObrImp: false,
      ProgReorEmp: false,
      SocExtPresServ: false,
      OblApl: false,
      CostInvEstSis: false,
      CostInvEstSim: false,
      ProgTariImp: false,
      ContrEstJur: false,
      MonFuncDif: false,
      MegInv: false,
      EmpEcoNar: false,
      CompHoldCol: false,
      ZonaEcoSocEsp: false,
    },
    NoIdSig: 0,
    CodRepre: 0,
    CodCont: 0,
    Salvedad: false,
    NoTarjProf: 0,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    CaratulaService.getCaratulaForStudent().then((response) => {
      console.log(response.data.carContent);
      if (response.data.carContent) {
        setData(response.data.carContent);
      }
    });
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log("Original Data", data);

    if (value === "") value = 0;

    const updatedData = structuredClone(data); // mejor que {...data} para objetos anidados

    const pathArray = name.split(".");
    console.log("Path array", pathArray);

    let currentLevel = updatedData;

    // Crear niveles intermedios si no existen
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (typeof currentLevel[key] !== "object" || currentLevel[key] === null) {
        currentLevel[key] = {}; // Inicializar nivel si no existe o es nulo
      }
      currentLevel = currentLevel[key];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Detectar tipo anterior si existe
    const existingValue = currentLevel[lastKey];
    const existingType = typeof existingValue;

    // Conversión segura
    if (existingType === "number") {
      const parsed = parseFloat(value);
      value = isNaN(parsed) ? 0 : parsed;
    } else if (existingType === "boolean") {
      value = value === "true";
    }

    currentLevel[lastKey] = value;

    console.log("Updated Data", updatedData);

    setData(updatedData); // actualiza el estado

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      CaratulaService.updateCaratulaForStudent(updatedData);
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <StudentLayout>
      <div className="flex bg-gray-100 rounded shadow-md w-full">
        <main className="overflow-auto max-h-screen w-full">
          <section className="p-2">
            <h2 className="font-bold text-xl mb-3 pl-10 md:pl-[0px]">
              Datos del declarante
            </h2>
            <article className="gap-2 grid grid-cols-1 lg:grid-cols-2 bg-gray-200 rounded">
              <label
                className="flex justify-between p-2 gap-2 items-center"
                htmlFor=""
              >
                <p>Número de Identificación Tributaria (NIT)</p>
                <input
                  className="p-1 bg-white rounded"
                  type="text"
                  value={data.DatDecl.NIT}
                  name="DatDecl.NIT"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="flex justify-between p-2 gap-2 items-center"
                htmlFor=""
              >
                {" "}
                DV
                <input
                  className="p-1 bg-white rounded"
                  type="text"
                  value={data.DatDecl.DV}
                  name="DatDecl.DV"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="flex justify-between p-2 gap-2 items-center"
                htmlFor=""
              >
                Primer apellido
                <input
                  className="p-1 bg-white rounded"
                  type="text"
                  value={data.DatDecl.PriApell}
                  name="DatDecl.PriApell"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="flex justify-between p-2 gap-2 items-center"
                htmlFor=""
              >
                Segundo apellido
                <input
                  className="p-1 bg-white rounded"
                  type="text"
                  value={data.DatDecl.SegunApell}
                  name="DatDecl.SegunApell"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="flex justify-between p-2 gap-2 items-center"
                htmlFor=""
              >
                Primer nombre
                <input
                  className="p-1 bg-white rounded"
                  type="text"
                  value={data.DatDecl.PriNomb}
                  name="DatDecl.PriNomb"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="flex justify-between p-2 gap-2 items-center"
                htmlFor=""
              >
                Otros nombres
                <input
                  className="p-1 bg-white rounded"
                  type="text"
                  value={data.DatDecl.OtrosNomb}
                  name="DatDecl.OtrosNomb"
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </article>
          </section>

          <section className="p-2">
            <h2 className="font-bold text-xl mb-3">Datos informativos</h2>
            <article className="flex flex-col gap-2">
              <YesNoSelect
                message={"Persona Natural sin residencia"}
                path={"DatosInf.PerNatuSinRes"}
                value={data.DatosInf.PerNatuSinRes}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Contribuyente del Régimen Tributario Especial"}
                path={"DatosInf.ContrRegTriEsp"}
                value={data.DatosInf.ContrRegTriEsp}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={
                  "Entidad Cooperativa (artículo 19-4 Estatuto Tributario)"
                }
                path={"DatosInf.EntCoop"}
                value={data.DatosInf.EntCoop}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Entidad del sector financiero"}
                path={"DatosInf.EntSecFin"}
                value={data.DatosInf.EntSecFin}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Nueva sociedad -ZOMAC"}
                path={"DatosInf.NueSoc"}
                value={data.DatosInf.NueSoc}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Obras por impuestos -ZOMAC"}
                path={"DatosInf.ObrImp"}
                value={data.DatosInf.ObrImp}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={
                  "Programa de reorganización empresarial durante el año gravable"
                }
                path={"DatosInf.ProgReorEmp"}
                value={data.DatosInf.ProgReorEmp}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Sociedad extranjera"}
                path={"DatosInf.SocExtPresServ"}
                value={data.DatosInf.SocExtPresServ}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={
                  "Obligado a aplicar sistemas especiales de valoración de inversiones"
                }
                path={"DatosInf.OblApl"}
                value={data.DatosInf.OblApl}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={
                  "Costo de los inventarios establecidos por el sistema de juego de inventarios"
                }
                path={"DatosInf.CostInvEstSis"}
                value={data.DatosInf.CostInvEstSis}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={
                  "Costo de inventarios establecido simultáneamente por el juego de inventarios y por el sistema de inventario permanente"
                }
                path={"DatosInf.CostInvEstSim"}
                value={data.DatosInf.CostInvEstSim}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Progresividad dela tarifa de impuesto de renta"}
                path={"DatosInf.ProgTariImp"}
                value={data.DatosInf.ProgTariImp}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Contrato de estabilidad jurídica"}
                path={"DatosInf.ContrEstJur"}
                value={data.DatosInf.ContrEstJur}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Moneda funcional diferente al peso colombiano"}
                path={"DatosInf.MonFuncDif"}
                value={data.DatosInf.MonFuncDif}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Mega -Inversiones"}
                path={"DatosInf.MegInv"}
                value={data.DatosInf.MegInv}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Empresa en Economía Naranja"}
                path={"DatosInf.EmpEcoNar"}
                value={data.DatosInf.EmpEcoNar}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Compañia de Holding Colombiana"}
                path={"DatosInf.CompHoldCol"}
                value={data.DatosInf.CompHoldCol}
                handleChange={handleChange}
              />
              <YesNoSelect
                message={"Zona Económica y social especial"}
                path={"DatosInf.ZonaEcoSocEsp"}
                value={data.DatosInf.ZonaEcoSocEsp}
                handleChange={handleChange}
              />
            </article>
          </section>
        </main>
      </div>
    </StudentLayout>
  );
}

export default CaratulaForm;
