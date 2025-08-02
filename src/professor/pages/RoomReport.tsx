import ProfessorLayout from "../components/templates/ProfessorLayout";
import AsideProf from "../components/organisms/AsideProf";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { forms } from "../utils/Report";
import logo from "../../assets/LogoUniversidadCooperativa.png";
import { FormRender } from "../../forms/components/FormRender";

import { CaratulaService } from "../../forms/services/caratula.service";
import { ActivosFijosService } from "../../forms/services/activosFijos.service";
import { RentaLiquidaService } from "../../forms/services/rentaLiquida.service";
import { EsfPatrimonioService } from "../../forms/services/esfPatrimonio.service";
import { DetalleReglonesService } from "../../forms/services/detalleReglones.service";
import { ImpuestoDiferidoService } from "../../forms/services/impuestoDiferido.service";
import { IngresosFacturacionService } from "../../forms/services/ingresosFacturacion.service";
import { Form110Service } from "../../forms/services/form110.service";
import { ResumenESFService } from "../../forms/services/resumenESF.service";

function RoomReport() {
  const { roomID } = useParams();
  const [form, setForm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [data, setData] = useState({});

  const toNav = (formTo: string, stuID:  string | undefined) => {
    setForm(formTo);
    if (formTo === "stuSelect") {
      setSelectedStudent(stuID || null);
    }
    switch (formTo) {
      case "form110":
        setData({});
        Form110Service.getForm110ForProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.r110Content);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });  
        break;
      case "detalleReng":
        setData({});
        DetalleReglonesService.getDetalleReglonesFormProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.detContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "caratulaform":
        setData({});
        CaratulaService.getCaratulaForProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.carContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "esfpatrimonioform":
        setData({});
        EsfPatrimonioService.getEsfPatrimonioFormProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.esfContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "rentaliquida":
        setData({});
        RentaLiquidaService.getRentaLiquidaForProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.renContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "impuestodiferido":
        setData({});
        ImpuestoDiferidoService.getImpuestoDiferidoForProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.impContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "ingrefactform":
        setData({});
        IngresosFacturacionService.getIngresosFacturacionForProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.ingContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "activosfijos":
        setData({});
        ActivosFijosService.getActivosFijosFormProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.actContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "resumenesf":
        setData({});
        ResumenESFService.getResumenESFForProfessor(stuID!, roomID!)
          .then((res) => {
            setData(res.data.resContent);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
    console.log(formTo, stuID);
  };

  return (
    <ProfessorLayout>
      <main className="flex">
        <AsideProf toNav={toNav} />
        {form === "" && (
          <div className="flex flex-col items-center justify-center mb-32 text-center w-10/12 md:w-5/12 md:mx-auto">
            <img
              src={logo}
              alt="Logo universidad cooperativa"
              className="w-11/12 md:w-96"
            />
            <h1 className="text-4xl font-semibold">
              Bienvenido al reporte de la sala
            </h1>
            <h2 className="text-lg lg:text-xl">
              Para empezar a revisar los avances de un estudiante en los
              formularios, escoge uno dando clic en el botón &quot;
              <span className="text-unicoop-blue font-medium">Estudiantes</span>
              &quot;, en la barra de navegación lateral.
            </h2>
          </div>
        )}
        {form === "stuSelect" && selectedStudent && (
          <div className="flex flex-col items-center text-center w-full h-screen justify-center">
            <img
              className="w-[300px] md:w-[400px] rounded-[20%]"
              src={logo}
              alt="Logo universidad cooperativa"
            />
            <h2 className="text-2xl font-semibold pb-8 text-center">
              Selecciona el formulario que desea revisar
            </h2>
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-10">
              {forms.map((form, index) => (
                <button
                  key={index}
                  onClick={() => toNav(form.to, selectedStudent)}
                  className="flex items-center hover:scale-105 hover:bg-slate-100 duration-150 justify-center w-full flex-col rounded-2xl p-2"
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_1280.png"
                    alt="Logo Formulario"
                    className="h-10 rounded-t-lg"
                  />
                  <h3 className=" font-semibold text-center">{form.label}</h3>
                </button>
              ))}
            </section>
          </div>
        )}
        {form !== "" && Object.keys(data).length > 0 && (
          <main className="w-full pt-9 md:p-10 max-h-screen overflow-auto">
          <FormRender
            value={data}
            canEdit={true}
            defaultOpen={false}
          />
        </main>
        )}
      </main>
    </ProfessorLayout>
  );
}

export default RoomReport;
