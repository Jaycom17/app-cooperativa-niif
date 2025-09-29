import StudentLayout from "@/components/templates/StudentLayout";
import FormItem from "@/student/components/atoms/FormItem";
import logo from '@/assets/LogoUniversidadCooperativa.png'


const MainStudent = () => {

  const forms = [
    { label: "Formulario 110", to: "/form110" },
    { label: "Detalle renglones 110", to: "/detalleReng" },
    { label: "Caratula", to: "/caratulaform" },
    { label: "ESF patrimonio", to: "/esfpatrimonioform" },
    { label: "Renta liquida", to: "/rentaliquida" },
    { label: "Impuesto diferido", to: "/impuestodiferido" },
    { label: "Ingresos y facturación", to: "/ingrefactform" },
    { label: "Activos fijos", to: "/activosfijos" },
    { label: "Resumen ESF ERI", to: "/resumenesf" },
  ];

  return (
    <StudentLayout>
      <div className="flex flex-col justify-center w-full max-h-screen h-screen items-center p-2 md:p-6 lg:p-10 md:mt-0 mt-12">
        <img className="w-[300px] md:w-[400px] rounded-[20%]" src={logo} alt="Logo universidad cooperativa" />
        <h2 className="text-2xl font-semibold pb-8 text-center">Selecciona el formulario que desea diligenciar</h2>
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-10">
          {forms.map((form, index) => (
            <FormItem key={index} name={form.label} to={form.to} />
          ))}
        </section>
      </div>
    </StudentLayout>
  );
};

export default MainStudent;
