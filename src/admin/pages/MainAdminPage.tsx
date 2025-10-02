import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import Professor from "@/admin/components/organisms/Professor";
import type { UserModel } from "@/admin/models/User";
import AdminLayout from "@/admin/components/templates/AdminLayout";
import { ProfessorService } from "@/admin/services/professor.service";
import { useAuthStore } from "@/stores/AuthStore";

const MainAdminPage = () => {
  const [professors, setProfessors] = useState<UserModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuthStore();

  const loadProfessors = () => {
    ProfessorService.getProfessors()
      .then((data) => {
        const sortedProfessors = data.sort((a, b) =>
          a.usuName.localeCompare(b.usuName)
        );
        setProfessors(sortedProfessors);
      })
      .catch(() => {
        alert("Error al cargar los profesores");
      });
  };

  useEffect(() => {
    if (user) {
      loadProfessors();
    }else {
      setProfessors([]);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProfessors = professors.filter((professor) =>
    professor.usuName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <main className="bg-background min-h-screen pb-3 ">
        <div className="relative w-3/4 md:w-1/3 mt-5 mx-auto ">
          <input
            className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background border-solid border-unicoop border"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <FaSearch className="absolute inset-y-0 right-2 text-2xl my-auto text-unicoop cursor-text" />
        </div>
        <section className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-5 mx-auto justify-items-center">
          {filteredProfessors.map((professor) => (
            <Professor
              key={professor.usuID}
              professor={professor}
              onRefresh={loadProfessors}
            />
          ))}
        </section>
      </main>
    </AdminLayout>
  );
};

export default MainAdminPage;
