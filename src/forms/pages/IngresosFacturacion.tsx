import { useState, useEffect } from "react";
import StudentLayout from "../../components/templates/StudentLayout";
import IngFacValues from "../components/IngFacValues";
import { IngresosFacturacionService } from "../services/ingresosFacturacion.service";

function IngresosFacturacionForm() {
  const [data, setData] = useState({
    VentBien: {
      PasivIngrDif: {},
      FactEmitPer: {},
      IngrContDevPer: {},
    },
    PrestServ: {
      PasivIngrDif: {},
      FactEmitPer: {},
      IngrContDevPer: {},
    },
    OtrosIngresos: {
      PasivIngrDif: {},
      FactEmitPer: {},
      IngrContDevPer: {},
    },
    IngresosTer: {
      FactEmitPer: {},
      IngrContDevPer: {},
    },
    AjustesValAdec: {
      FactEmitPer: {},
      IngrContDevPer: {},
    },
    Totales: {
      PasivIngrDif: {},
      FactEmitPer: {},
      IngrContDevPer: {},
    },
  });

  useEffect(() => {
    IngresosFacturacionService.getIngresosFacturacionForStudent()
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.ingContent);
        } else {
          console.error("Error en la respuesta", response);
        }
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  const calculateTotalPasivoImpDif = (currentData) => {
    return (
      (currentData.SaldoIniPer || 0) -
      (currentData.IngrContPer || 0) +
      (currentData.GenPer || 0)
    );
  };

  const calculateTotalEmiPer = (currentData) => {
    return (
      (currentData.DevIngrPerAnt || 0) +
      (currentData.DevIngrPerAct || 0) +
      (currentData.RegIngDif || 0) +
      (currentData.SoloFact || 0)
    );
  };

  const calculateTotalIngrContDevPer = (currentData) => {
    return (
      (currentData.FactEmitPer.DevIngrPerAct || 0) +
      (currentData.IngrContDevPer.SinFact || 0) +
      (currentData.IngrContDevPer.FactPerAnt || 0)
    );
  };

  const changeValue = (path, e) => {
    let { name, value } = e.target;

    if (value === "") value = 0;

    const newData = { ...data };
    path.reduce((acc, key, index) => {
      if (index === path.length - 1) {
        acc[key][name] = Number.parseInt(value);
      }
      return acc[key];
    }, newData);

    const categories = Object.keys(newData);

    categories.forEach((cat) => {
      if (newData[cat].PasivIngrDif) {
        newData[cat].PasivIngrDif.TotPasivDif = calculateTotalPasivoImpDif(
          newData[cat].PasivIngrDif
        );
      }

      if (newData[cat].FactEmitPer) {
        newData[cat].FactEmitPer.TotFactEmiPEr = calculateTotalEmiPer(
          newData[cat].FactEmitPer
        );
      }

      newData[cat].IngrContDevPer.TotalIngrContDevPer =
        calculateTotalIngrContDevPer(newData[cat]);
    });

    const totalCategories = categories.filter((cat) => cat !== "Totales");
    const totals = {
      PasivIngrDif: {},
      FactEmitPer: {},
      IngrContDevPer: {},
    };

    totalCategories.forEach((cat) => {
      const category = newData[cat];

      Object.keys(category).forEach((subCat) => {
        Object.keys(category[subCat]).forEach((key) => {
          if (!totals[subCat][key]) {
            totals[subCat][key] = 0;
          }
          totals[subCat][key] += category[subCat][key];
        });
      });
    });

    newData.Totales = totals;

    setData(newData);

    IngresosFacturacionService.updateIngresosFacturacionForStudent(newData);
  };

  return (
    <div className="flex">
      <StudentLayout>
        <main className="w-full overflow-auto max-h-screen p-2 mt-12 md:mt-0 flex flex-col gap-4">
          <section className="border p-2">
            <h2 className="font-bold text-2xl">Venta de bienes</h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <IngFacValues
                title="Pasivo por ingreso diferido"
                data={data.VentBien.PasivIngrDif}
                path="VentBien.PasivIngrDif"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Facturación emitida en el período"
                data={data.VentBien.FactEmitPer}
                path="VentBien.FactEmitPer"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Ingreso contable devengado en el período"
                data={data.VentBien.IngrContDevPer}
                path="VentBien.IngrContDevPer"
                handleChange={changeValue}
              />
            </article>
          </section>
          <section className="border p-2">
            <h2 className="font-bold text-2xl">Prestación de servicios</h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <IngFacValues
                title="Pasivo por ingreso diferido"
                data={data.PrestServ.PasivIngrDif}
                path="PrestServ.PasivIngrDif"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Facturación emitida en el período"
                data={data.PrestServ.FactEmitPer}
                path="PrestServ.FactEmitPer"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Ingreso contable devengado en el período"
                data={data.PrestServ.IngrContDevPer}
                path="PrestServ.IngrContDevPer"
                handleChange={changeValue}
              />
            </article>
          </section>
          <section className="border p-2">
            <h2 className="font-bold text-2xl">Otros ingresos</h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <IngFacValues
                title="Pasivo por ingreso diferido"
                data={data.OtrosIngresos.PasivIngrDif}
                path="OtrosIngresos.PasivIngrDif"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Facturación emitida en el período"
                data={data.OtrosIngresos.FactEmitPer}
                path="OtrosIngresos.FactEmitPer"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Ingreso contable devengado en el período"
                data={data.OtrosIngresos.IngrContDevPer}
                path="OtrosIngresos.IngrContDevPer"
                handleChange={changeValue}
              />
            </article>
          </section>
          <section className="border p-2">
            <h2 className="font-bold text-2xl">Ingresos para terceros</h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <IngFacValues
                title="Facturación emitida en el período"
                data={data.IngresosTer.FactEmitPer}
                path="IngresosTer.FactEmitPer"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Ingreso contable devengado en el período"
                data={data.IngresosTer.IngrContDevPer}
                path="IngresosTer.IngrContDevPer"
                handleChange={changeValue}
              />
            </article>
          </section>
          <section className="border p-2">
            <h2 className="font-bold text-2xl">
              Ajustes al valor facturado (Descuentos, notas)
            </h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <IngFacValues
                title="Facturación emitida en el período"
                data={data.AjustesValAdec.FactEmitPer}
                path="AjustesValAdec.FactEmitPer"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Ingreso contable devengado en el período"
                data={data.AjustesValAdec.IngrContDevPer}
                path="AjustesValAdec.IngrContDevPer"
                handleChange={changeValue}
              />
            </article>
          </section>
          <section className="border p-2">
            <h2 className="font-bold text-2xl">TOTAL</h2>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <IngFacValues
                title="Pasivo por ingreso diferido"
                data={data.Totales.PasivIngrDif}
                path="Totales.PasivIngrDif"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Facturación emitida en el período"
                data={data.Totales.FactEmitPer}
                path="Totales.FactEmitPer"
                handleChange={changeValue}
              />
              <IngFacValues
                title="Ingreso contable devengado en el período"
                data={data.Totales.IngrContDevPer}
                path="Totales.IngrContDevPer"
                handleChange={changeValue}
              />
            </article>
          </section>
        </main>
      </StudentLayout>
    </div>
  );
}

export default IngresosFacturacionForm;
