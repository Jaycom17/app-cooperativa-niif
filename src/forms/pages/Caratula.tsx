import StudentLayout from "../../components/templates/StudentLayout";
import YesNoSelect from "../../components/atoms/YesNoSelect";
import { useState, useEffect } from "react";
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

  const updateValue = (value, path) => {
    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (path)
    let currentLevel = updatedData;
    let pathArray = path;
    if (path.includes(".")) {
      pathArray = path.split(".");
    }
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Actualizar el valor
    currentLevel[lastKey] = value;
    setData(updatedData);
  };

  const recieveData = (key, path) => {
    if (typeof key === "object") {
      Object.entries(key).map(([key, val]) => {
        recieveData(val, `${path}.${key}`);
      });
    } else {
      updateValue(key, path);
    }
  };

  useEffect(() => {
    CaratulaService.getCaratulaForStudent()
      .then((response) => {
        if (response.status === 200) {
          Object.entries(response.data.carContent).map(([key, val]) => {
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

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    console.log("Data", data);

    if (value === "") value = 0;

    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (name)
    let currentLevel = updatedData;
    const pathArray = name.split(".");
    console.log("patharray", pathArray);
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

    // Actualizar el estado con el objeto modificado

    // Calculo de los totales
    setData(updatedData);
    console.log(data);
    CaratulaService.updateCaratulaForStudent(data);
  };

  return (
    <StudentLayout>
      <div className="flex bg-gray-100 rounded shadow-md">
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
                  className=""
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
                  className=""
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
                  className=""
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
                  className=""
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
                  className=""
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
                  className=""
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
