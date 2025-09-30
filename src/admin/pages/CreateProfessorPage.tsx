import ProfForm from "@/admin/components/organisms/ProfForm";
import AdminLayout from "@/admin/components/templates/AdminLayout";

function CreateProfessorPage() {
  return (
    <AdminLayout>
      <main className="w-full min-h-screen bg-background flex justify-center items-center flex-col">
        <article className="px-5 md:px-32 lg:px-60 xl:px-80 mb-5 text-center text-unicoop">
          <h1 className="font-bold text-4xl mb-3">CREAR PROFESOR</h1>
          <h2 className="font-semibold text-xl mb-5">Ingresa los siguientes datos del profesor para crearlo</h2>
          <p className="text-justify lg:text-center text-lg">A continuación, puede crear un profesor. Una vez creado, podrá crear y gestionar salas. Por favor, revise cuidadosamente la información para evitar inconvenientes futuros.</p>
        </article>
        <section className="w-10/12 md:w-3/5 lg:2/5">
          <ProfForm/>
        </section>
      </main>
    </AdminLayout>
  );
}

export default CreateProfessorPage;
