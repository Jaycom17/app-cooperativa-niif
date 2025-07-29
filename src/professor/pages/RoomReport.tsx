import ProfessorLayout from "../components/templates/ProfessorLayout";
import AsideProf from "../components/organisms/AsideProf";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { forms } from "../utils/Report";
import logo from "../../assets/LogoUniversidadCooperativa.png";
import GenericTabs from "../components/organisms/GenericTabs";

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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState({});

  const updateValue = (value, path, form) => {
    // Crear una copia del objeto data
    const updatedData = { ...form };
    // Navegar al valor específico usando la ruta (path)
    let currentLevel = updatedData;
    const pathArray = path.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Actualizar el valor
    currentLevel[lastKey] = value;
    setData(updatedData);
  };

  const recieveData = (key, path, form) => {
    if (typeof key === "object") {
      Object.entries(key).map(([key, val]) => {
        recieveData(val, `${path}.${key}`, form);
      });
    } else {
      updateValue(key, path, form);
    }
  };

  const toNav = (formTo, stuID) => {
    setForm(formTo);
    if (formTo === "stuSelect") {
      setSelectedStudent(stuID || null);
    }
    switch (formTo) {
      case "form110":
        setData({});
        Form110Service.getForm110ForProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.r110Content).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });  
        break;
      case "detalleReng":
        setData({});
        DetalleReglonesService.getDetalleReglonesFormProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.detContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "caratulaform":
        setData({});
        CaratulaService.getCaratulaForProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.carContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "esfpatrimonioform":
        setData({});
        EsfPatrimonioService.getEsfPatrimonioFormProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.esfContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "rentaliquida":
        setData({});
        RentaLiquidaService.getRentaLiquidaForProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.renContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "impuestodiferido":
        setData({});
        ImpuestoDiferidoService.getImpuestoDiferidoForProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.impContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "ingrefactform":
        setData({});
        IngresosFacturacionService.getIngresosFacturacionForProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.ingContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "activosfijos":
        setData({});
        ActivosFijosService.getActivosFijosFormProfessor(stuID, roomID!)
          .then((res) => {
            Object.entries(res.data.actContent).map(([key, val]) => {
              recieveData(val, [key], data);
            });
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "stuSelect":

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
                  onClick={() => toNav(form.to, selectedStudent.stuID)}
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
        {form !== "" && form !== "stuSelect" && (
          <GenericTabs
            json={data}
            onReport={true}
          />
        )}
      </main>
    </ProfessorLayout>
  );
}

export default RoomReport;
